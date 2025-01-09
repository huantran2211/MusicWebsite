import { Box, Button, Grid2, Paper, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
const userId = localStorage.getItem('userId')

  
 
const LichSu = () => {
  const [userhsr , setUserHst] = useState([])
  const date = new Date(userhsr?.ngayNghe);

// Lấy ngày, tháng, năm
const day = date.getDate(); 
const month = date.getMonth() + 1; 
const year = date.getFullYear(); 
console.log(`Ngày: ${day}, Tháng: ${month}, Năm: ${year}`);
   // Định nghĩa cột
   const columns = [
    {
      field: "",
      headerName: "Bài Hát",
      flex: 1,
      renderCell: (params) => (
        <Box>
          <Typography variant="body1" fontWeight="bold">
            {params.row.baiNhac?.tenBaiNhac}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {/* {params.row.baiNhac?.} */}
          </Typography>
        </Box>
      ),
    },
    {
      field: "timestamp",
      headerName: "Thời Gian",
      flex: 0.5,
      renderCell: (params) => (
        <Typography variant="body2" color="text.secondary">
          
        </Typography>
      ),
    },
    {
      field: "actions",
      headerName: "Hành động",
      flex: 0.5,
      renderCell: (params) => (
        <Box display="flex" gap={1}>
          <Button
            variant="text"
            color="error"
            onClick={() => handelDeleteLichSu(params.row.id)}
          >
            Xóa
          </Button>
          <Button
            variant="text"
            color="primary"
            onClick={() => alert(`Chia sẻ lịch sử: ${params.row.songTitle}`)}
          >
            Chia sẻ
          </Button>
        </Box>
      ),
    },
  ];
  useEffect(()=>{
     if(userId != null)
     {
       const getUserHistory = async () => {
        const response = await axios.get(`https://localhost:7280/api/LichSuNgheNhac/getlichsubyUserId?Id=${userId}`)
        if(response.status == 200)
        {
         setUserHst(response?.data)
         }
       }
       getUserHistory()
     }
  },[userId]) 
    const handelDeleteLichSu = async(id) => {
       const response = await axios.delete(`https://localhost:7280/api/LichSuNgheNhac/deletelichsu?id=${id}`)
       if(response.status == 200)
       {
         toast.success("Xóa lịch sử thành công")
         window.location.reload()
       }
       else
       {
        toast.error("Đã có lỗi xảy ra , vui lòng liên hệ bộ phân chăm sóc khách hàng để hổ trợ")
       }
    }
  return (
    <Box sx={{ height: 400, width: "100%" }}>
     <Typography variant="h5" color="text.secondary" padding={1}>
          Lich sử nghe nhạc
     </Typography>
    <DataGrid
      rows={userhsr}
      columns={columns}
      pageSize={5}
      rowsPerPageOptions={[5]}
      checkboxSelection={true}
      sx={{
        "& .MuiDataGrid-cell": {
          display: "flex",
          alignItems: "center",
        },
      }}
    />
  </Box>
  )
}

export default LichSu