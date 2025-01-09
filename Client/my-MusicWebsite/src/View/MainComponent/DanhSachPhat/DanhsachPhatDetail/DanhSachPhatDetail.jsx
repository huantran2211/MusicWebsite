import { Card, CardMedia, CardContent, Typography, Button, IconButton, Table, TableBody, TableRow, TableCell, TableContainer, Paper } from '@mui/material';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import backgroundPlaylist from "../../../../assets/images/backgroud-playlist.png"
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import { useNavigate, useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import DeleteIcon from '@mui/icons-material/Delete';
import { AudioPlayer } from 'react-audio-player-component';
const PlaylistDetail = () => {
  // Dữ liệu mẫu cho danh sách phát và bài hát
  const { id } = useParams();
  const navigate = useNavigate()
  const [playListDetail ,setPlaylistDetail] = useState([])
  const [danhSachPhatBaiNhac, setDanhSachPhatBaiNhac] = useState([])
  const handleBack = () => {
    navigate(-1); // Quay trở về trang trước đó
  };
  useEffect(()=>{
    const getPlaylistDetail = async ()=>{
       const response = await axios.get(`https://localhost:7280/api/DanhSachPhat/getdanhsachphatbyid?id=${id}`)
       setPlaylistDetail(response?.data)
    }
    getPlaylistDetail()
  },[id])

  useEffect(()=>{
    const getDanhSachPhatBaiNhac = async ()=>{
       const response = await axios.get(`https://localhost:7280/api/DanhSachPhat/getdanhsachphatbainhacbydanhsachphatid?danhSachPhatId=${id}`)
       setDanhSachPhatBaiNhac(response?.data)
    }
    getDanhSachPhatBaiNhac()
  },[id])


  const playlist = {
    title: "test",
    creator: "Võ Đăng Phát",
    visibility: "Công khai",
    imageUrl: "https://link-to-your-image.jpg" // Thay thế bằng URL của hình ảnh
  };

  const songs = [
    { title: "Mặt Trời Của Em", artist: "Phương Ly, JustaTee", album: "Mặt Trời Của Em (Single)", duration: "04:09" }
  ];

  const handleDeleteDanhSachPhatBainhac = async (danhSachPhatId , bainhacId) =>{
      const response = await axios.delete(`https://localhost:7280/api/DanhSachPhat/deletedanhsachphatbainhac?bainhacId=${bainhacId}&danhSachPhatId=${danhSachPhatId}`)
      if(response.status === 200)
      {
        window.location.reload()
      }
      else
      {
        toast.error("Đã có lỗi xảy ra vui lòng liên hệ bộ phận chăm sóc khách hàng để hỗ trợ", {
          toastId: "alert-delete-success",
        });
      }
  }

  const handleDeleteDanhSachPhat = async (danhsachphatid) =>{
      if(danhSachPhatBaiNhac.length > 0)
      {
        toast.warning("Không thể xóa danh sách phát khi còn bài hát", {
          toastId: "alert-danhsachphat-delete",
        });
      }
      else
      {
        const response = await axios.delete(`https://localhost:7280/api/DanhSachPhat/deletedanhsachphat?id=${danhsachphatid}`)
        if(response.status === 200)
        {
          toast.success("Xóa danh sách phát thành công", {
            toastId: "alert-danhsachphat-delete",
          });
          navigate("/Trangchu")
          window.location.reload()
        }
        else
        {
          toast.error("Đã có lỗi xảy ra vui lòng liên hệ với quản trị hệ thống", {
            toastId: "alert-danhsachphat-delete",
          });
        }
      }
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#ffffff', backgroundColor: '#2a2a2a', padding: '20px' }}>
      <Card sx={{ display: 'flex', width: '100%', maxWidth: 800, backgroundColor: '#3c3c3c', color: '#ffffff' }}>
      <Button  onClick={handleBack}>
    <ArrowBackIcon/>
     </Button>
        <CardMedia
          component="img"
          sx={{ width: 160 }}
          image={backgroundPlaylist}
          alt={playlist.title}
        />
        <CardContent>
          <Typography variant="h5">{playListDetail?.tenDanhSachPhat}</Typography>
          {/* <Typography variant="body2" color="text.secondary">Tạo bởi {playlist.creator}</Typography> */}
          {/* <Typography variant="body2" color="text.secondary">{playlist.visibility}</Typography> */}
          <Button variant="contained" color="secondary" startIcon={<PlayArrowIcon />} sx={{ marginTop: 2 }}>
            PHÁT NGẪU NHIÊN
          </Button>
        </CardContent>
        <IconButton sx={{ color: '#ffffff' }}>
          <PlaylistAddIcon />
        </IconButton>
        <IconButton sx={{ color: '#ffffff' }} onClick={() => handleDeleteDanhSachPhat(id)}>
          <DeleteIcon />
        </IconButton>
      </Card>

      <Typography variant="h6" sx={{ marginTop: 3 }}>BÀI HÁT</Typography>

      <TableContainer component={Paper} sx={{ maxWidth: 800, backgroundColor: '#3c3c3c', color: '#ffffff' }}>
        <Table>
          <TableBody>
            {danhSachPhatBaiNhac.map((song, index) => (
              <TableRow key={index}>
                <TableCell padding="checkbox">
                  <IconButton sx={{ color: '#ffffff' }}>
                    <img style={{width:"50px", height:"50px" ,padding:"10px" }} src={`https://localhost:7280/api/File/image?path=${song?.baiNhac?.duongDanHinhAnh}`}></img>
                  </IconButton>
                </TableCell>
                <TableCell>
                  <Typography>{song?.baiNhac?.tenBaiNhac}</Typography>
                  <Typography variant="body2" color="text.secondary">{}</Typography>
                </TableCell>
                <TableCell>
                <AudioPlayer
         src={`https://localhost:7280/api/File/file?path=${encodeURIComponent(song?.baiNhac?.duongDanFileAmNhac)}&filename=${encodeURIComponent(song?.baiNhac?.tenFile)}`}
         minimal={true}
         width={350}
         trackHeight={20}
         barWidth={1}
         gap={1}
         visualise={false}
         barPlayedColor="pink"
         skipDuration={2}
         showLoopOption={true}
         showVolumeControl={true}
         volumeControlColor={true}
         seekBarColor="pink"
         hideSeekBar={true}
         hideTrackKnobWhenPlaying={true}
         allowSkip={true}
       />
                </TableCell>
                <TableCell align="center">{song.album}</TableCell>
                <TableCell align="right">{song?.baiNhac?.thoiLuong }</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleDeleteDanhSachPhatBainhac(song?.danhSachPhatId,song?.baiNhacId)}>
                  <DeleteSweepIcon />
                  </IconButton>
                  </TableCell>
                   
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* <Typography variant="body2" sx={{ marginTop: 2 }}>{songs.length} bài hát • {songs.reduce((acc, song) => acc + parseFloat(song.duration.split(":")[0]) + parseFloat(song.duration.split(":")[1]) / 60, 0).toFixed(2)} phút</Typography> */}
    </div>
  );
};

export default PlaylistDetail;
