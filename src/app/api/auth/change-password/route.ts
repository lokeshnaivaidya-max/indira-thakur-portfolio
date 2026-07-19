import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { createHash } from 'crypto';

export const dynamic = 'force-dynamic';

const JWT_SECRET = process.env.JWT_SECRET as string;

function getTokenUser(request: Request) {
  const cookie = request.headers.get('cookie') || '';
  const match = cookie.match(/auth_token=([^;]+)/);
  if (!match) return null;
  try {
    return jwt.verify(match[1], JWT_SECRET) as unknown as { email: string; role: string; name?: string };
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  try {
    const tokenUser = getTokenUser(request);
    if (!tokenUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!process.env.MONGODB_URI) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 400 });
    }

    const { currentPassword, newPassword } = await request.json();
    if (!currentPassword || !newPassword) {
      return NextResponse.json({ error: 'Current password and new password are required' }, { status: 400 });
    }

    if (newPassword.length < 6) {
      return NextResponse.json({ error: 'New password must be at least 6 characters' }, { status: 400 });
    }

    const { connectToDatabase } = await import('@/lib/mongodb');
    const User = (await import('@/models/User')).default;
    await connectToDatabase();

    const hashedCurrent = createHash('sha256').update(currentPassword).digest('hex');
    const user = await User.findOne({ email: tokenUser.email.toLowerCase(), password: hashedCurrent });
    if (!user) {
      return NextResponse.json({ error: 'Current password is incorrect' }, { status: 403 });
    }

    const hashedNew = createHash('sha256').update(newPassword).digest('hex');
    await User.findByIdAndUpdate(user._id, { password: hashedNew });

    return NextResponse.json({ success: true, message: 'Password changed successfully' });
  } catch {
    return NextResponse.json({ error: 'Failed to change password' }, { status: 500 });
  }
}
