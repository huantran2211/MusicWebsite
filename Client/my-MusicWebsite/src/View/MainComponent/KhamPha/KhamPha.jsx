import {
  Box,
  Button,
  Container,
  Grid2,
  Stack,
  Typography,


} from "@mui/material";

import Banner1 from "../../../assets/images/banner1.jpg"
import Banner2 from "../../../assets/images/banner2.jpg"
import Banner3 from "../../../assets/images/banner3.jpg"

import {  Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import axios from "axios";

const KhamPha = () => {
  const [songTheoTamTrang, setSongTheoTamTrang] = useState([])
  const [songTheoTheLoai, setSongTheoTheLoai] = useState([])
  const [songTheoChuDe, setSongTheoChuDe] = useState([])
  useEffect(() => {
    const getSongsTheoTamTrang = async () => {
      const response = await axios.get(
        "https://localhost:7280/api/TamTrang/getalltamtrang"
      );
      if (response.status === 200) {
        setSongTheoTamTrang(response?.data);
      }
    };
    getSongsTheoTamTrang();
  }, []);
  useEffect(() => {
    const getSongsTheoTheLoai = async () => {
      const response = await axios.get(
        "https://localhost:7280/api/TheLoai/GetAllTheLoai"
      );
      if (response.status === 200) {
        setSongTheoTheLoai(response?.data);
      }
    };
    getSongsTheoTheLoai();
  }, []);
  useEffect(() => {
    const getSongsTheoChuDe = async () => {
      const response = await axios.get(
        "https://localhost:7280/api/ChuDe/getallchude"
      );
      if (response.status === 200) {
        setSongTheoChuDe(response?.data);
      }
    };
    getSongsTheoChuDe();
  }, []);
   
  return (
    <Container
      maxWidth="xl"
      style={{ padding: "20px", backgroundColor: "#1d1d1f", color: "white" }}
    >
      {/* Banner Section */}
      <Box
        sx={{
          backgroundColor: "#0055ff",
          color: "white",
          padding: "20px",
          borderRadius: "8px",
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          NHẠC CHỜ HAY
        </Typography>
        <Typography variant="h6" gutterBottom>
          SỐNG ĐỘNG TỪNG GIÂY GỌI
        </Typography>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#ffcc00",
            color: "black",
            fontWeight: "bold",
            "&:hover": { backgroundColor: "#e6b800" },
          }}
        >
          CÀI ĐẶT NGAY
        </Button>
      </Box>

      {/* Playlist Section */}
      <Stack direction="row" spacing={2}>
        <Grid2 item xs={4} md={4}>
          <Box
            sx={{
              position: "relative",
              borderRadius: "8px",
              overflow: "hidden",
              backgroundColor: "#2b2b2d",
            }}
          >
            <img
              src={Banner1}
              alt="Nhạc Mới Mỗi Tuần"
              style={{ width: "100%", height: "auto" }}
            />
            <Typography
              variant="body1"
              fontWeight="bold"
              sx={{
                position: "absolute",
                bottom: 10,
                left: 10,
                backgroundColor: "rgba(0, 0, 0, 0.6)",
                padding: "5px 10px",
                borderRadius: "5px",
              }}
            >
              Nhạc Mới Mỗi Tuần
            </Typography>
          </Box>
        </Grid2>

        <Grid2 item xs={4} md={4}>
          <Box
            sx={{
              position: "relative",
              borderRadius: "8px",
              overflow: "hidden",
              backgroundColor: "#2b2b2d",
            }}
          >
            <img
              src={Banner2}
              alt="Today Hits"
              style={{ width: "100%", height: "auto" }}
            />
            <Typography
              variant="body1"
              fontWeight="bold"
              sx={{
                position: "absolute",
                bottom: 10,
                left: 10,
                backgroundColor: "rgba(0, 0, 0, 0.6)",
                padding: "5px 10px",
                borderRadius: "5px",
              }}
            >
              Today Hits
            </Typography>
          </Box>
        </Grid2>

        <Grid2 item xs={4} md={4}>
          <Box
            sx={{
              position: "relative",
              borderRadius: "8px",
              overflow: "hidden",
              backgroundColor: "#2b2b2d",
            }}
          >
            <img
              src={Banner3}
              alt="Hot Hits Vietnam"
              style={{ width: "100%", height: "auto" }}
            />
            <Typography
              variant="body1"
              fontWeight="bold"
              sx={{
                position: "absolute",
                bottom: 10,
                left: 10,
                backgroundColor: "rgba(0, 0, 0, 0.6)",
                padding: "5px 10px",
                borderRadius: "5px",
              }}
            >
              Hot Hits Vietnam
            </Typography>
          </Box>
        </Grid2>
      </Stack>
      {/*  */}
   
      {/*  */}
      <Typography variant="h4" component="div" style={{ color: "white",padding : 20 }}>
        <span style={{ color: "#FF69B4" }}>Tâm trạng ,</span>  Cảm xúc 
      </Typography>
      <Grid2 sx={{ }}>
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={30}
            slidesPerView={5}
            navigation
            pagination={{ clickable: true }}
          >
            {songTheoTamTrang.map((item, index) => {
              return (
                <SwiperSlide key={index}>
                  <Box
                    sx={{
                      background: "#212121",
                      borderRadius: "5px",
                      width: "200px",
                      color: "text.secondary",
                    }}
                    key={item.id}
                    className="animated-product"
                  >
                    <img
                      src={`https://localhost:7280/api/File/image?path=${item.url}`}
                      style={{
                        width: "100%",
                        padding: "3px 5px",
                        borderRadius: "5px",
                      }}
                    />
                    <Link
                      to={`/KhamPha/TamTrang/${item.id}`}
                      style={{
                        padding: "1px 10px",
                        textDecoration: "none",
                        color: "white",
                        fontSize:"1.2rem"
                      }}
                    >
                      {item.tenTamTrang}
                    </Link>
                 
                  </Box>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Grid2>
      <Grid2 sx={{ }}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
        >
        </Stack>
      
      </Grid2>
      <Typography variant="h4" component="div" style={{ color: "white",padding : 20 }}>
      <span style={{ color: "#FF69B4" }}>Thể loại bài hát</span>
      </Typography>
      <Grid2 >
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={30}
            slidesPerView={5}
            navigation
            pagination={{ clickable: true }}
          >
            {songTheoTheLoai.map((item, index) => {
              return (
                <SwiperSlide key={index}>
                  <Box
                    sx={{
                      background: "#212121",
                      borderRadius: "5px",
                      width: "200px",
                      color: "text.secondary",
                    }}
                    key={item.id}
                    className="animated-product"
                  >
                    <img
                      src={`https://localhost:7280/api/File/image?path=${item.url}`}
                      style={{
                        width: "100%",
                        padding: "3px 5px",
                        borderRadius: "5px",
                      }}
                    />
                    <Link
                      to={`/KhamPha/TheLoai/${item.id}`}
                      style={{
                        padding: "1px 10px",
                        textDecoration: "none",
                        color: "white",
                        fontSize:"1.2rem"
                      }}
                    >
                      {item.tenTheLoai}
                    </Link>
                 
                  </Box>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Grid2>

      <Typography variant="h4" component="div" style={{ color: "white",padding : 20 }}>
      <span style={{ color: "#FF69B4" }}>Chủ đề</span>
      </Typography>
      <Grid2 >
      <Grid2>
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={30}
            slidesPerView={5}
            navigation
            pagination={{ clickable: true }}
          >
            {songTheoChuDe.map((item, index) => {
              return (
                <SwiperSlide key={index}>
                  <Box
                    sx={{
                      background: "#212121",
                      borderRadius: "5px",
                      width: "200px",
                      color: "text.secondary",
                    }}
                    key={item.id}
                    className="animated-product"
                  >
                    <img
                      src={`https://localhost:7280/api/File/image?path=${item.url}`}
                      style={{
                        width: "100%",
                        padding: "3px 5px",
                        borderRadius: "5px",
                      }}
                    />
                    <Link
                      to={`/KhamPha/ChuDe/${item.id}`}
                      style={{
                        padding: "1px 10px",
                        textDecoration: "none",
                        color: "white",
                        fontSize:"1.2rem"
                      }}
                    >
                      {item.tenChuDe}
                    </Link>
                 
                  </Box>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Grid2>
       
      </Grid2>
    </Container>
  );
};

export default KhamPha;
