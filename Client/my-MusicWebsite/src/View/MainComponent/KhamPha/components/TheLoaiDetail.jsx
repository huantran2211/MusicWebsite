import { Box, Typography, Grid, Card, CardContent, Stack, Tooltip, IconButton } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ModalAddDanhSachPhat from "../Modal/ModalAddDanhSachPhat";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
const TheLoaiDetail = () => {
  const { id } = useParams();
  const [theLoai, setTheLoai] = useState([]);
  const [theLoaiId, setTheLoaiId] = useState({});
  const [bainhacId, setBaiNhacId] = useState([]);
  const [modal, setModal] = useState(false);
  useEffect(() => {
    const getTamTrang = async () => {
      const response = await axios.get(
        `https://localhost:7280/api/BaiNhac/getbainhacbytheloaiid?theloaiid=${id}`
      );
      if (response.status === 200) {
        setTheLoai(response?.data);
      } else {
        toast.warning("Đã có lỗi xảy ra , vui lòng liên hệ bộ phận admin");
      }
    };
    getTamTrang();
  }, [id]);
  useEffect(() => {
    const getTamTrangById = async () => {
      const response = await axios.get(
        `https://localhost:7280/api/TheLoai/GetAllTheLoaiById?Id=${id}`
      );
      if (response.status === 200) {
        setTheLoaiId(response?.data);
      } else {
        toast.warning("Đã có lỗi xảy ra , vui lòng liên hệ bộ phận admin");
      }
    };
    getTamTrangById();
  }, [id]);

  const handleAddLibary = async (baiNhacId) => {
    const thuVienId = localStorage.getItem("thuVienID");
    if (thuVienId == null || undefined) {
      toast.warning("Bạn cần đăng nhập để thực hiện chức năng");
    } else {
      const data = {
        thuVienId: thuVienId,
        baiNhacId: baiNhacId,
      };
      const response = await axios.post(
        "https://localhost:7280/api/ThuVien/addthuvienbainhac",
        data
      );
      if (response.status === 200) {
        toast.success("Thêm vào thư viện thành công");
      } else {
        toast.error(
          "Đã có lỗi xảy ra , vui lòng liên hệ với bộ phận chăm sóc khách hàng để hỗ trợ"
        );
      }
    }
  };

  const handelOpenModalAddDanhSachPhat = (id) => {
    setBaiNhacId(id);
    setModal(true);
  };
  const handelcloseModalAddDanhSachPhat = () => {
    setModal(false);
  };

  return (
    <Box sx={{ minHeight: "100vh", color: "white" }}>
      {/* Header Section */}
      <Box
        sx={{
          background: "linear-gradient(90deg, #32ded4, #1a73e8)",
          padding: "20px 30px",
          textAlign: "center",
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: "bold" }}>
          {theLoaiId?.tenTheLoai}
        </Typography>
      </Box>

      {/* Featured Section */}
      <Box sx={{ padding: "20px 30px" }}>
        <Typography variant="h5" sx={{ marginBottom: 2, fontWeight: "bold" }}>
          Nổi Bật
        </Typography>

        <Grid container spacing={3}>
          {theLoai.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} lg={2.4} key={index}>
              <Card>
                <img
                  style={{
                    width: "100%",

                    padding: "5px",
                  }}
                  src={`https://localhost:7280/api/File/image?path=${item?.duongDanHinhAnh}`}
                ></img>
                <CardContent>
                  <Link
                    to={`/bainhac/${item.tenBaiNhac}/${item.id}`}
                    style={{
                      padding: "1px 10px",
                      textDecoration: "none",
                      color: "text.secondary",
                    }}
                  >
                    {item.tenBaiNhac}
                  </Link>
                  <Stack direction="row" spacing={2} padding={1}>
                        <Tooltip title="Thêm vào thư viện">
                          <IconButton onClick={()=>handleAddLibary(item?.id)}>
                            <FavoriteBorderIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Thêm vào danh sách phát" onClick={()=> handelOpenModalAddDanhSachPhat(item?.id)}>
                          <IconButton>
                            <PlaylistAddIcon />
                          </IconButton>
                        </Tooltip>
                      </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
      <ModalAddDanhSachPhat
          openModal={modal}
          handleClose={handelcloseModalAddDanhSachPhat}
          bainhacId={bainhacId}
        />
    </Box>
  );
};

export default TheLoaiDetail;
