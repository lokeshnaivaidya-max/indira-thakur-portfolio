import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    if (!process.env.MONGODB_URI) {
      console.error('[Auth] MONGODB_URI is not set');
      return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
    }

    if (!JWT_SECRET) {
      console.error('[Auth] JWT_SECRET is not set in environment');
      return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
    }

    let User;
    try {
      User = (await import('@/models/User')).default;
    } catch (importErr) {
      console.error('[Auth] Failed to import User model:', importErr);
      return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
    }

    let connectToDatabase;
    try {
      ({ connectToDatabase } = await import('@/lib/mongodb'));
    } catch (importErr) {
      console.error('[Auth] Failed to import mongodb:', importErr);
      return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
    }

    try {
      await connectToDatabase();
    } catch (dbErr: any) {
      console.error('[Auth] Database connection failed:', dbErr?.message || dbErr);
      return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
    }

    let user;
    try {
      user = await User.findOne({ email: email.toLowerCase() });
    } catch (queryErr: any) {
      console.error('[Auth] User query failed:', queryErr?.message || queryErr);
      return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
    }

    if (!user) {
      console.error(`[Auth] User not found: ${email.toLowerCase()}`);
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    let isMatch: boolean;
    try {
      isMatch = await user.comparePassword(password);
    } catch (cmpErr: any) {
      console.error('[Auth] Password comparison threw:', cmpErr?.message || cmpErr);
      return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
    }

    if (!isMatch) {
      console.error(`[Auth] Password mismatch for: ${email.toLowerCase()}`);
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    let token: string;
    try {
      token = jwt.sign(
        { email: user.email, role: user.role, name: user.name, userId: user._id.toString() },
        JWT_SECRET,
        { expiresIn: '7d' }
      );
    } catch (jwtErr: any) {
      console.error('[Auth] JWT signing failed:', jwtErr?.message || jwtErr);
      return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
    }

    const response = NextResponse.json({ success: true, token });
    response.cookies.set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60,
      path: '/',
    });
    return response;
  } catch (error: any) {
    console.error('[Auth] Unexpected login error:', error?.message || error);
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
  }
}
