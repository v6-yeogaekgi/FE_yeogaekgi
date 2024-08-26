import React, { createContext, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import ServicesMapShow from './components/ServicesMapShow';
import ServiceInfoDrawer from './components/ServiceInfoDrawer';
import { SelectedProvider } from './components/SelectedProvider';
import 'swiper/swiper-bundle.css';
import './components/style.css';
import MapMarkerCheck from './components/MapMarkerCheck';
export default function Map() {
    const [isMapLoaded, setIsMapLoaded] = useState(false);

    useEffect(() => {
        const naverMapClientId = process.env.REACT_APP_NAVER_MAP_CLIENT_ID;

        if (!naverMapClientId) {
            console.error(
                'Naver Map Client ID is not defined. Please check your environment variables.',
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
                <MapMarkerCheck />
                {isMapLoaded && <ServicesMapShow />}
                <ServiceInfoDrawer />
            </Box>
        </Box>
    );
}
