import { PATH } from "@/constant/path";
import { registerUser } from "@/services/authService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useRegister = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);

  const { mutate: doRegisterUser, isPending: registerLoading } = useMutation({
    mutationKey: ["register"],
    mutationFn: ({ email, name, password }) =>
      registerUser({ email, name, password }),
    onSuccess: (response) => {
      toast.dismiss();
      const userData = response;
      queryClient.setQueryData(["user"], userData);
      toast.success("Register successfully!!");

      // Open the confirmation modal
      setModalOpen(true);
    },
    onError: (err) => {
      toast.dismiss();
      console.error("Register Error:", err);
      toast.error("Register failed");
    },
  });

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleConfirmNavigate = () => {
    console.log("Navigate to login");
    navigate(PATH.LOGIN);
    setModalOpen(false);
  };

  return {
    doRegisterUser,
    registerLoading,
    isModalOpen,
    handleCloseModal,
    handleConfirmNavigate,
  };
};
