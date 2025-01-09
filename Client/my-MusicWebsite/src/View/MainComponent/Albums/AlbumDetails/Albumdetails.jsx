
import {
    Box,
    Typography,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Divider,
    Stack,
    Tooltip,
  } from "@mui/material";
  import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
  import DownloadIcon from '@mui/icons-material/Download';
  import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
  import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

  
  const Albumdetails = () => {
     const {id} = useParams()
     const [songAlbums, setSongAlbums]= useState([])

     useEffect(() => {
        const getAlbums = async () => {
          const response = await axios.get(
            `https://localhost:7280/api/BaiNhac/getbainhacbyalbumid?albumId=${id}`
          );
          if (response.status === 200) {
            setSongAlbums(response?.data);
          }
        };
        getAlbums();
      }, []);

      const handleAddLibary = async (baiNhacId)=>{
        const thuVienId = localStorage.getItem("thuVienID");
        if(thuVienId  == null || undefined)
        {
           toast.warning("Bạn cần đăng nhập để thực hiện chức năng")
        }else
        {
          const data = {
            thuVienId : thuVienId,
            baiNhacId : baiNhacId,
          }
          const response = await axios.post("https://localhost:7280/api/ThuVien/addthuvienbainhac",data)
          if(response.status === 200)
          {
            toast.success("Thêm vào thư viện thành công")
          }
          else
          {
            toast.error("Đã có lỗi xảy ra , vui lòng liên hệ với bộ phận chăm sóc khách hàng để hỗ trợ")
          }
        }
      }

    const userId = localStorage.getItem("userId")
    return (
      <Box sx={{ bgcolor: "#101828", color: "#fff", minHeight: "100vh", p: 3 }}>
        {/* Header Section */}
        <Stack direction="row" spacing={3} alignItems="center">
            <img
                  src={`https://localhost:7280/api/File/image?path=${songAlbums[0]?.album?.url}`}
                  style={{
                    width: "10%",
                    padding: "3px 5px",
                    borderRadius: "5px",
                  }}
                />
          <Box>
            <Typography variant="h4" fontWeight="bold" sx={{ color: "#fff" }}>
             {songAlbums[0]?.album?.tenAlbum}
            </Typography>
            <Typography variant="body2" sx={{ mt: 1, color: "gray" }}>
              {songAlbums[0]?.album?.tenAlbum}
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
            {new Date(songAlbums[0]?.album?.ngayPhatHanh).toLocaleDateString("en-GB")}
            </Typography>
            <IconButton sx={{ mt: 2, bgcolor: "#FF4081", color: "#fff" }}>
              <PlayCircleOutlineIcon fontSize="large" />
            </IconButton>
          </Box>
        </Stack>
  
        <Divider sx={{ my: 3, bgcolor: "gray" }} />
  
        {/* Song List */}
        <List>
          {songAlbums.map((song, index) => (
            <Box key={song.id}>
              <ListItem sx={{ display: "flex", alignItems: "center" }}>
                <Typography
                  sx={{ width: "30px", fontWeight: "bold", textAlign: "center" }}
                >
                  {index + 1}
                </Typography>
                <ListItemAvatar>
                <img
                  src={`https://localhost:7280/api/File/image?path=${song?.duongDanHinhAnh}`}
                  style={{
                    width: "100%",
                    padding: "3px 5px",
                    borderRadius: "5px",
                  }}
                />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      <Link to={`/bainhac/${song.tenBaiNhac}/${song.id}`} style={{textDecoration:"none"}}>
                      {song.tenBaiNhac}
                      </Link>
                    
                    </Typography>
                  }
                  secondary={
                    <Typography variant="caption" sx={{ color: "gray" }}>
                      {song.nhacSi?.tenNhacSi}
                    </Typography>
                  }
                  sx={{ flex: 1, mx: 2 }}
                />
                <Typography sx={{ width: "150px", color: "gray" }}>
                  {song.ngayPhatHanh}
                </Typography>
                <Typography sx={{ flex: 1, color: "gray" }}>
                </Typography>
                <Typography sx={{ width: "60px", textAlign: "center" }}>
                  {song.thoiLuongs}
                </Typography>
                <IconButton onClick={()=> handleAddLibary(song?.id)}>
                  <FavoriteBorderIcon sx={{ color: "gray" }} />
                </IconButton>
                <Tooltip title="Tải bài hát">
                     <IconButton  onClick={async () => {
                  try {
                    if(!userId)
                    {
                      toast.error("Bạn cần phải đăng nhập để tải nhạc")
                    }
                    else
                    {
                      
                      const response = await axios({
                        url: `https://localhost:7280/api/File/file`,
                        method: "GET",
                        params: {
                          path:song?.duongDanFileAmNhac,
                          filename:song?.tenFile,
                        },
                        responseType: "blob",
                      });
                
                      const blob = new Blob([response.data], { type: "audio/mpeg" });
                      const url = window.URL.createObjectURL(blob);
                      const link = document.createElement("a");
                      link.href = url;
                      link.setAttribute("download", `${song?.tenFile}.mp3`);
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                
                      window.URL.revokeObjectURL(url);
                    }
                  } catch (error) {
                    console.error("Error downloading the file", error);
                  }
                }}>
                         <DownloadIcon />
                     </IconButton>
                  </Tooltip>
              </ListItem>
              <Divider sx={{ bgcolor: "gray" }} />
            </Box>
          ))}
        </List>
      </Box>
    );
  };
  
  export default Albumdetails;
  