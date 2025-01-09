import { useEffect, useState } from 'react'
import { Grid2, IconButton, Paper, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow } from '@mui/material'
import ModalAddTheLoai from './Modal/ModalAddTheLoai'
import axios from 'axios'
import { styled } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Swal from 'sweetalert2';
import ModalUpdateTheLoai from './Modal/ModalUpdate';
const TheLoaiNhac = () => {
  
  const [openModalTheLoainhac , setOpenModalTheLoaiNhac] = useState(false)
  const [openModalUpdate , setOpenModalUpdateTheLoaiNhac] = useState(false)
  const [selectedId , setSelectedId] = useState('')
  const [data,setData] = useState([])
  const [loading, setLoading] = useState(true)

const getdata = async () => {
  try {
    setLoading(true);
    const response = await axios.get("https://localhost:7280/api/TheLoai/GetAllTheLoai");
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

  const handelOpenModalAddTheLoai = () => {
    setOpenModalTheLoaiNhac(true)
  }
  const handelCloseModalAddTheLoai = () => {
    setOpenModalTheLoaiNhac(false)
  }

  const handleOpenModalUpdateTheLoai = (id) => {
    setSelectedId(id)
    setOpenModalUpdateTheLoaiNhac(true)
  }
  const handleCloseModalUpdateTheLoai = () => {
    setSelectedId("")
    setOpenModalUpdateTheLoaiNhac(false)
  }

  const handleDelete = (theloaiId) => {
    Swal.fire({
      title: "Bạn có muốn xóa thể loại này không",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "có "
    }).then( async(result) => {
      if (result.isConfirmed) {
        const response = await axios.delete(`https://localhost:7280/api/TheLoai/DeleteTheLoai?id=${theloaiId}`)
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

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  
  // const previousLink = ()=>{
  //   navigate("/Administrator")
  // }
  return (
    <Grid2>
        {/* <IconButton sx={{margin:"0 10px"}} onClick={previousLink}>
         <KeyboardBackspaceIcon/>
      </IconButton> */}
      <IconButton style={{width:"150px" , fontSize:"0.8rem"}} onClick={handelOpenModalAddTheLoai}>
          Thêm mới thể loại
      </IconButton>
      <Paper sx={{ width: '100%'  , marginTop:"20px"}}>
      <TableContainer component={Paper}>
      <Table aria-label="customized table" sx={{ 
    minWidth: 200, 
    border: '1px solid black', 
    '& .MuiTableCell-root': { border: '1px solid text.primary' } 
  }} >
        <TableHead>
          <StyledTableRow>
           <StyledTableCell>Thứ tự</StyledTableCell>
            <StyledTableCell>Tên thể loại</StyledTableCell>
            <StyledTableCell>Hình ảnh</StyledTableCell>
            <StyledTableCell>Hành động</StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {data.map((row , index) => (
            <StyledTableRow key={index}>
               <StyledTableCell>{index + 1}</StyledTableCell>
               <StyledTableCell>{row.tenTheLoai}</StyledTableCell>
               <StyledTableCell>
                 <img style={{width:"80px", height:"80px"}} src={`https://localhost:7280/api/File/image?path=${row.url}`}></img>
               </StyledTableCell>
               <TableCell>
                 <IconButton onClick={()=>handleOpenModalUpdateTheLoai(row.id)}>
                     <EditIcon  />
                 </IconButton>
                 <IconButton style={{marginLeft:10}} onClick={()=>handleDelete(row.id)}>
                     <DeleteIcon/>
                 </IconButton>
               </TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
     </TableContainer>
      </Paper>

      <ModalAddTheLoai openModal={openModalTheLoainhac} handleClose={handelCloseModalAddTheLoai} setLoading={setLoading}/>
      <ModalUpdateTheLoai openModal={openModalUpdate} handleClose={handleCloseModalUpdateTheLoai} setLoading={setLoading} theLoaiId={selectedId} />
    </Grid2>
  )
}

export default TheLoaiNhac