import { API } from "@/api/apiUrl";
import axiosInstance from "@/utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";

// Hook để lấy danh sách project (GET)
export const useProject = () => {
  const getProject = async () => {
    const dataProject = await axiosInstance.get(API.PROJECTS);
    return dataProject;
  };

  const { data: dataProject } = useQuery({
    queryKey: ["project"],
    queryFn: getProject,
    onError: (error) => {
      console.log("Error fetching projects:", error);
    },
  });

  return {
    dataProject,
    getProject,
  };
};
