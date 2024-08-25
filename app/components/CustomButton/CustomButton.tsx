import React from "react";
import { Button } from "@mui/material";

interface CustomButtonProps {
  children: React.ReactNode;
  buttonType?: "default" | "inverted" | "google";
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  sx?: object; // Allow additional styling through the sx prop
}

const CustomButton: React.FC<CustomButtonProps> = ({
  children,
  buttonType = "default", // Default style
  onClick,
  type = "button",
  sx = {},
}) => {
  const getButtonStyles = () => {
    switch (buttonType) {
      case "inverted":
        return {
          backgroundColor: "white",
          color: "#0F316D",
          border: "1px solid #0F316D",
          "&:hover": {
            backgroundColor: "#0F316D",
            color: "white",
          },
        };
      case "google":
        return {
          backgroundColor: "#4285F4", // Google's primary color
          color: "white",
          "&:hover": {
            backgroundColor: "#357AE8", // Darker blue on hover
          },
        };
      case "default":
      default:
        return {
          backgroundColor: "#0F316D",
          color: "white",
          "&:hover": {
            backgroundColor: "#0D2854",
          },
        };
    }
  };

  return (
    <Button
      sx={{
        width: "100%",
        height: 50,
        ...getButtonStyles(),
        ...sx,
      }} // Apply button styles and merge with additional sx
      onClick={onClick}
      type={type}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
