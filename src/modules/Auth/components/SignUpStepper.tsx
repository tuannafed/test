import React from 'react';
import { Stepper, Step, StepLabel, Box } from '@mui/material';
import { useSelectSignUp } from '../redux/select-hooks';

const steps = ['Thông tin cá nhân', 'Địa điểm', 'Hoàn thành'];

export const SignUpStepper: React.FC = () => {
  const { signUpStep } = useSelectSignUp();

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={signUpStep} alternativeLabel>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};
