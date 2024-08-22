import React, { createContext, useContext, useState } from 'react';

const KioskContext = createContext();

export const KioskProvider = ({ children }) => {
    const [locations, setLocations] = useState([
        { name: 'Seoul Hongdae Exit 1', lat: 37.5563, lng: 126.9237 },
        { name: 'Seoul Hongdae Exit 2', lat: 37.557, lng: 126.9243 },
        { name: 'Seoul Hongdae Exit 3', lat: 37.5577, lng: 126.9248 },
        { name: 'Seoul Hongdae Exit 4', lat: 37.5566, lng: 126.9228 },
        { name: 'Seoul Hongdae Exit 5', lat: 37.5559, lng: 126.9218 },
        { name: 'Seoul Hongdae Exit 6', lat: 37.5569, lng: 126.923 },
        { name: 'Seoul Hongdae Exit 7', lat: 37.5564, lng: 126.9223 },
        { name: 'Seoul Hongdae Exit 8', lat: 37.5561, lng: 126.9235 },
        { name: 'Seoul Hongdae Exit 9', lat: 37.5558, lng: 126.924 },
        { name: 'Seoul Hongdae Exit 10', lat: 37.5556, lng: 126.9236 },
        { name: 'Seoul Hongdae Exit 11', lat: 37.5562, lng: 126.9244 },
        { name: 'Seoul Itaewon Exit 1', lat: 37.5345, lng: 126.9937 },
        { name: 'Seoul Itaewon Exit 2', lat: 37.5342, lng: 126.9939 },
        { name: 'Seoul Itaewon Exit 3', lat: 37.5341, lng: 126.9943 },
        { name: 'Seoul Itaewon Exit 4', lat: 37.5343, lng: 126.9935 },
        {
            name: 'Seoul Konkuk University station Exit 1',
            lat: 37.5405,
            lng: 127.0692,
        },
        {
            name: 'Seoul Konkuk University station Exit 2',
            lat: 37.5409,
            lng: 127.0696,
        },
        {
            name: 'Seoul Konkuk University station Exit 3',
            lat: 37.5412,
            lng: 127.0701,
        },
        {
            name: 'Seoul Konkuk University station Exit 4',
            lat: 37.5415,
            lng: 127.0705,
        },
        {
            name: 'Seoul Konkuk University station Exit 5',
            lat: 37.5418,
            lng: 127.071,
        },
        {
            name: 'Seoul Konkuk University station Exit 6',
            lat: 37.5421,
            lng: 127.0715,
        },
    ]);

    return (
        <KioskContext.Provider value={{ locations, setLocations }}>
            {children}
        </KioskContext.Provider>
    );
};

export const useKiosk = () => useContext(KioskContext);
