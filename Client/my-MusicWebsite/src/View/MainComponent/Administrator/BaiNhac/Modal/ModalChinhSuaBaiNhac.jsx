import { Dialog } from "@mui/material"
import { Button,  DialogActions, DialogContent, DialogContentText, DialogTitle, Grid2, TextField } from '@mui/material'

import PropTypes from 'prop-types';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'; 
import { DatePicker } from '@mui/x-date-pickers';
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import axios from "axios";
import { toast } from "react-toastify";


const ModalChinhSuaBaiNhac = ({ openModal, handleClose, setLoading, baiNhacId }) => {
    ModalChinhSuaBaiNhac.propTypes = {
        openModal: PropTypes.bool.isRequired,
        handleClose: PropTypes.func.isRequired,
        setLoading: PropTypes.func.isRequired,
        baiNhacId: PropTypes.string.isRequired,
      };
      const [selectedDate, setSelectedDate] = useState(null);
      const [obj , setObj] = useState({
        tenBaiNhac :"",
        ngayPhatHanh : "",
        loiBaiHat :"",
        thoiLuong :"",
        nhacSiId :null,
        theLoaiId :null,
        tamTrangId :null,
        chudeId :null,
        albumId :null,
      });
      const handleChange = (name) => (event) => {
        setObj({ ...obj, [name]: event.target.value });
      };
      const handleDateChange = (field) => (newValue) => {
        // Convert the new date to the required format or just store it
        setSelectedDate(newValue);
        console.log(`${field} updated to`, newValue ? dayjs(newValue).format("YYYY-MM-DD") : "null");
      };
      const getData = async () => {
        try {
          const response = await axios.get(`https://localhost:7280/api/BaiNhac/getbainhacbyid?Id=${baiNhacId}`);
          if (response.status === 200) {
            const data = response.data;
            const ngayPhatHanhDate = dayjs(data.ngayPhatHanh);
            setSelectedDate(ngayPhatHanhDate);
            setObj({
              tenBaiNhac: data.tenBaiNhac,
              thoiLuong : data.thoiLuong,
              loiBaiHat : data.loiBaiHat
            });
           
          }
        } catch (error) {
          console.error("Error fetching data: ", error);
        }
      };

      const handleUpdate = async () => {
      
        const formData = new FormData();
        // const config = {
        //   headers: {
        //     "Content-Type": "multipart/form-data",
        //   },
        // };
        formData.append("id", baiNhacId);
        formData.append("tenBaiNhac", obj?.tenBaiNhac);
        formData.append("ngayPhatHanh", selectedDate);  
        formData.append("thoiLuong", obj?.thoiLuong);
        formData.append("loiBaiHat", obj?.loiBaiHat);
    
        try {
          const response = await axios.put(`https://localhost:7280/api/BaiNhac/updatebainhac?Id=${baiNhacId}`, formData);
          if (response.status === 200) {
            toast.success("Chỉnh sửa thành công", {
                toastId: "alert-update-baihats",
              });
            setLoading(true);  
            handleClose();   
          }
        } catch (error) {
            toast.error("Đã có lỗi khi xảy ra", {
                toastId: "alert-update-baihats",
              });
          console.error("Error updating data: ", error);
        }
      };
    
      // Load data when modal is open
      useEffect(() => {
        if (openModal && baiNhacId) {
            getData();  // Fetch data to populate the form
        }
      }, [openModal, baiNhacId]);
  return (
    <Dialog
    open={openModal}
    keepMounted
   // onClose={handleClose}
    aria-describedby="alert-dialog-slide-description"
  >
    <DialogTitle>{"Chỉnh sửa bài nhạc"}</DialogTitle>
    <DialogContent >
    <DialogContentText id="alert-dialog-slide-description">
   <Grid2 container sx={{width:"500px"}}>
    <Grid2 sx={{width:"100%"}} >
      <TextField
        id="standard-basic"
        value={obj.tenBaiNhac || ""}
        label="Tên bài nhạc"
        variant="outlined"
        fullWidth
        onChange={handleChange("tenBaiNhac")}
      />
    </Grid2>
    <Grid2 sx={{width:"50%" , marginTop:2}}>
    <LocalizationProvider dateAdapter={AdapterDayjs}> {/* Wrap your date picker inside this */}
     <DatePicker
      label="Ngày phát hành"
      value={selectedDate}
       renderInput={(params) => <TextField {...params} />}
       onChange={handleDateChange("ngayPhatHanh")}
     />
</LocalizationProvider>
    </Grid2>
    <Grid2 sx={{width:"50%" ,marginTop:2}} >
      <TextField
        id="standard-basic"
        value={obj.thoiLuong || ""}
        label="Thời lượng"
        variant="outlined"
        fullWidth
        onChange={handleChange("thoiLuong")}
      />
    </Grid2>
    <Grid2 sx={{width:"100%" ,marginTop:2}} >
      <TextField
        id="standard-basic"
        value={obj.loiBaiHat || ""}
        label="lời bài hát"
        variant="outlined"
        type=''
        fullWidth
        onChange={handleChange("loiBaiHat")}
      />
    </Grid2>
  </Grid2>
</DialogContentText>

    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose}>Đóng</Button>
      <Button onClick={handleUpdate}>Lưu</Button>
    </DialogActions>
  </Dialog>
  )
}

export default ModalChinhSuaBaiNhac