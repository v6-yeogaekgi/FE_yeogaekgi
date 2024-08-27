import { createContext, useContext, useState } from 'react';
import * as React from 'react';
import axios from 'axios';
import { useSelected } from './SelectedProvider';

// Context 생성
const ReviewContext = createContext();

// Provider 컴포넌트
export const ReviewProvider = ({
    children,
    selectedService,
    selectedServiceInfo,
}) => {
    const [selectedReview, setSelectedReview] = useState(null);
    const [list, setList] = useState(null);
    const [img, setImg] = useState([]);
    const token = localStorage.getItem("token");
    const ContentType = 'multipart/form-data';
    const http = 'http://localhost:8090';
    const onCreate = async (serviceId, reviewData) => {
        try {
            const response = await axios.post(
                `${http}/review/${serviceId}/register`,
                reviewData,
                {
                    headers: {
                        Authorization: token,
                        'Content-Type': ContentType,
                    },
                },
            );
            console.log('Review registered with ID:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error registering review:', error);
            throw error;
        }
    };

    const onUpdate = async (serviceId, reviewId, updateData) => {
        try {
            const response = await axios.put(
                `${http}/review/${serviceId}/${reviewId}`,
                updateData,
                {
                    headers: {
                        Authorization: token,
                        'Content-Type': ContentType,
                    },
                },
            );
            console.log('Review updated:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error updating review:', error);
            throw error;
        }
    };

    const onDelete = async (selectedReview) => {
        try {
            const response = await axios.delete(
                `${http}/review/${selectedService}/${selectedReview}`,
                {
                    headers: {
                        Authorization: token,
                    },
                },
            );
            console.log('Review deleted:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error deleting review:', error);
            throw error;
        }
    };

    return (
        <ReviewContext.Provider
            value={{
                img,
                setImg,
                onCreate,
                onUpdate,
                onDelete,
                list,
                setList,
                selectedReview,
                setSelectedReview,
                selectedServiceInfo,
            }}
        >
            {children}
        </ReviewContext.Provider>
    );
};

// Context를 사용하는 커스텀 훅
export const useReview = () => {
    const context = useContext(ReviewContext);
    if (!context) {
        throw new Error('useReview must be used within a ReviewProvider');
    }
    return context;
};
