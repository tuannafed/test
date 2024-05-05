import React from 'react';
import { Tab, Tabs } from '@mui/material';
import { MANAGE_TAB_TITLE } from 'constants/common';
import { ManageTabType } from '../types';
import { useAppDispatch } from 'common/hooks';

interface ManageTabProps {
  onHandleChange?: (tabType: ManageTabType) => void;
}
export const ManageTab: React.FC<ManageTabProps> = ({ onHandleChange }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        onHandleChange && onHandleChange('all');
        break;
      case 1:
        onHandleChange && onHandleChange('expired');
        break;

      case 2:
        onHandleChange && onHandleChange('hidden');
        break;
    }
  };

  return (
    <Tabs value={value} onChange={handleChange} centered>
      <Tab label={MANAGE_TAB_TITLE[0]} key={`tab-idx-0`} />
      <Tab label={MANAGE_TAB_TITLE[1]} key={`tab-idx-1`} />
      <Tab label={MANAGE_TAB_TITLE[2]} key={`tab-idx-2`} />
    </Tabs>
  );
};
