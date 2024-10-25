export const getStatusColor = (status) => {
  switch (status) {
    case 1:
      return "rgba(255, 223, 0, 0.3)"; // Yellow for Not Started
    case 2:
      return "rgba(54, 162, 235, 0.5)"; // Blue for In Process
    case 3:
      return "rgba(75, 192, 192, 0.5)"; // Green for Done
    default:
      return "rgba(0, 0, 0, 0.1)"; // Default gray
  }
};

export const getStatusText = (status) => {
  switch (status) {
    case 1:
      return "Not Started";
    case 2:
      return "In Process";
    case 3:
      return "Done";
    default:
      return "Unknown";
  }
};
