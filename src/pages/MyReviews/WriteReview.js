import React from 'react';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AllStateContext } from '../../App';
import { Box, Typography } from '@mui/material';
import RecentVisit from './components/RecentVisit';
import { useLocation } from 'react-router-dom';

export default function WriteReview() {
    const location = useLocation();
    const unwrittenData = location.state?.unwrittens;
    console.log(unwrittenData);
    return (
        <>
            <Box>
                <Typography variant='h5'>Recent Visits</Typography>
                {unwrittenData.map((unwritten, index) => (
                    <RecentVisit data={unwritten} />
                ))}
            </Box>
        </>
    );
}
