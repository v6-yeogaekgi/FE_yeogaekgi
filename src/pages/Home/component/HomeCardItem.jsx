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
import StarIcon from '@mui/icons-material/Star';
import cardImg from '../../../img/Design.png';

const HomeCardItem = () => {
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
                                src={cardImg}
                                alt="Card Image"
                                style={{
                                    width: '80%',
                                    height: '100%',
                                    objectFit: 'cover',
                                }}
                            />
                        </Grid>
                        <Grid item xs={8}>
                            <Typography
                                variant="h6"
                                sx={{
                                    mt: 1,
                                    fontFamily: 'Noto Sans, sans-serif',
                                    fontWeight: 700,
                                }}
                            >
                                서울 3456
                            </Typography>

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
                                        15,000₩
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
                                    <Typography variant="h6">5,000₩</Typography>
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
                            >
                                Charge
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
                            >
                                History
                            </Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
            <IconButton
                sx={{
                    position: 'absolute',
                    top: 18,
                    right: 60,
                    zIndex: 1,
                }}
            >
                <StarIcon />
            </IconButton>
        </Box>
    );
};

export default HomeCardItem;
