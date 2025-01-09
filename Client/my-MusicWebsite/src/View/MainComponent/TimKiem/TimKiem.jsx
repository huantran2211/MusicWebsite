import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { AudioPlayer } from "react-audio-player-component";
import {
  Box,
  Typography,
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
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
const TimKiem = () => {
  const location = useLocation();
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const keywordFromUrl = params.get("keyword");

    setKeyword(keywordFromUrl);

    const fetchSongs = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7280/api/BaiNhac/timkiembaihat/keyword?keyword=${encodeURIComponent(
            keywordFromUrl
          )}`
        );
        setResults(response.data);
      } catch (error) {
        console.error("Lỗi khi tìm kiếm bài hát:", error);
        setResults([]);
      }
    };

    if (keywordFromUrl && keywordFromUrl.trim() !== "") {
      fetchSongs();
    } else {
      setResults([]);
    }
  }, [location.search]);


  return (
    <div>
      <h1>Kết quả tìm kiếm</h1>
      <Box sx={{ padding: "12px" }}>
        <List>
          {results.map((song, index) => (
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
    </div>
  );
};

export default TimKiem;
