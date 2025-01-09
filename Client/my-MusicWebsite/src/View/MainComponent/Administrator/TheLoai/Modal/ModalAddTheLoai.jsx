import { useState } from 'react'
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
import { toast } from 'react-toastify';
const ModalAddTheLoai = ({ openModal, handleClose ,setLoading }) => {
      ModalAddTheLoai.propTypes = {
        openModal: PropTypes.bool.isRequired,  
        handleClose: PropTypes.func.isRequired, 
        setLoading : PropTypes.func.isRequired
      };
      const [base64String, setBase64String] = useState("");
      const [imageDataBasic, setImageDataBasic] = useState("");
      const [obj , setObj] = useState({
        tenTheLoai : "",
        file :"",
     })
     const resetForm = () => {
      setObj({
        tenTheLoai : "",
      })    // Reset the text field
      setBase64String('');       // Clear the image preview
      setImageDataBasic(null);   // Reset any other state related to image
    };
      const handleChange = (name) => (event) => {
        setObj({ ...obj, [name]: event.target.value });
      }
      const handleImageConvert = (base64String) => {
        setBase64String(base64String);
        toast.success("Thêm ảnh thành công", {
          toastId: "alert-add-image",
        });
      };

      const handelSave = async () => {
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
        formData.append("tenTheLoai", obj?.tenTheLoai);
        formData.append("file", imageDataBasic);
            const response = await axios.post("https://localhost:7280/api/TheLoai/AddTheLoai", formData, config);
    
            if (response.status === 200) {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Thêm thể loại thành công",
                showConfirmButton: false,
                timer: 1500
              });
               setLoading(true)
                handleClose(); 
            } else {
              Swal.fire({
                position: "center",
                icon: "error",
                title: "Có lỗi đã xảy ra",
                showConfirmButton: false,
              });
            }
       
    };

    const handleCloseModal = () => {
      resetForm();               
      handleClose()    
    };
    
  return (
    <Dialog
    open={openModal}
    keepMounted
   // onClose={handleClose}
    aria-describedby="alert-dialog-slide-description"
  >
    <DialogTitle>{"Thêm mới thể loại nhạc"}</DialogTitle>
    <DialogContent >
      <DialogContentText id="alert-dialog-slide-description">
        <Grid2 container spacing={2} >
            <Grid2 size={12}>
              <TextField id="standard-basic" onChange={handleChange("tenTheLoai")} label="Tên thể loại" variant="standard" />
            </Grid2>
            <Grid2 size={12}> 
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
      <Button onClick={handelSave}>Lưu</Button>
    </DialogActions>
  </Dialog>
  )
}

export default ModalAddTheLoai