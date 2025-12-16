import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ErrorPage() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "80vh",
        textAlign: "center",
        gap: 2
      }}
    >
      <Typography variant="h3">404 Not Found</Typography>
      <Typography variant="body1">The page you are looking for does not exist.</Typography>
      <Button variant="contained" onClick={() => navigate("/")}>
        Go Home
      </Button>
    </Box>
  );
}
