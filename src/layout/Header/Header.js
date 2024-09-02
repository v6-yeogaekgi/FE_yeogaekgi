import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Button, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Music from '../../components/Music/music';
import './style.css';
import { useState } from 'react';
import AreaMenu from '../../components/AreaMenu/AreaMenu';

const Header = ({ menuName, areas }) => {
    const navigate = useNavigate();
    const isHome = menuName === 'Home';

    const handleBack = () => {
        navigate(-1);
    };

    const handleClick = () => {
        navigate('/faq');
    };

    return (
        <Box
            sx={{
                flexGrow: 1,
                color: '#000',
                padding: 0,
                position: 'fixed',
                top: 0,
                margin: '0 auto',
                paddingTop: '3px',
                zIndex: 1000,
                width: '400px',
            }}
        >
            <AppBar
                position="static"
                elevation={0}
                sx={{
                    backgroundColor: isHome ? '#f0f4f8' : 'white',
                    color: 'black',
                    paddingY: isHome ? '5px' : '0px', // 상하 패딩 조정
                }}
            >
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <Box
                        sx={{
                            width: 40,
                            visibility: isHome ? 'visible' : 'hidden',
                            position: 'absolute',
                            left: 10,
                        }}
                    >
                        {isHome && <AreaMenu areas={areas} />}
                    </Box>
                    <Box
                        sx={{
                            width: 40,
                            visibility: isHome ? 'hidden' : 'visible',
                            position: 'absolute',
                            left: 10,
                        }}
                    >
                        {!isHome && (
                            <IconButton
                                onClick={handleBack}
                                sx={{
                                    '&:hover': {
                                        backgroundColor: 'rgba(0, 0, 0, 0.04)',
                                    },
                                    '&:active': {
                                        backgroundColor: 'rgba(0, 0, 0, 0.08)',
                                    },
                                }}
                            >
                                <ArrowBackIosIcon />
                            </IconButton>
                        )}
                    </Box>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{
                            visibility: isHome ? 'hidden' : 'visible',
                            position: 'absolute',
                            left: '50%',
                            transform: 'translateX(-50%)',
                        }}
                    >
                        {menuName}
                    </Typography>
                    <Box
                        sx={{
                            position: 'absolute',
                            right: 10,
                            weight: 100,
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}
                    >
                        <Music />
                        <Button
                            onClick={handleClick}
                            sx={{
                                display: isHome ? 'inline-flex' : 'none',
                                border: '1px solid #DDDDDD', // 테두리 색상 설정
                                color: '#666666', // 텍스트 색상
                                backgroundColor: '#fff', // 배경 투명하게
                                padding: '2px', // 패딩 줄이기
                                minWidth: '50px', // 최소 너비 설정
                                fontFamily: 'Notosans, sans-serif', // 폰트 설정
                                marginRight: 1.5,
                                borderRadius: '8px', // 모서리 둥글게 설정

                                '&:hover': {
                                    backgroundColor: '#f0f4f8', // 호버 시 배경색 변경
                                },
                            }}
                        >
                            FAQ
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Header;
