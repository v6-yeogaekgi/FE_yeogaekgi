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
} from '@mui/material';
import { format } from 'date-fns';
import ImageSwiper from '../../components/ImageSwiper/ImageSwiper';

export default function MyReviews(props) {
    const { protocol } = useContext(AllStateContext);
    const token = localStorage.getItem('token');
    const myReviewUrl = protocol + 'review/list';
    const userString = localStorage.getItem('user');
    const user = JSON.parse(userString);
    const [reviews, setReviews] = useState([]);
    // console.log(reviews);

    function formatReviewDates(reviews) {
        return reviews.map(review => (
            { // 객체 리턴이라서 중괄호?
                ...review,
                formatRegDate : review.regDate ? format(review.regDate, 'PPpp') : 'N/A'
            }
        ));
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
                    // console.log(res.data);
                    const formattedReviews = formatReviewDates(res.data);
                    setReviews(formattedReviews);
                    // console.log(reviews);
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
            <Box
                sx={{
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    position: 'relative',
                    overflow: 'hidden',
                    backgroundColor: '#f0f4f8',
                    // paddingBottom: '70px',
                }}
            >
                {reviews && reviews.length > 0 ? (
                    <Paper elevation={3} sx={{ margin: '15px' }}>
                        <List>
                            {reviews.map((review, index) => (
                                <ListItem key={index} divider>
                                    <ListItemText
                                        primary={`Review ${index + 1}`}
                                        secondary={
                                            <>
                                                {/* 실제 데이터 구조에 맞게 수정 필요 */}
                                                <Typography
                                                    component="span"
                                                    variant="body2"
                                                    color="text.primary"
                                                >
                                                    Content:{' '}
                                                    {review.content || 'N/A'}
                                                </Typography>
                                                <br />
                                                <Typography
                                                    component="span"
                                                    variant="body2"
                                                >
                                                    Date:{' '}
                                                    {review.formatRegDate || 'N/A'}
                                                </Typography>
                                                <br/>
                                                <ImageSwiper images={review.images}/>
                                                {/* <ReviewImages images={review.images}/> */}
                                            </>
                                        }
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Paper>
                ) : (
                    <p>No reviews written yet!</p>
                )}
            </Box>
        </>
    );
}
