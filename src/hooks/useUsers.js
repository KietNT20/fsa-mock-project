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
    throwOnError: true,
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
      toast.success("Delete User Successfully!!");
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

export const useCreateApiUser = () => {
  const queryClient = useQueryClient();
  const { mutate, ...rest } = useMutation({
    mutationFn: ({ name, email, password, role }) => {
      return axiosInstance.post(API.USERS, {
        name,
        email,
        password,
        role,
      });
    },
    onSuccess: () => {
      toast.dismiss();
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
      toast.success("Create New User Successfully!!");
    },
    onError: (err) => {
      toast.dismiss();
      console.error("Error:", err);
      toast.error("Create New User Failed");
    },
  });
  return { mutate, ...rest };
};

export const useUpdateApiUser = () => {
  const queryClient = useQueryClient();
  const { mutate, ...rest } = useMutation({
    mutationFn: ({ email, name }) => {
      return axiosInstance.put(API.USERS, {
        email,
        name,
      });
    },
    onSuccess: () => {
      toast.dismiss();
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
      toast.success("Update User Successfully!!");
    },
    onError: (err) => {
      toast.dismiss();
      console.error("Error:", err);
      toast.error("Update User Failed");
    },
  });
  return { mutate, ...rest };
};

export const useUpdateRoleUser = () => {
  const queryClient = useQueryClient();
  const { mutate, ...rest } = useMutation({
    mutationFn: ({ email, role }) => {
      return axiosInstance.put(`${API.USERS}${API.CHANGE_ROLE}`, {
        email,
        role,
      });
    },
    onSuccess: () => {
      toast.dismiss();
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
      toast.success("Change Role Successfully!!");
    },
    onError: (err) => {
      toast.dismiss();
      console.error("Error:", err);
      toast.error("Change Role Failed");
    },
  });
  return { mutate, ...rest };
};
