import { Box, CircularProgress } from "@mui/material";

const Spinner = () => {
  return (
    <Box sx={styles.spinnerStyles}>
      <CircularProgress />
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
    width: "100%",
    top: 0,
    left: 0,
    right: 0,
    position: "absolute",
    zIndex: 1,
  },
};
