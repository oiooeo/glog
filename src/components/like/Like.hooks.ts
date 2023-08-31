import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addLike, deleteLike, updatePostLike } from '../../api/supabaseDatabase';

export function useLikeMutation() {
  const queryClient = useQueryClient();

  const deleteLikeMutation = useMutation(deleteLike, {
    onSuccess: async () => {
      queryClient.invalidateQueries(['getIsLike']);
    },
  });

  const addLikeMutation = useMutation(addLike, {
    onSuccess: async () => {
      queryClient.invalidateQueries(['getIsLike']);
    },
  });

  const updatePostLikeMutation = useMutation(updatePostLike, {
    onSuccess: async () => {
      queryClient.invalidateQueries(['getPosts']);
      queryClient.invalidateQueries(['getPostByPostId']);
    },
  });

  return { deleteLikeMutation, addLikeMutation, updatePostLikeMutation };
}
