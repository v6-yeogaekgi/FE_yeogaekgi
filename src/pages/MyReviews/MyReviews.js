import React, { useState } from 'react';
import { useEffect, useContext } from 'react';
import axios from 'axios';
import { AllStateContext } from '../../App';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    Box,
    List,
    ListItem,
    ListItemText,
    Paper,
    Typography,
    Rating,
    Divider,
    Alert,
    Button,
    CircularProgress,
} from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { format } from 'date-fns';
import ImageSwiper from '../../components/ImageSwiper/ImageSwiper';

export default function MyReviews() {
    const { protocol } = useContext(AllStateContext);
    const token = localStorage.getItem('token');
    const myReviewUrl = protocol + 'review/list';
    const getUnwrittenUrl =
        protocol + 'wallet/detail/getPaymentsWithoutReviews';
    const location = useLocation();

    const [reviews, setReviews] = useState([]);
    const [unwrittens, setUnwrittens] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    function formatReviewDates(reviews) {
        return reviews.map((review) => ({
            // 객체 리턴이라서 중괄호?
            ...review,
            formatRegDate: review.regDate
                ? format(review.regDate, 'PPpp')
                : 'N/A',
        }));
    }

    function formatUnwrittenDates(datas) {
        return datas.map((data) => ({
            ...data,
            formatPayDate: data.payDate ? format(data.payDate, 'PPPP') : 'N/A',
        }));
    }

    function onWriteReview() {
        // alert('리뷰 작성 클릭');
        console.log(unwrittens);
        navigate('/mypage/review/write', { state: { unwrittens } });
    }

    const getMyReviews = () => {
        setLoading(true);
        axios
            .post(
                myReviewUrl,
                {},
                {
                    headers: {
                        Authorization: token,
                        'Content-Type': 'application/json',
                    },
                },
            )
            .then(function (res) {
                if (res.data) {
                    const formattedReviews = formatReviewDates(res.data);
                    setReviews(formattedReviews);
                }
            })
            .catch(function (error) {
                console.error('reviews - axios post error:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const getUnwrittenReviews = () => {
        axios
            .get(getUnwrittenUrl, {
                headers: {
                    Authorization: token,
                    'Content-Type': 'application/json',
                },
            })
            .then(function (res) {
                if (res.data) {
                    const formattedUnwritten = formatUnwrittenDates(res.data);
                    setUnwrittens(formattedUnwritten);
                }
            })
            .catch(function (err) {
                console.error('get unwritten - axios get error: ', err);
            })
            .finally(() => {
                setLoading(false);
            });
    };  

    useEffect(() => {
        getMyReviews();
        getUnwrittenReviews();
    }, [location.key]);

    return (
        <>
            <Card
                sx={{
                    // padding: '10px',
                    boxShadow: 'none',
                    borderRadius: 5,
                    backgroundColor: '#ffffff',
                    position: 'relative',
                    margin: 2,
                }}
            >
                {unwrittens && unwrittens.length > 0 ? (
                    <Alert
                        severity="info"
                        action={
                            <Button
                                color="inherit"
                                size="small"
                                variant="outlined"
                                onClick={onWriteReview}
                                sx={{ marginTop: '10px', marginRight: '10px' }}
                            >
                                GO
                            </Button>
                        }
                    >
                        You can write reviews for {unwrittens.length} places!
                    </Alert>
                ) : (
                    <></>
                )}
            </Card>
            {!loading && reviews.length > 0 ? (
                <>
                    {reviews.map((review, index) => (
                        <Card
                            key={index}
                            sx={{
                                padding: '10px',
                                boxShadow: 'none',
                                borderRadius: 5,
                                backgroundColor: '#ffffff',
                                position: 'relative',
                                margin: 2,
                            }}
                        >
                            <CardContent>
                                <Typography
                                    sx={{ ml: 0.4, fontWeight: 'bold' }}
                                >
                                    {review.serviceName}
                                </Typography>

                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Rating value={review.score} readOnly />
                                    <Divider
                                        orientation="vertical"
                                        variant="middle"
                                        flexItem
                                        sx={{
                                            ml: 1,
                                            background: '#DDE1E6',
                                            borderBottomWidth: '5',
                                            height: '15px',
                                        }}
                                    />
                                    <Typography
                                        component="span"
                                        variant="caption"
                                        color="text.secondary"
                                        // variant="body2"
                                        sx={{ ml: 1 }}
                                    >
                                        {review.formatRegDate || 'N/A'}
                                    </Typography>
                                </Box>

                                <ImageSwiper images={review.images} />

                                <Typography
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    {review.content || 'N/A'}
                                </Typography>
                                <br />
                                {/* <ReviewImages images={review.images}/> */}
                            </CardContent>
                        </Card>
                    ))}
                </>
            ) : (
                <Card
                    sx={{
                        padding: '40px',
                        margin: 2,
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
                            sx={{
                                color: 'text.secondary',
                                textAlign: 'center',
                            }}
                        >
                            No reviews written yet!
                        </Typography>
                    </CardContent>
                </Card>
            )}
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
        </>
    );
}
