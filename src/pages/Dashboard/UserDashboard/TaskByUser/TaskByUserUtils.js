export const calculateTaskByUsersStats = (
  users,
  tasks,
  userProfile,
  currentDate,
) => {
  // Initialize an array to store users with tasks due in 7 days
  let usersWithTasksDueIn7Days = [];
  let totalTasks = tasks.length;

  // Check if userProfile exists
  if (!userProfile || !userProfile.email) {
    console.log("No userProfile found.");
    return { usersWithTasksDueIn7Days };
  }

  // Filter tasks for the logged-in user
  const userTasks = tasks.filter(
    (task) => task.user_mail === userProfile.email,
  );

  let taskCountForUser = 0;
  let tasksDueIn7Days = [];

  // Iterate over user's tasks to count how many tasks are due in the next 7 days
  userTasks.forEach((task) => {
    const taskEndDate = new Date(task.time_end);
    const timeDifference = (taskEndDate - currentDate) / (1000 * 60 * 60 * 24);

    // Only include tasks where status is not 3 and time_end is within 7 days
    if (task.status !== 3 && timeDifference >= 0 && timeDifference <= 7) {
      taskCountForUser += 1;
      tasksDueIn7Days.push(task);
    }
  });

  console.log("Task count for logged-in user:", taskCountForUser);

  // If the user has tasks due in the next 7 days, push them into the result
  if (taskCountForUser > 0) {
    usersWithTasksDueIn7Days.push({
      email: userProfile.email,
      taskCount: taskCountForUser,
      tasks: tasksDueIn7Days, // Include the list of tasks
    });
  }

  return { usersWithTasksDueIn7Days, totalTasks };
};
