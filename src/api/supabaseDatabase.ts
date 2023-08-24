import { Tables } from '../types/supabase';
import { supabase } from './supabaseClient';

export const getUser = async (email?: string) => {
  const { data, error } = await supabase.from('users').select('*').eq('email', email);
  if (error) throw new Error(`error: ${error.message}`);
  return data[0];
};

export const addNewUser = async (id: string, email: string) => {
  const data = await getUser(email);
  if (!data) {
    await supabase.from('users').insert({ id: id, email: email });
  }
};

export const addPost = async (newPost: Tables<'posts'>) => {
  await supabase.from('posts').insert(newPost);
};

export const getPosts = async () => {
  const { data, error } = await supabase.from('posts').select('*');
  if (error) throw new Error(`에러!! ${error.message}`);
  console.log(data);
  return data;
};
