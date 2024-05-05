/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogContent,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import { useSelectAuthStore, useSelectCurrentUserStore } from 'modules/Auth';
import { redirect, stackCallback } from 'utils';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useAppDispatch } from 'common/hooks';
import { getToken } from 'common/localStorage';
import { Layout } from 'components';
import UploadExcel from 'components/RHForm/RHFUploadFile';
import { LISTING_STATUS } from 'constants/common';
import { withAuth } from 'hoc';
import { actionsListing } from 'modules/Listings';
import { useState } from 'react';

const AdminPage = () => {
  const { role } = useSelectCurrentUserStore();
  if (role != 'admin') redirect('/404');
  const token = getToken();
  const dispatch = useAppDispatch();
  const [fileName, setFileName] = useState(
    'Thả tệp Excel vào đây hoặc nhấn để chọn tệp (.xls, .xlsx)'
  );
  const { currentUser } = useSelectAuthStore();
  const handleFileUpload = file => {
    console.log(`Uploaded file: ${file.name}`);
    setFileName(file.name);
    setFileData(file);
  };
  const [messageNoti, setMessageNoti] = useState(LISTING_STATUS.CREATE_MESSAGE);
  const [fileData, setFileData] = useState(null);
  // box choose file please
  const [isSentBox, setisSentBox] = useState(false);
  // Hanle Dailog
  // box import success
  const [showModalPosted, setShowModalPosted] = useState(false);
  const [message, setmessage] = useState('Đăng rao vặt thành công');
  // disable submit button
  const [allowSubmit, setAllowSubmit] = useState(false);
  // End Handle Dailog
  interface Bug {
    index: any;
    row: any;
    message: any;
  }
  const sendImportListing = () => {
    setAllowSubmit(true);
    setMessageNoti(LISTING_STATUS.CREATE_MESSAGE);
    //console.log("phuoc", data);
    stackCallback(() => {
      const formData = new FormData();
      if (fileData == null) {
        setisSentBox(true);
        return;
      }
      formData.append('file', fileData ? fileData : '');

      dispatch(
        actionsListing.importListing({
          token,
          id: currentUser._id,
          body: formData
        })
      )
        .unwrap()
        .then(res => {
          if (res.data) {
            setmessage(res.message);

            //console.log("Response: ", res.data)
            const rowdata: Bug[] = [];
            let stt = 0;
            res.data.forEach(element => {
              const value = element.split('-');
              const bug = {
                index: ++stt,
                row: value[0],
                message: value[1]
              };
              rowdata.push(bug);
            });
            setBugRows(rowdata);
            setShowModalPosted(true);
            setFileData(null);
            setFileName(
              'Thả tệp Excel vào đây hoặc nhấn để chọn tệp (.xls, .xlsx)'
            );
            setAllowSubmit(true);
            return;
          }
        })
        .catch(() => {
          console.log('Thất bại', formData);
          setAllowSubmit(true);
        });
    }, 500);
  };
  //Start handle detail
  const [bugRows, setBugRows] = useState<Bug[]>([]);
  const [showModalDetail, setShowModalDetail] = useState(false);
  //End handle detail
  return (
    role == 'admin' && (
      <Layout title="Đăng bài hàng loạt" variant="auth">
        <Container>
          <div>
            <h2>Đăng bài hàng loạt</h2>
          </div>
          <div style={{ marginTop: 50 }}>
            <UploadExcel onFileUpload={handleFileUpload} fileName={fileName} />
          </div>
          <Button
            autoFocus
            variant="contained"
            color="primary"
            sx={{
              margin: '20px 40px'
            }}
            onClick={sendImportListing}
            disabled={allowSubmit}
          >
            Đăng ngay
          </Button>
        </Container>
        <Dialog
          open={showModalPosted}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent
            sx={{
              width: {
                sm: '100%',
                md: '500px'
              },
              margin: 'auto'
            }}
          >
            <Box textAlign="center">
              <CheckCircleIcon
                color="success"
                sx={{ fontSize: 48, mr: 0.5, mt: 0.2 }}
              />
              <Typography
                sx={{
                  margin: '5px 0'
                }}
              >
                Rao vặt {messageNoti} thành công
                <br></br>
                {message}
              </Typography>
            </Box>
          </DialogContent>
          <Box
            textAlign="center"
            sx={{
              p: { xs: 2, sm: 4 },
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Button
              color="success"
              variant="contained"
              onClick={() => {
                //dispatch(actionsListing.setStep(0));
                //setListingCreate(defaultValues);
                redirect('/admin/import_excel');
                setShowModalPosted(false);
                setAllowSubmit(false);
              }}
              sx={{ fontSize: { xs: 12, sm: 16 }, mr: 1 }}
            >
              Tiếp tục đăng
            </Button>
            <Button
              autoFocus
              variant="contained"
              color="primary"
              onClick={() => redirect('/')}
              sx={{ fontSize: { xs: 12, sm: 16 }, ml: 1 }}
            >
              Xem bài đăng
            </Button>
            {bugRows.length != 0 ? (
              <Button
                autoFocus
                variant="contained"
                color="secondary"
                onClick={() => setShowModalDetail(true)}
                sx={{ fontSize: { xs: 12, sm: 16 }, ml: 1 }}
              >
                Xem chi tiết
              </Button>
            ) : (
              ''
            )}
          </Box>
        </Dialog>
        <Dialog
          open={showModalDetail}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent
            sx={{
              width: {
                sm: '100%',
                md: '500px'
              }
            }}
          >
            <Typography
              sx={{
                margin: '5px 0'
              }}
            >
              Chi tiết bản ghi lỗi
            </Typography>
            <Box textAlign="center">
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 300 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell style={{ width: 5 }}>STT</TableCell>
                      <TableCell style={{ width: 5 }}>Dòng</TableCell>
                      <TableCell style={{ width: 10 }}>Lỗi</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {bugRows.map(bugRows => (
                      <TableRow
                        key={bugRows.row}
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 }
                        }}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          style={{ width: 5 }}
                        >
                          {bugRows.index}
                        </TableCell>
                        <TableCell
                          component="th"
                          scope="row"
                          style={{ width: 5 }}
                        >
                          {bugRows.row}
                        </TableCell>
                        <TableCell
                          component="th"
                          scope="row"
                          style={{ width: 10 }}
                        >
                          {bugRows.message}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </DialogContent>
          <Box
            textAlign="center"
            sx={{
              p: { xs: 2, sm: 4 },
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Button
              color="secondary"
              variant="contained"
              onClick={() => {
                setShowModalDetail(false);
                setAllowSubmit(true);
              }}
              sx={{ fontSize: { xs: 12, sm: 16 }, mr: 1 }}
            >
              Đóng
            </Button>
          </Box>
        </Dialog>
        <Dialog
          open={isSentBox}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent
            sx={{
              width: {
                sm: '100%',
                md: '500px'
              }
            }}
          >
            <Typography
              sx={{
                margin: '5px 0'
              }}
            >
              Vui lòng chọn file
            </Typography>
          </DialogContent>
          <Box
            textAlign="center"
            sx={{
              p: { xs: 2, sm: 4 },
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Button
              color="secondary"
              variant="contained"
              onClick={() => {
                setisSentBox(false);
                setAllowSubmit(false);
              }}
              sx={{ fontSize: { xs: 12, sm: 16 }, mr: 1 }}
            >
              Đóng
            </Button>
          </Box>
        </Dialog>
      </Layout>
    )
  );
};

export default withAuth(AdminPage);
