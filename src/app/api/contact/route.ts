import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Contact from '@/models/Contact';

export const dynamic = 'force-dynamic';

interface ContactBody {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
}

export async function POST(request: Request) {
  try {
    const body: ContactBody = await request.json();
    const { name, email, phone, service, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Optional MongoDB persistence - non-blocking for Google Form submission
    if (process.env.MONGODB_URI) {
      try {
        if (mongoose.connection.readyState !== 1) {
          await mongoose.connect(process.env.MONGODB_URI);
        }

        await Contact.create({
          name,
          email,
          phone: phone || '',
          subject: service || '',
          message,
          read: false,
        });
      } catch (dbError) {
        console.warn('Optional MongoDB local storage failed, continuing to Google Form submission:', dbError);
      }
    } else {
      console.info('MONGODB_URI not set; skipping optional local database storage.');
    }

    try {
      const googleFormUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSd-LdjuiUE9RSb-rlFMKYj1nJ9az_SQ5RiDeBSTNMQVu5OFYw/formResponse';
      
      const shootTypeMap: Record<string, string> = {
        newborn: 'Newborn',
        maternity: 'Maternity',
        portrait: 'Corporate/Brand/Portfolio',
        events: 'Event',
        birth: 'Birth',
        toddler: 'Toddler',
      };

      const mappedService = shootTypeMap[service?.toLowerCase() || ''] || 'Corporate/Brand/Portfolio';

      const params = new URLSearchParams();
      params.append('entry.2005620554', name);
      params.append('entry.1166974658', phone || 'Not specified');
      params.append('entry.1045781291', email);
      params.append('entry.1065046570', 'Website (Online)');
      params.append('entry.167332123', mappedService);
      params.append('entry.1302982852', message || 'No additional details provided.');

      const googleResponse = await fetch(googleFormUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString(),
      });

      if (!googleResponse.ok) {
        throw new Error(`Google Form responded with status code ${googleResponse.status}`);
      }
    } catch (googleError: any) {
      console.error('Google Form submission failed:', googleError);
      return NextResponse.json(
        { error: 'Failed to submit form to Google Sheets. ' + (googleError.message || '') },
        { status: 502 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Thank you for your message! I will get back to you within 24 hours.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
