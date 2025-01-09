import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Avatar,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
  Stack,
  Tooltip,
} from "@mui/material";
import { AudioPlayer } from "react-audio-player-component";
import { useParams } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import axios from "axios";

const NhacSiDetail = () => {
  const { id } = useParams();
  const [baiNhacByNhacSi, setBaiNhacByNhacSi] = useState([]);
  const [nhacSi, setNhacSi] = useState({});
  useEffect(() => {
    const getSongsTheoNhacSi = async () => {
      const response = await axios.get(
        `https://localhost:7280/api/BaiNhac/getbainhacbynhacsiid?nhacSiId=${id}`
      );
      if (response.status === 200) {
        setBaiNhacByNhacSi(response?.data);
      }
    };
    getSongsTheoNhacSi();
  }, []);
  useEffect(() => {
    const getNhacSiById = async () => {
      const response = await axios.get(
        `https://localhost:7280/api/NhacSi/getnhacsibyid?Id=${id}`
      );
      if (response.status === 200) {
        setNhacSi(response?.data);
      }
    };
    getNhacSiById();
  }, []);

  return (
    <Box sx={{ backgroundColor: "#1b1036", color: "#fff", minHeight: "100vh" }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "32px",
          background: "linear-gradient(to bottom, #5c2c90, #1b1036)",
        }}
      >
        <img
          style={{
            width: "150px",
            height: "150px",
            padding: "5px",
            borderRadius: "100px",
          }}
          src={`https://localhost:7280/api/File/image?path=${nhacSi?.url}`}
        ></img>
        <Box>
          <Typography variant="h3" fontWeight="bold">
            {nhacSi?.tenNhacSi}
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            sx={{ marginTop: "16px", borderRadius: "20px" }}
          >
            Quan Tâm
          </Button>
        </Box>
      </Box>

      {/* Danh sách bài hát */}
      <Box sx={{ padding: "12px" }}>
        <List>
          {baiNhacByNhacSi.map((song, index) => (
            <Card
              key={index}
              sx={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "#2b1b48",
                marginBottom: "8px",
                color: "#fff",
              }}
            >
              <CardContent sx={{ flex: "1 0 auto" }}>
                <ListItem>
                  <ListItemAvatar>
                    <img
                      style={{
                        width: "100px",
                        height: "100px",
                        padding: "1px",
                      }}
                      src={`https://localhost:7280/api/File/image?path=${song?.duongDanHinhAnh}`}
                    ></img>
                  </ListItemAvatar>
                  <ListItemText
                    primary={song.tenBaiNhac}
                    sx={{ padding: 2 }}
                    secondary={
                      <Typography variant="body2" color="gray">
                        {song.artist}
                      </Typography>
                    }
                  />
                </ListItem>
              </CardContent>
              <div>
                <AudioPlayer
                  src={`https://localhost:7280/api/File/file?path=${encodeURIComponent(
                    song?.duongDanFileAmNhac
                  )}&filename=${encodeURIComponent(song?.tenFile)}`}
                  minimal={true}
                  width={650}
                  trackHeight={50}
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
              </div>
              <Stack direction="row" spacing={2} padding={1}>
                <Tooltip title="Thêm vào thư viện">
                  <IconButton>
                    <FavoriteBorderIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Thêm vào danh sách phát">
                  <IconButton>
                    <PlaylistAddIcon />
                  </IconButton>
                </Tooltip>
              </Stack>
            </Card>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default NhacSiDetail;
