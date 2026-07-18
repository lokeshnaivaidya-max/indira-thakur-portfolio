import { NextResponse } from 'next/server';

const testimonials = [
  { id: '1', name: 'Priya Sharma', role: 'Newborn Session', content: 'Indira has a magical way with babies...', rating: 5, featured: true, order: 1 },
  { id: '2', name: 'Ananya Patel', role: 'Maternity Session', content: 'My maternity shoot with Indira was the most beautiful experience...', rating: 5, featured: true, order: 2 },
  { id: '3', name: 'Rohan & Meera Kapoor', role: 'Family Portrait', content: 'We wanted natural, candid family photos...', rating: 5, featured: true, order: 3 },
];

export async function GET() {
  return NextResponse.json(testimonials);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newItem = { id: String(Date.now()), ...body };
    testimonials.push(newItem);
    return NextResponse.json(newItem, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to create testimonial' }, { status: 500 });
  }
}
