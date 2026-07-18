import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { requireAuth } from '@/lib/auth';

export async function GET() {
  try {
    await connectToDatabase();
    const stats = {
      totalImages: 0,
      totalServices: 0,
      totalTestimonials: 0,
      totalReviews: 0,
      totalFAQs: 0,
      recentContacts: 0,
      pendingBookings: 0,
      unreadMessages: 0,
    };

    const Gallery = (await import('@/models/Gallery')).default;
    const Service = (await import('@/models/Service')).default;
    const Testimonial = (await import('@/models/Testimonial')).default;
    const Review = (await import('@/models/Review')).default;
    const FAQ = (await import('@/models/FAQ')).default;
    const Booking = (await import('@/models/Booking')).default;
    const Contact = (await import('@/models/Contact')).default;

    stats.totalImages = await Gallery.countDocuments();
    stats.totalServices = await Service.countDocuments();
    stats.totalTestimonials = await Testimonial.countDocuments();
    stats.totalReviews = await Review.countDocuments();
    stats.totalFAQs = await FAQ.countDocuments();

    stats.recentContacts = await Contact.countDocuments({
      createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
    });

    stats.pendingBookings = await Booking.countDocuments({ status: 'pending' });
    stats.unreadMessages = await Contact.countDocuments({ read: false });

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Dashboard GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch dashboard statistics' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const user = requireAuth(request);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { action, data } = await request.json();

    switch (action) {
      case 'createService': {
        const Service = (await import('@/models/Service')).default;
        const newService = await Service.create(data);
        return NextResponse.json(newService, { status: 201 });
      }

      case 'createTestimonial': {
        const Testimonial = (await import('@/models/Testimonial')).default;
        const newTestimonial = await Testimonial.create(data);
        return NextResponse.json(newTestimonial, { status: 201 });
      }

      case 'createReview': {
        const Review = (await import('@/models/Review')).default;
        const newReview = await Review.create(data);
        return NextResponse.json(newReview, { status: 201 });
      }

      case 'createFAQ': {
        const FAQ = (await import('@/models/FAQ')).default;
        const newFAQ = await FAQ.create(data);
        return NextResponse.json(newFAQ, { status: 201 });
      }

      case 'createBooking': {
        const Booking = (await import('@/models/Booking')).default;
        const newBooking = await Booking.create(data);
        return NextResponse.json(newBooking, { status: 201 });
      }

      case 'createAbout': {
        const About = (await import('@/models/About')).default;
        const newAbout = await About.create(data);
        return NextResponse.json(newAbout, { status: 201 });
      }

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    console.error('Dashboard POST error:', error);
    return NextResponse.json({ error: 'Failed to perform action' }, { status: 500 });
  }
}
