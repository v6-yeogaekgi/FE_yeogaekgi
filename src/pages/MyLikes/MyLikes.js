import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { AllStateContext } from '../../App';
import Box from '@mui/material/Box';
import {
    CardActions,
    CardHeader, CircularProgress,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Paper,
    Typography,
} from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import MyLikeItem from './components/MyLikeItem';

export default function MyLikes(props) {
    const { protocol } = useContext(AllStateContext);
    const token = localStorage.getItem('token');

    const [data, setData] = useState([]); // Initialize with an empty array
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const getApi = () => {
        setLoading(true);
        axios
            .get(protocol + 'servicesLike/list', {
                headers: {
                    Authorization: token,
                    'Content-Type': 'application/json',
                },
            })
            .then((res) => {
                if (Array.isArray(res.data) && res.data.length > 0) {
                    const formattedData = res.data.map((item) => ({
                        servicesLikeId: item.servicesLikeId,
                        memberId: item.memberId,
                        servicesId: item.servicesId,
                        address: item.address,
                        content: item.content,
                        likeCnt: item.likeCnt,
                        name: item.name,
                        type: item.type, // 0: 전체 | 1: 관광지 | 2: 액티비티 | 3: 기타
                    }));
                    setData(formattedData);
                } else {
                    setData([]);
                }
            })
            .catch((err) => {
                console.error('API 요청 중 오류 발생:', err);
            }).finally(
            () => {
                setLoading(false);
            })
        ;
    };

    const onDelete = (servicesLikeId) => {
        axios
            .delete(protocol + 'servicesLike/delete/' + servicesLikeId, {
                headers: {
                    Authorization: token,
                    'Content-Type': 'application/json',
                },
            })
            .then(() => {
                getApi();
            })
            .catch((error) => {
                console.error('API 호출 오류:', error);
                setError('항목을 삭제하는 데 실패했습니다.');
            });
    };

    useEffect(() => {
        getApi();
    }, []);

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
                position: 'relative',
                overflow: 'hidden',
                backgroundColor: '#f0f4f8',
            }}
        >
            <Paper elevation={0} sx={{
                marginTop: '10px',
                width: '90%',
                backgroundColor: '#f0f4f8',
            }}>
                {!loading && (
                    data.length > 0 ? (
                        data.map((likeData, index) => (
                            <MyLikeItem key={index} likeData={likeData} handleDelete={onDelete} />
                        ))
                    ) : (
                        <Card
                            sx={{
                                padding: '10px',
                                boxShadow: 'none',
                                borderRadius: 5,
                                backgroundColor: '#ffffff',
                                mb: 2,
                                position: 'relative',
                            }}
                        >
                            <CardContent>
                                <Typography
                                    variant="body2"
                                    sx={{ color: 'text.secondary', textAlign: 'center' }}
                                >
                                    No likes yet!
                                </Typography>
                            </CardContent>
                        </Card>
                    )
                )}
            </Paper>
            {loading && (
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        zIndex: 1,
                    }}
                >
                    <CircularProgress sx={{ color: '#4653f9' }} />
                </Box>
            )}
        </Box>
    );
}
