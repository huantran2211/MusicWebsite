import { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CustomImageUpload from '../../../../../Components/CustomUploadImage/CusTomUploadImages';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import { Grid2, TextField } from '@mui/material';
import axios from 'axios';
import Swal from 'sweetalert2';

const ModalUpdateTheLoai = ({ openModal, handleClose, setLoading, theLoaiId }) => {
  ModalUpdateTheLoai.propTypes = {
    openModal: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    setLoading: PropTypes.func.isRequired,
    theLoaiId: PropTypes.string.isRequired,
  };

  const [base64String, setBase64String] = useState("");
  const [imageDataBasic, setImageDataBasic] = useState("");
  const [obj, setObj] = useState({
    tenTheLoai: "",
    file: "",
  });

  // Function to reset the form
  const resetForm = () => {
    setObj({
      tenTheLoai: "",
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
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Thêm ảnh thành công",
      showConfirmButton: false,
      timer: 1500
    });
  };

  // Function to get data for updating
  const getTheLoaiData = async () => {
    try {
      const response = await axios.get(`https://localhost:7280/api/TheLoai/GetAllTheLoaiById?Id=${theLoaiId}`);
      if (response.status === 200) {
        const data = response.data;
        setObj({
          tenTheLoai: data.tenTheLoai,
        });
        setBase64String(data.file);  
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  // Load data when modal is open
  useEffect(() => {
    if (openModal && theLoaiId) {
      getTheLoaiData();  // Fetch data to populate the form
    }
  }, [openModal, theLoaiId]);


  // Function to handle updating
  const handleUpdate = async () => {
    if (!obj?.tenTheLoai || !imageDataBasic) {
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
    formData.append("id", theLoaiId);
    formData.append("tenTheLoai", obj?.tenTheLoai);
    formData.append("file", imageDataBasic);  // Include the updated file

    try {
      const response = await axios.put(`https://localhost:7280/api/TheLoai/UpdateTheLoai?Id=${theLoaiId}`, formData, config);
      if (response.status === 200) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Cập nhật thể loại thành công",
          showConfirmButton: false,
          timer: 1500
        });
        setLoading(true);  // Refresh the data after update
        handleClose();     // Close the modal
      }
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Có lỗi đã xảy ra",
        showConfirmButton: false,
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
      keepMounted
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{"Cập nhật thể loại nhạc"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          <Grid2 container spacing={2}>
            <Grid2 size={12}>
              <TextField
                id="standard-basic"
                value={obj.tenTheLoai}
                onChange={handleChange("tenTheLoai")}
                label="Tên thể loại"
                variant="standard"
              />
            </Grid2>
            <Grid2 size={12}>
              <CustomImageUpload
                onImageConvert={handleImageConvert}
                setImageDataBasic={setImageDataBasic}
              />
              {base64String && (
                <div style={{ textAlign: "center" }}>
                  <img
                    src={base64String}
                    alt="Converted"
                    style={{ maxWidth: "100%", maxHeight: "300px" }}
                  />
                </div>
              )}
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

export default ModalUpdateTheLoai;
