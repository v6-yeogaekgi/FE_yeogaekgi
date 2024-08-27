import Box from '@mui/material/Box';
import { useContext, useEffect, useState } from 'react';
import UserCard from '../../components/UserCard/UserCard';
import axios from 'axios';
import { Paper } from '@mui/material';
import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AllStateContext } from '../../App';
import { getExchangeRate } from '../../components/ExchangeRateManager/ExchangeRateManager';

const Registration = () => (
    <Paper
        onClick={() => alert('Registration')}
        sx={{
            position: 'absolute',
            bottom: '-30px', // 푸터에 약간 가려지도록 조정
            left: '5%',
            width: '90%',
            height: '100px',
            border: '1px solid #ccc',
            borderRadius: '10px 10px 0 0',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            backgroundColor: 'white',
            overflow: 'hidden',
            boxSizing: 'border-box',
            alignItems: 'center',
            transition: 'all 0.3s ease',
            cursor: 'pointer',
            '&:hover': {
                backgroundColor: '#f5f5f5',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                bottom: '-20px', // hover 시 약간 올라오도록 설정
            },
        }}
    >
        Registration
    </Paper>
);

export default function Wallet(props) {
    const rates = getExchangeRate();
    console.log(rates);

    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [param, setParam] = useState({
        page: 1,
    });

    const [starChanged, setStarChanged] = useState(false);

    const handleCardClick = (cardData) => {
        navigate('detail', { state: { cardData } });
    };

    const [error, setError] = useState(null);

    const { protocol } = useContext(AllStateContext);
    const token = localStorage.getItem('token');
    const uri = protocol + 'usercard/list';

    const getApi = () => {
        axios
            .post(uri,
                {},
                {
                    headers: {
                        Authorization: token,
                        'Content-Type': 'application/json',
                    },
                },
            )
            .then((res) => {
                if (Array.isArray(res.data) && res.data.length > 0) {
                    const filteredData = res.data.filter(item => item.status !== 2);
                    const formattedData = filteredData.map(item => ({
                        userCardId: item.userCardId,
                        expiryDate: item.expiryDate,
                        payBalance: item.payBalance,
                        transitBalance: item.transitBalance,
                        starred: item.starred,
                        status: item.status,
                        cardId: item.cardId,
                        design: item.design,
                        area: item.area,
                        cardName: item.cardName,
                        memberId: item.memberId,
                    }));

                    setData(formattedData);

                }})
            .catch((err) => {
                console.error('API 요청 중 오류 발생:', err);
                setError('데이터를 불러오는 데 실패했습니다.');
            });
    };

    useEffect(() => {
            getApi();
    }, []);

    useEffect(() => {
        if (starChanged) {
            setStarChanged(false);
        }
    }, [starChanged]);

    const handleStarChange = () => {
        setStarChanged(true);
    };

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            position: 'relative', //
            overflow: 'hidden', //
            minHeight: '100%',
            paddingBottom: '100px',

        }}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '90%',
                    margin: '0 auto',
                    gap: 2,
                    paddingTop: '20px',
                    flexGrow: 1,
                    paddingBottom: '150px', // 하단 여백 추가
                }}
            >
                {data && data.map((cardData, index) => (
                    <UserCard key={index} data={cardData} onCardClick={handleCardClick} onStarChange={handleStarChange} />
                ))}
            </Box>
            {data && data.length === 0 && (
                <>
                    <Box sx={{ height: '134px', width: '100%' }} />
                    <Box sx={{ height: '134px', width: '100%' }} />
                </>
            )}

            {data && data.length === 1 && (
                <Box sx={{ height: '134px', width: '100%' }} /> // 빈 박스 추가
            )}
            <Registration />
        </Box>
    );
}