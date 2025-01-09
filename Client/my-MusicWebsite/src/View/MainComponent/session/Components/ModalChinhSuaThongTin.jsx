import { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import { Grid2, Stack, TextField } from '@mui/material';
import axios from 'axios';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

const ModalChinhSuaThongTin = ({ openModal, handleClose, setLoading ,userId}) => {
  ModalChinhSuaThongTin.propTypes = {
    openModal: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    setLoading: PropTypes.func.isRequired,
    userId : PropTypes.func.isRequired,
  };

 useState("");
  const [obj, setObj] = useState({
    tenNguoiDung: "",
    soDienThoai: "",
    email: "",
  });

  const resetForm = () => {
    setObj({
      tenNguoiDung: "",
      soDienThoai :"",
      email :""
    });

  };

  // Function to handle input changes
  const handleChange = (name) => (event) => {
    setObj({ ...obj, [name]: event.target.value });
  };

  

  // Function to get data for updating
  const getUserData = async () => {
    try {
      const response = await axios.get(`https://localhost:7280/api/User/GetUserById?id=${userId}`);
      if (response.status === 200) {
        const data = response.data;
        setObj({
          tenNguoiDung: data.tenNguoiDung,
          email : data?.email,
          soDienThoai : data?.soDienThoai
        });
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  // Load data when modal is open
  useEffect(() => {
    if (openModal ) {
      getUserData();  
    }
  }, [openModal]);

  // Function to handle updating
  const handleUpdate = async () => {
    if (!obj?.tenNguoiDung || !obj?.email || !obj?.soDienThoai) {
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
    formData.append("TenNguoiDung", obj?.tenNguoiDung);
    formData.append("SoDienThoai", obj?.soDienThoai);
    formData.append("Email", obj?.email);
    formData.append("Id", userId);
    try {
      const response = await axios.put(`https://localhost:7280/api/User/UpdateUser?Id=${userId}`, formData, config);
      if (response.status === 200) {
        toast.success("Chỉnh sửa thành công", {
          toastId: "alert-update-baihats",
        });
        setLoading(true);
        handleClose(); 
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
      <DialogTitle>{"Cập nhật thông tin cá nhân"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          <Grid2 container spacing={2}>
            <Grid2 size={12} width="600px">
              <TextField
                id="standard-basic"
                value={obj.tenNguoiDung}
                fullWidth
                onChange={handleChange("tenNguoiDung")}
                label="UserName"
                variant="outlined"
              />
            </Grid2>
            <Grid2 size={12} width="600px">
              <TextField
                id="standard-basic"
                value={obj.email}
                fullWidth
                onChange={handleChange("email")}
                label="Email"
                variant="outlined"
              />
            </Grid2>
            <Grid2 size={12} width="600px">
              <TextField
                id="standard-basic"
                value={obj.soDienThoai}
                fullWidth
                onChange={handleChange("soDienThoai")}
                label="Số điện thoại"
                variant="outlined"
              />
            </Grid2>
            <Grid2 size={12}>
            <Stack direction="row" spacing={2}>
              <Grid2>
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

export default ModalChinhSuaThongTin;
