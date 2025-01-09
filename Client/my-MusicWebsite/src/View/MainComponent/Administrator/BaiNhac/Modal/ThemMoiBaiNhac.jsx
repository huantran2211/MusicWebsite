import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid2, TextField, Typography } from '@mui/material'
import  { useEffect, useState } from 'react'
import CustomImageUpload from '../../../../../Components/CustomUploadImage/CusTomUploadImages'
import Swal from 'sweetalert2';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'; 
import { DatePicker } from '@mui/x-date-pickers';
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { toast } from 'react-toastify';
import axios from 'axios';
const ThemMoiBaiNhac = ({openModal,handleClose,setLoading}) => {
    ThemMoiBaiNhac.propTypes = {
        openModal: PropTypes.bool.isRequired,  
        handleClose: PropTypes.func.isRequired,
        setLoading : PropTypes.func.isRequired

     };
    const [base64String, setBase64String] = useState("");
    const [dataNhacSi ,setDataNhacSi] = useState([]);
    const [dataTheLoai,setDataTheLoai] = useState([]);
    const [dataTamTrang,setDataTamTrang] = useState([]);
    const [dataChuDe,setDataChuDe] = useState([]);
    const [dataQuocGia,setDataQuocGia] = useState([]);
    const [dataAlbum , setDataAlbum] = useState([]);
    const [base64StringBanner, setBase64StringBanner] = useState("");
    const [imageDataBasic, setImageDataBasic] = useState("");
    const [bannderDataBasic , setBannersDataBasic] = useState("");
    const [selectedDate, setSelectedDate] = useState(null);
    const [files,setFiles] = useState("");
    const [obj , setObj] = useState({
      tenBaiNhac :"",
      ngayPhatHanh : "",
      duongDanHinhAnh :"",
      duongDanBanner :"",
      duongDanFileAmNhac:"",
      loiBaiHat :"",
      nhacSiId :"",
        theLoaiId :"",
        tamTrangId :"",
        chudeId :"",
        albumId :"",
        quocgiaId : "",
        alBumId :"",
    });
    //handle Changes values obj
    const handleChange = (name) => (event) => {
      setObj({ ...obj, [name]: event.target.value });
    }
    const handleDateChange = (field) => (newValue) => {
      // Convert the new date to the required format or just store it
      setSelectedDate(newValue);
      console.log(`${field} updated to`, newValue ? dayjs(newValue).format("YYYY-MM-DD") : "null");
    };
    const handleFileChange = (e) => {
      if (Array.from(e.target.files).some((arr) => arr?.size < 30000000)) {
        toast.success("Thêm file thành công", {
          toastId: "alert-add-image",
        });
        const selectedFiles = Array.from(e.target.files);
        setFiles([...files, ...selectedFiles]); 
    
      } else {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "File của bạn không được vượt quá 30MB",
          showConfirmButton: false,
          timer: 1500
        });
      }
    };

    const resetForm = () => {
      setObj({
        tenBaiNhac :"",
        ngayPhatHanh : "",
        duongDanHinhAnh :"",
        duongDanBanner :"",
        duongDanFileAmNhac:"",
        loiBaiHat :"",
        nhacSiId :"",
        theLoaiId :"",
        tamTrangId :"",
        chudeId :"",
        albumId :"",
        quocgiaId : "",
        alBumId :"",
      })    
      setBase64String('');     
      setBase64StringBanner('')
      setImageDataBasic(null);  
      setBannersDataBasic(null);
      setFiles(null);
    };
    //convert image
    const handleImageConvert = (base64String) => {
        setBase64String(base64String);
        toast.success("Thêm ảnh thành công", {
          toastId: "alert-add-image",
        });
      };
    //convert banner 
    const handleBannerConvert = (base64StringBanner) => {
      setBase64StringBanner(base64StringBanner);
      toast.success("Thêm banner thành công", {
        toastId: "alert-add-image",
      });
    };

      const handleCloseModal = () => {
         resetForm();               
        handleClose()    
      };

    const handelSubmit  = async () =>{
      // if (!obj?.tenBaiNhac || !obj.ngayPhatHanh || !obj.loiBaiHat || !obj.thoiLuong ||!imageDataBasic || !bannderDataBasic) {
      //   Swal.fire({
      //     position: "center",
      //     icon: "warning",
      //     title: "Vui lòng nhập đầy đủ dữ liệu",
      //     showConfirmButton: false,
      //   });
      //     return;
      // }
       const formData = new FormData();
       const config = {
        headers: {
            "Content-Type": "multipart/form-data"
        }
        };
      formData.append("TenBaiNhac" , obj.tenBaiNhac)
      formData.append("NgayPhatHanh" , selectedDate)
      formData.append("ThoiLuong" , obj.thoiLuong)
      formData.append("LoiBaiHat" , obj.loiBaiHat)
      formData.append("DuongDanHinhAnh" , imageDataBasic)
      formData.append("DuongDanBanner" , bannderDataBasic)
      formData.append("DuongDanBanner" , bannderDataBasic)
      formData.append("DuongDanFileAmNhac" , files[0])
      formData.append("NhacSiId" , obj.nhacSiId)
      formData.append("TheLoaiId" , obj.theLoaiId)
      formData.append("TamTrangId" , obj.tamTrangId)
      formData.append("ChudeId" , obj.chudeId)
      formData.append("AlbumId" , obj.albumId)
      formData.append("QuocGiaId" , obj.quocgiaId)
      formData.append("AlbumId" , obj.alBumId)

      const response = await axios.post("https://localhost:7280/api/BaiNhac/addbainhac", formData, config);
      if (response.status== 200)
      {
        if (response.status === 200) {
          toast.success("Thêm bài hát thành công", {
            toastId: "alert-add-baihats",
          });
            setLoading(true)
            handleClose(); 
        } else {
          toast.error("Có lỗi đã xảy ra", {
            toastId: "alert-add-baihats",
          });
        }
      }
    }

    useEffect(()=>{
      const getNhacSi = async ()=>{
         const response = await axios.get("https://localhost:7280/api/NhacSi/getallnhacsi")
          if(response.status === 200)
          {
            setDataNhacSi(response?.data)
          }
      }
       getNhacSi()
    },[])
    useEffect(()=>{
      const getTheLoai = async ()=>{
         const response = await axios.get("https://localhost:7280/api/TheLoai/GetAllTheLoai")
          if(response.status === 200)
          {
            setDataTheLoai(response?.data)
          }
      }
      getTheLoai()
    },[])
    useEffect(()=>{
      const getTamTrang = async ()=>{
         const response = await axios.get("https://localhost:7280/api/TamTrang/getalltamtrang")
          if(response.status === 200)
          {
            setDataTamTrang(response?.data)
          }
      }
      getTamTrang()
    },[])

    useEffect(()=>{
      const getChuDe = async ()=>{
         const response = await axios.get("https://localhost:7280/api/ChuDe/getallchude")
          if(response.status === 200)
          {
            setDataChuDe(response?.data)
          }
      }
      getChuDe()
    },[])

    useEffect(()=>{
      const getQuocGia = async ()=>{
         const response = await axios.get("https://localhost:7280/api/QuocGia/getallquocgia")
          if(response.status === 200)
          {
            setDataQuocGia(response?.data)
          }
      }
      getQuocGia()
    },[])

    useEffect(()=>{
      const getAlbum = async ()=>{
         const response = await axios.get("https://localhost:7280/api/Album/getallalbum")
          if(response.status === 200)
          {
            setDataAlbum(response?.data)
          }
      }
      getAlbum()
    },[])




  return (
    <Dialog
    open={openModal}
    keepMounted
   // onClose={handleClose}
    aria-describedby="alert-dialog-slide-description"
  >
    <DialogTitle>{"Thêm mới bài nhạc"}</DialogTitle>
    <DialogContent >
    <DialogContentText id="alert-dialog-slide-description">
   <Grid2 container sx={{width:"500px"}}>
    <Grid2 sx={{width:"100%"}} >
      <TextField
        id="standard-basic"
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
       renderInput={(params) => <TextField {...params} />}
       onChange={handleDateChange("ngayPhatHanh")}
     />
</LocalizationProvider>
    </Grid2>
    <Grid2 sx={{width:"50%" ,marginTop:2}} >
      <TextField
        id="standard-basic"
        label="Thời lượng"
        variant="outlined"
        fullWidth
        onChange={handleChange("thoiLuong")}
      />
    </Grid2>
    <Grid2 sx={{width:"100%" ,marginTop:2}} >
      <TextField
        id="standard-basic"
        label="lời bài hát"
        variant="outlined"
        type=''
        fullWidth
        onChange={handleChange("loiBaiHat")}
      />
    </Grid2>
    <Grid2 sx={{width:"100%" ,marginTop:2}}>
    <Typography variant="h6">Banner</Typography>
    </Grid2>
    <Grid2  >
      <CustomImageUpload
        onImageConvert={handleBannerConvert}
        setImageDataBasic={setBannersDataBasic}
      />
      {base64StringBanner && (
        <div style={{ textAlign: "center" }}>
       
          <img
            src={base64StringBanner}
            alt="Converted"
            style={{ maxWidth: "100%", maxHeight: "300px" }}
          />
        </div>
      )}
    </Grid2>
    <Grid2 sx={{width:"100%" ,marginTop:2}}>
    <Typography variant="h6">Hình ảnh</Typography>
    </Grid2>
    <Grid2  >
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

    <Grid2 sx={{width:"100%" ,marginTop:2}}>
          <label htmlFor="inputUploadFile" className="drop-container">
            <Typography variant="h6">Chọn file upload</Typography>
            <CloudUploadIcon color="primary" />
            <input
              id="inputUploadFile"
              type="file"
              multiple
              onChange={handleFileChange}
            />
          </label>
        </Grid2>
        <Grid2 sx={{width:"100%" ,marginTop:2}}>
        <Autocomplete
      options={dataNhacSi}
      getOptionLabel={(option) => option.tenNhacSi}
      onChange={(event, newValue) => {
        setObj((prev) => ({
          ...prev,
          nhacSiId: newValue ? newValue.id : "", 
        }));
      }}
      renderInput={(params) => <TextField {...params} label="Nhạc sĩ" />}
    />
        </Grid2>
        <Grid2 sx={{width:"100%" ,marginTop:2}}>
        <Autocomplete
      options={dataTheLoai}
      getOptionLabel={(option) => option.tenTheLoai}
      onChange={(event, newValue) => {
        setObj((prev) => ({
          ...prev,
          theLoaiId: newValue ? newValue.id : "", 
        }));
      }}
      renderInput={(params) => <TextField {...params} label="Thể loại" />}
    />
        </Grid2>
        <Grid2 sx={{width:"100%" ,marginTop:2}}>
        <Autocomplete
      options={dataAlbum}
      onChange={(event, newValue) => {
        setObj((prev) => ({
          ...prev,
         albumId : newValue ? newValue.id : "", 
        }));
      }}
      getOptionLabel={(option) => option.tenAlbum}
      renderInput={(params) => <TextField {...params} label="Album" />}
    />
        </Grid2>
        <Grid2 sx={{width:"100%" ,marginTop:2}}>
        <Autocomplete
      options={dataTamTrang}
      getOptionLabel={(option) => option.tenTamTrang}
      onChange={(event, newValue) => {
        setObj((prev) => ({
          ...prev,
          tamTrangId: newValue ? newValue.id : "", 
        }));
      }}
      renderInput={(params) => <TextField {...params} label="Tâm trạng" />}
    />
        </Grid2>
        <Grid2 sx={{width:"100%" ,marginTop:2}}>
        <Autocomplete
      options={dataChuDe}
      onChange={(event, newValue) => {
        setObj((prev) => ({
          ...prev,
         chudeId : newValue ? newValue.id : "", 
        }));
      }}
      getOptionLabel={(option) => option.tenChuDe}
      renderInput={(params) => <TextField {...params} label="Chủ đề" />}
    />
        </Grid2>
        <Grid2 sx={{width:"100%" ,marginTop:2}}>
        <Autocomplete
      options={dataQuocGia}
      onChange={(event, newValue) => {
        setObj((prev) => ({
          ...prev,
         quocgiaId : newValue ? newValue.id : "", 
        }));
      }}
      getOptionLabel={(option) => option.tenQuocGia}
      renderInput={(params) => <TextField {...params} label="Quốc gia" />}
    />
        </Grid2>
      
  </Grid2>
</DialogContentText>

    </DialogContent>
    <DialogActions>
      <Button onClick={handleCloseModal}>Đóng</Button>
      <Button onClick={ handelSubmit}>Lưu</Button>
    </DialogActions>
  </Dialog>
  )
}

export default ThemMoiBaiNhac