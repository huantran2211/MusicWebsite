import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AnalyticsRoundedIcon from "@mui/icons-material/AnalyticsRounded";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import { Grid2, Typography } from "@mui/material";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ModalAddPlaylist from "./Modal/ModalAddPlaylist";
import PlaylistPlayIcon from "@mui/icons-material/PlaylistPlay";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import EqualizerIcon from '@mui/icons-material/Equalizer';
import axios from "axios";
const mainListItems = [
  { text: "Trang chủ", icon: <HomeRoundedIcon />, url: "/Trangchu" },
  { text: "Khám phá", icon: <AnalyticsRoundedIcon />, url: "/Khampha" },
  { text: "Albums", icon: <LibraryMusicIcon />, url: "/Albums" },
  { text: "Nhạc sĩ", icon: <AudiotrackIcon />, url: "/NhacSiHome" },
  { text: "Bản xếp hạng nhạc", icon: <EqualizerIcon />, url: "/BangXepHang" },
];

const secondaryListItems = [
  { text: "Thư viện của bạn", icon: <FavoriteIcon />, url: "/Thuvien" },
];

const fordListItems = [
  // { text: "Cài đặt ", icon: <SettingsRoundedIcon />, url: "/caidat" },
];
const AdministratorItem = [
  // { text: "Cài đặt ", icon: <SettingsRoundedIcon />, url: "/" },
  {
    text: "Quản trị hệ thống",
    icon: <ManageAccountsIcon />,
    url: "/Administrator",
  },
];

const token = localStorage.getItem("token");
const userId = localStorage.getItem("userId");
const roleId = localStorage.getItem("role");

export default function MenuContent() {
  const [openmodal, setOpenModal] = useState(false);
  const [danhSachPhat, setDanhSachPhat] = useState([]);
  const [thuVien, setThuVien] = useState({});
  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  useEffect(() => {
    const getdanhsachphat = async () => {
      const response = await axios.get(
        `https://localhost:7280/api/DanhSachPhat/getdanhsachphatbyuserid?userId=${userId}`
      );
      if (response.status === 200) {
        setDanhSachPhat(response?.data);
      }
    };
    getdanhsachphat();
  }, []);
  useEffect(() => {
    const getThuVien = async () => {
      const response = await axios.get(
        `https://localhost:7280/api/ThuVien/getthuvienbainhacbyuserid?id=${userId}`
      );
      if (response.status === 200) {
        setThuVien(response?.data);
      }
    };
    getThuVien();
  }, []);
  localStorage.setItem('thuVienID' ,thuVien?.id)
  

  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: "space-between" }}>
      <List dense>
        {mainListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: "block" }}>
            <ListItemButton selected={index === 0}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText>
                <Link component={RouterLink} to={item.url}  style={{fontSize:"1rem", textDecoration:"none"}}>
                  {item.text}
                </Link>
              </ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Typography style={{ color: "#f010ae", paddingLeft: 20 }}>
        Thư viện
      </Typography>
      <List dense>
        {userId ? (
          <Grid2>
            {secondaryListItems.map((item, index) => (
              <ListItem key={index} disablePadding sx={{ display: "block" }}>
                <ListItemButton>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText >
                    <Link component={RouterLink} to={`/ThuVien/${thuVien?.id}`}  style={{fontSize:"1rem", textDecoration:"none"}}>
                      Thư viện của bạn
                    </Link>
                  </ListItemText>
                </ListItemButton>
              </ListItem>
            ))}
          </Grid2>
        ) : (
          <Grid2>
             <ListItem  disablePadding sx={{ display: "block" }}>
                <ListItemButton>
                  <ListItemIcon></ListItemIcon>
                  <ListItemText onClick={()=> {toast.warning("Bạn cần phải đăng nhập để có thể xem thư viện")}}>      
                      Thư viện của bạn
                  </ListItemText>
                </ListItemButton>
              </ListItem>
          </Grid2>
        )}
      </List>
      <Typography style={{ color: "#f010ae", paddingLeft: 20 }}>
        Danh sách phát
      </Typography>
      <List dense>
        {token && userId ? (
          <ListItem disablePadding sx={{ display: "block" }}>
            {danhSachPhat.map((item, index) => (
              <ListItemButton key={index}>
                <ListItemIcon>
                  <PlaylistPlayIcon />
                </ListItemIcon>
                <ListItemText>
                  <Link component={RouterLink} to={`/DanhSachPhat/${item?.id}`}  style={{fontSize:"1rem", textDecoration:"none"}}> 
                    {item.tenDanhSachPhat}
                  </Link>
                </ListItemText>
              </ListItemButton>
            ))}
            <ListItemButton>
              <ListItemIcon>
                <PlaylistAddIcon />
              </ListItemIcon>
              <ListItemText
                onClick={handleOpenModal}
                primary="Thêm danh sách phát"
              />
            </ListItemButton>
          </ListItem>
        ) : (
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton>
              <ListItemIcon>
                <PlaylistPlayIcon />
              </ListItemIcon>
              <ListItemText primary="Danh sách phát" />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <PlaylistAddIcon />
              </ListItemIcon>
              <ListItemText
                onClick={() => {
                  toast.warning("Vui lòng đăng nhập để thực hiện chức năng", {
                    toastId: "alert-add-warning",
                  });
                }}
                primary="Thêm danh sách phát"
              />
            </ListItemButton>
          </ListItem>
        )}
      </List>
      <Typography style={{ color: "#f010ae", paddingLeft: 20 }}>
        General
      </Typography>
      <List dense>
        {token && roleId == "3612c2e3-bf45-408e-9eda-ea94c81b55b4"
          ? AdministratorItem.map((item, index) => (
              <ListItem key={index} disablePadding sx={{ display: "block" }}>
                <ListItemButton>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText>
                    <Link component={RouterLink} to={item.url}  style={{fontSize:"1rem", textDecoration:"none"}}>
                      {item.text}
                    </Link>
                  </ListItemText>
                </ListItemButton>
              </ListItem>
            ))
          : fordListItems.map((item, index) => (
              <ListItem key={index} disablePadding sx={{ display: "block" }}>
                <ListItemButton>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText>
                    <Link component={RouterLink} to={item.url}  style={{fontSize:"1rem" , textDecoration:"none"}}>
                      {item.text}
                    </Link>
                  </ListItemText>
                </ListItemButton>
              </ListItem>
            ))}
      </List>
      <ModalAddPlaylist
        openModal={openmodal}
        handleClose={handleCloseModal}
        userId={userId}
      />
    </Stack>
  );
}
