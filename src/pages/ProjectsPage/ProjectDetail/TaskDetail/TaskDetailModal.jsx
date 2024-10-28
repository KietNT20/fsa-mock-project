import { getStatusColor } from "@/utils/status";
import { CardContent, Dialog, DialogContent, Divider } from "@mui/material";
import ProjectInfo from "./ProjectInfo";
import TaskDetailActions from "./TaskDetailActions";
import TaskDetailContent from "./TaskDetailContent";
import TaskDetailHeader from "./TaskDetailHeader";

const TaskDetailModal = ({
  open,
  task,
  onClose,
  onUpdate,
  onDelete,
  loading,
}) => {
  if (!task) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          width: "60vw",
          minHeight: "400px",
          borderRadius: "15px",
          background: "#ffffff",
          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)",
          padding: "10px",
          margin: "5px",
          "&:hover": {
            boxShadow: "0 12px 24px rgba(0, 0, 0, 0.4)",
          },
        },
      }}
    >
      <DialogContent>
        <CardContent>
          <TaskDetailHeader
            taskName={task.task_name}
            status={task.status}
            statusColor={getStatusColor(task.status)}
          />
          <ProjectInfo
            project_name={task.project_name}
            project_start={task.project_start}
            project_end={task.project_end}
          />
          <Divider
            style={{ margin: "10px 0", border: "0.5px solid #2d2f30" }}
          />
          <TaskDetailContent task={task} />
        </CardContent>
      </DialogContent>
      <TaskDetailActions
        onClose={onClose}
        onUpdate={onUpdate}
        onDelete={onDelete}
        loading={loading}
      />
    </Dialog>
  );
};

export default TaskDetailModal;
