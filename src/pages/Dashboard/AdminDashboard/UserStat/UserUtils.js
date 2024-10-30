export const calculateUsersTaskStats = (tasks, users, currentDate) => {
  let usersWithoutTasks = [];
  let usersWithTasksDueIn7Days = [];
  let totalUser = users.length;

  const userTasksMap = new Map();

  tasks.forEach((task) => {
    const taskEndDate = new Date(task.time_end);
    const timeDifference = (taskEndDate - currentDate) / (1000 * 60 * 60 * 24);

    if (task.user_mail) {
      if (!userTasksMap.has(task.user_mail)) {
        userTasksMap.set(task.user_mail, { hasTask: true, dueIn7Days: false });
      }

      if (timeDifference <= 7 && timeDifference >= 0) {
        userTasksMap.set(task.user_mail, { hasTask: true, dueIn7Days: true });
      }
    }
  });

  users.forEach((user) => {
    const userTaskInfo = userTasksMap.get(user.email);

    if (!userTaskInfo) {
      usersWithoutTasks.push({ name: user.name });
    } else if (userTaskInfo.dueIn7Days) {
      usersWithTasksDueIn7Days.push({ name: user.name, email: user.email });
    }
  });

  return {
    usersWithoutTasks,
    usersWithTasksDueIn7Days,
    totalUser,
  };
};
