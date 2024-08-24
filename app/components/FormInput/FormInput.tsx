import React from "react";
import { TextField } from "@mui/material";

interface FormInputProps {
  id: string;
  label?: string;
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const FormInput: React.FC<FormInputProps> = ({
  id,
  label,
  type,
  name,
  value,
  onChange,
  required = false,
}) => {
  return (
    <TextField
      id={id}
      label={label}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      fullWidth
      margin="normal"
      variant="outlined"
    />
  );
};

export default FormInput;
