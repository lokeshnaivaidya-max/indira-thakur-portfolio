import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import User from '@/models/User';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'indira-portfolio-secret-key-change-in-production';

function getTokenUser(request: Request) {
  const cookie = request.headers.get('cookie') || '';
  const match = cookie.match(/auth_token=([^;]+)/);
  if (!match) return null;
  try {
    return jwt.verify(match[1], JWT_SECRET) as { email: string; role: string };
  } catch {
    return null;
  }
}

export async function GET(request: Request) {
  const tokenUser = getTokenUser(request);
  if (!tokenUser || tokenUser.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await connectToDatabase();
  const users = await User.find({}).select('-password').sort({ createdAt: -1 });
  return NextResponse.json({ users });
}

export async function POST(request: Request) {
  const tokenUser = getTokenUser(request);
  if (!tokenUser || tokenUser.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { name, email, password, role } = await request.json();
    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Name, email, and password are required' }, { status: 400 });
    }

    await connectToDatabase();

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return NextResponse.json({ error: 'A user with this email already exists' }, { status: 409 });
    }

    const { createHash } = await import('crypto');
    const hashedPassword = createHash('sha256').update(password).digest('hex');

    const user = await User.create({ name, email: email.toLowerCase(), password: hashedPassword, role: role || 'editor' });

    return NextResponse.json({ user: { id: user._id, name: user.name, email: user.email, role: user.role } }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const tokenUser = getTokenUser(request);
  if (!tokenUser || tokenUser.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id, name, email, password, role } = await request.json();
    if (!id) return NextResponse.json({ error: 'User ID is required' }, { status: 400 });

    await connectToDatabase();

    const updateData: Record<string, string> = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email.toLowerCase();
    if (role) updateData.role = role;
    if (password) {
      const { createHash } = await import('crypto');
      updateData.password = createHash('sha256').update(password).digest('hex');
    }

    const user = await User.findByIdAndUpdate(id, updateData, { new: true }).select('-password');
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

    return NextResponse.json({ user });
  } catch {
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const tokenUser = getTokenUser(request);
  if (!tokenUser || tokenUser.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await request.json();
    if (!id) return NextResponse.json({ error: 'User ID is required' }, { status: 400 });

    await connectToDatabase();
    await User.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
  }
}
