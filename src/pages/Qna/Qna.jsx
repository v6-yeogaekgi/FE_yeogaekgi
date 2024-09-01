import React, { useState, useRef, useEffect, useMemo, useContext } from 'react';
import { Box } from '@mui/material';
import { AllStateContext } from '../../App';
import axios from 'axios';

import QnaList from './components/QnaList';

const Qna = () => {
    const [qnaItem, setQnaItem] = useState([]);
    const { protocol } = useContext(AllStateContext);
    const token = localStorage.getItem('token');

    // ================ [start] comment api 호출 부분 ================
    const getApiUrl = protocol + 'qna/list';
    const getApi = () => {
        axios
            .get(getApiUrl, {
                headers: {
                    Authorization: token,
                    'Content-Type': 'application/json',
                },
            })
            .then((res) => {
                setQnaItem(res.data.content);
                console.log(res.data.content);
            });
    };

    useEffect(() => {
        getApi();
    }, []);

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
            <QnaList qnaItem={qnaItem} />
        </Box>
    );
};

export default Qna;
