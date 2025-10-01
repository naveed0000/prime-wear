import React from "react";
import { FormLabel, SxProps, TextField, TextFieldProps, Theme } from "@mui/material";
import { Control, Controller, FieldValues, FieldPath } from "react-hook-form";

type SimpleTextFieldProps<T extends FieldValues> = TextFieldProps & {
  control: Control<T>;
  name: FieldPath<T>;
  label?: string;
  formLabelSx?: SxProps<Theme>;
};

function SimpleTextField<T extends FieldValues>({
  label,
  name,
  control,
  formLabelSx,
  ...rest
}: SimpleTextFieldProps<T>) {
  return (
    <>
      <FormLabel
        sx={{
          color: "common.black",
          fontWeight: 600,
          width: "100%",
          display: "inline-block",
          paddingBlock: 1,
          ...formLabelSx,
        }}
        htmlFor={name}
      >
        {label}
      </FormLabel>
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState: { error } }) => (
          <TextField
            fullWidth
            id={name}
            variant="outlined"
            {...field}
            type="text"
            error={!!error}
            helperText={error?.message}
            size="small"
            {...rest}
          />
        )}
      />
    </>
  );
}

export default SimpleTextField;
