import { Box, Button, Grid2, InputAdornment, TextField, Typography } from "@mui/material"
import logo from "../../../assets/images/logo.png"
import AccountCircle from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import HttpsIcon from '@mui/icons-material/Https';
import { toast } from "react-toastify";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const navigate = useNavigate();
  const [obj , setObj] = useState({
    tenNguoiDung :"",
    email :"",
    soDienThoai :"",
    password :""
  })
  
  const gotoLink = ()=>
  {
    navigate("/Login")
  }

  const handleChange = (name) => (event) => {
    setObj({ ...obj, [name]: event.target.value });
  }
  
  const handelSubmit = async ()=>
  {
    if(!obj.tenNguoiDung || !obj.email || !obj.password || !obj.soDienThoai)
    {
         toast.warning("Bạn chưa nhập đủ thông tin ")
         return 
    }
     const formData = new FormData()

     formData.append("tenNguoiDung",obj.tenNguoiDung)
     formData.append("email",obj.email)
     formData.append("soDienThoai",obj.soDienThoai)
     formData.append("password",obj.password)

     const response = await axios.post("https://localhost:7280/api/Auth/register", formData);
     if(response?.data?.status == 200)
     {
      toast.success("Đăng kí thành công", {
        toastId: "alert-save-user",
      });
      gotoLink()
     }else if (response?.data?.status == 202) {
      toast.warning("Tài khoản đã tồn tại trong hệ thống", {
        toastId: "alert-save-user",
      });
     }
     else
     {
      toast.error("Đã có lỗi xảy ra", {
        toastId: "alert-save-user",
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
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "15vh" }}>
                 <img style={{ width: "50%" }} src={logo} alt="Logo" />
            </div>
             <Typography align="center" variant="h5" sx={{padding:3}}>Đăng kí tài khoản</Typography>
             <TextField
        id="input-with-icon-textfield"
        label="Họ và tên"
        fullWidth
        onChange={handleChange("tenNguoiDung")}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            ),
          },
        }}
        variant="filled"
      />
       <TextField
        id="input-with-icon-textfield"
        label="Email"
        fullWidth
        sx={{marginTop:5}}
        onChange={handleChange("email")}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon />
              </InputAdornment>
            ),
          },
        }}
         variant="filled"
      />
        <TextField
        id="input-with-icon-textfield"
        label="Số điện thoại"
        fullWidth
        onChange={handleChange("soDienThoai")}
        sx={{marginTop:5}}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <PhoneEnabledIcon />
              </InputAdornment>
            ),
          },
        }}
         variant="filled"
      />
      <TextField
        id="input-with-icon-textfield"
        label="Mật khẩu"
        type="password"
        onChange={handleChange("password")}
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
      <Button fullWidth onClick={handelSubmit} sx={{marginTop:5 ,backgroundColor:"#f010ae"}}>
           Đăng kí
      </Button>
        </Box>
    </Grid2>
  )
}

export default Register