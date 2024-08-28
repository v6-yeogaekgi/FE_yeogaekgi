import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import ServicesMapShow from './components/ServicesMapShow';
import ServiceInfoDrawer from './components/ServiceInfoDrawer';
import 'swiper/swiper-bundle.css';
import './components/style.css';
import MapMarkerCheck from './components/MapMarkerCheck';
import { ReviewProvider } from './provider/ReviewProvider';

export default function Map() {
    const [isMapLoaded, setIsMapLoaded] = useState(false);
    const [selectedService, setSelectedService] = useState(null);
    const [selectedServiceInfo, setSelectedServiceInfo] = useState({});
    const [open, setOpen] = useState(false);
    const [state, setState] = useState({
        Tour: false,
        ACTIVITY: false,
        ETC: false,
    });

    const handleFilterChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.checked,
        });
    };

    useEffect(() => {
        const naverMapClientId = process.env.REACT_APP_NAVER_MAP_CLIENT_ID;

        if (!naverMapClientId) {
            console.error(
                'Naver Map Client ID가 정의되지 않았습니다. 환경 변수를 확인해주세요.',
            );
            return;
        }

        const script = document.createElement('script');
        script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${naverMapClientId}&submodules=geocoder&language=en`;
        script.async = true;
        script.onload = () => setIsMapLoaded(true);
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const handleServiceSelect = (
        service,
        name,
        content,
        serviceType,
        likeCnt,
    ) => {
        setSelectedService(service);
        setSelectedServiceInfo({
            name: name,
            content: content,
            serviceType: serviceType,
            likeCnt: likeCnt,
        });
        setOpen(true);
    };

    useEffect(() => {}, [handleServiceSelect]);

    console.log('asdasd' + selectedService);
    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '90%',
                    margin: '0 auto',
                    gap: 1,
                    flexGrow: 1,
                }}
            >
                <ReviewProvider
                    selectedService={selectedService}
                    selectedServiceInfo={selectedServiceInfo}
                >
                    <MapMarkerCheck
                        state={state}
                        handleFilterChange={handleFilterChange}
                    />
                    {isMapLoaded && (
                        <ServicesMapShow
                            handleServiceSelect={handleServiceSelect}
                            state={state}
                        />
                    )}
                    <ServiceInfoDrawer
                        open={open}
                        setOpen={setOpen}
                        selectedServiceInfo={selectedServiceInfo}
                        selectedService={selectedService}
                        likeCnt={selectedServiceInfo.likeCnt}
                    />
                </ReviewProvider>
            </Box>
        </Box>
    );
}
