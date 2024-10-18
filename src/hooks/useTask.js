import { API } from "@/api/apiUrl";
import axiosInstance from "@/utils/axiosInstance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useGetApiTask = () => {
  const { data, ...rest } = useQuery({
    queryKey: ["tasks"],
    queryFn: () => {
      return axiosInstance.get(API.TASK);
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
export const useCreateTask = () => {
  const queryClient = useQueryClient();
  const { mutate, ...rest } = useMutation({
    mutationFn: ({
      task_name,
      user_mail,
      project_id,
      time_start,
      time_end,
      status,
      note,
    }) => {
      return axiosInstance.post(API.TASK, {
        task_name,
        user_mail,
        project_id,
        time_start,
        time_end,
        status,
        note,
      });
    },
    onSuccess: () => {
      toast.dismiss();
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
      toast.success("Create successfully!!");
    },
    onError: (err) => {
      toast.dismiss();
      console.error("Error:", err);
      toast.error("Create failed");
    },
  });
  return { mutate, ...rest };
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();
  const { mutate, ...rest } = useMutation({
    mutationFn: ({
      id,
      task_name,
      user_mail,
      project_id,
      time_start,
      time_end,
      status,
      note,
    }) => {
      return axiosInstance.put(API.TASK, {
        id,
        task_name,
        user_mail,
        project_id,
        time_start,
        time_end,
        status,
        note,
      });
    },
    onSuccess: () => {
      toast.dismiss();
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
      toast.success("Update successfully!!");
    },
    onError: (err) => {
      toast.dismiss();
      console.error("Error:", err);
      toast.error("Update failed");
    },
  });
  return { mutate, ...rest };
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  const { mutate, ...rest } = useMutation({
    mutationFn: ({ id }) => {
      return axiosInstance.delete(API.TASK, { data: { id } });
    },
    onSuccess: () => {
      toast.dismiss();
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
      toast.success("Delete successfully!!");
    },
    onError: (err) => {
      toast.dismiss();
      console.error("Error:", err);
      toast.error("Delete failed");
    },
  });
  return { mutate, ...rest };
};
