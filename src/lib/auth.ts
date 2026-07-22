import jwt from 'jsonwebtoken';

export const JWT_SECRET = process.env.JWT_SECRET as string;

export interface TokenUser {
  email: string;
  role: string;
  name?: string;
  userId?: string;
}

export function getAuthUser(request: Request): TokenUser | null {
  const cookieHeader = request.headers.get('cookie') || '';
  const match = cookieHeader.match(/auth_token=([^;]+)/);
  if (!match) return null;
  try {
    return jwt.verify(decodeURIComponent(match[1]), JWT_SECRET) as unknown as TokenUser;
  } catch {
    return null;
  }
}

export function requireAuth(request: Request): TokenUser | null {
  const user = getAuthUser(request);
  if (!user) return null;
  return user;
}
