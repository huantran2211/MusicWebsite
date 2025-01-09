
import React, { useEffect, useState } from "react";
import { Box, Grid, Typography, Card, CardContent } from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";


const NhacSI = () => {
  const [nhacSi , setNhacSi] = useState([])
  useEffect(() => {
    const getSongsMoiPhatHanh = async () => {
      const response = await axios.get(
        "https://localhost:7280/api/NhacSi/getallnhacsi"
      );
      if (response.status === 200) {
        setNhacSi(response?.data);
      }
    };
    getSongsMoiPhatHanh();
  }, []);
  return (
    <Box sx={{ flexGrow: 1, padding: "20px" }}>
      <Grid container spacing={4}>
        {nhacSi.map((artist, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ textAlign: "center", boxShadow: 3 }}>
            <img
                  src={`https://localhost:7280/api/File/image?path=${artist?.url}`}
                  style={{
                    width: "100%",
                    padding: "3px 5px",
                    borderRadius: "5px",
                  }}
                />
              <CardContent>
                <Typography variant="h6" component="div" fontWeight="bold">
                  <Link to={`/NhacSi/${artist?.id}`} style={{textAlign:"center" ,textDecoration:"none"}}>
                  {artist.tenNhacSi}
                  </Link>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default NhacSI;
