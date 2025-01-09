import { Box, Button, Grid2 , IconButton} from "@mui/material"
import { useEffect, useState } from "react"
// import ModalAddNhacSi from "./Modal/ModalAddNhacSi";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from '@mui/icons-material/Edit'; 
import DeleteIcon from '@mui/icons-material/Delete'; 
import Swal from "sweetalert2";
// import ModalUpdateNhacSi from "./Modal/ModalUpdateNhacSi";
import { useNavigate } from "react-router-dom";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
const User = () => {
    const [data,setData] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    const previousLink = ()=>{
      navigate("/Administrator")
    }
    const handleDelete = (selectedId) => {
      Swal.fire({
        title: "Bạn có xóa user này ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "có "
      }).then( async(result) => {
        if (result.isConfirmed) {
          const response = await axios.delete(`https://localhost:7280/api/User/DeleteUser?Id=${selectedId}`)
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
        field: 'tenNguoiDung',
        headerName: 'Tên người dùng',
        flex: 1
      },
      {
        field: 'soDienThoai',
        headerName: 'Số điện thoại',
        flex: 1
      },
      {
        field: 'email',
        headerName: 'Email',
        sortable: false,
        flex:1,
      },
      {
        field: 'text',
        headerName: 'Thao tác',
        flex: 1,
        renderCell: (params) => (
          <div>
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


  const getdata = async () => {
    try {
      setLoading(true);
      const response = await axios.get("https://localhost:7280/api/User/GetAllUser");
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
      {/* <ModalAddNhacSi openModal={openModalAdd} handleClose={handelCloseModalAddChuDe} setLoading={setLoading}/>
      <ModalUpdateNhacSi openModal={openModalUpdate} handleClose={handleCloseModalUpdate} setLoading={setLoading} selectedId={selectedId}/> */}
    </Grid2>
  )
}

export default User