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
            naver.maps.Event.addListener(mapInstance, 'init', () => {
                console.log('지도 초기화 완료:', mapInstance);
                setMap(mapInstance);
            });
        }
    }, [currentMyLocation, locationLoading, naver]);

    useEffect(() => {
        if (!map) {
            console.log('map 상태가 null이어서 초기화를 시도합니다.');
            initializeMap();
        } else {
            console.log('이미 초기화된 map 상태:', map);
        }
    }, [initializeMap, map]);

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

                console.log('생성된 마커:', marker);

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

    useEffect(() => {
        if (map && servicesData.length > 0) {
            console.log('지도가 초기화되었습니다:', map.getCenter());
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
