import { alpha } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Header from '../../Components/Header';
import SideMenu from '../../Components/SideMenu';
import AppTheme from '../../Theme/shared-theme/AppTheme';
import { Outlet } from 'react-router-dom';
import {
  chartsCustomizations,
  dataGridCustomizations,
  datePickersCustomizations,
  treeViewCustomizations,
} from '../../Theme';

const xThemeComponents = {
  ...chartsCustomizations,
  ...dataGridCustomizations,
  ...datePickersCustomizations,
  ...treeViewCustomizations,
};

export default function Dashboard(props) {
  return (
    <AppTheme {...props} themeComponents={xThemeComponents} >
      <CssBaseline enableColorScheme />
      <Box sx={{ display: 'flex' }}>
        <SideMenu />
      {/* <AppNavbar /> */}
        {/* Main content */}
        <Box
          component="main"
          sx={(theme) => ({
            flexGrow: 1,
            backgroundColor: theme.vars
              ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
              : alpha(theme.palette.background.default, 1),
            overflow: 'auto',
          })}
        >
          <Stack
            spacing={2}
            sx={{
              mx: 3,
              pb: 5,
              mt: { xs: 8, md: 0 },
            }}
          >
            <Header />
            {/* <MainGrid /> */}
           <Outlet/>
           {/* <Fab sx={{width:"100px"}} aria-label="like">
            <CardAlert  />
           </Fab> */}
          </Stack>
        </Box>
      </Box>
    </AppTheme>
  );
}
