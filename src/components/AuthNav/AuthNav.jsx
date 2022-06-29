import { NavLink } from 'react-router-dom';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import style from './AuthNav.module.css';

const AuthNav = () => {
  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          display: { xs: 'none', md: 'flex' },
          justifyContent: 'flex-end',
        }}
      >
        <Button
          sx={{ my: 2, color: 'white', display: 'block', marginRight: 0.5 }}
          variant="outlined"
        >
          <NavLink className={style.link} to="/login">
            Login
          </NavLink>
        </Button>

        <Button
          sx={{
            my: 2,
            color: 'white',
            display: 'block',
            outline: '1px solid white',
          }}
          variant="outlined"
        >
          <NavLink className={style.link} to="/register">
            Register
          </NavLink>
        </Button>
      </Box>
    </>
  );
};

export default AuthNav;
