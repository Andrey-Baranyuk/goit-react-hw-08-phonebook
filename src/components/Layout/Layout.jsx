import { useSelector } from 'react-redux';

import { AppBar } from '@mui/material';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';

import MainNav from 'components/MainNav';
import UserMenu from 'components/UserMenu';
import AuthNav from 'components/AuthNav';
import { authSelectors } from 'redux/feature';

const Layout = () => {
  const isLoggIn = useSelector(authSelectors.getIsLoggedIn);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Container maxWidth="xl">
            <Toolbar
              sx={{
                display: { xs: 'none', md: 'flex' },
                justifyContent: 'space-between',
              }}
            >
              <MainNav />

              {isLoggIn ? <UserMenu /> : <AuthNav />}
            </Toolbar>
          </Container>
        </AppBar>
      </Box>
    </>
  );
};

export default Layout;
