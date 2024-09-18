import { PATH } from '@/constant/path';
import { authService } from '@/services/authService';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: loginUser, isPending } = useMutation({
    mutationFn: (payload) => authService.login(payload),
    onSuccess: (response) => {
      // Assuming the response contains user data
      const userData = response;
      queryClient.setQueryData(['user'], userData);
      navigate(PATH.HOME, { replace: true });
    },
    onError: (err) => {
      console.error('Login Error:', err);
      alert('Login failed');
    },
  });

  return { loginUser, isPending };
};
