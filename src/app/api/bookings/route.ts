import { NextResponse } from 'next/server';

interface BookingBody {
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  message: string;
}

export async function POST(request: Request) {
  try {
    const body: BookingBody = await request.json();
    const { name, email, phone, service, date, message } = body;

    if (!name || !email || !service || !date) {
      return NextResponse.json(
        { error: 'Name, email, service, and date are required' },
        { status: 400 }
      );
    }

    console.log('Booking request:', { name, email, phone, service, date, message });

    return NextResponse.json(
      { success: true, message: 'Your booking request has been received. I will confirm availability within 24 hours.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Booking error:', error);
    return NextResponse.json(
      { error: 'Failed to process booking. Please try again.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  const bookings = [
    { id: '1', name: 'Priya Sharma', email: 'priya@example.com', phone: '555-0101', service: 'Newborn', date: '2026-08-15', status: 'confirmed', createdAt: '2026-07-10' },
    { id: '2', name: 'Ananya Patel', email: 'ananya@example.com', phone: '555-0102', service: 'Maternity', date: '2026-08-20', status: 'pending', createdAt: '2026-07-12' },
  ];
  return NextResponse.json(bookings);
}
