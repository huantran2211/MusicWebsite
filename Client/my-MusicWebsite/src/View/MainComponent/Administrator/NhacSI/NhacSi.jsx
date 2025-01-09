import { Box, Button, Grid2 , IconButton} from "@mui/material"
import { useEffect, useState } from "react"
import ModalAddNhacSi from "./Modal/ModalAddNhacSi";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from '@mui/icons-material/Edit'; 
import DeleteIcon from '@mui/icons-material/Delete'; 
import Swal from "sweetalert2";
import ModalUpdateNhacSi from "./Modal/ModalUpdateNhacSi";
import { useNavigate } from "react-router-dom";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
const NhacSi = () => {
    const [openModalAdd , setOpenModalAdd] = useState(false)
    const [openModalUpdate , setOpenModalUpdate] = useState(false)
    const [selectedId , setSelectedId] = useState([])
    const [data,setData] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    const previousLink = ()=>{
      navigate("/Administrator")
    }
    const handleDelete = (selectedId) => {
      Swal.fire({
        title: "Bạn có muốn nhạc sĩ này ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "có "
      }).then( async(result) => {
        if (result.isConfirmed) {
          const response = await axios.delete(`https://localhost:7280/api/NhacSi/deletenhacsi?id=${selectedId}`)
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
  
    const columns = [
      {
        field: 'tenNhacSi',
        headerName: 'Tên nhạc sĩ',
        flex: 1
      },
      {
        field: 'nickName',
        headerName: 'Nick Name',
        flex: 1
      },
      {
        field: 'url',
        headerName: 'Hình ảnh',
        sortable: false,
        flex:1,
        renderCell: (params) => (
          <div>
            <img style={{width:"50px", height:"50px" }} src={`https://localhost:7280/api/File/image?path=${params.row.url}`}></img>
          </div>
        ),
      },
      {
        field: 'text',
        headerName: 'Thao tác',
        flex: 1,
        renderCell: (params) => (
          <div>
            <Button
              onClick={() => handelOpenModalUpdate(params.row.id)}
              startIcon={<EditIcon />}
              variant="contained"
              color="primary"
              size="small"
              style={{ marginRight: 8 }}
            >
              Sửa
            </Button>
            <Button
              onClick={() => handleDelete(params.row.id)}
              startIcon={<DeleteIcon />}
              sx={{backgroundColor: "#f010ae"}}
              size="small"
            >
              Xóa
            </Button>
          </div>
        ),
      },
    ];

    
  const handelOpenModalAddChuDe = () => {
    setOpenModalAdd(true)
  }
  const handelCloseModalAddChuDe= () => {
    setOpenModalAdd(false)
  }
  const handelOpenModalUpdate = (id)=>{
    setSelectedId(id)
    setOpenModalUpdate(true)
  }
  const handleCloseModalUpdate = () => {
    setSelectedId('')
    setOpenModalUpdate(false)
  }

  const getdata = async () => {
    try {
      setLoading(true);
      const response = await axios.get("https://localhost:7280/api/NhacSi/getallnhacsi");
      if (response.status == 200) {
        setData(response.data);
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    } finally {
      setLoading(false);
    }
  };



  useEffect(() => {
    if(loading)
    getdata(); // Gọi hàm getdata khi trang load
  }, [loading])
  
  return (
    <Grid2>
       <IconButton sx={{margin:"0 10px"}} onClick={previousLink}>
         <KeyboardBackspaceIcon/>
      </IconButton>
    <IconButton style={{width:"150px" , fontSize:"0.8rem"}} className="animated-button" onClick={handelOpenModalAddChuDe}>
          Thêm mới nhạc sĩ
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
      <ModalAddNhacSi openModal={openModalAdd} handleClose={handelCloseModalAddChuDe} setLoading={setLoading}/>
      <ModalUpdateNhacSi openModal={openModalUpdate} handleClose={handleCloseModalUpdate} setLoading={setLoading} selectedId={selectedId}/>
    </Grid2>
  )
}

export default NhacSi