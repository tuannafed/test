import React, { useCallback } from 'react';

import { styled } from '@mui/system';
import Dropzone from 'react-dropzone';

//import XLSX from 'xlsx';

const DropzoneContainer = styled('div')({
  textAlign: 'center',
  padding: '20px',
  border: '1px dashed #ddd',
  borderRadius: '4px',
  cursor: 'pointer'
});

const DropzoneText = styled('p')({
  margin: '0'
});
interface RHFUploadProps {
  fileName: string;
  onFileUpload: (e) => void;
}

const UploadExcel: React.FC<RHFUploadProps> = ({ onFileUpload, fileName }) => {
  const onDrop = useCallback(
    acceptedFiles => {
      const file: File = acceptedFiles[0];
      //console.log("Reciver File:", file)
      // eslint-disable-next-line react-hooks/exhaustive-deps
      fileName = file.name;
      if (onFileUpload) {
        onFileUpload(file);
      }
      // }
    },
    [onFileUpload]
  );

  return (
    <Dropzone onDrop={onDrop} multiple={false} accept=".xls, .xlsx">
      {({ getRootProps, getInputProps }) => (
        <DropzoneContainer {...getRootProps()}>
          <input {...getInputProps()} />
          <DropzoneText>{fileName}</DropzoneText>
        </DropzoneContainer>
      )}
    </Dropzone>
  );
};

export default UploadExcel;
