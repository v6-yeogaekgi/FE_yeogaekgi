import React, { createContext, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const MapContext = createContext();

export const MapProvider = ({ children }) => {
    const [isMapLoaded, setIsMapLoaded] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [state, setState] = useState({
        Tour: false,
        ACTIVITY: false,
        ETC: false,
    });
    const [myState, setMyState] = useState({
        myLike: false,
        myReview: false,
    });

    // myLike 상태를 true/false로 토글하는 함수
    const handleLike = () => {
        setMyState((prevState) => ({
            ...prevState,
            myLike: !prevState.myLike, // 상태를 토글
        }));
        setAnchorEl(null);
    };

    // myReview 상태를 true/false로 토글하는 함수
    const handleReview = () => {
        setMyState((prevState) => ({
            ...prevState,
            myReview: !prevState.myReview, // 상태를 토글
        }));
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    // 상태를 Boolean 값으로 변경

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleFilter = (event) => {
        setAnchorEl(null);
    };

    const { activity } = useParams();

    useEffect(() => {
        console.log('내 좋아요 :' + myState.myLike);
        console.log('내 리뷰 :' + myState.myReview);
    }, [myState]);

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
                myState,
                setMyState,
                handleFilterChange,
                handleLike,
                handleReview,
                handleClick,
                handleFilter,
                open,
                anchorEl,
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
