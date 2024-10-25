import { DateRange, Folder } from "@mui/icons-material";
import { Box } from "@mui/material";
import InfoItem from "./InfoItem";

const ProjectInfo = ({ project_name, project_start, project_end }) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "space-between",
      padding: "10px 0",
      gap: "20px",
    }}
  >
    <InfoItem title="Project" icon={<Folder />} value={project_name} />
    <InfoItem
      title="Start Project"
      icon={<DateRange />}
      value={new Date(project_start).toLocaleDateString("en-GB")}
    />
    <InfoItem
      title="End Project"
      icon={<DateRange />}
      value={new Date(project_end).toLocaleDateString("en-GB")}
    />
  </Box>
);

export default ProjectInfo;
