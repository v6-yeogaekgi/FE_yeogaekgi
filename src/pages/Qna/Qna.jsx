import React, { useState, useRef, useEffect, useMemo, useContext } from 'react';
import { Box } from '@mui/material';

import QnaList from './component/QnaList';

const Qna = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100vh',
                paddingBottom: '70px',
                backgroundColor: '#f0f4f8',
                alignItems: 'center',
                overflow: 'auto',
                maxHeight: 'calc(100vh - 70px)',
            }}
        >
            <QnaList />
        </Box>
    );
};

export default Qna;
