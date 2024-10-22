export const calculateTaskStats = (tasks, currentDate) => {
  let lateTasks = 0;
  let waitingTasks = 0;
  let inProgressTasks = 0;
  let tasksDueInThreeDays = 0;

  tasks.forEach((task) => {
    const timeStart = new Date(task.time_start);
    const timeEnd = new Date(task.time_end);
    const timeDifference = (timeEnd - currentDate) / (1000 * 60 * 60 * 24);

    // Task trễ hạn (task đã quá hạn và chưa hoàn thành)
    if (timeEnd < currentDate && task.status !== 3) {
      lateTasks++;
    }

    // Task đang chờ nhận việc (chưa bắt đầu và đang ở trạng thái 1 - chờ)
    if (timeStart > currentDate && task.status === 1) {
      waitingTasks++;
    }

    // Task đang thực hiện (status == 2)
    if (task.status === 2) {
      inProgressTasks++;
    }

    // Task cần hoàn thành trong 3 ngày tới
    if (timeDifference < 3 && task.status !== 3) {
      tasksDueInThreeDays++;
    }
  });

  return {
    lateTasks,
    waitingTasks,
    inProgressTasks,
    tasksDueInThreeDays,
  };
};
