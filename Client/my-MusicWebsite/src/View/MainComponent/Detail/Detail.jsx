import {
  Avatar,
  Box,
  Button,
  Grid2,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AudioPlayer } from "react-audio-player-component";
import "../../../css/main.css";
import "react-h5-audio-player/lib/styles.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import ModalAddDanhSachPhat from "./Modal/ModalAddDanhSachPhat";
import DownloadIcon from '@mui/icons-material/Download';
import { Link } from "react-router-dom";
import { gray } from "../../../Theme/shared-theme/themePrimitives";
import { toast } from "react-toastify";
const Detail = () => {
  const { id } = useParams();
  const [dataBaiNhac, setDataBaiNhac] = useState({});
  const [dataBaiNhacByNhacSiId, setBaiNhacByNhacSiId] = useState([]);
  const [fileName, setFileName] = useState("");
  const [filePath, setFilePath] = useState("");
  const [spinning, setSpinning] = useState(false);
  const [modal, setModal] = useState(false);
  const [startAudio, setStartAudio] = useState(false);
  const [url, setUrl] = useState("");
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const handleBack = () => {
    navigate(-1); // Quay trở về trang trước đó
  };
  const handelOpenModalAddDanhSachPhat = () => {
    setModal(true);
  };
  const handelcloseModalAddDanhSachPhat = () => {
    setModal(false);
  };

  useEffect(() => {
    const getSongDetail = async () => {
      const response = await axios.get(
        `https://localhost:7280/api/BaiNhac/getbainhacbyid?Id=${id}`
      );
      if (response.status === 200) {
        setDataBaiNhac(response?.data);
        setFileName(response?.data?.tenFile);
        setFilePath(response?.data?.duongDanFileAmNhac);
      }
    };
    getSongDetail();
  }, []);

  useEffect(() => {
    const GetBaiNhacByNhacSiId = async () => {
      const response = await axios.get(
        `https://localhost:7280/api/BaiNhac/getbainhacbynhacsiid?nhacSiId=${dataBaiNhac?.nhacSiId}`
      );
      if (response.status === 200) {
        setBaiNhacByNhacSiId(response?.data);
      }
    };
    if (dataBaiNhac?.id !== null) {
      GetBaiNhacByNhacSiId();
    }
  }, [dataBaiNhac?.id]);

  const handleSpin = () => {
    setSpinning(true);
    setTimeout(() => {
      setSpinning(false);
    }, 30000);
  };
  useEffect(() => {
    const UpdateView = async () => {
      await axios.put(`https://localhost:7280/api/BaiNhac/updateview?id=${id}`);
    };
    if (startAudio) UpdateView();
  }, [id, startAudio]);


  useEffect(() => {
    if (filePath && fileName) {
      const newUrl = `https://localhost:7280/api/File/file?path=${encodeURIComponent(
        filePath
      )}&filename=${encodeURIComponent(fileName)}`;
      setUrl(newUrl);
    }
  }, [filePath, fileName]);

  //Lưu lịch sử
  const handelSaveHistory = async () => {
    const formData = new FormData();
    formData.append("BaiNhacId", dataBaiNhac?.id);
    formData.append("UserId", userId);
    formData.append("TheLoaiId", dataBaiNhac?.theLoaiId);
    await axios.post(
      "https://localhost:7280/api/LichSuNgheNhac/addlichsunghenhac",
      formData
    );
  };
  const handleOnPlay = () => {
    setStartAudio(true); // Hàm đầu tiên
    handelSaveHistory(); // Hàm thứ hai
  };

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


  return (
    <Grid2 container spacing={2}>
      <Button onClick={handleBack}>
        <ArrowBackIcon />
      </Button>
      <Box
        sx={{
          position: "relative", // Để lớp overlay có thể phủ lên ảnh
          width: "100%",
          height: "600px",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        {/* Ảnh */}
        <img
          src={`https://localhost:7280/api/File/image?path=${dataBaiNhac.duongDanHinhAnh}`}
          alt="Bai Nhac"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "5px",
          }}
        />

        {/* Lớp overlay */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontSize: "24px",
            fontWeight: "bold",
            borderRadius: "10px",
          }}
        >
          <div
            className={`disk ${spinning ? "spin" : ""}`}
            onClick={handleSpin}
          >
            <img
              src={`https://localhost:7280/api/File/image?path=${dataBaiNhac.duongDanHinhAnh}`}
              alt="Disk"
              className="disk"
            />
          </div>
          <Stack
            direction="row"
            spacing={2}
            sx={{
              width: "50%",
            }}
          >
            <Box>
              <Typography variant="h3" component="h3" sx={{ width: "600px" }}>
                {dataBaiNhac.tenBaiNhac}
              </Typography>
              <Typography variant="caption" component="p">
                {dataBaiNhac.nhacSi?.tenNhacSi}
              </Typography>
              <Typography variant="caption" component="p">
               Lượt nghe :  {dataBaiNhac.luotNghe}
              </Typography>
              <Typography variant="caption" component="p">
               Thể loại:  {dataBaiNhac?.theLoai?.tenTheLoai}
              </Typography>
            </Box>
            <Box sx={{display:"flex" ,gap:1}}>
            <Tooltip title="Thêm bài hát vào thư viện">
               <IconButton onClick={()=>handleAddLibary(id)}>
                  <FavoriteBorderIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title="Thêm vào danh sách phát">
              <IconButton onClick={handelOpenModalAddDanhSachPhat}>
                <PlaylistAddIcon />
              </IconButton>
            </Tooltip>
            </Box>
          </Stack>
          <Box marginTop={5}>
            <div>
              {url && (
                <AudioPlayer
                  src={url}
                  minimal={false}
                  width={750}
                  trackHeight={75}
                  // barWidth={1}
                  gap={1}
                  visualise={true}
                  barPlayedColor="pink"
                  skipDuration={2}
                  showLoopOption={true}
                  showVolumeControl={true}
                  volumeControlColor={true}
                  seekBarColor="pink"
                  hideSeekBar={true}
                  hideTrackKnobWhenPlaying={true}
                  onplay={() => {
                    handleOnPlay();
                  }}
                  allowSkip={true}
                  barWidth={true}
                />
              )}
            </div>
          </Box>
        </Box>
      </Box>
      <Typography
        variant="h4"
        component="div"
        style={{
          color: "white",
          fontWeight: "bold",
          marginTop: "20px",
          padding: "0px 30px",
        }}
      >
        Bài hát cùng <span style={{ color: "#FF69B4" }}> nhạc sĩ</span>
      </Typography>
      <Grid2
        container
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        {dataBaiNhacByNhacSiId.map((data, index) => {
          return (
            <Box
              sx={{
                width: "1200px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 2,
                borderRadius: 2,
                boxShadow: 3,
                backgroundColor: gray[800],
              }}
              key={index}
            >
              {/* Thumbnail */}
              <Avatar
                variant="square"
                src={`https://localhost:7280/api/File/image?path=${data.duongDanHinhAnh}`}
                alt="Thumbnail"
                sx={{ width: 60, height: 60, borderRadius: 1 }}
              />
          

              {/* Content */}
              <Box sx={{ flex: 1, marginLeft: 2 }}>
                
                {/* Title */}
                <Link to={`/bainhac/${data.tenBaiNhac}/${data.id}`} style={{textDecoration:"none"}}>
                      {data.tenBaiNhac}
                      </Link>
                {/* Subtitle */}
                <Typography variant="body2" color="text.secondary">
                  Aylex
                </Typography>
                
              </Box>
              <Box sx={{ flex: 2 }}>
                  <AudioPlayer
                src={`https://localhost:7280/api/File/file?path=${encodeURIComponent(
                  data?.duongDanFileAmNhac
                )}&filename=${encodeURIComponent(data?.tenFile)}`}
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
              </Box>
            
              {/* Download Button */}
              <Tooltip title="Tải bài hát">
                     <IconButton  onClick={async () => {
                  try {
                       if(!userId)
                       {
                        toast.error("Bạn cần phải đăng nhập để tải nhạc ")
                       }
                       else
                       {
                         const response = await axios({
                           url: `https://localhost:7280/api/File/file`,
                           method: "GET",
                           params: {
                             path:data?.duongDanFileAmNhac,
                             filename:data?.tenFile,
                           },
                           responseType: "blob",
                         });
                   
                         const blob = new Blob([response.data], { type: "audio/mpeg" });
                         const url = window.URL.createObjectURL(blob);
                         const link = document.createElement("a");
                         link.href = url;
                         link.setAttribute("download", `${data?.tenFile}.mp3`);
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
            </Box>
          );
        })}
      </Grid2>

      <Box>
        {/* modal */}
        <ModalAddDanhSachPhat
          openModal={modal}
          handleClose={handelcloseModalAddDanhSachPhat}
          bainhacId={id}
        />
      </Box>
    </Grid2>
  );
};
export default Detail;
