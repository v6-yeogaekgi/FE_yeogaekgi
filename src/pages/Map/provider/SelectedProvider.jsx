import { createContext, useContext, useState } from 'react';
import * as React from 'react';
import axios from 'axios';
import { AllStateContext } from '../../../App';

// Context 생성
const SelectedContext = createContext();

// Provider 컴포넌트
export const SelectedProvider = ({ children }) => {
    const [selectedService, setSelectedService] = useState(null);
    const [selectedServiceInfo, setSelectedServiceInfo] = useState({});
    const [open, setOpen] = useState(false);
    const [servicesData, setData] = useState(null);
    const { protocol } = useContext(AllStateContext);
    const token = localStorage.getItem('token');
    const [like, setLike] = useState(false);
    const [viewLikeCnt, setViewLikeCnt] = useState(0);
    const [apiLoading, setApiLoading] = useState(false);
    const api = axios.create({
        baseURL: protocol,
        headers: {
            Authorization: token,
            'Content-Type': 'multipart/form-data',
        },
    });

    const handleServiceSelect = (
        service,
        address,
        name,
        content,
        serviceType,
        likeCnt,
    ) => {
        setSelectedService(service);
        setSelectedServiceInfo({
            name: name,
            address: address,
            content: content,
            serviceType: serviceType,
            likeCnt: likeCnt,
        });
        setOpen(true);
    };

    const toggleDrawer = (newOpen) => {
        setOpen(newOpen);
    };

    const likeCheck = async () => {
        if (!selectedService) return;
        setApiLoading(true);
        try {
            const response = await api.get(
                `${protocol}services/like/${selectedService}/check`,
            );
            return {
                likeStatus: response.data.status,
                count: response.data.count,
            };
        } catch (error) {
            console.error('Error fetching services data:', error);
        } finally {
            setApiLoading(false);
        }
    };

    const handleLikeChange = async (event) => {
        try {
            const response = await api.post(
                `${protocol}services/like/${selectedService}`,
            );
            console.log(response.data);
            if (response.data === 'like add') {
                setLike(true);
                setViewLikeCnt((prevCount) => prevCount + 1);
            } else if (response.data === 'like cancel') {
                setLike(false);
                setViewLikeCnt((prevCount) => prevCount - 1);
            }
        } catch (error) {
            console.error('There was an error sending the like status:', error);
        }
    };

    return (
        <SelectedContext.Provider
            value={{
                selectedServiceInfo,
                setSelectedServiceInfo,
                selectedService,
                handleServiceSelect,
                open,
                setOpen,
                like,
                setLike,
                handleLikeChange,
                likeCheck,
                apiLoading,
                servicesData,
                setData,
                toggleDrawer,
                viewLikeCnt,
                setViewLikeCnt,
            }}
        >
            {children}
        </SelectedContext.Provider>
    );
};

// Context를 사용하는 커스텀 훅
export const useSelected = () => {
    const context = useContext(SelectedContext);
    return context;
};
