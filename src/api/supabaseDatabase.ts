import { Tables } from '../types/supabase';
import { supabase } from './supabaseClient';
import { uuid } from '@supabase/gotrue-js/dist/module/lib/helpers';

export const getExistUser = async (email?: string) => {
  const { data, error } = await supabase.from('users').select('*').eq('email', email);
  if (error) throw new Error(`error: ${error.message}`);
  return data[0];
};

export const addNewUser = async (email: string) => {
  const data = await getExistUser(email);
  if (!data) {
    await supabase.from('users').insert({ id: uuid(), email: email });
  }
};

export const addPost = async (newPost: Tables<'posts'>) => {
  await supabase.from('posts').insert(newPost);
};
