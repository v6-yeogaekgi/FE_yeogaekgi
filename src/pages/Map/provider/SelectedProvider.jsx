import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from 'react';
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
    const [state, setState] = useState({
        Tour: false,
        ACTIVITY: false,
        ETC: false,
    });
    const [servicesData, setData] = useState(null);
    const { protocol } = useContext(AllStateContext);
    const token = localStorage.getItem('token');
    const [like, setLike] = useState(false);
    const [likeCounts, setLikeCounts] = useState(0);
    const [apiLoading, setApiLoading] = useState(false);
    const api = axios.create({
        baseURL: protocol,
        headers: {
            Authorization: token,
            'Content-Type': 'multipart/form-data',
        },
    });

    const handleFilterChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.checked,
        });
    };

    const handleServiceSelect = (service, name, content, serviceType) => {
        setSelectedService(service);
        setSelectedServiceInfo({
            name: name,
            content: content,
            serviceType: serviceType,
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
            setLike(response.data);
        } catch (error) {
            console.error('Error fetching services data:', error);
        } finally {
            setApiLoading(false);
        }
    };

    const handleLikeChange = async (event) => {
        const isChecked = event.target.checked;
        setLike(isChecked);
        try {
            const response = await api.post(
                `${protocol}services/like/${selectedService}`,
            );
            setLike(response.data.likeCheckRs);
            setLikeCounts(response.data.likeCounts);
            console.log(like);
            console.log(likeCounts);
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
                state,
                setState,
                handleFilterChange,
                like,
                setLike,
                handleLikeChange,
                likeCheck,
                apiLoading,
                servicesData,
                setData,
                likeCounts,
                toggleDrawer,
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
