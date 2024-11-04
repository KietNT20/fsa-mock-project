import { useGetProject } from "@/hooks/useProject";
import { useGetApiTask } from "@/hooks/useTask";
import { useGetApiUsers } from "@/hooks/useUsers";
import { useEffect, useState } from "react";
import { calculateProjectStats } from "./ProjectStat/ProjectUtils";
import { calculateTaskStats } from "./TaskStat/TaskUtils";
import { calculateUsersTaskStats } from "./UserStat/UserUtils";

export const useDashboardData = () => {
  const {
    data: taskData,
    isLoading: taskLoading,
    isError: taskError,
  } = useGetApiTask();

  const {
    data: projectData,
    isLoading: projectLoading,
    isError: projectError,
  } = useGetProject();

  const {
    data: userData,
    isLoading: userLoading,
    isError: userError,
  } = useGetApiUsers();

  const [taskStats, setTaskStats] = useState(null);
  const [projectStats, setProjectStats] = useState(null);
  const [userTaskStats, setUserTaskStats] = useState(null);

  useEffect(() => {
    const currentDate = new Date();

    if (!taskLoading && !taskError && taskData) {
      const stats = calculateTaskStats(taskData, currentDate);
      setTaskStats((prevStats) =>
        JSON.stringify(prevStats) !== JSON.stringify(stats) ? stats : prevStats,
      );
    }

    if (!projectLoading && !projectError && projectData) {
      const stats = calculateProjectStats(projectData, currentDate);
      setProjectStats((prevStats) =>
        JSON.stringify(prevStats) !== JSON.stringify(stats) ? stats : prevStats,
      );
    }

    if (!userLoading && !userError && userData && taskData) {
      const stats = calculateUsersTaskStats(taskData, userData, currentDate);
      setUserTaskStats(stats);
    }
  }, [
    taskData,
    taskLoading,
    taskError,
    projectData,
    projectLoading,
    projectError,
    userLoading,
    userError,
    userData,
  ]);

  const isLoading = taskLoading || projectLoading || userLoading;
  const isError = taskError || projectError || userError;

  return {
    taskStats,
    projectStats,
    userTaskStats,
    isLoading,
    isError,
  };
};
