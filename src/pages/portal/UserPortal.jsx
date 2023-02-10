import React from 'react';
import { Box } from '@mui/system';
import { Container } from '@mui/system';
import { Drawer } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';



export default function UserPortal() {
  return (
    <div>
        <Container fixed>
            <List style={style} key={index} component="div" disablePadding>
                <ListItem>
                    <ListItemText primary="Last Name: " />
                </ListItem>
            </List>
        </Container>
    </div>
  )
}
