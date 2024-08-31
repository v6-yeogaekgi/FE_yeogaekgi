import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { useSelected } from './SelectedProvider';
import { AllStateContext } from '../../../App';

const ReviewContext = createContext();

export const ReviewProvider = ({ children }) => {
    const [selectedReview, setSelectedReview] = useState(null);
    const [list, setList] = useState(null);
    const [img, setImg] = useState([]);
    const [apiLoading, setApiLoading] = useState(false);
    const { protocol } = useContext(AllStateContext);
    const { selectedService } = useSelected();
    const token = localStorage.getItem('token');
    const api = axios.create({
        baseURL: protocol,
        headers: {
            Authorization: token,
            'Content-Type': 'multipart/form-data',
        },
    });

    const reviewList = async () => {
        if (!selectedService) return;
        setApiLoading(true);
        try {
            const response = await api.get(
                `review/${selectedService}/reviewList?page=0&size=3&sort=modDate,DESC`,
            );
            setList(response.data);
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
                })),
            );
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
            console.log('Review registered with ID:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error registering review:', error);
            throw error;
        }
    };

    const updateReview = async (serviceId, reviewId, updateData) => {
        try {
            const response = await api.put(
                `review/${serviceId}/${reviewId}`,
                updateData,
            );
            console.log('Review updated:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error updating review:', error);
            throw error;
        }
    };

    const deleteReview = async (reviewId) => {
        try {
            console.log({ selectedService });
            console.log(reviewId);
            const response = await api.delete(
                `review/${selectedService}/${reviewId}`,
            );
            console.log('Review deleted:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error deleting review:', error);
            throw error;
        }
    };

    const deepLApi = (text, target_lang) => {
        const data = {
            text: [text],
            target_lang: target_lang,
        };
        console.log('dkssud');
        return axios
            .post(protocol + 'api/translate', data, {
                headers: {
                    Authorization: token,
                    'Content-Type': 'application/json',
                },
            })
            .then((res) => {
                console.log(res.data.translations[0].text);
                return res.data.translations[0].text;
            })
            .catch((error) => {
                console.error('API 호출 오류:', error);
                throw error;
            });
    };
    return (
        <ReviewContext.Provider
            value={{
                selectedReview,
                setSelectedReview,
                list,
                setList,
                img,
                setImg,
                apiLoading,
                reviewList,
                ReviewImgList,
                createReview,
                updateReview,
                deleteReview,
                deepLApi,
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
