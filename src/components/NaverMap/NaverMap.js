/* global naver */
import React, { useEffect } from 'react';

const NaverMap = () => {
    const kioskLocations = [
        { lat: 37.556049, lng: 126.92312, location: 'Hongdae Exit 1' },
        { lat: 37.556477, lng: 126.923539, location: 'Hongdae Exit 2' },
        { lat: 37.556069, lng: 126.922655, location: 'Hongdae Exit 4' },
        { lat: 37.557281, lng: 126.924343, location: 'Hongdae Exit 8' },
        { lat: 37.557752, lng: 126.923708, location: 'Hongdae Exit 11' },
    ];

    useEffect(() => {
        console.log(
            'NAVER_MAP_CLIENT_ID:',
            process.env.REACT_APP_NAVER_MAP_CLIENT_ID,
        );
        console.log(
            'NAVER_MAP_OPTIONS:',
            process.env.REACT_APP_NAVER_MAP_OPTIONS,
        );

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

                            const mapOptions = {
                                center: new naver.maps.LatLng(userLat, userLng),
                                zoom: 15,
                            };

                            const map = new naver.maps.Map('map', mapOptions);

                            const userMarker = new naver.maps.Marker({
                                position: new naver.maps.LatLng(
                                    userLat,
                                    userLng,
                                ),
                                map,
                                location: 'YOU',
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

                            kioskLocations.forEach((kiosk) => {
                                new naver.maps.Marker({
                                    position: new naver.maps.LatLng(
                                        kiosk.lat,
                                        kiosk.lng,
                                    ),
                                    map,
                                    location: kiosk.location,
                                });
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
                    console.error('실시간을 위치를 지원하지 않습니다.');
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
    }, []);

    return <div id="map" style={{ width: '100%', height: '400px' }} />;
};

export default NaverMap;
