import React, { useState } from "react";
import { Link } from 'react-router-dom'
import './style.css'
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

//drawer elements used
import Drawer from "@mui/material/Drawer";
import CloseIcon from "@mui/icons-material/Close";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import DescriptionIcon from "@mui/icons-material/Description";
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import CallRoundedIcon from '@mui/icons-material/CallRounded';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import VpnKeyRoundedIcon from '@mui/icons-material/VpnKeyRounded';
import LogOutIcon from '@mui/icons-material/ExitToApp';
import ViewUserApplicationsIcon from '@mui/icons-material/Assessment';

import Icon from '../../assets/avcdo-md.png'
import { PALLET } from '../../stylings/pallet'



export default function NavBar() {

    /*
    react useState hook to save the current open/close state of the drawer,
    normally variables dissapear afte the function was executed
    */
    const [open, setState] = useState(false);


    /*
    function that is being called every time the drawer should open or close,
    the keys tab and shift are excluded so the user can focus between
    the elements with the keys
    */
    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        //changes the function state according to the value of open
        setState(open);
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: PALLET.pineGreen }}>
            <Container maxWidth="lg" disableGutters={true}>
                <Toolbar>
                    <img src={Icon} alt='logo' height='60' />
                    <Typography variant="h3" sx={{ flexGrow: 1, fontWeight: 900, color: PALLET.mountainDewLime }}>
                        AVCDOLOAN
                    </Typography>

                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={toggleDrawer(true)}
                        sx={{
                            ml: 3,
                            display:
                            {
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
                        <Box sx={{
                            p: 2,
                            height: 1,
                            backgroundColor: PALLET.paleGoldYellow,
                        }}>

                            {/* 
                  when clicking the icon it calls the function toggleDrawer 
                  and closes the drawer by setting the variable open to false
                  */}
                            <IconButton onClick={toggleDrawer(false)} sx={{ mb: 2 }}>
                                <CloseIcon />
                            </IconButton>

                            <Divider sx={{ mb: 2 }} />

                            <Box sx={{ mb: 2 }}>
                                <ListItemButton sx={{ mb: 2 }}>
                                    <ListItemIcon>
                                        <HomeRoundedIcon sx={{ color: PALLET.pineGreen }} />
                                    </ListItemIcon>
                                    <Link to="/" className="links" onClick={toggleDrawer(false)}>HOME</Link>
                                </ListItemButton>

                                <ListItemButton sx={{ mb: 2 }}>
                                    <ListItemIcon>
                                        <DescriptionIcon sx={{ color: PALLET.pineGreen }} />
                                    </ListItemIcon >
                                    <Link to="/blog" className="links" onClick={toggleDrawer(false)}>BLOG</Link>
                                </ListItemButton>

                                <ListItemButton sx={{ mb: 2 }}>
                                    <ListItemIcon>
                                        <CallRoundedIcon sx={{ color: PALLET.pineGreen }} />
                                    </ListItemIcon>
                                    <Link to="/contact" className="links" onClick={toggleDrawer(false)}>CONTACT</Link>
                                </ListItemButton>

                                <ListItemButton sx={{ mb: 2 }}>
                                    <ListItemIcon>
                                        <LoginRoundedIcon sx={{ color: PALLET.pineGreen }} />
                                    </ListItemIcon>
                                    <Link to="/login" className="links" onClick={toggleDrawer(false)}>LOGIN</Link>
                                </ListItemButton>
                                <ListItemButton sx={{ mb: 2 }}>
                                    <ListItemIcon>
                                        <VpnKeyRoundedIcon sx={{ color: PALLET.pineGreen }} />
                                    </ListItemIcon>
                                    <Link to="/signup" className="links" onClick={toggleDrawer(false)}>SIGN UP</Link>
                                </ListItemButton>
                                <ListItemButton sx={{ mb: 2 }}>
                                    <ListItemIcon>
                                        <ViewUserApplicationsIcon sx={{ color: PALLET.pineGreen }} />
                                    </ListItemIcon>
                                    <Link to="/admin/applications" className="links" onClick={toggleDrawer(false)}>APPLICATIONS</Link>
                                </ListItemButton>   
                                <ListItemButton sx={{ mb: 2}}>
                                    <ListItemIcon>
                                        <LogOutIcon sx={{ color: PALLET.pineGreen }} />
                                    </ListItemIcon>
                                    <p>LOGOUT</p>
                                </ListItemButton>
                            </Box>
                        </Box>
                    </Drawer>
                </Toolbar>
            </Container>
        </AppBar>

    );
}
