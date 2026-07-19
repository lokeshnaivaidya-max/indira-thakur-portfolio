import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import ThemeSettings from '@/models/ThemeSettings';
import { requireAuth } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectToDatabase();
    let theme = await ThemeSettings.findOne();
    if (!theme) {
      theme = await ThemeSettings.create({});
    }
    return NextResponse.json(theme);
  } catch (error) {
    console.error('Theme GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch theme settings' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const user = requireAuth(request);
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    await connectToDatabase();
    const body = await request.json();
    const theme = await ThemeSettings.findOneAndUpdate({}, body, { new: true, upsert: true });
    return NextResponse.json(theme);
  } catch (error) {
    console.error('Theme PUT error:', error);
    return NextResponse.json({ error: 'Failed to update theme settings' }, { status: 500 });
  }
}
