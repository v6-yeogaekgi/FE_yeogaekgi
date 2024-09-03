import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { useSelected } from './SelectedProvider';
import { AllStateContext } from '../../../App';
import { useNavigate } from 'react-router-dom';

const ReviewContext = createContext();

export const ReviewProvider = ({ children }) => {
    const [selectedReview, setSelectedReview] = useState(null);
    const [list, setList] = useState([]);
    const [img, setImg] = useState([]);
    const [apiLoading, setApiLoading] = useState(false);
    const { protocol } = useContext(AllStateContext);
    const { selectedService } = useSelected();
    const [totalScore, setTotalScore] = useState(0);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    const token = localStorage.getItem('token');
    const api = axios.create({
        baseURL: protocol,
        headers: {
            Authorization: token,
            'Content-Type': 'multipart/form-data',
        },
    });

    const reviewList = async (reset = false, size = 3) => {
        if (!selectedService || apiLoading) return;
        setApiLoading(true);
        try {
            const currentPage = reset ? 0 : page;
            const response = await api.get(
                `review/${selectedService}/reviewList?page=${currentPage}&size=${size}&sort=modDate,DESC`,
            );
            const newList = response.data.content;
            setList((prevList) => {
                if (reset || currentPage === 0) return newList;
                return [...prevList, ...newList];
            });
            setHasMore(response.data.hasNext);
            setPage(response.data.page + 1);
            console.log(list);
        } catch (error) {
            console.error('Error fetching review list:', error);
        } finally {
            setApiLoading(false);
        }
    };

    const ReviewImgList = async () => {
        if (!selectedService) return;
        setApiLoading(true);
        try {
            const response = await api.get(`review/${selectedService}/ImgList`);
            const parsedData = response.data.flatMap((item) =>
                item.images.map((image) => ({
                    imageUrl: image,
                    nickname: item.nickname,
                    countryCode: item.country.code,
                    score: item.score,
                })),
            );

            const totalScore = parsedData.reduce(
                (acc, curr) => acc + curr.score,
                0,
            );
            setTotalScore(totalScore);

            setImg(parsedData);
        } catch (error) {
            console.error('Error fetching image list:', error);
        } finally {
            setApiLoading(false);
        }
    };

    const createReview = async (serviceId, reviewData) => {
        try {
            const response = await api.post(
                `review/${serviceId}/register`,
                reviewData,
            );
            return response.data;
        } catch (error) {
            console.error('Error registering review:', error);
        }
    };

    const updateReview = async (serviceId, reviewId, updateData) => {
        try {
            const response = await api.put(
                `review/${serviceId}/${reviewId}`,
                updateData,
            );
            return response.data;
        } catch (error) {
            console.error('Error updating review:', error);
        }
    };

    const deleteReview = async (reviewId) => {
        try {
            const response = await api.delete(
                `review/${selectedService}/${reviewId}`,
            );
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error('Error deleting review:', error);
        }
    };

    const deepLApi = (text, target_lang) => {
        const data = {
            text: [text],
            target_lang: target_lang,
        };
        return axios
            .post(protocol + 'api/translate', data, {
                headers: {
                    Authorization: token,
                    'Content-Type': 'application/json',
                },
            })
            .then((res) => {
                return res.data.translations[0].text;
            })
            .catch((error) => {
                console.error('API 호출 오류:', error);
            });
    };

    return (
        <ReviewContext.Provider
            value={{
                selectedReview,
                setSelectedReview,
                list,
                setList,
                totalScore,
                img,
                setImg,
                apiLoading,
                reviewList,
                ReviewImgList,
                createReview,
                updateReview,
                deleteReview,
                deepLApi,
                page,
                setPage,
                hasMore,
                setHasMore,
            }}
        >
            {children}
        </ReviewContext.Provider>
    );
};

export const useReview = () => {
    const context = useContext(ReviewContext);
    return context;
};
