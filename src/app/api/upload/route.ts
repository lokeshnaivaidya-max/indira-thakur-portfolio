import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { deleteFile } from '@/lib/supabase-storage';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const maxDuration = 30;

function jsonError(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

export async function POST() {
  return jsonError('Direct uploads are handled client-side via Supabase. Use the browser upload flow.', 400);
}

export async function DELETE(request: Request) {
  try {
    let user;
    try {
      user = requireAuth(request);
    } catch {
      return jsonError('You must be logged in to delete images', 401);
    }
    if (!user) {
      return jsonError('You must be logged in to delete images', 401);
    }

    const { searchParams } = new URL(request.url);
    const publicId = searchParams.get('publicId');

    if (!publicId) {
      return jsonError('No file identifier provided', 400);
    }

    await deleteFile(publicId);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Delete error:', error);
    return jsonError(`Delete failed: ${error.message || 'Unknown error'}`, 500);
  }
}
