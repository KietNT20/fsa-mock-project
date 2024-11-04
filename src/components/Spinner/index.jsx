import { Box, CircularProgress } from "@mui/material";

const Spinner = () => {
  return (
    <Box sx={styles.spinnerStyles}>
      <CircularProgress size="3rem" />
    </Box>
  );
};

export default Spinner;

export const styles = {
  spinnerStyles: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
};
