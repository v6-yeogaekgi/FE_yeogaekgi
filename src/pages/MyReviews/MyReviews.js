import React from 'react';
import { useEffect, useContext } from 'react';
import axios from 'axios';
import { AllStateContext } from '../../App';

export default function MyReviews(props) {
    const { protocol } = useContext(AllStateContext);
    const token = localStorage.getItem('token');
    const myReviewUrl = protocol + 'review/list';
    const userString = localStorage.getItem('user');
    const user = JSON.parse(userString);
    console.log(user.email);
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
                })
            .then(function (res) {
                console.log(res);
            });
    });

    return <>리뷰리뷰리뷰</>;
}
