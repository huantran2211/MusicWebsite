
import { styled } from '@mui/material/styles';
import MuiDrawer, { drawerClasses } from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import MenuContent from './MenuContent';
import OptionsMenu from './OptionsMenu';
import logo from './../assets/images/logo.png';
import { IconButton } from '@mui/material';
import { Link } from 'react-router-dom';

import LoginIcon from '@mui/icons-material/Login';
import { useEffect, useState } from 'react';
import axios from 'axios';
const drawerWidth = 240;

const Drawer = styled(MuiDrawer)({
  width: drawerWidth,
  flexShrink: 0,
  boxSizing: 'border-box',
  mt: 10,
  [`& .${drawerClasses.paper}`]: {
    width: drawerWidth,
    boxSizing: 'border-box',
  },
});

export default function SideMenu() {

   const token = localStorage.getItem('token')

   const userId = localStorage.getItem('userId')

   const [userProfile ,setUserProfile] = useState({})

   useEffect(()=>
  {
    const getProfile =async ()=>
    {
      const res = await axios.get(`https://localhost:7280/api/User/GetUserById?id=${userId}`)
      setUserProfile(res.data)
    }
    getProfile()
  },[userId])

  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: 'none', md: 'block' },
        [`& .${drawerClasses.paper}`]: {
          backgroundColor: 'background.paper',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent:"space-between",
          mt: 'calc(var(--template-frame-height, 0px) + 4px)',
          p: 1.5,
          alignItems: 'center',
          alignContent: 'center',
        }}
      >
         <img
        src={logo}
        style={{width: '200px', height: ''}}
        loading="lazy"
      />
      </Box>
      <MenuContent />
     {/* <CardAlert /> */}
      <Stack
        direction="row"
        sx={{
          p: 2,
          gap: 1,
          alignItems: 'center',
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        {token  ? (
    <Box sx={{ mr: 'auto' ,gap:2 }}>
    <Typography variant="body2" sx={{ fontWeight: 500, lineHeight: '16px' }}>
      {userProfile?.tenNguoiDung}
    </Typography>
    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
      {userProfile?.email}
    </Typography>
    
    <OptionsMenu/>
  </Box>
        ):(
  <Box sx={{ mr: 'auto' }} >
     <IconButton sx={{width:"100%"}}>
     <LoginIcon/>  <Typography variant="body1" sx={{ color: 'text.secondary' ,padding:"10px" }}>
      <Link to={"/Login"} style={{textDecoration:"none" ,color: 'text.secondary'}}>
      Đăng nhập
      </Link>
    </Typography>
     </IconButton>
   
  </Box>
        )}
      </Stack>
    </Drawer>
  );
}
