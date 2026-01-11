'use server'

import { login as authLogin } from '@/src/api/services/auth/AuthService';
import { cookies } from 'next/headers'

export async function loginAction(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  try {
    const { response } = await authLogin(email, password);
    const cookieStore = await cookies();
    cookieStore.set('access_token', response?.access_token || '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });

    return { success: true };
  } catch (error) {
    return { success: false, error: 'Invalid email or password' };
  }
}

export async function createSession(token: string) {
  const cookieStore = await cookies()
  const seven_days_in_seconds = 60 * 60 * 24 * 7

  cookieStore.set('access_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: seven_days_in_seconds
  })
}

export async function deleteSession() {
  const cookieStore = await cookies()
  cookieStore.delete('access_token')
}

export async function checkSession(): Promise<boolean> {
  const cookieStore = await cookies()
  return cookieStore.has('access_token')
}