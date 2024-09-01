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
    const [markers, setMarkers] = useState([]);

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
                setMap(mapInstance);
            });
        }
    }, [currentMyLocation, locationLoading, naver]);

    useEffect(() => {
        initializeMap();
    }, [initializeMap, servicesData]);

    const createMarkers = useCallback(() => {
        if (map && !apiLoading && servicesData) {
            console.log('지도 준비 완료, 마커를 생성합니다...');
            markers.forEach((marker) => marker.setMap(null));

            const newMarkers = servicesData.map((service) => {
                console.log('마커 좌표:', service.lat, service.lon);

                // 이니셜 추출
                const serviceTypeInitial = service.type
                    ? service.type.charAt(0)
                    : '?';

                let fillColor;
                switch (service.type) {
                    case 'TouristAttraction':
                        fillColor = '#5356FF';
                        break;
                    case 'ACTIVITY':
                        fillColor = '#378CE7';
                        break;
                    case 'ETC':
                        fillColor = '#67C6E3';
                        break;
                    default:
                        fillColor = '#DFF5FF';
                }

                // RoomIcon을 SVG로 렌더링하면서 이니셜 적용
                const svgIcon = `
                    <svg xmlns="http://www.w3.org/2000/svg" 
                         viewBox="0 0 24 24" 
                         fill="${fillColor}" 
                         width="24px" 
                         height="24px">
                        <circle cx="12" cy="12" r="10" fill="${fillColor}" />
                        <text x="12" y="16" font-size="10" text-anchor="middle" fill="white">${serviceTypeInitial}</text>
                    </svg>`;

                var markerOptions = {
                    position: new naver.maps.LatLng(service.lat, service.lon),
                    map: map,
                    icon: {
                        content: `<div style="width: 24px; height: 24px;">${svgIcon}</div>`, // 이니셜을 적용한 SVG 마커
                        size: new naver.maps.Size(24, 24),
                        anchor: new naver.maps.Point(12, 12),
                    },
                };
                const marker = new naver.maps.Marker(markerOptions);

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
                        service.address,
                        service.name,
                        service.content,
                        service.type,
                        service.likeCnt,
                    );
                    console.log('새로운 좋아요 수' + service.likeCnt);
                });

                return marker;
            });

            console.log('새 마커 생성 완료:', newMarkers);
            setMarkers(newMarkers);
        }
    }, [map, servicesData, apiLoading]);

    useEffect(() => {
        if (map && servicesData.length > 0) {
            console.log('지도가 초기화되었습니다:', map.getCenter());
            createMarkers();
        }
    }, [map, servicesData]);

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
