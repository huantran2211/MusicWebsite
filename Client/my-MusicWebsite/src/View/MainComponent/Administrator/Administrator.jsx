import { Box, Container, Grid2, Typography, Link } from "@mui/material";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import { Link as RouterLink } from "react-router-dom";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import ExplicitIcon from "@mui/icons-material/Explicit";
import "../../../css/main.css";

const Administrator = () => {
  return (
    <Container>
      <Typography variant="h3" component="h3" textAlign={"center"}>
        Xin chào : admin
      </Typography>
      <Typography variant="h4" component="h4" textAlign={"center"}>
        Dưới đây là các chức năng liên quan đến quản lý trang Web
      </Typography>
      <Grid2 spacing={2} container>
        <Grid2 size={3}>
          <Box className="container">
            <MusicNoteIcon />
            <Typography>
              <Link component={RouterLink} to="/Administrator/BaiNhac">
                Bài nhạc
              </Link>
            </Typography>
          </Box>
        </Grid2>
        <Grid2 size={3}>
          <Box className="container">
            <LibraryMusicIcon />
            <Typography>
              <Link component={RouterLink} to="/Administrator/Album">
                Album
              </Link>
            </Typography>
          </Box>
        </Grid2>
        <Grid2 size={3}>
          <Box className="container">
            <PersonPinIcon />
            <Typography>
              <Link component={RouterLink} to="/Administrator/NhacSi">
                Nhạc sĩ
              </Link>
            </Typography>
          </Box>
        </Grid2>
        <Grid2 size={3}>
          <Box className="container">
            <AccountCircleIcon />
            <Typography>
              <Link component={RouterLink} to="/Administrator/User">
                Quản lý người dùng
              </Link>
            </Typography>
          </Box>
        </Grid2>
        <Grid2 size={3}>
          <Box className="container">
            <AudiotrackIcon />
            <Typography>
              <Link component={RouterLink} to="/Administrator/TamTrang">
                Tâm trạng
              </Link>
            </Typography>
          </Box>
        </Grid2>
        <Grid2 size={3}>
          <Box className="container">
            <HeadphonesIcon />
            <Typography>
              <Link component={RouterLink} to="/Administrator/TheLoaiNhac">
                Thể loại
              </Link>
            </Typography>
          </Box>
        </Grid2>
        <Grid2 size={3}>
          <Box className="container">
            <ExplicitIcon />
            <Typography>
              <Link component={RouterLink} to="/Administrator/Chude">
                Chủ đề
              </Link>
            </Typography>
          </Box>
        </Grid2>
      </Grid2>
    </Container>
  );
};

export default Administrator;
