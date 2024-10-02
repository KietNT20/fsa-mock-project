import { API } from "@/api/apiUrl";
import axiosInstance from "@/utils/axiosInstance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

export const useGetApiUsers = () => {
  const { data, ...rest } = useQuery({
    queryKey: ["users"],
    queryFn: () => {
      return axiosInstance.get(API.USERS);
    },
    onError: (error) => {
      console.log("error", error);
    },
  });

  return {
    data,
    ...rest,
  };
};

export const useDeleteApiUser = () => {
  const queryClient = useQueryClient();
  const { profile } = useSelector((state) => state.profile);

  const { mutate, ...rest } = useMutation({
    mutationFn: ({ id }) => {
      // console.log("id", id);
      return axiosInstance.delete(API.USERS, { data: { id } });
    },

    onSuccess: () => {
      toast.dismiss();
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
      toast.success("Delete successfully!!");
    },
    onError: (err) => {
      toast.dismiss();
      console.error("Error:", err);
      if (profile?.role === 1) {
        toast.error("You can not delete this user has role admin");
      } else {
        toast.error("Delete failed");
      }
    },
  });

  return { mutate, ...rest };
};
