import { NextResponse } from 'next/server';

const galleryItems = [
  { id: '1', src: '', alt: 'Newborn Session', category: 'Newborn', width: 800, height: 1000, featured: true, order: 1 },
  { id: '2', src: '', alt: 'Maternity Glow', category: 'Maternity', width: 800, height: 800, featured: true, order: 2 },
  { id: '3', src: '', alt: 'Portrait Beauty', category: 'Portrait', width: 1200, height: 800, featured: true, order: 3 },
  { id: '4', src: '', alt: 'Family Joy', category: 'Events', width: 800, height: 1000, featured: false, order: 4 },
];

export async function GET() {
  return NextResponse.json(galleryItems);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newItem = {
      id: String(Date.now()),
      ...body,
      createdAt: new Date().toISOString(),
    };
    galleryItems.push(newItem);
    return NextResponse.json(newItem, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to create gallery item' }, { status: 500 });
  }
}
