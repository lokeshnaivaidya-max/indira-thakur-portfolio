import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { createHash } from 'crypto';

export const dynamic = 'force-dynamic';

const JWT_SECRET = process.env.JWT_SECRET as string;

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    if (process.env.MONGODB_URI) {
      try {
        const { connectToDatabase } = await import('@/lib/mongodb');
        const User = (await import('@/models/User')).default;
        await connectToDatabase();
        const hashedPassword = createHash('sha256').update(password).digest('hex');
        const user = await User.findOne({ email: email.toLowerCase(), password: hashedPassword });
        if (user) {
          const token = jwt.sign(
            { email: user.email, role: user.role, name: user.name, userId: user._id.toString() },
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
      } catch {
        // DB auth failed, fall through to env check
      }
    }

    const adminEmail = process.env.ADMIN_EMAIL || 'admin@indirathakur.com';
    const adminPassword = process.env.ADMIN_PASSWORD;
    if (!adminPassword) {
      return NextResponse.json(
        { error: 'Admin login not configured. Please set ADMIN_PASSWORD environment variable.' },
        { status: 503 }
      );
    }

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
