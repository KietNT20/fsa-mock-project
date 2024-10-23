export const calculateUsersTaskStats = (tasks, users, currentDate) => {
  let usersWithoutTasks = [];
  let usersWithTasksDueIn7Days = [];
  let totalUser = users.length;

  const userTasksMap = new Map(); // Map to track if users have tasks and if tasks are due in 7 days

  // Iterate over tasks to collect user emails who have tasks and check if they have tasks due in the next 7 days
  tasks.forEach((task) => {
    const taskEndDate = new Date(task.time_end);
    const timeDifference = (taskEndDate - currentDate) / (1000 * 60 * 60 * 24); // Time difference in days

    if (task.user_mail) {
      // Check if the user already has tasks in the map
      if (!userTasksMap.has(task.user_mail)) {
        userTasksMap.set(task.user_mail, { hasTask: true, dueIn7Days: false });
      }

      // If task is due in the next 7 days, update the map
      if (timeDifference <= 7 && timeDifference >= 0) {
        userTasksMap.set(task.user_mail, { hasTask: true, dueIn7Days: true });
      }
    }
  });

  // Determine users without tasks and users with tasks due in the next 7 days
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
