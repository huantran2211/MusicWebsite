import { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CustomImageUpload from '../../../../../Components/CustomUploadImage/CusTomUploadImages';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import { Grid2, Stack, TextField, Typography } from '@mui/material';
import axios from 'axios';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

const ModalUpdateTamTrang = ({ openModal, handleClose, setLoading, selectedId }) => {
  ModalUpdateTamTrang.propTypes = {
    openModal: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    setLoading: PropTypes.func.isRequired,
    selectedId: PropTypes.string.isRequired,
  };

  const [base64String, setBase64String] = useState("");
  const [imageDataBasic, setImageDataBasic] = useState("");
  const [urlHinhAnh , setUrlHinhAnh] = useState("");
  const [obj, setObj] = useState({
    tenTamTrang: "",
    url: "",
  });

  // Function to reset the form
  const resetForm = () => {
    setObj({
      tenTamTrang: "",
    });
    setBase64String('');
    setImageDataBasic(null);
  };

  // Function to handle input changes
  const handleChange = (name) => (event) => {
    setObj({ ...obj, [name]: event.target.value });
  };

  // Function to handle image conversion
  const handleImageConvert = (base64String) => {
    setBase64String(base64String);
    toast.success("Thêm ảnh thành công", {
      toastId: "alert-add-image",
    });
  };

  // Function to get data for updating
  const getTheLoaiData = async () => {
    try {
      const response = await axios.get(`https://localhost:7280/api/TamTrang/gettamtrangbyid?Id=${selectedId}`);
      if (response.status === 200) {
        const data = response.data;
        setObj({
          tenTamTrang: data.tenTamTrang,
        });
        setUrlHinhAnh(data.url)
        setBase64String(data.file);  
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  // Load data when modal is open
  useEffect(() => {
    if (openModal && selectedId) {
      getTheLoaiData();  // Fetch data to populate the form
    }
  }, [openModal, selectedId]);

  // Function to handle updating
  const handleUpdate = async () => {
    if (!obj?.tenTamTrang || !imageDataBasic) {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "Vui lòng nhập đầy đủ dữ liệu",
        showConfirmButton: false,
      });
      return;
    }

    const formData = new FormData();
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    formData.append("id", selectedId);
    formData.append("TenTamTrang", obj?.tenTamTrang);
    formData.append("Url", imageDataBasic);  



    try {
      const response = await axios.put(`https://localhost:7280/api/ChuDe/updatechude?Id=${selectedId}`, formData, config);
      if (response.status === 200) {
        toast.success("Chỉnh sửa thành công", {
          toastId: "alert-update-baihats",
        });
        setLoading(true);  // Refresh the data after update
        handleClose();     // Close the modal
      }
    } catch (error) {
      toast.error("Có lỗi đã xảy ra", {
        toastId: "alert-update-baihats",
      });
      console.error("Error updating data: ", error);
    }
  };

  const handleCloseModal = () => {
    resetForm();  // Reset the form when modal is closed
    handleClose();
  };

  return (
    <Dialog
      open={openModal}
      style={{zIndex:0}}
      width="500px"
      keepMounted
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{"Cập nhật chủ đề nhạc"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          <Grid2 container spacing={2}>
            <Grid2 size={12} width="500px">
              <TextField
                id="standard-basic"
                value={obj.tenTamTrang}
                fullWidth
                onChange={handleChange("tenChuDe")}
                label="Tên chủ đề"
                variant="outlined"
              />
            </Grid2>
            <Grid2 size={12}>
            <Stack direction="row" spacing={2}>
              <Grid2>
                <Typography variant='h6'>Hình ảnh đang có </Typography>
                <div style={{ textAlign: "center" , marginTop:40}}>
                  <img
                    src={`https://localhost:7280/api/File/image?path=${urlHinhAnh}`}
                    alt="Converted"
                    style={{ maxWidth: "400px", maxHeight: "400px" }}
                  />
                </div>
              </Grid2>
              <Grid2>
              <Typography variant='h6'>Hình ảnh cần sửa </Typography>
              <CustomImageUpload
                onImageConvert={handleImageConvert}
                setImageDataBasic={setImageDataBasic}
              />
              {base64String && (
                <div style={{ textAlign: "center" }}>
                  <img
                    src={base64String}
                    alt="Converted"
                    style={{ maxWidth: "400px", maxHeight: "400px" }}
                  />
                </div>
              )}
               </Grid2>
           </Stack>   
            </Grid2>
          </Grid2>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseModal}>Đóng</Button>
        <Button onClick={handleUpdate}>Cập nhật</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalUpdateTamTrang;