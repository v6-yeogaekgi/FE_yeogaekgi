import React, { useEffect, useRef, useState } from 'react';
import useGeolocation from './UseGeolocation';
import useServicesMarkerApi from '../api/UseServicesMarkerApi';
import Box from '@mui/material/Box';
import { useSelected } from '../provider/SelectedProvider';
import { useMap } from '../provider/MapProvider';

const ServicesMapShow = () => {
    const mapRef = useRef(null);
    const { state } = useMap();
    const { handleServiceSelect } = useSelected();
    const { currentMyLocation, locationLoading } = useGeolocation();
    const { servicesData, apiLoading } = useServicesMarkerApi(state);
    const { naver } = window;
    const [map, setMap] = useState(null);

    useEffect(() => {
        if (!naver || !mapRef.current) return;

        if (!map) {
            if (
                !locationLoading &&
                currentMyLocation.lat !== 0 &&
                currentMyLocation.lon !== 0
            ) {
                const mapOptions = {
                    center: new naver.maps.LatLng(
                        currentMyLocation.lat,
                        currentMyLocation.lon,
                    ),
                    logoControl: false,
                    mapDataControl: false,
                    scaleControl: true,
                    tileDuration: 200,
                    zoom: 14,
                    zoomControl: false,
                };

                const newMap = new naver.maps.Map('map', mapOptions);
                setMap(newMap);
            }
        }

        if (map && !apiLoading && servicesData) {
            servicesData.forEach((service) => {
                const marker = new naver.maps.Marker({
                    position: new naver.maps.LatLng(service.lat, service.lon),
                    map: map,
                });

                naver.maps.Event.addListener(marker, 'click', () => {
                    const markerPosition = new naver.maps.LatLng(
                        service.lat,
                        service.lon,
                    );
                    const OFFSET_Y = -150; // 원하는 픽셀만큼의 오프셋 값 (필요에 따라 조정 가능)
                    const mapCenterWithOffset = map
                        .getProjection()
                        .fromCoordToOffset(markerPosition);
                    mapCenterWithOffset.y -= OFFSET_Y;
                    const newCenter = map
                        .getProjection()
                        .fromOffsetToCoord(mapCenterWithOffset);
                    map.panTo(newCenter);
                    handleServiceSelect(
                        service.id,
                        service.name,
                        service.content,
                        service.serviceType,
                        service.likeCnt,
                    );
                });
            });
        }
    }, [
        currentMyLocation,
        apiLoading,
        servicesData,
        locationLoading,
        naver,
        handleServiceSelect,
        map,
    ]);

    if (apiLoading) {
        return <div>Loading...</div>;
    }

    return (
        <Box>
            <div
                id="map"
                ref={mapRef}
                style={{ width: '400px', height: '800px' }}
            />
        </Box>
    );
};

export default ServicesMapShow;
