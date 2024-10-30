export const calculateTaskByUsersStats = (
  users,
  tasks,
  userProfile,
  currentDate,
) => {
  let usersWithTasksDueIn7Days = [];
  let totalTasks = tasks.length;

  const userTasks = tasks.filter(
    (task) => task.user_mail === userProfile.email,
  );

  let taskCountForUser = 0;
  let tasksDueIn7Days = [];
  let notStartedCount = 0;
  let inProgressCount = 0;
  let bugFixingCount = 0;
  let completedCount = 0;
  let totalUserTasks = userTasks.length;

  // Mảng lưu tên các task cho từng trạng thái
  let notStartedTasks = [];
  let inProgressTasks = [];
  let bugFixingTasks = [];
  let completedTasks = [];

  userTasks.forEach((task) => {
    const taskEndDate = new Date(task.time_end);
    const timeDifference = (taskEndDate - currentDate) / (1000 * 60 * 60 * 24);

    // Task chưa bắt đầu
    if (task.status === 1) {
      notStartedCount += 1;
      notStartedTasks.push(task.task_name); // Lưu tên của task
    }

    // Task đang thực hiện
    if (task.status === 2) {
      inProgressCount += 1;
      inProgressTasks.push(task.task_name); // Lưu tên của task
    }

    // Task đang fix bug
    if (task.status === 3) {
      bugFixingCount += 1;
      bugFixingTasks.push(task.task_name); // Lưu tên của task
    }

    // Task đã hoàn thành
    if (task.status === 4) {
      completedCount += 1;
      completedTasks.push(task.task_name); // Lưu tên của task
    }

    // Task sẽ hết hạn trong 7 ngày tới và không ở trạng thái done
    if (task.status !== 4 && timeDifference >= 0 && timeDifference <= 7) {
      taskCountForUser += 1;
      tasksDueIn7Days.push(task.task_name); // Lưu tên của task
    }
  });

  // Nếu người dùng có task hết hạn trong 7 ngày tới, thêm vào danh sách
  if (taskCountForUser > 0) {
    usersWithTasksDueIn7Days.push({
      email: userProfile.email,
      taskCount: taskCountForUser,
      tasks: tasksDueIn7Days,
    });
  }

  return {
    usersWithTasksDueIn7Days,
    totalTasks,
    totalUserTasks,
    notStartedCount,
    inProgressCount,
    bugFixingCount,
    completedCount,
    notStartedTasks, // Thêm tên task chưa bắt đầu
    inProgressTasks, // Thêm tên task đang thực hiện
    bugFixingTasks, // Thêm tên task đang fix bug
    completedTasks, // Thêm tên task đã hoàn thành
    tasksDueIn7Days, // Thêm tên task sẽ hết hạn trong 7 ngày
  };
};
