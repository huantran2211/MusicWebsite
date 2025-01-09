import { Box, Button, Grid2, InputAdornment, TextField, Typography } from "@mui/material"
import logo from "../../../assets/images/logo.png"
import EmailIcon from '@mui/icons-material/Email';
import HttpsIcon from '@mui/icons-material/Https';
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import hadLogin from "../../../assets/images/haslogin.png"
const Login = () => {
   const [obj , setObj] = useState({
      email :"",
      password :"",
   })
   const navigate = useNavigate()
   const gotolink = ()=>{
     navigate("/Profile")
   }
   const handleChange = (name) => (event) => {
    setObj({ ...obj, [name]: event.target.value });
  }
    const handleSubmit = async () =>{
      const formData = new FormData();
      if(!obj.email || !obj.password)
      {
        toast.warning("Bạn chưa nhập tài khoản và mật khẩu", {
          toastId: "alert-add-save-success",
        });
        return 
      }
      formData.append("email", obj?.email)
      formData.append("password", obj?.password)
      const config = {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    };
      const response = await axios.post("https://localhost:7280/api/Auth/login", formData,config);

      if(response?.data.status === 200)
      {
        localStorage.setItem("token", response?.data?.token)
        localStorage.setItem("role", response?.data?.roleId)
        localStorage.setItem("userId", response?.data?.id)
        toast.success("Đăng nhập thành công", {
          toastId: "alert-add-save-success",
        });
        window.location.reload();
        gotolink()
      }
      else
      {
        toast.error("Tài khoản hoặc mật khẩu không đúng", {
          toastId: "alert-add-save-success",
        });
      }
    }
    const token = localStorage.getItem("token")
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
          {token ? (
            <Box display={"flex"} alignItems={"center"} textAlign={"center"}>
              <div>

              <img src={hadLogin} style={{width:"300px" ,height:"300px" ,color:"#fff"}}></img>
              </div>
              <Typography variant="h3" >
                Bạn đã đăng nhập vui lòng chuyển trang để nghe nhạc
              </Typography>
            </Box>
          ):(
            <Box sx={styleBox}>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "15vh" }}>
                     <img style={{ width: "50%" }} src={logo} alt="Logo" />
                </div>
                 <Typography align="center" variant="h5" sx={{padding:3}}>Đăng nhập</Typography>
                
           <TextField
            id="input-with-icon-textfield"
            label="Email"
            onChange={handleChange("email")}
            fullWidth
            sx={{marginTop:5}}
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
          <Button fullWidth sx={{marginTop:5 ,backgroundColor:"#f010ae"}} onClick={handleSubmit}>
               Đăng nhập
          </Button>
            </Box>
          )}
        </Grid2>
      )
}

export default Login