import { supabase } from './supabaseClient';

const { auth } = supabase;

export class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthError';
  }
}

export const googleLogin = async () => {
  const { error } = await auth.signInWithOAuth({
    provider: 'google',
    options: { queryParams: { access_type: 'offline', prompt: 'consent' } },
  });
  if (error?.status) throw new AuthError('로그인 정보가 잘못되었습니다.');
};

export const logout = async () => {
  const { error } = await auth.signOut();

  if (error?.status) throw new AuthError('로그아웃에 실패하였습니다.');
};
