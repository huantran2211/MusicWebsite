import {
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import axios from "axios";
import { useState, useEffect } from "react";
import {  Link } from "react-router-dom";


const Albums = () => {
  const [album, setAlbum] = useState([]);
  useEffect(() => {
    const getSongsTop5 = async () => {
      const response = await axios.get(
        `https://localhost:7280/api/Album/getallalbum`
      );
      if (response.status === 200) {
        setAlbum(response?.data);
      }
    };
    getSongsTop5();
  }, []);
  return (
    <Box sx={{ bgcolor: "#101828", color: "#fff", minHeight: "100vh", p: 3 }}>
      {/* Header Section */}
      <Typography variant="h2" component="p" style={{ padding: 10 , textAlign:"center"}}>
            Danh sách albums 
            </Typography>
      <Divider sx={{ my: 3, bgcolor: "gray" }} />

      {/* Song List */}
      <List>
        {album.map((song, index) => (
          <Box key={song.id}>
            <ListItem sx={{ display: "flex", alignItems: "center" }}>
              <Typography
                sx={{ width: "30px", fontWeight: "bold", textAlign: "center" , fontSize:"1.2rem" }}
              >
                {index + 1}
              </Typography>
              <ListItemAvatar>
                <img
                  src={`https://localhost:7280/api/File/image?path=${song.url}`}
                  style={{
                    width: "100%",
                    padding: "3px 5px",
                    borderRadius: "5px",
                  }}
                />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography variant="body1" sx={{ fontWeight: 700 , fontSize:"1.2rem"}}>
                    <Link to={`/Albums/${song.id}`} style={{textAlign:"center" , textDecoration:"none"}}>
                    {song.tenAlbum}
                    </Link>
                  </Typography>
                }
                sx={{ flex: 1, mx: 2 }}
              />
              <Typography sx={{ width: "150px", color: "gray" , fontSize:"1.2rem" }}>
                {new Date(song.ngayPhatHanh).toLocaleDateString("en-GB")}
              </Typography>
              <Typography sx={{ width: "60px", textAlign: "center", fontSize:"1.2rem" }}>
                {song.duration}
              </Typography>
              <IconButton>
                <FavoriteBorderIcon sx={{ color: "gray" }} />
              </IconButton>
              <IconButton>
                <MoreVertIcon sx={{ color: "gray" }} />
              </IconButton>
            </ListItem>
            <Divider sx={{ bgcolor: "gray" }} />
          </Box>
        ))}
      </List>
    </Box>
  );
};

export default Albums;
