import React, { useEffect, useRef, useState, useCallback } from 'react';
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
    const [markers, setMarkers] = useState([]); // 마커 상태 관리 추가

    // 지도를 초기화하는 함수
    const initializeMap = useCallback(() => {
        if (!naver || !mapRef.current || locationLoading) return;

        if (currentMyLocation.lat !== 0 && currentMyLocation.lon !== 0) {
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

            const mapInstance = new naver.maps.Map(mapRef.current, mapOptions);
            setMap(mapInstance);
        }
    }, [currentMyLocation, locationLoading, naver]);

    useEffect(() => {
        const timer = setTimeout(() => {
            initializeMap();
        }, 100);

        return () => {
            clearTimeout(timer);
        };
    }, [initializeMap]);

    // 마커를 생성하는 함수
    const createMarkers = useCallback(() => {
        if (map && !apiLoading && servicesData) {
            // 기존 마커 모두 제거
            markers.forEach(({ marker }) => {
                marker.setMap(null);
            });

            const newMarkers = servicesData.map((service) => {
                const marker = new naver.maps.Marker({
                    position: new naver.maps.LatLng(service.lat, service.lon),
                    map: map,
                });

                naver.maps.Event.addListener(marker, 'click', () => {
                    const markerPosition = new naver.maps.LatLng(
                        service.lat,
                        service.lon,
                    );
                    const OFFSET_Y = -150;
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

                return { marker, service };
            });

            setMarkers(newMarkers); // 새로운 마커 상태로 업데이트
        }
    }, [map, servicesData, apiLoading, handleServiceSelect]);

    // 지도가 완전히 로드된 후 마커를 생성
    useEffect(() => {
        if (map) {
            createMarkers();
        }
    }, [map, servicesData, createMarkers]);

    if (apiLoading) {
        return <div>Loading...</div>;
    }

    return (
        <Box>
            <div ref={mapRef} style={{ width: '400px', height: '800px' }} />
        </Box>
    );
};

export default ServicesMapShow;
