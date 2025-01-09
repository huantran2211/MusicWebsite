import { Routes, Route } from 'react-router-dom';
import Dashboard from './View/RootLayout/Dashboard';
import Administrator from './View/MainComponent/Administrator/Administrator';
import TheLoaiNhac from './View/MainComponent/Administrator/TheLoai/TheLoaiNhac';
import BaiNhac from './View/MainComponent/Administrator/BaiNhac/BaiNhac';
import TamTrang from './View/MainComponent/Administrator/TamTrang/TamTrang';
import NhacSi from './View/MainComponent/Administrator/NhacSI/NhacSi';
import Album from './View/MainComponent/Administrator/Album/Album';
import ChuDe from './View/MainComponent/Administrator/ChuDe/ChuDe';
import Login from './View/MainComponent/session/Login';
import Register from './View/MainComponent/session/Register';
import Profile from './View/MainComponent/session/Profile';
import Trangchu from './View/MainComponent/TrangChu/Trangchu';
import Detail from './View/MainComponent/Detail/Detail';
import KhamPha from './View/MainComponent/KhamPha/KhamPha';
import User from './View/MainComponent/Administrator/User/User';
import DanhSachPhatDetail from './View/MainComponent/DanhSachPhat/DanhsachPhatDetail/DanhSachPhatDetail';
import Albums from './View/MainComponent/Albums/Album';
import ThuVienDetail from './View/MainComponent/ThuVien/ThuVienDetail';
import NhacSiDetail from './View/MainComponent/Nhacsi/NhacSIDetail/NhacSiDetail';
import BangXepHang from './View/MainComponent/BangXepHang/BangXepHang';
import TamTrangDetail from './View/MainComponent/KhamPha/components/TamTrangDetail';
import TheLoaiDetail from './View/MainComponent/KhamPha/components/TheLoaiDetail';
import ChuDeDetail from './View/MainComponent/KhamPha/components/ChuDeDetail';
import TimKiem from './View/MainComponent/TimKiem/TimKiem';
import Albumdetails from './View/MainComponent/Albums/AlbumDetails/Albumdetails';
import NhacSI from './View/MainComponent/Nhacsi/NhacSI';
const AppRoutes = () => {
    return (
      <Routes>
        <Route path="/" element={<Dashboard />}>
         <Route path="/Login" element={<Login/>} />
         <Route path="/Register" element={<Register/>} />
         <Route path="/Profile" element={<Profile/>} />
        <Route path="/Administrator" element={<Administrator />} />
        <Route path="/Administrator/TheLoaiNhac" element={<TheLoaiNhac />} />
        <Route path="/Administrator/BaiNhac" element={<BaiNhac />} />
        <Route path="/Administrator/TamTrang" element={<TamTrang />} />
        <Route path="/Administrator/NhacSi" element={<NhacSi />} />
        <Route path="/Administrator/Album" element={<Album />} />
        <Route path="/Administrator/Chude" element={<ChuDe />} />
        <Route path="/Administrator/User" element={<User />} />
        <Route path="/Trangchu" element={<Trangchu/>} />
        <Route path="/bainhac/:tenbainhac/:id"  element={<Detail/>} />
        <Route path="/DanhSachPhat/:id" element={<DanhSachPhatDetail/>} />
        <Route path="/NhacSiHome" element={<NhacSI/>} />
        <Route path="/NhacSi/:id" element={<NhacSiDetail/>} />
        <Route path="/KhamPha" element={<KhamPha/>} />
        <Route path="/KhamPha/TamTrang/:id" element={<TamTrangDetail/>} />
        <Route path="/KhamPha/TheLoai/:id" element={<TheLoaiDetail/>} />
        <Route path="/KhamPha/ChuDe/:id" element={<ChuDeDetail/>} />
        <Route path="/Albums" element={<Albums/>} /> 
        <Route path="/Albums/:id" element={<Albumdetails/>} /> 
        <Route path="/ThuVien/:id" element={<ThuVienDetail/>} /> 
        <Route path="/BangXepHang" element={<BangXepHang/>} /> 
        <Route path="/TimKiem" element={<TimKiem/>} /> 
        {/* Thêm các route con khác */}
       </Route>
      </Routes>
    );
  };
  
  export default AppRoutes;