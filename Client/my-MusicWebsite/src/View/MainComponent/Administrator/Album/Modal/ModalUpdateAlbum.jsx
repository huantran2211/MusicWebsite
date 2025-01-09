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
import dayjs from 'dayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const  ModalUpdateAlbum = ({ openModal, handleClose, setLoading, alBumId }) => {
  ModalUpdateAlbum.propTypes = {
    openModal: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    setLoading: PropTypes.func.isRequired,
    alBumId: PropTypes.string.isRequired,
  };

  const [base64String, setBase64String] = useState("");
  const [imageDataBasic, setImageDataBasic] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [obj, setObj] = useState({
    tenAlbum : "",
    ngayPhatHanh:"",
    Url :"",
  });

  // Function to reset the form
  const resetForm = () => {
    setObj({
      tenAlbum : "",
      ngayPhatHanh:"",
      Url :"",
    });
    setBase64String('');
    setImageDataBasic(null);
  };

  // Function to handle input changes
 
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
  const getAlbumData = async () => {
    try {
      const response = await axios.get(`https://localhost:7280/api/Album/getalbumbyid?Id=${alBumId}`);
      if (response.status === 200) {
        const data = response.data;
        setObj({
          tenAlbum: data.tenAlbum,
          ngayPhatHanh : data.ngayPhatHanh,
        });
        setBase64String(data.url);  
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  // Load data when modal is open
  useEffect(() => {
    if (openModal && alBumId) {
      getAlbumData();  // Fetch data to populate the form
    }
  }, [openModal, alBumId]);


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
    formData.append("id", alBumId);
    formData.append("TenAlbum", obj?.tenAlbum);
    formData.append("NgayPhatHanh", selectedDate);
   // formData.append("file", imageDataBasic);  // Include the updated file

    try {
      const response = await axios.put(`https://localhost:7280/api/Album/updateAlbum?Id=${alBumId}`, formData, config);
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

  const handleChange = (name) => (event) => {
    setObj({ ...obj, [name]: event.target.value });
  };

  const handleDateChange = (field) => (newValue) => {
    // Convert the new date to the required format or just store it
    setSelectedDate(newValue);
    console.log(
      `${field} updated to`,
      newValue ? dayjs(newValue).format("YYYY-MM-DD") : "null"
    );
  };
  return (
    <Dialog
      open={openModal}
      style={{zIndex:0}}
      keepMounted
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{"Cập nhật album"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
        <Grid2 container sx={{ width: "500px" }} spacing={2}>
            <Grid2 sx={{ width: "500px" }}>
              <TextField
                id="standard-basic"
                value={obj?.tenAlbum}
                onChange={handleChange("tenAlbum")}
                label="Tên album"
                variant="standard"
                fullWidth
              />
            </Grid2>
            <Grid2 sx={{ width: "100%", marginTop: 2 }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                {" "}
                {/* Wrap your date picker inside this */}
                <DatePicker
                  label="Ngày phát hành"
                  value={obj?.ngayPhatHanh ? dayjs(obj.ngayPhatHanh) : null}
                  renderInput={(params) => <TextField {...params} />}
                  onChange={handleDateChange("ngayPhatHanh")}
                  sx={{ width: "100%" }}
                />
              </LocalizationProvider>
            </Grid2>
            <Grid2>
              <CustomImageUpload
                onImageConvert={handleImageConvert}
                // removeImage={removeImage}
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

export default  ModalUpdateAlbum;
