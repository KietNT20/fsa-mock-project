export const calculateTaskByUsersStats = (users, tasks, userProfile, currentDate) => {
  // Khởi tạo mảng lưu trữ người dùng với task sẽ hết hạn trong 7 ngày
  let usersWithTasksDueIn7Days = [];
  let totalTasks = tasks.length;

  // Kiểm tra nếu userProfile tồn tại
  if (!userProfile || !userProfile.email) {
    console.log("No userProfile found.");
    return {
      usersWithTasksDueIn7Days,
      totalTasks,
      totalUserTasks: 0,
      notStartedCount: 0,
      inProgressCount: 0,
      bugFixingCount: 0,
      completedCount: 0,
    };
  }

  // Lọc task của người dùng đã đăng nhập
  const userTasks = tasks.filter((task) => task.user_mail === userProfile.email);
  let taskCountForUser = 0;
  let tasksDueIn7Days = [];

  // Khởi tạo biến đếm cho trạng thái task
  let notStartedCount = 0;
  let inProgressCount = 0;
  let bugFixingCount = 0;
  let completedCount = 0;
  let totalUserTasks = userTasks.length;

  // Duyệt qua các task của người dùng
  userTasks.forEach((task) => {
    const taskEndDate = new Date(task.time_end);
    const timeDifference = (taskEndDate - currentDate) / (1000 * 60 * 60 * 24);

    // Task chưa bắt đầu
    if (task.status === 1) {
      notStartedCount += 1;
    }

    // Task đang thực hiện
    if (task.status === 2) {
      inProgressCount += 1;
    }

    // Task đang fix bug
    if (task.status === 3) {
      bugFixingCount += 1;
    }

    // Task đã hoàn thành
    if (task.status === 4) {
      completedCount += 1;
    }

    // Task sẽ hết hạn trong 7 ngày tới và không ở trạng thái fix bug
    if (task.status !== 3 && timeDifference >= 0 && timeDifference <= 7) {
      taskCountForUser += 1;
      tasksDueIn7Days.push(task);
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
  };
};
