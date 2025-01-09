import Stack from '@mui/material/Stack';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import CustomDatePicker from './CustomDatePicker';
import NavbarBreadcrumbs from './NavbarBreadcrumbs';
import MenuButton from './MenuButton';
import ColorModeIconDropdown from '../Theme/shared-theme/ColorModeIconDropdown';
import Search from './Search';
import { Typography,Button, Grid2 } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import {Link} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
export default function Header() {
  const token = localStorage.getItem('token');
  const navigate = useNavigate()
  const gotolink = ()=>{
    navigate("/Login")
  }
  const logout = () => {
    localStorage.clear();
    toast.success("Đăng xuất thành công", {
      toastId: "alert-add-save-success",
    });
    gotolink()
    window.location.reload();
  }
  return (
    <Stack
      direction="row"
      sx={{
        display: { xs: 'none', md: 'flex' },
        width: '100%',
        alignItems: { xs: 'flex-start', md: 'center' },
        justifyContent: 'space-between',
        maxWidth: { sm: '100%', md: '1700px' },
        pt: 1.5,
      }}
      spacing={2}
    >
      <NavbarBreadcrumbs />
      <Stack direction="row" sx={{ gap: 1 }}>
        <Search />
        {/* <CustomDatePicker /> */}
        <MenuButton showBadge aria-label="Open notifications">
          <NotificationsRoundedIcon />
        </MenuButton>
        <Grid2>
          {token ? ( <Button>
        <Typography>
          <Link onClick={logout}>Đăng xuất</Link>
          </Typography>
        </Button>):(
           <Grid2>
              <Button>
        <Typography>
          <Link component={RouterLink} to="/Login">Đăng nhập</Link>
          </Typography>
        </Button>
        <Button>
        <Typography>
        <Link component={RouterLink} to="/Register">Đăng kí</Link>
         </Typography>
        </Button>
           </Grid2>
        )}
      
        </Grid2>
        <ColorModeIconDropdown />
      </Stack>
    </Stack>
  );
}
