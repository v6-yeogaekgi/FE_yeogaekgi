import React, { useState, useRef, useEffect, useMemo, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { AllStateContext } from '../../App';
import axios from 'axios';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

import QnaList from './components/QnaList';

const Qna = () => {
    const navigate = useNavigate();
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
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    position: 'fixed',
                    bottom: 16,
                    right: 16,
                    paddingBottom: '70px',

                    '& > :not(style)': {
                        m: 1,
                    },
                }}
            >
                <Fab
                    color="primary"
                    aria-label="add"
                    sx={{
                        backgroundColor: '#4653f9',
                        '&:hover': {
                            backgroundColor: '#3440d1',
                        },
                    }}
                    onClick={() => {
                        navigate('/qna/regist'); // 네비게이션할 경로
                    }}
                >
                    <AddIcon />
                </Fab>
            </Box>
        </Box>
    );
};

export default Qna;
