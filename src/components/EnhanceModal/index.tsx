import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogProps,
  DialogTitle,
  IconButton
} from '@mui/material';
import { MODAL } from 'constants/common';
import React from 'react';
import { theme } from 'themes';
import CloseIcon from '@mui/icons-material/Close';

interface EnhanceModalProps extends DialogProps {
  title?: string;
  onOk?: (fn: any | Function) => void;
  onCancel?: (show: boolean) => void;
  onCloseIcon?: (show: boolean) => void;
  cancelText?: string;
  okText?: string;
  children?: React.ReactNode;
  isModalDiscard?: boolean;
  variant?: 'error' | 'info' | 'primary' | 'secondary';
  btnSmall?: boolean;
  hasIconClose?: boolean;
}

export const EnhanceModal: React.FC<EnhanceModalProps> = ({
  title,
  onOk,
  onCancel,
  cancelText = 'Cancel',
  okText = 'Comfirm',
  children,
  isModalDiscard = false,
  variant = 'primary',
  btnSmall = false,
  onCloseIcon,
  ...props
}) => {
  const bgColor = () => {
    switch (variant) {
      case 'primary':
        return theme.palette.primary.main;
      case 'secondary':
        return theme.palette.secondary.main;
      case 'error':
        return theme.palette.error.main;
      case 'info':
        return theme.palette.info.main;
      default:
        return;
    }
  };

  return (
    <Dialog {...props}>
      {onCloseIcon && (
        <DialogTitle sx={{ bgcolor: '#fff', color: '#FFF', py: 4 }}>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => onCloseIcon(!open) as any}
            aria-label="close"
            disableFocusRipple
            sx={{
              backgroundColor: '#f44336',
              position: 'absolute',
              right: 12,
              top: 12,
              color: '#fff',
              '&:hover': {
                backgroundColor: '#f44336',
                color: '#fff',
                opacity: 0.8
              }
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
      )}

      {title && (
        <DialogTitle sx={{ bgcolor: bgColor, color: '#FFF' }}>
          {isModalDiscard ? MODAL.DISCARD_CHANGE_TITLE : title}
        </DialogTitle>
      )}
      <DialogContent>
        <Box pt={3}>
          {isModalDiscard ? (
            <DialogContentText>
              {MODAL.DISCARD_CHANGE_CONTENT}
            </DialogContentText>
          ) : (
            children
          )}
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        {onCancel && (
          <Button
            size={btnSmall ? 'small' : undefined}
            type="button"
            variant="contained"
            color="inherit"
            sx={{ textTransform: 'capitalize', mr: 1 }}
            onClick={() => onCancel(!open) as any}
          >
            {cancelText}
          </Button>
        )}
        {onOk && (
          <Button
            size={btnSmall ? 'small' : undefined}
            type="button"
            variant="contained"
            color={variant}
            onClick={e => onOk(e)}
          >
            {okText}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};
