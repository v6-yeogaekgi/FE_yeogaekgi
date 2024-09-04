import React, { createContext, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const MapContext = createContext();

export const MapProvider = ({ children }) => {
    const [isMapLoaded, setIsMapLoaded] = useState(false);
    const [state, setState] = useState({
        Tour: false,
        ACTIVITY: false,
        ETC: false,
    });

    const { activity } = useParams();

    // activity 파라미터에 따라 상태 변경
    useEffect(() => {
        if (activity) {
            setState((prevState) => ({
                ...prevState,
                ACTIVITY: true,
            }));
        }
    }, [activity]);

    const handleFilterChange = (event) => {
        setState((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.checked,
        }));
    };

    Object.keys(state).forEach((key) => {
        console.log(key, state[key]);
    });

    useEffect(() => {
        console.log('다시실행중');
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
    }, []);

    return (
        <MapContext.Provider
            value={{
                state,
                setState,
                isMapLoaded,
                handleFilterChange,
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
