// components/TaskDetail/TaskDetailContent.jsx
import { DateRange, EventNote, PriorityHigh } from "@mui/icons-material";
import { Box } from "@mui/material";
import InfoItem from "./InfoItem";

const TaskDetailContent = ({ task }) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "space-between",
      gap: "20px",
    }}
  >
    {/* Left Column */}
    <Box sx={{ flex: 1, marginY: "15px" }}>
      <InfoItem
        title="User Email"
        icon={<EventNote />}
        value={task.user_mail}
      />
      <InfoItem title="User Name" icon={<EventNote />} value={task.user_name} />
      <InfoItem title="Note" icon={<EventNote />} value={task.note || "None"} />
    </Box>

    {/* Right Column */}
    <Box sx={{ flex: 1, marginY: "15px" }}>
      <InfoItem
        title="Start Task"
        icon={<DateRange />}
        value={new Date(task.time_start).toLocaleDateString("en-GB")}
      />
      <InfoItem
        title="End Task"
        icon={<DateRange />}
        value={new Date(task.time_end).toLocaleDateString("en-GB")}
      />
      <InfoItem
        title="Status"
        icon={<PriorityHigh />}
        value={
          task.status === 1
            ? "Pending"
            : task.status === 2
              ? "In Progress"
              : task.status === 3
                ? "QA Testing"
                : "Completed"
        }
      />
    </Box>
  </Box>
);

export default TaskDetailContent;
