import { Typography } from "@mui/material";
import React from "react";

interface ErrorMessageProps {
  message: string | null;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  if (!message) return null;

  return (
    <Typography color="error" variant="body2" sx={{ mt: 2 }}>
      {message}
    </Typography>
  );
};

export default ErrorMessage;
