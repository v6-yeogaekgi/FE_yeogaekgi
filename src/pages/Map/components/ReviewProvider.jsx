import { createContext, useContext, useState } from 'react';
import * as React from 'react';
import axios from 'axios';
import { useSelected } from './SelectedProvider';

// Context 생성
const ReviewContext = createContext();

// Provider 컴포넌트
export const ReviewProvider = ({ children }) => {
    const { SelectedService } = useSelected();
    const [selectedReview, setSelectedReview] = useState(null);
    const Authorization =
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhdG9tQG5hdmVyLmNvbSIsImV4cCI6MTcyNTIwNTEwNCwiaWF0IjoxNzI0NjAwMzA0fQ.7CyhMJSTCrfP-IXpoZ3Yo83WHrG_3U3bsPP1Z4sh83E';
    const ContentType = 'multipart/form-data';
    const http = 'http://localhost:8090';

    const onCreate = async (reviewData) => {
        try {
            const response = await axios.post(
                `${http}/review/${SelectedService}/register`,
                reviewData,
                {
                    headers: {
                        Authorization: Authorization,
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

    const onUpdate = async (reviewId, updateData) => {
        try {
            const response = await axios.put(
                `${http}/review/${SelectedService}/${reviewId}`,
                updateData,
                {
                    headers: {
                        Authorization: Authorization,
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
                `${http}/review/${SelectedService}/${selectedReview}`,
                {
                    headers: {
                        Authorization: Authorization,
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
                onCreate,
                onUpdate,
                onDelete,
                selectedReview,
                setSelectedReview,
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
