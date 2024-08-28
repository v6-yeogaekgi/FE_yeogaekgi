import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import {
    Card,
    CardContent,
    Typography,
    IconButton,
    Button,
    Grid,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import StarCheckbox from '../../../components/StarCheckbox/StarCheckBox';

const HomeCardItem = ({ data }) => {

    const navigate = useNavigate();
    const [cardData, setCardData] = useState(data);
    const { userCardId, design, status, cardName, payBalance, transitBalance, starred } = data;

    const handleTopUpClick = (e) => {
        e.stopPropagation(); // 이벤트 버블링 방지
        navigate('/wallet/top-up', { state: { data } });
    };

    const handleBalanceConversionClick = (e) => {
        e.stopPropagation(); // 이벤트 버블링 방지
        // console.log("conversion 클릭, cardData paybalance: ", cardData.payBalance);
        navigate('/wallet/conversion', { state: { data } });
    };

    const handleHistoryClick = (e) => {
        e.stopPropagation();
        navigate('/wallet/detail', { state: { cardData } });
    }

    return (
        <Box
            sx={{
                position: 'relative',
            }}
        >
            <Card
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: 'auto',
                    width: 360,
                    position: 'relative',
                    boxShadow: 'none',
                    borderRadius: 5,
                }}
            >
                <CardContent
                    sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}
                >
                    <Grid container spacing={2}>
                        <Grid
                            item
                            xs={4}
                            sx={{
                                display: 'flex',
                                alignItems: 'stretch',
                                height: '100%',
                            }}
                        >
                            <img
                                src={design}
                                alt="Card Image"
                                style={{
                                    width: '80%',
                                    height: '100%',
                                    objectFit: 'cover',
                                }}
                            />
                        </Grid>
                        <Grid item xs={8}>
                            <Grid container spacing={2}>
                                <Grid item xs={8}>
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            mt: 1,
                                            fontFamily: 'Noto Sans, sans-serif',
                                            fontWeight: 700,
                                        }}
                                    >
                                        {cardName}
                                    </Typography>
                                </Grid>

                                <Grid item xs={2}>
                                    <StarCheckbox initialChecked={starred === 1} userCardId={userCardId}/>
                                </Grid>
                            </Grid>

                            <Grid container spacing={2} sx={{ mt: 0.5 }}>
                                <Grid item xs={6}>
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontFamily: 'Noto Sans, sans-serif',
                                            fontWeight: 700,
                                        }}
                                    >
                                        Pay
                                    </Typography>
                                    <Typography variant="h6">
                                        ₩{payBalance}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontFamily: 'Noto Sans, sans-serif',
                                            fontWeight: 700,
                                        }}
                                    >
                                        Transit
                                    </Typography>
                                    <Typography variant="h6">
                                        ₩{transitBalance}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Button
                                variant="contained"
                                sx={{
                                    width: '100%',
                                    mt: 2,
                                    borderRadius: 5,
                                    textTransform: 'capitalize',
                                    height: 50,
                                    fontSize: '16px',
                                    fontFamily: 'Noto Sans, sans-serif',
                                    backgroundColor: '#2e85e0',
                                    '&:hover': {
                                        backgroundColor: '#1a6bb8',
                                    },
                                }}
                                onClick={handleTopUpClick}
                            >
                                Top Up
                            </Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button
                                variant="contained"
                                sx={{
                                    width: '100%',
                                    mt: 2,
                                    borderRadius: 5,
                                    textTransform: 'capitalize',
                                    height: 50,
                                    fontSize: '16px',
                                    fontFamily: 'Noto Sans, sans-serif',
                                    backgroundColor: '#2e85e0',
                                    '&:hover': {
                                        backgroundColor: '#1a6bb8',
                                    },
                                }}
                                onClick={handleBalanceConversionClick}
                            >
                                Transfer
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                sx={{
                                    width: '100%',
                                    mt: 2,
                                    borderRadius: 5,
                                    textTransform: 'capitalize',
                                    height: 50,
                                    fontSize: '16px',
                                    fontFamily: 'Noto Sans, sans-serif',
                                    backgroundColor: '#4653f9',
                                    '&:hover': {
                                        backgroundColor: '#3a43d1',
                                    },
                                }}
                                onClick={handleHistoryClick}
                            >
                                History
                            </Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Box>
    );
};

export default HomeCardItem;
