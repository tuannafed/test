import React from 'react';
import { Stepper, Step, StepLabel, Grid } from '@mui/material';

interface CreateStepperProps {
  step: number;
}
export const CreateStepper: React.FC<CreateStepperProps> = ({ step }) => {
  return (
    <Grid container>
      <Grid item md={8} xs={12}>
        <Stepper activeStep={step} alternativeLabel>
          <Step>
            <StepLabel>Hình ảnh</StepLabel>
          </Step>
          <Step>
            <StepLabel>Chi tiết</StepLabel>
          </Step>
          <Step>
            <StepLabel>Đăng tin</StepLabel>
          </Step>
        </Stepper>
      </Grid>
    </Grid>
  );
};
