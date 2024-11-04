import { useGetApiTask, useUpdateTask } from "@/hooks/useTask";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import {
  DateRange as DateRangeIcon,
  Folder as FolderIcon,
  PriorityHigh as PriorityHighIcon,
} from "@mui/icons-material";
import FolderOffIcon from "@mui/icons-material/FolderOff";
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  Grid2,
  Paper,
  Typography,
} from "@mui/material";
import { format, parseISO } from "date-fns";
import { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

// Format date utility
const formatDate = (dateString) => {
  try {
    return format(parseISO(dateString), "dd/MM/yyyy HH:mm:ss");
  } catch (error) {
    console.error("Error parsing date:", error);
    return dateString;
  }
};

// Status columns
const columns = {
  pending: { id: "pending", title: "Pending", status: 1 },
  inProgress: { id: "inProgress", title: "In Progress", status: 2 },
  qaTesting: { id: "qaTesting", title: "QA Testing", status: 3 },
  done: { id: "done", title: "Done", status: 4 },
};

const getStatusColor = (status) => {
  switch (status) {
    case 1:
      return "rgba(255, 223, 0, 0.3)";
    case 2:
      return "rgba(54, 162, 235, 0.5)";
    case 3:
      return "rgba(255, 99, 132, 0.3)";
    case 4:
      return "rgba(75, 192, 192, 0.5)";
    default:
      return "rgba(0, 0, 0, 0.1)";
  }
};

const TasksPage = () => {
  const { data: taskData, isLoading, error } = useGetApiTask();
  const { userProfile } = useSelector((state) => state.userProfile);
  const [columnsData, setColumnsData] = useState(columns);
  const { mutate: updateTask } = useUpdateTask();

  if (isLoading) return <CircularProgress />;
  if (error) return <Typography>Error loading tasks</Typography>;

  // Filter tasks by user and organize into columns by status
  const filteredTasks = taskData
    .filter((task) => task.user_mail === userProfile.email)
    .reduce(
      (acc, task) => {
        const columnId = Object.keys(columns).find(
          (key) => columns[key].status === task.status,
        );
        if (columnId) acc[columnId].push(task);
        return acc;
      },
      { pending: [], inProgress: [], qaTesting: [], done: [] },
    );

  const onDragEnd = (result) => {
    toast.dismiss();
    const { destination, source, draggableId } = result;

    // Nếu không có điểm đến hoặc điểm đến giống với điểm bắt đầu, không làm gì cả
    if (!destination || destination.droppableId === source.droppableId) return;

    const sourceColumn = columnsData[source.droppableId];
    const destColumn = columnsData[destination.droppableId];

    // Nếu kéo từ status 4 về bất cứ đâu, báo lỗi và ngăn hành động
    if (sourceColumn.status === 4 && destColumn.status !== 4) {
      toast.error("Cannot move the completed task");
      return;
    }

    // Nếu kéo từ status 1 lên 3 hoặc từ status 2 lên 4, báo lỗi và ngăn hành động
    if (
      (sourceColumn.status === 1 && destColumn.status === 3) ||
      (sourceColumn.status === 2 && destColumn.status === 4)
    ) {
      toast.error("Cannot skip status levels");
      return;
    }

    // Chỉ cho phép kéo lên hoặc xuống trạng thái liền kề
    if (Math.abs(destColumn.status - sourceColumn.status) !== 1) return;

    const task = filteredTasks[sourceColumn.id].find(
      (task) => task.id === draggableId,
    );

    updateTask({ ...task, status: destColumn.status }).then(() => {
      const updatedFilteredTasks = {
        ...filteredTasks,
        [sourceColumn.id]: filteredTasks[sourceColumn.id].filter(
          (t) => t.id !== task.id,
        ),
        [destColumn.id]: [
          ...filteredTasks[destColumn.id],
          { ...task, status: destColumn.status },
        ],
      };

      setColumnsData(updatedFilteredTasks);
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Typography
        variant="h3"
        sx={{ textAlign: "center", fontWeight: "bold", marginBottom: 3 }}
      >
        Task Page
      </Typography>
      <Grid2 container spacing={2}>
        {Object.entries(columnsData).map(([columnId, column]) => (
          <Grid2
            size={{ xs: 12, sm: 12, md: 6, lg: 4, xl: 3 }}
            key={columnId}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                textAlign: "center",
                fontWeight: "bold",
                color: "#546e7a",
                fontSize: "1.6rem",
                mb: 1,
              }}
            >
              {column.title}
            </Typography>

            <Paper
              elevation={2}
              sx={{
                width: "100%",
                p: { xs: 1, sm: 1 },
                borderRadius: "12px",
                backgroundColor: "#f9f9f9",
                color: "#424242",
                maxHeight: "500px",
                overflow: "auto",
                mt: 1,
              }}
            >
              <Droppable droppableId={columnId}>
                {(provided) => (
                  <Box
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    sx={{
                      background: "#f9f9f9",
                      borderRadius: 4,
                      minHeight: "484px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent:
                        filteredTasks[columnId].length === 0
                          ? "center"
                          : "flex-start",
                    }}
                  >
                    {filteredTasks[columnId].length === 0 ? (
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          py: 2,
                        }}
                      >
                        <FolderOffIcon
                          sx={{
                            fontSize: { xs: 30, sm: 40 },
                            color: "#ccc",
                            mb: 1,
                          }}
                        />
                        <Typography
                          variant="body2"
                          sx={{
                            color: "#888",
                            textAlign: "center",
                            fontSize: { xs: "1.2rem", sm: "1.6rem" },
                          }}
                        >
                          Không có dữ liệu
                        </Typography>
                      </Box>
                    ) : (
                      filteredTasks[columnId].map((task, index) => (
                        <Draggable
                          key={task.id}
                          draggableId={task.id}
                          index={index}
                        >
                          {(provided) => (
                            <Card
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              sx={{
                                borderRadius: "10px",
                                background: "#ffffff",
                                boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)",
                                mb: 2,
                                width: "100%",
                                p: { xs: 1, sm: 2 },
                              }}
                            >
                              <CardContent>
                                <Typography
                                  variant="h6"
                                  sx={{
                                    textAlign: "center",
                                    fontWeight: "bold",
                                    backgroundColor: getStatusColor(
                                      task.status,
                                    ),
                                    padding: "10px",
                                    borderRadius: "10px",
                                    fontSize: { xs: "1.4rem", sm: "1.6rem" },
                                  }}
                                >
                                  {task.task_name}
                                </Typography>

                                <Divider sx={{ my: 2 }} />

                                {/* Project Name and Status */}
                                <Box
                                  sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    flexDirection: { xs: "column", sm: "row" },
                                  }}
                                >
                                  <Box
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                  >
                                    <FolderIcon
                                      sx={{ color: "#2d2f30", mr: 1 }}
                                    />
                                    <Typography
                                      sx={{
                                        fontSize: {
                                          xs: "1.2rem",
                                          sm: "1.4rem",
                                        },
                                        color: "#2d2f30",
                                      }}
                                    >
                                      <strong>Project Name:</strong>{" "}
                                      {task.project_name}
                                    </Typography>
                                  </Box>

                                  <Box
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      mt: { xs: 1, sm: 0 },
                                    }}
                                  >
                                    <PriorityHighIcon
                                      sx={{ color: "#2d2f30", mr: 1 }}
                                    />
                                    <Typography
                                      sx={{
                                        fontSize: {
                                          xs: "1.2rem",
                                          sm: "1.4rem",
                                        },
                                        color: "#2d2f30",
                                      }}
                                    >
                                      <strong>Status:</strong>{" "}
                                      {task.status === 1
                                        ? "Pending"
                                        : task.status === 2
                                          ? "In Progress"
                                          : task.status === 3
                                            ? "QA Testing"
                                            : "Done"}
                                    </Typography>
                                  </Box>
                                </Box>

                                <Divider sx={{ my: 2 }} />

                                {/* Time Start and End */}
                                <Box
                                  sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    flexDirection: { xs: "column", sm: "row" },
                                  }}
                                >
                                  <Box
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                  >
                                    <DateRangeIcon
                                      sx={{ color: "#2d2f30", mr: 1 }}
                                    />
                                    <Typography
                                      sx={{
                                        fontSize: {
                                          xs: "1.2rem",
                                          sm: "1.4rem",
                                        },
                                        color: "#2d2f30",
                                      }}
                                    >
                                      <strong>Time Start:</strong>{" "}
                                      {formatDate(task.time_start)}
                                    </Typography>
                                  </Box>

                                  <Box
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      mt: { xs: 1, sm: 0 },
                                    }}
                                  >
                                    <DateRangeIcon
                                      sx={{ color: "#2d2f30", mr: 1 }}
                                    />
                                    <Typography
                                      sx={{
                                        fontSize: {
                                          xs: "1.2rem",
                                          sm: "1.4rem",
                                        },
                                        color: "#2d2f30",
                                      }}
                                    >
                                      <strong>Time End:</strong>{" "}
                                      {formatDate(task.time_end)}
                                    </Typography>
                                  </Box>
                                </Box>
                              </CardContent>
                            </Card>
                          )}
                        </Draggable>
                      ))
                    )}
                    {provided.placeholder}
                  </Box>
                )}
              </Droppable>
            </Paper>
          </Grid2>
        ))}
      </Grid2>
    </DragDropContext>
  );
};

export default TasksPage;
