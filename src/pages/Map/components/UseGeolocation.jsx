// useGeolocation.js
import { useState, useEffect } from 'react';

const useGeolocation = () => {
    const [currentMyLocation, setCurrentMyLocation] = useState({
        lat: 0,
        lon: 0,
    });
    const [locationLoading, setLocationLoading] = useState(false);

    const getCurPosition = () => {
        setLocationLoading(true);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setCurrentMyLocation({
                        lat: position.coords.latitude,
                        lon: position.coords.longitude,
                    });
                    setLocationLoading(false);
                },
                () => {
                    setCurrentMyLocation({ lat: 37.5666103, lon: 126.9783882 });
                    setLocationLoading(false);
                },
            );
        } else {
            setCurrentMyLocation({ lat: 37.5666103, lon: 126.9783882 });
            setLocationLoading(false);
        }
    };

    useEffect(() => {
        getCurPosition();
    }, []);

    return { currentMyLocation, locationLoading };
};

export default useGeolocation;
