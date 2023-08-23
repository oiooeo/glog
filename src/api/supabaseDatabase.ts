import { Tables } from '../types/supabase';
import { supabase } from './supabaseClient';

export const addPost = async (newPost: Tables<'posts'>) => {
  console.log(newPost);
  await supabase.from('posts').insert(newPost);
};
