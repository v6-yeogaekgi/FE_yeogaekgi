import React, { useState } from 'react';
import { useEffect, useContext } from 'react';
import axios from 'axios';
import { AllStateContext } from '../../App';
import { useNavigate } from 'react-router-dom';
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
} from '@mui/material';
import { format } from 'date-fns';
import ImageSwiper from '../../components/ImageSwiper/ImageSwiper';

export default function MyReviews(props) {
    const { protocol } = useContext(AllStateContext);
    const token = localStorage.getItem('token');
    const myReviewUrl = protocol + 'review/list';
    const getUnwrittenUrl =
        protocol + 'wallet/detail/getPaymentsWithoutReviews';
    const [reviews, setReviews] = useState([]);
    const [unwrittens, setUnwrittens] = useState([]);
    const navigate = useNavigate();

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

    useEffect(() => {
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
            });
    }, []);

    useEffect(() => {
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
            });
    }, []);

    // useEffect(() => {
    //     console.log('current reviews state:', reviews);
    // }, [reviews]);

    return (
        <>
            <Box
                sx={{
                    width: '100%',
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                    backgroundColor: reviews.length === 0 ? 'white' : '#f0f4f8', // Conditional background color
                }}
            >
                <Alert
                    severity="info"
                    action={
                        <Button
                            color="inherit"
                            size="small"
                            variant="outlined"
                            onClick={onWriteReview}
                        >
                            GO
                        </Button>
                    }
                >
                    You can write reviews for {unwrittens.length} places!
                </Alert>
                {reviews && reviews.length > 0 ? (
                    <Paper elevation={3} sx={{ margin: '15px', width: '100%' }}>
                        <List>
                            {reviews.map((review, index) => (
                                <ListItem key={index} divider>
                                    <ListItemText
                                        primary={
                                            <>
                                                <Typography sx={{ ml: 0.4 }}>
                                                    {review.serviceName}
                                                </Typography>
                                            </>
                                        }
                                        secondary={
                                            <>
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                    }}
                                                >
                                                    <Rating
                                                        value={review.score}
                                                    />
                                                    <Divider
                                                        orientation="vertical"
                                                        variant="middle"
                                                        flexItem
                                                        sx={{
                                                            ml: 1,
                                                            background:
                                                                '#DDE1E6',
                                                            borderBottomWidth:
                                                                '5',
                                                            height: '15px',
                                                        }}
                                                    />
                                                    <Typography
                                                        component="span"
                                                        variant="body2"
                                                        sx={{ ml: 1 }}
                                                    >
                                                        {review.formatRegDate ||
                                                            'N/A'}
                                                    </Typography>
                                                </Box>

                                                <ImageSwiper
                                                    images={review.images}
                                                />

                                                <Typography
                                                    component="span"
                                                    variant="body2"
                                                    color="text.primary"
                                                >
                                                    {review.content || 'N/A'}
                                                </Typography>
                                                <br />
                                                {/* <ReviewImages images={review.images}/> */}
                                            </>
                                        }
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Paper>
                ) : (
                    <div
                        style={{
                            backgroundColor: 'white',
                            width: '100%',
                            textAlign: 'center',
                        }}
                    >
                        <h4>No reviews written yet!</h4>
                    </div>
                )}
            </Box>
        </>
    );
}
