import PropTypes from 'prop-types';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button, Grid2, TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'; 
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import axios from 'axios';
const ModalAddPlaylist = ({openModal, handleClose ,userId }) => {
  ModalAddPlaylist.propTypes = {
        openModal: PropTypes.bool.isRequired,  
        handleClose: PropTypes.func.isRequired, 
        userId: PropTypes.string.isRequired,  
      };
   const [selectedDate, setSelectedDate] = useState(null);
    const [obj , setObj] = useState({
        tenDanhSachPhat : "",
        ngayPhatHanh :"",
     })
     const resetForm = () => {
        setObj({
          tenDanhSachPhat : "",
          ngayPhatHanh :"",
        })   
      };
      // handle change modal
      const handleChange = (name) => (event) => {
        setObj({ ...obj, [name]: event.target.value });
      }

      const handleDateChange = (field) => (newValue) => {
        // Convert the new date to the required format or just store it
        setSelectedDate(newValue);
        console.log(`${field} updated to`, newValue ? dayjs(newValue).format("YYYY-MM-DD") : "null");
      };
 

      const handleCloseModal = () => {
        resetForm();               
        handleClose()    
      };
      const handelSave = async () => {
        if (!obj?.tenDanhSachPhat) {
            toast.warning("Vui lòng nhập đầy đủ dữ liệu", {
                toastId: "alert-add-save-warning",
              });
            return;
        }
    
        const formData = new FormData();
        formData.append("TenDanhSachPhat", obj?.tenDanhSachPhat);
        formData.append("NgayPhatHanh",selectedDate );
        formData.append("UserId",userId );
            const response = await axios.post("https://localhost:7280/api/DanhSachPhat/adddanhsachphat", formData);
    
            if (response.status === 200) {
                toast.success("Thêm mới thành công", {
                    toastId: "alert-add-save-success",
                  });
                handleClose(); 
            } else {
                toast.warn("đã có lỗi khi xảy ra", {
                    toastId: "alert-add-save-warrn",
                  });
            }
       
    };
  return (
    <Dialog
    open={openModal}
    keepMounted
   // onClose={handleClose}
    aria-describedby="alert-dialog-slide-description"
  >
    <DialogTitle>{"Thêm mới playlist"}</DialogTitle>
    <DialogContent >
      <DialogContentText id="alert-dialog-slide-description">
        <Grid2 container sx={{width:"500px"}} spacing={2} >
            <Grid2 sx={{width:"500px"}}>
              <TextField id="standard-basic" onChange={handleChange("tenDanhSachPhat")} label="Tên danh sách phát" variant="standard" fullWidth value={obj?.tenDanhSachPhat} />
            </Grid2>
        </Grid2>
        <Grid2 sx={{width:"50%" , marginTop:2}}>
    <LocalizationProvider dateAdapter={AdapterDayjs}> {/* Wrap your date picker inside this */}
     <DatePicker
      label="Ngày tạo"
       renderInput={(params) => <TextField {...params} />}
       onChange={handleDateChange("ngayPhatHanh")}
     />
</LocalizationProvider>
    </Grid2>
         
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleCloseModal}>Đóng</Button>
      <Button onClick={()=> handelSave()} >Lưu</Button>
    </DialogActions>
  </Dialog>
  )
}

export default ModalAddPlaylist