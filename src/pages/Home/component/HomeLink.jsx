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

const HomeCardItem = () => {
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
                // backgroundColor: 'transparent',
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
                <LocalActivityRoundedIcon sx={{ fontSize: 40 }} />{' '}
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
                <FoodBankRoundedIcon sx={{ fontSize: 40 }} />{' '}
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
                <PhonelinkRingRoundedIcon sx={{ fontSize: 40 }} />{' '}
            </Box>
        </Card>
    );
};

export default HomeCardItem;
