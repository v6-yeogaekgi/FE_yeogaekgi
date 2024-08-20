/* global naver */
import React, { useEffect } from 'react';
import { useKiosk } from '../../pages/Kiosk/KioskContext';
import './KioskNaverMap.css';

const KioskNaverMap = () => {
    const { locations } = useKiosk();

    useEffect(() => {
        const loadMap = () => {
            const script = document.createElement('script');
            script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.REACT_APP_NAVER_MAP_CLIENT_ID}&submodules=geocoder&language=en`;
            script.async = true;
            document.body.appendChild(script);

            script.onload = () => {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                        (position) => {
                            const userLat = position.coords.latitude;
                            const userLng = position.coords.longitude;

                            console.log('Initial Position:', {
                                userLat,
                                userLng,
                            });

                            const mapOptions = {
                                center: new naver.maps.LatLng(userLat, userLng),
                                zoom: 15,
                                lang: 'en',
                            };

                            const map = new naver.maps.Map('map', mapOptions);

                            const userMarker = new naver.maps.Marker({
                                position: new naver.maps.LatLng(
                                    userLat,
                                    userLng,
                                ),
                                map,
                                icon: {
                                    content: `<div class="user-marker"></div>`,
                                    anchor: new naver.maps.Point(10, 10),
                                },
                            });

                            navigator.geolocation.watchPosition(
                                (position) => {
                                    const newLat = position.coords.latitude;
                                    const newLng = position.coords.longitude;

                                    userMarker.setPosition(
                                        new naver.maps.LatLng(newLat, newLng),
                                    );

                                    map.setCenter(
                                        new naver.maps.LatLng(newLat, newLng),
                                    );
                                },
                                (error) => {
                                    console.error(
                                        '사용자의 위치를 가져올 수 없습니다.',
                                        error,
                                    );
                                },
                                {
                                    enableHighAccuracy: true,
                                    timeout: 5000,
                                    maximumAge: 0,
                                },
                            );

                            locations.forEach((kiosk) => {
                                const marker = new naver.maps.Marker({
                                    position: new naver.maps.LatLng(
                                        kiosk.lat,
                                        kiosk.lng,
                                    ),
                                    map,
                                    title: kiosk.name,
                                });

                                const infoWindow = new naver.maps.InfoWindow({
                                    content: `
                                        <div style="padding: 15px; width: 300px; max-width: 400px; height: 250px; text-align: center;">
                                            <h4 style="font-size: 16px; margin-bottom: 10px;">${kiosk.name}</h4>
                                        </div>
                                    `,
                                });

                                naver.maps.Event.addListener(
                                    marker,
                                    'click',
                                    () => {
                                        if (infoWindow.getMap()) {
                                            infoWindow.close();
                                        } else {
                                            infoWindow.open(map, marker);
                                        }
                                    },
                                );
                            });
                        },
                        (error) => {
                            console.error(
                                '사용자의 위치를 가져올 수 없습니다.',
                                error,
                            );
                        },
                    );
                } else {
                    console.error('실시간 위치를 지원하지 않습니다.');
                }
            };
        };

        loadMap();

        return () => {
            const script = document.querySelector(
                `script[src^="https://openapi.map.naver.com/openapi/v3/maps.js"]`,
            );
            if (script) document.body.removeChild(script);
        };
    }, [locations]);

    return <div id="map" style={{ width: '100%', height: '400px' }} />;
};

export default KioskNaverMap;
