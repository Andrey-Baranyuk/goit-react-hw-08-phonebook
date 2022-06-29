import { useSelector, useDispatch } from 'react-redux';
import { authSelectors } from 'redux/feature';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { useLogoutMutation } from 'redux/authorization/authApi';
import { logOut } from 'redux/feature/authSlice';
import avatar from './img/avatar.jpg';

const UserMenu = () => {
  const userEmail = useSelector(authSelectors.getUserEmail);
  const [logout] = useLogoutMutation();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await logout();
    dispatch(logOut());
  };

  return (
    <Box
      sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, maxWidth: 500 }}
    >
      <Grid
        container
        spacing={1}
        sx={{ alignItems: 'center', justifyContent: 'center' }}
      >
        <Grid item xs={1.5}>
          <Avatar alt="avatar" src={avatar} />
        </Grid>

        <Grid item>
          <Typography variant="subtitle1" component="div">
            Welcome back, {userEmail}
          </Typography>
        </Grid>

        <Grid item xs={2}>
          <Button
            type="submit"
            variant="text"
            sx={{ color: 'white', outline: '1px solid white' }}
            onClick={() => handleLogout()}
          >
            Log out
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserMenu;
