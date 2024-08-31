import { Grid, Typography, Paper, IconButton } from '@mui/material';
import StarCheckbox from '../StarCheckbox/StarCheckBox';
import BasicButton from '../BasicButton/BasicButton';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import SettingsDrawer from '../SettingsDrawer/SettingsDrawer';
import CardContent from '@mui/material/CardContent';

export default function UserCardOnRefund({ data }) {
    const navigate = useNavigate();
    const { cardName, payBalance, transitBalance, design } = data;

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
                    <Grid container spacing={3}>
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
                            </Grid>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Box>
    );
}