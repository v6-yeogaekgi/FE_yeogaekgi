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
import axios from 'axios';

export default function MyPage(props) {
    const navigate = useNavigate();
    const { protocol } = useContext(AllStateContext);
    const token = localStorage.getItem('token');
    const memberString = localStorage.getItem('member');
    const member = JSON.parse(memberString);
    const logoutUrl = protocol + 'members/logout';
    const [userData, setUserData] = useState(member);

    const onClickLogout = () => {
        // alert('logout 클릭');
        const data = {
            email: userData.email,
        }
        console.log(data);
        console.log(token);
        try {
            axios.post(logoutUrl, data, {
                headers: {
                    Authorization: token,
                    'Content-Type': 'application/json',
                },
            });
            navigate('/');
        } catch (error) {
            console.log("Logout API 오류:", error);
        }
    };

    const onClickMyReviews = () => {
        navigate('/mypage/review');
    };

    const onClickMyLikes = () => {
        navigate('/mypage/Likes');
    };
    const onClickQna = () => {
        navigate('/qna');
    }

    return (
        <div>
            <Box
                sx={{
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    position: 'relative', //
                    overflow: 'hidden',
                    backgroundColor: 'white',
                    paddingTop: 0,
                    marginTop: 0,
                    // paddingBottom: '70px',
                }}
            >
                <List>
                    <Divider variant="middle"/>
                    <ListItem>
                        <ListItemButton onClick={onClickMyReviews}>
                            My Reviews
                        </ListItemButton>
                    </ListItem>
                    <Divider variant="middle" />
                    <ListItem>
                        <ListItemButton onClick={onClickMyLikes}>
                            My Likes
                        </ListItemButton>
                    </ListItem>
                    <Divider variant="middle" />
                    <ListItem>
                        <ListItemButton onClick={onClickQna}>
                            Q&A
                        </ListItemButton>
                    </ListItem>
                    <Divider variant="middle" />
                    <ListItem sx={{ paddingBottom: 0, marginBottom: 0 }}>
                        <ListItemButton onClick={onClickLogout}>Logout</ListItemButton>
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
        </div>
    );
}
