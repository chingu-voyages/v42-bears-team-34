import React from 'react';
import { Container } from '@mui/system';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';



export default function UserPortal() {

    const listElements = [
        {
            id: "",
            name: "Last name: ",
            address: "Address: ",
            phone: "Phone: ",
            email: "Email: ",
            loanAmount: "Loan amount: ",
            instalment: "Number of months to pay: ",
            total: "Total amount to be paid: "
        }
    ]

  return (
    <div>
        <Container fixed>
            <Typography variant="h4" align="center">User Dashboard</Typography>
            <List>
                {listElements.map(item => (
                    <>
                        <ListItem key={item.id} variant="h5">
                            <ListItemText>{item.name}</ListItemText>
                        </ListItem>
                        <ListItem key={item.id}>
                            <ListItemText>{item.address}</ListItemText>
                        </ListItem>
                        <ListItem key={item.id}>
                            <ListItemText>{item.phone}</ListItemText>
                        </ListItem>
                        <ListItem key={item.id}>
                            <ListItemText>{item.email}</ListItemText>
                        </ListItem>
                        <ListItem key={item.id}>
                            <ListItemText>{...item.loanAmount}</ListItemText>
                        </ListItem>
                        <ListItem key={item.id}>
                            <ListItemText>{...item.instalment}</ListItemText>
                        </ListItem>
                        <ListItem key={item.id}>
                            <ListItemText>{...item.total}</ListItemText>
                        </ListItem>
                    </>
                ))}
            </List>
        </Container>
    </div>
  )
}
