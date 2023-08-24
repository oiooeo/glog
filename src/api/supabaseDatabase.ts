import { Tables } from '../types/supabase';
import { supabase } from './supabaseClient';

export const getUser = async (email?: string) => {
  const { data, error } = await supabase.from('users').select('*').eq('email', email);
  if (error) throw new Error(`error: ${error.message}`);
  return data[0];
};

export const addNewUser = async (id: string, email: string, name: string, profileImg: string) => {
  const data = await getUser(email);
  if (!data) {
    await supabase.from('users').insert({ id: id, email: email, name: name, profileImg: profileImg });
  } else {
    await supabase.from('users').update({ name: name, profileImg: profileImg }).eq('id', id);
  }
};

export const addPost = async (newPost: Tables<'posts'>) => {
  await supabase.from('posts').insert(newPost);
};

export const getPosts = async () => {
  const { data, error } = await supabase.from('posts').select('*, user:userId(name)');
  console.log(data);
  if (error) throw new Error(`에러!! ${error.message}`);
  return data;
};

export const getLikes = async (postId: string) => {
  const { data, error } = await supabase.from('likes').select('*').eq('postId', postId);
  if (error) throw new Error(`에러!! ${error.message}`);
  return data;
};
