import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import UserCard from '../../components/UserCard/UserCard';
import axios from 'axios';
import { Paper } from '@mui/material';
import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Registration = () => (
    // TODO 
    // exp_date 만료인 카드 처리 
    <Paper
        onClick={() => alert('Registration')}
        sx={{
            width: '90%', // 너비를 100%로 변경
            height: '150px',
            border: '1px solid #ccc',
            borderRadius: '10px 10px 0 0',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            marginTop: 'auto',
            backgroundColor: 'white', // 배경색 추가
            transform: 'translateY(20%)',
            overflow: 'hidden',
            boxSizing: 'border-box', // 패딩을 너비에 포함
            margin: '0 auto', // 가운데 정렬
            alignItems: 'center',
            transition: 'background-color 0.3s, box-shadow 0.3s', // 부드러운 변화를 위해 transition 추가
            cursor: 'pointer',
            '&:hover': { // hover 상태 정의
                backgroundColor: '#f5f5f5', // 배경색 변경
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)', // 그림자 추가
            },
        }}
    >
        Registration
        {/* + 버튼 추가 */}
    </Paper>
);

export default function Wallet(props) {
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [param, setParam] = useState({
        page: 1,
    });

    const handleCardClick = (cardData) => {
        navigate('detail', { state: { cardData } });
    };

    const [error, setError] = useState(null);

    const getApi = () => {
        axios
            .get('https://api.yeogaekgi.site', { params: param })
            .then((res) => {
                setData(res.data.result.content);
            })
            .catch((err) => {
                console.error('API 요청 중 오류 발생:', err);
                setError('데이터를 불러오는 데 실패했습니다.');
            });
    };

    useEffect(() => {
        if (process.env.NODE_ENV !== 'development') {
            getApi();
        } else {
            setData([
                { // api 응답 데이터
                    userCardId: 1,
                    expiryDate: "2024-11-04T02:24:10.496+00:00",
                    payBalance: 10000,
                    transitBalance: 10000,
                    starred: 1,
                    status: 1,
                    cardId: 1,
                    design: "https://yeogaekgi.s3.ap-northeast-2.amazonaws.com/Design.png",
                    area: "부산",
                    cardName: "testCard1",
                    memberId: 1,
                },
                {
                    userCardId: 101,
                    expiryDate: "2024-11-04T02:27:45.328+00:00",
                    payBalance: 10000,
                    transitBalance: 10000,
                    starred: 1,
                    status: 1,
                    cardId: 1,
                    design: "https://yeogaekgi.s3.ap-northeast-2.amazonaws.com/Design.png",
                    area: "부산",
                    cardName: "testCard1",
                    memberId: 1
                },
                {
                    userCardId: 201,
                    expiryDate: "2024-11-04T02:43:04.450+00:00",
                    payBalance: 10000,
                    transitBalance: 10000,
                    starred: 1,
                    status: 1,
                    cardId: 1,
                    design: "https://yeogaekgi.s3.ap-northeast-2.amazonaws.com/Design.png",
                    area: "부산",
                    cardName: "testCard1",
                    memberId: 1
                }
            ]);
        }
    }, []);

    return (
        <Box sx={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            paddingBottom: '75px', //
            position: 'relative', //
            overflow: 'hidden', //
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
                    <UserCard key={index} data={cardData} onCardClick={handleCardClick} />
                ))}
            </Box>

            <Box sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
            }}>
                <Registration

                />
            </Box>
        </Box>
    );
}