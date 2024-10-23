export const calculateProjectStats = (projects, currentDate) => {
  let runningProjects = [];
  let projectsReleasingSoon = [];
  let prioritizedProjects = [];
  let totalProjects = projects.length;

  projects.forEach((project) => {
    const timeStart = new Date(project.time_start);
    const timeEnd = new Date(project.time_end);
    const timeDifference = (timeEnd - currentDate) / (1000 * 60 * 60 * 24);

    // Project đang chạy
    if (timeStart <= currentDate && timeEnd >= currentDate) {
      runningProjects.push({ name: project.name });
    }

    // Project sẽ release trong 7 ngày tới
    if (timeDifference <= 7 && timeDifference >= 0) {
      projectsReleasingSoon.push({ name: project.name });
    }

    // Project đang được ưu tiên (priority = 1)
    if (project.priority === 1) {
      prioritizedProjects.push({ name: project.name });
    }
  });

  return {
    runningProjects,
    projectsReleasingSoon,
    prioritizedProjects,
    totalProjects,
  };
};
