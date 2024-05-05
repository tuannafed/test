import React from 'react';
import { FormHelperText, FormHelperTextProps } from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

interface RHFHelperTextProps extends FormHelperTextProps {
  text: string;
  hideIcon?: boolean;
}
export const RHFHelperText: React.FC<RHFHelperTextProps> = ({
  text,
  hideIcon = false
}) => {
  return (
    <FormHelperText
      error
      sx={{
        display: 'flex'
      }}
    >
      {!hideIcon && (
        <WarningAmberIcon
          color="error"
          sx={{ fontSize: 16, mr: 0.5, mt: 0.2 }}
        />
      )}
      <span>{text}</span>
    </FormHelperText>
  );
};
