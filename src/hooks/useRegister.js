import { API } from "@/api/apiUrl";
import axiosInstance from "@/utils/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";

export const useRegister = () => {
  const queryClient = useQueryClient();
  const [isModalOpen, setModalOpen] = useState(false);

  const { mutate: doRegisterUser, isPending: registerLoading } = useMutation({
    mutationKey: ["register"],
    mutationFn: ({ name, email, password }) => {
      return axiosInstance.post(API.REGISTER, { name, email, password });
    },
    onSuccess: (response) => {
      toast.dismiss();
      if (response) {
        queryClient.setQueryData(["user"], response);
        toast.success("Register successfully!!");
        setModalOpen(true);
      }
    },
    onError: (err) => {
      toast.dismiss();
      console.error("Full Error Object:", err);
      const errorMessage = err.response?.data?.message || "Register failed";
      console.error("Register Error:", err);
      toast.error(errorMessage);
    },
  });

  return {
    doRegisterUser,
    registerLoading,
    isModalOpen,
    handleCloseModal: () => setModalOpen(false),
    handleConfirmNavigate: () => {
      const signInButton = document.querySelector("#sign-in-btn");
      if (signInButton) signInButton.click();
      else console.error("Sign-in button not found.");
      setModalOpen(false);
    },
  };
};
