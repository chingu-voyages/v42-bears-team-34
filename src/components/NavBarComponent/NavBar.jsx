import React, { useState, useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

//drawer elements used
import Drawer from '@mui/material/Drawer';
import CloseIcon from '@mui/icons-material/Close';
import Divider from '@mui/material/Divider';

import DescriptionIcon from '@mui/icons-material/Description';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import CallRoundedIcon from '@mui/icons-material/CallRounded';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import VpnKeyRoundedIcon from '@mui/icons-material/VpnKeyRounded';
import LogOutIcon from '@mui/icons-material/ExitToApp';
import ViewUserApplicationsIcon from '@mui/icons-material/Assessment';

import Icon from '../../assets/avcdo-md.png';
import { PALLET } from '../../stylings/pallet';
import { NavBarOption } from './NavBarOption';
import AppContext from '../../context/AppContext';
import { TokenManager } from '../../services/token-manager/token-manager';
import { APP_ACTIONS } from '../../context/app.actions';
import { ENV } from '../../environment';

export default function NavBar() {
  /*
  react useState hook to save the current open/close state of the drawer,
  normally variables dissapear afte the function was executed
  */
  const [open, setState] = useState(false);

  const { user, dispatch } = useContext(AppContext);
  const navigate = useNavigate();
  /*
  function that is being called every time the drawer should open or close,
  the keys tab and shift are excluded so the user can focus between
  the elements with the keys
  */
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    //changes the function state according to the value of open
    setState(open);
  };

  const handleLogOut = useCallback(() => {
    // Clear the token and navigate

    // Clear the global user state. We may need to clear other attributes here
    dispatch({
      type: APP_ACTIONS.SET_STATE,
      state: {
        user: null,
      },
    });
    setState(false);
    TokenManager.clearToken();
    navigate('/', { replace: true });
  }, []);

  return (
    <AppBar position="static" sx={{ backgroundColor: PALLET.pineGreen }}>
      <Container maxWidth="lg" disableGutters={true}>
        <Toolbar>
          <img src={Icon} alt="logo" height="60" />
          <Typography
            variant="h3"
            sx={{ flexGrow: 1, fontWeight: 900, color: PALLET.mountainDewLime }}
          >
            AVCDOLOAN
          </Typography>

          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer(true)}
            sx={{
              ml: 3,
              display: {
                xs: 'block',
                sm: 'block',
              },
              color: PALLET.mountainDewLime,
            }}
          >
            <MenuIcon />
          </IconButton>

          {/* The outside of the drawer */}
          <Drawer
            //from which side the drawer slides in
            anchor="right"
            //if open is true --> drawer is shown
            open={open}
            //function that is called when the drawer should close
            onClose={toggleDrawer(false)}
            //function that is called when the drawer should open
            onOpen={toggleDrawer(true)}
          >
            {/* The inside of the drawer */}
            <Box
              sx={{
                p: 2,
                height: 1,
                backgroundColor: PALLET.paleGoldYellow,
              }}
            >
              {/* 
            when clicking the icon it calls the function toggleDrawer 
            and closes the drawer by setting the variable open to false
            */}
              <IconButton onClick={toggleDrawer(false)} sx={{ mb: 2 }}>
                <CloseIcon />
              </IconButton>
              <Divider sx={{ mb: 2 }} />
              {user && user.role === 'admin' && (
                <>
                  <Typography
                    color={PALLET.pineGreen}
                    fontWeight={'bold'}
                    pb={2}
                    textAlign={'center'}
                    alignSelf={'center'}
                  >
                    ADMIN
                  </Typography>
                  <Divider sx={{ mb: 2 }} />
                </>
              )}
              <Box sx={{ mb: 2 }}>
                <NavBarOption
                  url="/"
                  classNameInfo="links"
                  onOptionClicked={toggleDrawer(false)}
                  title="HOME"
                  icon={<HomeRoundedIcon sx={{ color: PALLET.pineGreen }} />}
                />
                <NavBarOption
                  url="/blog"
                  classNameInfo="links"
                  onOptionClicked={toggleDrawer(false)}
                  title="BLOG"
                  icon={<DescriptionIcon sx={{ color: PALLET.pineGreen }} />}
                />
                <NavBarOption
                  url="/contact"
                  classNameInfo="links"
                  onOptionClicked={toggleDrawer(false)}
                  title="CONTACT"
                  icon={<CallRoundedIcon sx={{ color: PALLET.pineGreen }} />}
                />
                {!user && (
                  <NavBarOption
                    url="/login"
                    classNameInfo="links"
                    onOptionClicked={toggleDrawer(false)}
                    title="LOGIN"
                    icon={<LoginRoundedIcon sx={{ color: PALLET.pineGreen }} />}
                  />
                )}
                <NavBarOption
                  url="/"
                  classNameInfo="links"
                  onOptionClicked={toggleDrawer(false)}
                  title="SIGN UP"
                  icon={<VpnKeyRoundedIcon sx={{ color: PALLET.pineGreen }} />}
                />
                {user && user.role === 'admin' && (
                  <NavBarOption
                    url="/admin/applications"
                    classNameInfo="links"
                    onOptionClicked={toggleDrawer(false)}
                    title="APPLICATIONS"
                    icon={
                      <ViewUserApplicationsIcon
                        sx={{ color: PALLET.pineGreen }}
                      />
                    }
                  />
                )}
                {user && user.role === 'user' && (
                  <NavBarOption
                    url="/user/applications"
                    classNameInfo="links"
                    onOptionClicked={toggleDrawer(false)}
                    title="MY APPLICATIONS"
                    icon={
                      <ViewUserApplicationsIcon
                        sx={{ color: PALLET.pineGreen }}
                      />
                    }
                  />
                )}
                {user && user.id && (
                  <NavBarOption
                    onOptionClicked={handleLogOut}
                    classNameInfo="links"
                    title="LOG OUT"
                    icon={<LogOutIcon sx={{ color: PALLET.pineGreen }} />}
                  />
                )}
              </Box>
              <Box component={'footer'}>
                <Typography
                  variant="h6"
                  sx={{
                    color: PALLET.pineGreen,
                    position: 'absolute',
                    bottom: '0px',
                    width: '150px',
                    textAlign: 'right',
                    paddingBottom: '1rem',
                  }}
                >
                  v.{ENV.APP_VERSION}
                </Typography>
              </Box>
            </Box>
          </Drawer>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
