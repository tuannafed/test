import React, { FC } from 'react';
import { Box, OutlinedTextFieldProps, TextField } from '@mui/material';
import { Controller } from 'react-hook-form';
import { RHFInputProps } from '../types';
import clsx from 'clsx';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

export interface RHFTextInputProps
  extends RHFInputProps,
    OutlinedTextFieldProps {}

export const RHFTextInput: FC<RHFTextInputProps> = ({
  id,
  name,
  control,
  label,
  InputProps,
  placeholder,
  ...props
}) => {
  return (
    <Controller
      name={name as string}
      control={control}
      render={({
        field: { onChange, value },
        fieldState: { error },
        formState
      }) => {
        return (
          <>
            <TextField
              id={`RHFTextInput-${id}`}
              name={name as string}
              label={label}
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              error={!!error}
              helperText={
                error ? (
                  <Box component="span" display="flex" alignItems="center">
                    <WarningAmberIcon
                      color="error"
                      sx={{ fontSize: 16, mr: 0.5 }}
                    />
                    <span style={{ marginTop: 2 }}>{error.message}</span>
                  </Box>
                ) : undefined
              }
              InputProps={InputProps}
              className={clsx(!!error && 'has-error')}
              {...props}
            />
          </>
        );
      }}
    />
  );
};
