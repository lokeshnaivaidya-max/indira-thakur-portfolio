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

    if (!process.env.MONGODB_URI) {
      return NextResponse.json(
        { success: true, message: 'Thank you for your message! I will get back to you within 24 hours.' },
        { status: 200 }
      );
    }

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

    try {
      const googleFormUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSd-LdjuiUE9RSb-rlFMKYj1nJ9az_SQ5RiDeBSTNMQVu5OFYw/formResponse';
      const shootTypeMap: Record<string, string> = {
        newborn: 'Newborn',
        maternity: 'Maternity',
        portrait: 'Portrait',
        events: 'Event',
      };
      const params = new URLSearchParams();
      params.append('entry.1633920210', name);
      params.append('entry.1770822543', phone || '');
      params.append('entry.227649005', email);
      params.append('entry.790080973', 'Bangalore');
      params.append('entry.376818574', shootTypeMap[service || ''] || 'Prefer not to say');
      await fetch(googleFormUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString(),
        mode: 'no-cors',
      });
    } catch (googleError) {
      console.error('Google Form submission failed:', googleError);
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
