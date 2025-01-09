import { Box, Button, Grid2, InputAdornment, TextField, Typography } from "@mui/material"
import EmailIcon from '@mui/icons-material/Email';
import HttpsIcon from '@mui/icons-material/Https';
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const userId = localStorage.getItem('userId');
const ChangePassword = () => {
   const [obj , setObj] = useState({
      oldPassword:"",
      newPassword:"",
      confirmPassword:"",
   })
   const navigate = useNavigate()
   const gotolink = ()=>{
     navigate("/Profile")
   }
   const handleChange = (name) => (event) => {
    setObj({ ...obj, [name]: event.target.value });
  }
    const handleSubmit = async () =>{
      if(!obj.newPassword || !obj.oldPassword)
      {
        toast.warning("Bạn chưa nhập thông tin", {
          toastId: "alert-add-save-success",
        });
        return 
      }
      if(obj.newPassword != obj.confirmPassword)
      {
        toast.warning("Mật khẩu xác nhận không chính xác", {
            toastId: "alert-add-save-success",
          });
          return 
      }
    
      const response = await axios.put(`https://localhost:7280/api/Auth/resetpassword?id=${userId}&oldPassword=${obj.oldPassword}&newPassword=${obj.confirmPassword}`);

      if(response?.data.status === 200)
      {
        toast.success("Đổi mật khẩu thành công", {
          toastId: "alert-add-save-success",
        });
      }
      else if(response?.data.status === 403)
      {
        toast.error("Mật khẩu cũ không đúng", {
            toastId: "alert-add-save-success",
          });
      }
      else
      {
        toast.error("Không tìm thấy người dùng", {
          toastId: "alert-add-save-success",
        });
      }
    }
    const styleContainer ={
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
      
      }
      const styleBox = {
        boxShadow:"rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px",
        width:"500px",
       // backgroundImage: `url(${background})`, 
        backgroundSize: "cover", 
        backgroundPosition: "center",
        padding:"50px"
      }
      return (
        <Grid2 sx={styleContainer}>
           <Box sx={styleBox}>
                 <Typography align="center" variant="h5" sx={{padding:3}}>Đổi mật khẩu</Typography>
          <TextField
            id="input-with-icon-textfield"
            label="Mật khẩu Hiện tại"
            type="password"
            onChange={handleChange("oldPassword")}
            fullWidth
            sx={{marginTop:5}}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <HttpsIcon />
                  </InputAdornment>
                ),
              },
            }}
             variant="filled"
          />
          <TextField
            id="input-with-icon-textfield"
            label="Mật khẩu Mới"
            type="password"
            onChange={handleChange("newPassword")}
            fullWidth
            sx={{marginTop:5}}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <HttpsIcon />
                  </InputAdornment>
                ),
              },
            }}
             variant="filled"
          />
          <TextField
            id="input-with-icon-textfield"
            label="Xác nhận mật khẩu"
            type="password"
            onChange={handleChange("confirmPassword")}
            fullWidth
            sx={{marginTop:5}}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <HttpsIcon />
                  </InputAdornment>
                ),
              },
            }}
             variant="filled"
          />
          <Button fullWidth sx={{marginTop:5 ,backgroundColor:"#f010ae"}} onClick={handleSubmit}>
               Đổi mật khẩu
          </Button>
            </Box>
        </Grid2>
      )
}

export default ChangePassword