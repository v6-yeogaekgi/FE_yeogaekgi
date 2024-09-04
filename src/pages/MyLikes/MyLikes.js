import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { AllStateContext } from '../../App';
import Box from '@mui/material/Box';
import {
    CardActions,
    CardHeader,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Paper,
    Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

export default function MyLikes(props) {
    const { protocol } = useContext(AllStateContext);
    const token = localStorage.getItem('token');

    const [data, setData] = useState([]); // Initialize with an empty array
    const [error, setError] = useState(null);

    function typeFilter(type) {
        if (type === 0) return 'All';

        if (type === 1) return 'Tourist Attraction';

        if (type === 2) return 'Activity';

        return 'ETC';
    }

    const getApi = () => {
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
            });
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
                backgroundColor: data.length === 0 ? 'white' : '#f0f4f8',
            }}
        >
            <Paper elevation={0} sx={{ marginTop: '10px' , width: '100%'}}>
                {data.length > 0 ? (
                    data.map((likeData, index) => (
                        <Card
                            sx={{
                                margin: '15px',
                            }}
                        >
                            <CardHeader
                                action={
                                    <IconButton
                                        aria-label="delete"
                                        onClick={() =>
                                            onDelete(likeData.servicesLikeId)
                                        }
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                }
                                title={likeData.name}
                                subheader={typeFilter(likeData.type)}
                            />
                            <CardContent>
                                <Typography
                                    variant="body2"
                                    sx={{ color: 'text.secondary' }}
                                >
                                    {likeData.content}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Typography
                                    variant="body2"
                                    sx={{ color: 'text.secondary' }}
                                >
                                    {likeData.address}
                                </Typography>
                            </CardActions>
                        </Card>
                    ))
                ) : (
                    <div
                        style={{
                            backgroundColor: 'white',
                            width: '100%',
                            textAlign: 'center',
                        }}
                    >
                        <h4>No likes yet!</h4>
                    </div>
                )}
            </Paper>
        </Box>
    );
}
