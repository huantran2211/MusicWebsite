import { Box, Grid2, IconButton } from '@mui/material'
import { useEffect, useState } from 'react'
import ThemMoiBaiNhac from './Modal/ThemMoiBaiNhac'
import ModalChinhSuaBaiNhac from './Modal/ModalChinhSuaBaiNhac';
import EditIcon from '@mui/icons-material/Edit'; 
import DeleteIcon from '@mui/icons-material/Delete'; 
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
const BaiNhac = () => {
    const [openModalThemMoiBaiNhac, setOpenModalThemMoiBaiNhac]= useState(false)
    const [openModalChinhSuaBaiNhac, setOpenModalChinhSuaBaiNhac]= useState(false)
    const [selectedId , setSelectedId] = useState([])
    const [data,setData] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    const previousLink = ()=>{
      navigate("/Administrator")
    }
    const handleOpenModalAddbaiNhac = () => {
      setOpenModalThemMoiBaiNhac(true)
    }
    const handleCloseModalThemMoiBaiNhac = () =>{
      setOpenModalThemMoiBaiNhac(false)
    }
    const handleOpenModalChinhSua = (id) => {
      setSelectedId(id)
      setOpenModalChinhSuaBaiNhac(true)
    }
    const handleCloseModalUpdateBaiNhac = () => {
      setSelectedId("")
      setOpenModalChinhSuaBaiNhac(false)
    }
    const columns = [
      {
        field: 'tenBaiNhac',
        headerName: 'Tên bài nhạc',
        flex: 1
      },
      {
        field: 'ngayPhatHanh',
        headerName: 'Ngày phát hành',
        width: 150,
        flex: 1,
        valueGetter: (params) => {
          const date = new Date(params); 
          return `${('0' + date.getDate()).slice(-2)}/${('0' + (date.getMonth() + 1)).slice(-2)}/${date.getFullYear()}`;
        },
      },
      {
        field: 'thoiLuong',
        headerName: 'Thời lượng',
        flex: 1
      },
      {
        field: 'duongDanHinhAnh',
        headerName: 'Hình ảnh',
        sortable: false,
        flex:1,
        renderCell: (params) => (
          <div>
            <img style={{width:"50px", height:"50px" }} src={`https://localhost:7280/api/File/image?path=${params.row.duongDanHinhAnh}`}></img>
          </div>
        ),
      },
      {
        field: 'text',
        headerName: 'Thao tác',
        flex: 1,
        renderCell: (params) => (
          <div>
             <IconButton
                 onClick={async () => {
                  try {
                    const response = await axios({
                      url: `https://localhost:7280/api/File/file`,
                      method: "GET",
                      params: {
                        path: params.row.duongDanFileAmNhac,
                        filename: params.row.tenFile,
                      },
                      responseType: "blob",
                    });
              
                    const blob = new Blob([response.data], { type: "audio/mpeg" });
                    const url = window.URL.createObjectURL(blob);
                    const link = document.createElement("a");
                    link.href = url;
                    link.setAttribute("download", `${params.row.tenFile}.mp3`);
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
              
                    window.URL.revokeObjectURL(url);
                  } catch (error) {
                    console.error("Error downloading the file", error);
                  }
                }}
           
              variant="contained"
              color="primary"
              size="small"
              style={{ marginRight: 8 }}
            >
              <CloudDownloadIcon />
            </IconButton>
            <IconButton
             onClick={() => handleOpenModalChinhSua(params.row.id)}
            
              variant="contained"
              color="primary"
              size="small"
              style={{ marginRight: 8 }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
               onClick={() => handleDelete(params.row.id)}
        
              sx={{backgroundColor: "#f010ae"}}
              size="small"
            >
              <DeleteIcon />
            </IconButton>
          </div>
        ),
      },
    ];

    const getdata = async () => {
      try {
        setLoading(true);
        const response = await axios.get("https://localhost:7280/api/BaiNhac/getallbainhac");
        if (response.status == 200) {
          setData(response.data);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false);
      }
    };
    const handleDelete = (baiNhacId) => {
      Swal.fire({
        title: "Bạn có muốn xóa bài nhạc này không",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "có "
      }).then( async(result) => {
        if (result.isConfirmed) {
          const response = await axios.delete(`https://localhost:7280/api/BaiNhac/deletebainhac?id=${baiNhacId}`)
          if(response.status === 200)
          {
            Swal.fire({
              title: "Thành công",
              text: "Bạn đã xóa dữ liệu thành công",
              icon: "success"
            });
            setLoading(true)
          }else
          {
            Swal.fire({
              title: "Lỗi",
              text: "Đã xảy ra lỗi trong quá trình xóa",
              icon: "error"
            });
          }
         
        }
      });
    }
    useEffect(() => {
      if(loading)
      getdata(); // Gọi hàm getdata khi trang load
    }, [loading])

  return (
    <Grid2>
      <IconButton sx={{margin:"0 10px"}} onClick={previousLink}>
         <KeyboardBackspaceIcon/>
      </IconButton>
     <IconButton style={{width:"150px" , fontSize:"0.8rem"}} className="animated-button" onClick={handleOpenModalAddbaiNhac }>
          Thêm mới bài nhạc
      </IconButton>
      <Box sx={{ height: 400, width: '100%' , marginTop:3}}>
      <DataGrid
        rows={data}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5
            },
          },
        }}
        pageSizeOptions={[5, 10, 25]}
        // onRowSelectionModelChange={(newRowSelectionModel) => {
        //   setSelectedId(newRowSelectionModel);
        // }}
       // rowSelectionModel={selectedId}
        checkboxSelection
      />
    </Box>
      <ThemMoiBaiNhac openModal={openModalThemMoiBaiNhac} handleClose={handleCloseModalThemMoiBaiNhac}  setLoading={setLoading} />
      <ModalChinhSuaBaiNhac openModal={openModalChinhSuaBaiNhac} handleClose={handleCloseModalUpdateBaiNhac} setLoading={setLoading} baiNhacId={selectedId}/>
    </Grid2>
  )
}

export default BaiNhac