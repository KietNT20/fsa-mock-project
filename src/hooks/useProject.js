import { API } from "@/api/apiUrl";
import axiosInstance from "@/utils/axiosInstance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useGetProject = () => {
  const getProject = async () => {
    const dataProject = await axiosInstance.get(API.PROJECTS);
    return dataProject;
  };

  const { data: dataProject, ...rest } = useQuery({
    queryKey: ["projects"],
    queryFn: getProject,
    throwOnError: true,
  });

  return {
    dataProject,
    ...rest,
  };
};

export const useGetProjectDetail = (id) => {
  const { data: projectDetail, ...rest } = useQuery({
    queryKey: ["projects", id],
    queryFn: () => axiosInstance.get(`${API.PROJECTS}/${id}`),
    enabled: !!id,
    select: (response) => {
      if (response && response.length > 0) {
        return response[0];
      }
      return null;
    },
    onError: (error) => {
      console.log("Error fetching project detail:", error);
    },
  });

  return {
    projectDetail,
    ...rest,
  };
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();

  const { mutate, ...rest } = useMutation({
    mutationFn: ({ id }) => {
      return axiosInstance.delete(API.PROJECTS, { data: { id } });
    },

    onSuccess: () => {
      toast.dismiss();
      queryClient.invalidateQueries({
        queryKey: ["projects"],
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

export const useUpdateProject = () => {
  const queryClient = useQueryClient();
  const { mutate, ...rest } = useMutation({
    mutationFn: ({
      id,
      name,
      payment,
      time_start,
      time_end,
      note,
      priority,
    }) => {
      return axiosInstance.put(API.PROJECTS, {
        id,
        name,
        payment,
        time_start,
        time_end,
        note,
        priority,
      });
    },
    onSuccess: () => {
      toast.dismiss();
      queryClient.invalidateQueries({
        queryKey: ["projects"],
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

export const useCreateProject = () => {
  const queryClient = useQueryClient();
  const { mutate, ...rest } = useMutation({
    mutationFn: ({ name, payment, time_start, time_end, note, priority }) => {
      return axiosInstance.post(API.PROJECTS, {
        name,
        payment,
        time_start,
        time_end,
        note,
        priority,
      });
    },
    onSuccess: () => {
      toast.dismiss();
      queryClient.invalidateQueries({
        queryKey: ["projects"],
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
