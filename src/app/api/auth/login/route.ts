import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { connectToDatabase } from '@/lib/mongodb';
import User from '@/models/User';
import { createHash } from 'crypto';

const JWT_SECRET = process.env.JWT_SECRET || 'indira-portfolio-secret-key-change-in-production';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    const hashedPassword = createHash('sha256').update(password).digest('hex');

    let user = null;

    // Check database first
    try {
      await connectToDatabase();
      user = await User.findOne({ email: email.toLowerCase(), password: hashedPassword });
    } catch {
      // Database unavailable, fall through to env check
    }

    if (user) {
      const token = jwt.sign(
        { email: user.email, role: user.role, name: user.name },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      const response = NextResponse.json({ success: true, token, user: { name: user.name, email: user.email, role: user.role } });
      response.cookies.set('auth_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60,
        path: '/',
      });
      return response;
    }

    // Fallback to .env credentials
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@indirathakur.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

    if (email === adminEmail && password === adminPassword) {
      const token = jwt.sign(
        { email: adminEmail, role: 'admin', name: 'Admin' },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      const response = NextResponse.json({ success: true, token });
      response.cookies.set('auth_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60,
        path: '/',
      });
      return response;
    }

    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
  }
}
