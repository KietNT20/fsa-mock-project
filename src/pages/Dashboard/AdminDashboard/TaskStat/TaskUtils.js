export const calculateTaskStats = (tasks, currentDate) => {
  let lateTasks = [];
  let waitingTasks = [];
  let inProgressTasks = [];
  let tasksDueInThreeDays = [];
  let totalTasks = tasks.length; // Tổng số nhiệm vụ

  tasks.forEach((task) => {
    const timeStart = new Date(task.time_start);
    const timeEnd = new Date(task.time_end);
    const timeDifference = (timeEnd - currentDate) / (1000 * 60 * 60 * 24);

    // Task trễ hạn (task đã quá hạn và chưa hoàn thành)
    if (timeEnd < currentDate && task.status !== 3) {
      lateTasks.push({ name: task.task_name });
    }

    // Task đang chờ nhận việc (chưa bắt đầu và đang ở trạng thái 1 - chờ)
    if (timeStart > currentDate && task.status === 1) {
      waitingTasks.push({ name: task.task_name });
    }

    // Task đang thực hiện (status == 2)
    if (task.status === 2) {
      inProgressTasks.push({ name: task.task_name });
    }

    // Task cần hoàn thành trong 3 ngày tới
    if (timeDifference < 3 && task.status !== 3) {
      tasksDueInThreeDays.push({ name: task.task_name });
    }
  });

  return {
    lateTasks,
    waitingTasks,
    inProgressTasks,
    tasksDueInThreeDays,
    totalTasks, // Trả về tổng số nhiệm vụ
  };
};
