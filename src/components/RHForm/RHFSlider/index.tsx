import React, { FC } from 'react';
import { Controller } from 'react-hook-form';
import { RHFInputProps } from '../types';
import { Slider, Stack } from '@mui/material';

interface RHFDateTimePickerProps extends RHFInputProps {
  name: string;
  id: string;
  label?: string;
  inputLabels: string[];
}

export const RHFSlider: FC<RHFDateTimePickerProps> = ({
  name,
  control,
  inputLabels,
  id,
  ...props
}) => {
  const [startLabel, endLabel] = inputLabels;
  return (
    <Controller
      name={name as string}
      control={control}
      render={({
        field: { onChange, value },
        fieldState: { error },
        formState
      }) => (
        <Stack direction="row" width="100%" alignItems="center">
          <span style={{ margin: '0px  10px  0px 0px' }}>{startLabel}</span>
          <Slider
            key={`RHFSlider-${id}`}
            name={name as string}
            min={1}
            max={100}
            onChange={onChange}
            value={value}
            {...props}
          />
          <span style={{ margin: '0px 0px 0px 10px' }}>{endLabel}</span>
        </Stack>
      )}
    />
  );
};
