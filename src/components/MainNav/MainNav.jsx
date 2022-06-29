import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import { authSelectors } from 'redux/feature';
import style from './MainNav.module.css';

const MainNav = () => {
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);

  return (
    <>
      <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
        <Button sx={{ my: 2, color: 'white', display: 'block' }}>
          <NavLink className={style.link} to="/">
            Home
          </NavLink>
        </Button>

        {isLoggedIn && (
          <Button sx={{ my: 2, color: 'white', display: 'block' }}>
            <NavLink className={style.link} to="/contacts">
              Contacts
            </NavLink>
          </Button>
        )}
      </Box>
    </>
  );
};

export default MainNav;
