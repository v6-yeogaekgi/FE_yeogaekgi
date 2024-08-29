import React from 'react';
import Box from '@mui/material/Box';
import ServicesMapShow from './components/ServicesMapShow';
import ServiceInfoDrawer from './components/ServiceInfoDrawer';
import 'swiper/swiper-bundle.css';
import './components/style.css';
import MapMarkerCheck from './components/MapMarkerCheck';
import { ReviewProvider } from './provider/ReviewProvider';
import { SelectedProvider } from './provider/SelectedProvider';
import { useMap } from './provider/MapProvider';

export default function Map() {
    const { isMapLoaded } = useMap();

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
                <SelectedProvider>
                    <ReviewProvider>
                        <MapMarkerCheck />
                        {isMapLoaded && <ServicesMapShow />}
                        <ServiceInfoDrawer />
                    </ReviewProvider>
                </SelectedProvider>
            </Box>
        </Box>
    );
}
