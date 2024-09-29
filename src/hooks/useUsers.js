import { API } from "@/api/apiUrl";
import axiosInstance from "@/utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";

export const useUsers = () => {
  const getUsers = async () => {
    const dataUsers = await axiosInstance.get(API.USERS);
    return dataUsers;
  };

  const { data: dataUsers } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
    onError: (error) => {
      console.log("error", error);
    },
  });
  return {
    dataUsers,
    getUsers,
  };
};
