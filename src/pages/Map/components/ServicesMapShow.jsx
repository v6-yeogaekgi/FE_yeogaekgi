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
            // setMap(mapInstance);
            naver.maps.Event.addListener(mapInstance, 'init', () => {
                setMap(mapInstance);
            });
        }
    }, [currentMyLocation, locationLoading, naver]);

    useEffect(() => {
        initializeMap();
    }, [initializeMap, servicesData]);

    // 마커를 생성하는 함수
    const createMarkers = useCallback(() => {
        if (map && !apiLoading && servicesData) {
            console.log('지도 준비 완료, 마커를 생성합니다...');
            markers.forEach((marker) => marker.setMap(null));

            const newMarkers = servicesData.map((service) => {
                console.log('마커 좌표:', service.lat, service.lon);
                const marker = new naver.maps.Marker({
                    position: new naver.maps.LatLng(service.lat, service.lon),
                    map: map,
                });

                console.log('생성된 마커:', marker); // 마커 상태 확인

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

                return marker;
            });

            console.log('새 마커 생성 완료:', newMarkers);
            setMarkers(newMarkers);
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
    //asd
};

export default ServicesMapShow;
