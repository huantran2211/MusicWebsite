import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  Grid,
  Divider,
  Stack,
  IconButton,
} from "@mui/material";
import PlayCircleIcon from "@mui/icons-material/PlayCircle"; // Play icon
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp"; // Up arrow icon
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"; // Down arrow icon
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import axios from "axios";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";

// Dữ liệu bảng xếp hạng nhạc
const userId = localStorage.getItem("userId");

const BangXepHang = () => {
  const [dataSong, setDataSong] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(
        `https://localhost:7280/api/BaiNhac/gettop100bainhacnhieuluotxem`
      );
      if (response.status == 200) {
        setDataSong(response?.data);
      } else {
        toast.warning("Đã có lỗi xảy ra");
      }
    };
    getData();
  }, []);

  return (
    <Box sx={{ p: 4, backgroundColor: "#1D1C24", color: "#fff" }}>
      <Stack direction="row" alignItems="center" spacing={1} mb={2}>
        <Typography variant="h4" fontWeight="bold">
          BXH Nhạc Mới
        </Typography>
        <IconButton color="inherit">
          <PlayCircleIcon sx={{ fontSize: 40, color: "#fff" }} />
        </IconButton>
      </Stack>

      <Box>
        {dataSong.map((song, index) => (
          <React.Fragment key={song.id}>
            <Grid container alignItems="center" spacing={2} py={1}>
              {/* STT */}
              <Grid item xs={1}>
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  sx={{ color: getColor(index + 1) }}
                >
                  {index + 1}
                </Typography>
                {song.change === "up" && <ArrowDropUpIcon color="success" />}
                {song.change === "down" && <ArrowDropDownIcon color="error" />}
              </Grid>

              {/* Ảnh */}
              <Grid item xs={1}>
                <img
                  src={`https://localhost:7280/api/File/image?path=${song.duongDanHinhAnh}`}
                  style={{
                    width: "100%",
                    padding: "3px 5px",
                    borderRadius: "5px",
                  }}
                />
              </Grid>

              {/* Nội dung bài hát */}
              <Grid item xs={6}>
                <Link
                  to={`/bainhac/${song.tenBaiNhac}/${song.id}`}
                  style={{
                   
                    textDecoration: "none",
                  
                  }}
                >
                  {song.tenBaiNhac}
                </Link>
                <Typography variant="body2" color="gray">
                  {song?.nhacSi?.tenNhacSi}
                </Typography>
              </Grid>

              {/* Album */}
              <Grid item xs={3}>
                <Typography variant="body2">{song.album}</Typography>
              </Grid>

              {/* Thời lượng */}
              <Grid item xs={1} textAlign="right">
                <Stack direction="column" alignItems="center" spacing={1}>
                  <IconButton
                    onClick={async () => {
                      if (userId === null || userId === undefined) {
                        toast.warning("Bạn cần phải đăng nhập để tải nhạc ");
                      } else {
                        const response = await axios({
                          url: `https://localhost:7280/api/File/file`,
                          method: "GET",
                          params: {
                            path: song.duongDanFileAmNhac,
                            filename: song.tenFile,
                          },
                          responseType: "blob",
                        });

                        const blob = new Blob([response.data], {
                          type: "audio/mpeg",
                        });
                        const url = window.URL.createObjectURL(blob);
                        const link = document.createElement("a");
                        link.href = url;
                        link.setAttribute("download", `${song.tenFile}.mp3`);
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);

                        window.URL.revokeObjectURL(url);
                      }
                    }}
                    color="primary"
                    size="small"
                  >
                    <CloudDownloadIcon />
                  </IconButton>
                  <Typography variant="body2">{song.thoiLuong}</Typography>
                </Stack>
              </Grid>
            </Grid>
            <Divider sx={{ backgroundColor: "gray" }} />
          </React.Fragment>
        ))}
      </Box>
    </Box>
  );
};

// Hàm để tạo màu cho số thứ tự
const getColor = (index) => {
  const colors = ["#007FFF", "#00B894", "#E74C3C", "#FFFFFF"];
  return index < 4 ? colors[index - 1] : colors[3];
};

export default BangXepHang;
