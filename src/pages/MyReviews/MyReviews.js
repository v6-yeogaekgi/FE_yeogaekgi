import React, { useState } from 'react';
import { useEffect, useContext } from 'react';
import axios from 'axios';
import { AllStateContext } from '../../App';
import {
    Box,
    List,
    ListItem,
    ListItemText,
    Paper,
    Typography,
    Rating,
    Divider,
} from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { format } from 'date-fns';
import ImageSwiper from '../../components/ImageSwiper/ImageSwiper';

export default function MyReviews(props) {
    const { protocol } = useContext(AllStateContext);
    const token = localStorage.getItem('token');
    const myReviewUrl = protocol + 'review/list';
    const [reviews, setReviews] = useState([]);

    function formatReviewDates(reviews) {
        return reviews.map((review) => ({
            // 객체 리턴이라서 중괄호?
            ...review,
            formatRegDate: review.regDate
                ? format(review.regDate, 'PPpp')
                : 'N/A',
        }));
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
        console.log('current reviews state:', reviews);
    }, [reviews]);

    return (
        <>
                {reviews && reviews.length > 0 ? (
                    <>
                            {reviews.map((review, index) => (
                                <Card key={index}
                                      sx={{
                                          padding: '10px',
                                          boxShadow: 'none',
                                          borderRadius: 5,
                                          backgroundColor: '#ffffff',
                                          position: 'relative',
                                          margin:2,
                                      }}
                                >
                                    <CardContent>
                                                <Typography sx={{ ml: 0.4, fontWeight: 'bold' }}>
                                                    {review.serviceName}
                                                </Typography>

                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                    }}
                                                >
                                                    <Rating
                                                        value={review.score}
                                                        readOnly
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
                                                        variant="caption"
                                                        color="text.secondary"
                                                        // variant="body2"
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
                                    </CardContent>
                                </Card>
                            ))}
                    </>

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
        </>
    );
}
