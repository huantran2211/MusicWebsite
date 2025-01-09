import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, Button, Grid2 } from '@mui/material';
import { Radio, RadioGroup, FormControlLabel } from '@mui/material';
import axios from 'axios';

const userId = localStorage.getItem('userId')
const ModalAddDanhSachPhat = ({openModal, handleClose ,bainhacId }) => {
    ModalAddDanhSachPhat.propTypes = {
        openModal: PropTypes.bool.isRequired,  
        handleClose: PropTypes.func.isRequired, 
        bainhacId: PropTypes.string.isRequired,  
      };
    
    const [danhSachPhat , setDanhSachPhat] = useState([])
    const [selectedItem, setSelectedItem] = useState(null);
    
   //lấy data danh sách phát theo Id 
    useEffect(()=>{
        const getdanhsachphat = async ()=>{
           const response = await axios.get(`https://localhost:7280/api/DanhSachPhat/getdanhsachphatbyuserid?userId=${userId}`)
            if(response.status === 200)
            {
              setDanhSachPhat(response?.data)
            }
        }
        getdanhsachphat()
      },[])
   

      // handle change modal
      const handleChange = (event) => {
        setSelectedItem((event.target.value));
      };

      const handleCloseModal = () => {            
        handleClose()    
      };
      const handelSave = async () => {
        if (!selectedItem) {
            toast.warning("Vui lòng chọn danh sách phát", {
                toastId: "alert-add-save-warning",
              });
            return;
        }
    
        const formData = new FormData();
        formData.append("BaiNhacId",bainhacId);
        formData.append("DanhSachPhatId",selectedItem);
       
            const response = await axios.post("https://localhost:7280/api/DanhSachPhat/adddanhsachphatbainhac", formData);
    
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
    <DialogTitle>{"Chọn playlist"}</DialogTitle>
    <DialogContent >
      <DialogContentText id="alert-dialog-slide-description">
        <Grid2 container sx={{width:"200px"}} spacing={2} >
        <RadioGroup value={selectedItem} onChange={handleChange}>
            {danhSachPhat.map((item , index)=>(
              <Box key={index}>
                   <FormControlLabel value={item.id} control={<Radio />} label={item.tenDanhSachPhat} />
              </Box>
            ))}
      
      </RadioGroup>
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

export default ModalAddDanhSachPhat