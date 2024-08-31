import React from "react";
import { Button } from "@mui/material";
import Link from "next/link";

interface CustomButtonProps {
  children: React.ReactNode;
  buttonType?: "default" | "inverted" | "google";
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  sx?: object;
  navigateTo?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  children,
  buttonType = "default",
  onClick,
  type = "button",
  sx = {},
  navigateTo,
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
          backgroundColor: "#4285F4",
          color: "white",
          "&:hover": {
            backgroundColor: "#357AE8",
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

  const buttonContent = (
    <Button
      sx={{
        width: "100%",
        height: 50,
        ...getButtonStyles(),
        ...sx,
      }}
      onClick={onClick}
      type={type}
    >
      {children}
    </Button>
  );

  return navigateTo ? (
    <Link href={navigateTo} passHref>
     {buttonContent}
    </Link>
  ) : (
    buttonContent
  );
};

export default CustomButton;
