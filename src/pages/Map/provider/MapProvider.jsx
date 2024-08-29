import React, { createContext, useContext, useEffect, useState } from 'react';

const MapContext = createContext();

export const MapProvider = ({ children }) => {
    const [isMapLoaded, setIsMapLoaded] = useState(false);

    const MapLoad = () => {
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
    };

    useEffect(() => {
        MapLoad();
    }, []);

    return (
        <MapContext.Provider
            value={{
                isMapLoaded,
                MapLoad,
            }}
        >
            {children}
        </MapContext.Provider>
    );
};

export const useMap = () => {
    const context = useContext(MapContext);
    return context;
};
