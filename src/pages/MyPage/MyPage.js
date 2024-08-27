import React from 'react';
import { useState, useContext } from 'react';
import Box from '@mui/material/Box';
import {
    Divider,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
} from '@mui/material';
import { AllStateContext } from '../../App';
import { useNavigate } from 'react-router-dom';

export default function MyPage(props) {
    const navigate = useNavigate();
    const { protocol } = useContext(AllStateContext);
    const token = localStorage.getItem('token');
    const userString = localStorage.getItem('user');
    const user = JSON.parse(userString);

    const [userData, setUserData] = useState(user);

    const onClickLogout = () => {
        alert('logout 로직');
    };

    const onClickMyReviews = () => {
        navigate('/mypage/review');
    };

    return (
        <>
            <Box
                sx={{
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    position: 'relative', //
                    overflow: 'hidden', //
                    // paddingBottom: '70px',
                }}
            >
                <List>
                    <ListItem>
                        <ListItemButton onClick={onClickMyReviews}>My Reviews</ListItemButton>
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <ListItemButton>My Likes</ListItemButton>
                    </ListItem>
                    <Divider />
                    <ListItem
                        onClick={onClickLogout}
                        sx={{ paddingBottom: 0, marginBottom: 0 }}
                    >
                        <ListItemButton>
                            Logout
                        </ListItemButton>
                    </ListItem>
                    {/* <ListItem sx={{ paddingTop: 0, marginTop: 0 }}>
                        <Typography
                            variant="body2"
                            sx={{
                                color: 'text.secondary',
                                padding: 0,
                                margin: 0,
                            }}
                        >
                            Logged in as {userData.email}
                        </Typography>
                    </ListItem> */}
                </List>
            </Box>
        </>
    );
}
