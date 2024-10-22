export const calculateProjectStats = (projects, currentDate) => {
  let runningProjects = 0;
  let projectsReleasingSoon = 0;
  let prioritizedProjects = 0;

  projects.forEach((project) => {
    const timeStart = new Date(project.time_start);
    const timeEnd = new Date(project.time_end);
    const timeDifference = (timeEnd - currentDate) / (1000 * 60 * 60 * 24); // Tính khoảng cách ngày

    // Project đang chạy
    if (timeStart <= currentDate && timeEnd > currentDate) {
      runningProjects++;
    }

    // Project sẽ release trong 7 ngày tới
    if (timeDifference <= 7 && timeDifference >= 0) {
      projectsReleasingSoon++;
    }

    // Project đang được ưu tiên (priority = 1)
    if (project.priority === 1) {
      prioritizedProjects++;
    }
  });

  console.log("Project Stats:", {
    runningProjects,
    projectsReleasingSoon,
    prioritizedProjects,
  }); // Log kết quả tính toán

  return {
    runningProjects,
    projectsReleasingSoon,
    prioritizedProjects,
  };
};
