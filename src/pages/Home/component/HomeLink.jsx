import { Box } from '@mui/material';
import React from 'react';
import {
    Card,
    CardContent,
    Typography,
    IconButton,
    Button,
    Grid,
} from '@mui/material';
import LocalActivityRoundedIcon from '@mui/icons-material/LocalActivityRounded';
import FoodBankRoundedIcon from '@mui/icons-material/FoodBankRounded';
import PhonelinkRingRoundedIcon from '@mui/icons-material/PhonelinkRingRounded';
import TabletAndroidIcon from '@mui/icons-material/TabletAndroid';
import TouchAppIcon from '@mui/icons-material/TouchApp';
import dgy from '../../../img/땡겨요_회색.png';
import { useNavigate } from 'react-router-dom';

const HomeCardItem = () => {
    const navigate = useNavigate();
    function handleNavigate() {
        navigate('/map/activity');
    }
    return (
        <Card
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: 'auto',
                width: 360,
                padding: 2,
                boxShadow: 'none',
                borderRadius: 5,
                backgroundColor: 'transparent',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 1,
                    textAlign: 'center',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    onClick={handleNavigate}
                >
                    <LocalActivityRoundedIcon
                        sx={{ fontSize: 70, color: '#808080' }}
                    />
                    <Typography
                        sx={{
                            fontFamily: 'Noto Sans, sans-serif',
                            color: '#808080',
                            mt: 1.5,
                        }}
                    >
                        Activities
                    </Typography>
                </Box>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 1,
                    textAlign: 'center',
                }}
            >
                <a
                    href="https://www.ddangyo.com/#0"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: 'none' }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <img
                            src={dgy}
                            alt="Delivery"
                            style={{
                                width: 70,
                                height: 70,
                                objectFit: 'contain',
                            }}
                        />
                        <Typography
                            sx={{
                                fontFamily: 'Noto Sans, sans-serif',
                                color: '#808080',
                                mt: 1.5,
                            }}
                        >
                            Delivery
                        </Typography>
                    </Box>
                </a>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 1,
                    textAlign: 'center',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <TouchAppIcon sx={{ fontSize: 70, color: '#808080' }} />
                    <Typography
                        sx={{
                            fontFamily: 'Noto Sans, sans-serif',
                            color: '#808080',
                            mt: 1.5,
                        }}
                    >
                        Kiosk
                    </Typography>
                </Box>
            </Box>
        </Card>
    );
};

export default HomeCardItem;
