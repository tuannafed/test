import { Box, Button, Stack, Typography } from '@mui/material';
import { FC, createRef, useCallback, useEffect } from 'react';
import Dropzone, { DropzoneOptions } from 'react-dropzone';
/* eslint-disable @next/next/no-img-element */
import { PhotoCamera, RemoveCircleOutlineRounded } from '@mui/icons-material';
import { isArray, isEmpty, isFunction } from 'lodash';
import { RHFHelperText, RHFInputProps } from '..';

import { FILE } from 'constants/common';
import { VALID } from 'constants/validate';
import { useSnackbar } from 'notistack';
import { Controller } from 'react-hook-form';
import { classes } from './styles';

interface RHFUploadProps extends DropzoneOptions, RHFInputProps {
  id?: string;
  name: string;
  edit?: boolean;
  onChangeCb?: (e) => void;
  onRemoveCb?: (e, index) => void;
  openFileDialog?: boolean;
  setOpenFileDialog?: (value: boolean) => void;
}

export const RHFUpload: FC<RHFUploadProps> = ({
  id,
  name,
  control,
  accept,
  edit,
  multiple,
  onChangeCb,
  onRemoveCb,
  setValue,
  openFileDialog,
  setOpenFileDialog,
  ...rest
}) => {
  const { enqueueSnackbar } = useSnackbar();

  const dropzoneRef = createRef();

  const fileSizeText = `Kích thước tập tin: ${(
    FILE.LIMIT / 1048576
  ).toFixed()}MB`;

  const fileTypeText = `Loại tệp: ${FILE.ACCEPT.replaceAll('image/', '.')}`;

  const removeIconStyle = {
    position: 'absolute',
    top: '0',
    right: '0',
    zIndex: '2',
    backgroundColor: '#bdc3c7',
    borderRadius: '50%',
    fill: 'white',
    ':hover': {
      cursor: 'pointer'
    }
  };

  const openDialog = useCallback(() => {
    // Note that the ref is set async,
    // so it might be null at some point
    if (dropzoneRef.current) {
      (dropzoneRef.current as any).open();
    }
  }, [dropzoneRef]);

  useEffect(() => {
    if (openFileDialog) {
      openDialog();
      typeof setOpenFileDialog === 'function' && setOpenFileDialog(false);
    }
  }, [openFileDialog, openDialog, setOpenFileDialog]);

  /**
   * showError
   */
  const showError = useCallback(() => {
    enqueueSnackbar(VALID.FILE_LIMIT, { variant: 'error' });
  }, [enqueueSnackbar]);

  const handleRemoveFile = (file: any, index) => {
    onRemoveCb && onRemoveCb(file, index);
    // setDisable(true);
  };

  return (
    <div id={id} className="upload">
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value }, formState: { errors } }) => {
          const error = errors[name];
          return (
            <Dropzone
              ref={dropzoneRef as any}
              onDrop={acceptedFiles => {
                if (acceptedFiles[0].size <= FILE.LIMIT) {
                  onChange(acceptedFiles);
                  isFunction(onChangeCb) && onChangeCb(acceptedFiles);
                } else {
                  showError();
                }
              }}
              noDrag={!multiple}
              multiple={multiple ? multiple : false}
              accept={accept ? accept : FILE.ACCEPT}
              noClick={true}
              {...rest}
            >
              {({
                getRootProps,
                getInputProps,
                isDragActive,
                isDragAccept,
                isDragReject,
                open
              }) => {
                return (
                  <div className="upload">
                    <div
                      className="upload-form"
                      {...getRootProps({
                        style: {
                          ...classes.root,
                          ...(isDragActive ? classes.active : {}),
                          ...(isDragAccept ? classes.accept : {}),
                          ...(isDragReject || !isEmpty(error)
                            ? classes.reject
                            : {})
                        }
                      })}
                    >
                      <input {...getInputProps()} />
                      {isEmpty(value) && (
                        <div
                          className="upload-form-inner"
                          style={classes.uploadFormInner as any}
                        >
                          {isDragActive ? (
                            <Typography variant="caption">
                              Kéo thả các tập tin vào đây ...
                            </Typography>
                          ) : (
                            isEmpty(value) && (
                              <>
                                {/* <div style={classes.btnUpload}>Upload</div>
                                <Typography variant="caption">
                                  Drag and drop
                                </Typography> */}
                              </>
                            )
                          )}
                        </div>
                      )}
                      {!!value?.length && (
                        <aside style={classes.thumbsContainer as any}>
                          {isArray(value) ? (
                            value.map((file, index) => {
                              if (file._id) {
                                return (
                                  <div
                                    style={classes.thumbItem}
                                    key={`upload_at_${index}`}
                                    className="relative bg-thumnail"
                                  >
                                    {edit && (
                                      <RemoveCircleOutlineRounded
                                        sx={removeIconStyle}
                                        onClick={() =>
                                          handleRemoveFile(file, index)
                                        }
                                      />
                                    )}
                                    <div className="thumbnail-centered thumbnail--1x1">
                                      <img src={file.image} alt="thumbnail" />
                                    </div>
                                  </div>
                                );
                              } else {
                                return (
                                  <div
                                    key={`upload_at_${index}`}
                                    style={classes.thumbItem}
                                    className="relative bg-thumnail"
                                  >
                                    {edit && (
                                      <RemoveCircleOutlineRounded
                                        sx={removeIconStyle}
                                        onClick={() =>
                                          handleRemoveFile(file, index)
                                        }
                                      />
                                    )}
                                    <div className="thumbnail-centered thumbnail--1x1">
                                      <img
                                        src={URL.createObjectURL(file)}
                                        alt={file.name}
                                      />
                                    </div>
                                  </div>
                                );
                              }
                            })
                          ) : (
                            <div
                              style={classes.thumbItem}
                              className="relative bg-thumnail"
                            >
                              {edit && (
                                <RemoveCircleOutlineRounded
                                  sx={removeIconStyle}
                                />
                              )}
                              <div className="thumbnail-centered thumbnail--1x1">
                                <img src={value} alt="thumbnail" />
                              </div>
                            </div>
                          )}
                        </aside>
                      )}
                    </div>
                    <Box display="flex" justifyContent="space-between">
                      {!isEmpty(error) && (
                        <Stack ml={1}>
                          <RHFHelperText error text={error.message as string} />
                        </Stack>
                      )}
                      <Stack ml="auto" flexShrink={0} mt={0.5}>
                        <Typography
                          color="GrayText"
                          variant="caption"
                          align="right"
                          sx={{ ml: 'auto' }}
                        >
                          {`${fileSizeText} - ${fileTypeText}`}
                        </Typography>
                        <Typography
                          color="GrayText"
                          variant="caption"
                          align="right"
                          sx={{ ml: 'auto' }}
                        ></Typography>
                      </Stack>
                    </Box>
                    <Button
                      variant="contained"
                      component="span"
                      onClick={openDialog}
                      endIcon={<PhotoCamera />}
                    >
                      Tải lên
                    </Button>
                  </div>
                );
              }}
            </Dropzone>
          );
        }}
      />
    </div>
  );
};
