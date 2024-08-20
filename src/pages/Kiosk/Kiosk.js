import React from 'react';
import KioskNaverMap from '../../components/KioskNaverMap/KioskNaverMap';
import { KioskProvider } from './KioskContext';

const Kiosk = () => {
    return (
        <KioskProvider>
            <div>
                <div style={{ padding: '20px' }}>
                    <KioskNaverMap />
                </div>
                <div style={{ padding: '20px' }}>
                    <h2>Available Kiosks</h2>
                    <ul>
                        <li>Seoul Hongdae Exit 1</li>
                        <li>Seoul Hongdae Exit 2</li>
                        <li>Seoul Hongdae Exit 3</li>
                        <li>Seoul Hongdae Exit 4</li>
                        <li>Seoul Hongdae Exit 5</li>
                        <li>Seoul Hongdae Exit 6</li>
                        <li>Seoul Hongdae Exit 7</li>
                        <li>Seoul Hongdae Exit 8</li>
                        <li>Seoul Hongdae Exit 9</li>
                        <li>Seoul Hongdae Exit 10</li>
                        <li>Seoul Hongdae Exit 11</li>
                        <li>Seoul Itaewon Exit 1</li>
                        <li>Seoul Itaewon Exit 2</li>
                        <li>Seoul Itaewon Exit 3</li>
                        <li>Seoul Itaewon Exit 4</li>
                        <li>Seoul Konkuk University station Exit 1</li>
                        <li>Seoul Konkuk University station Exit 2</li>
                        <li>Seoul Konkuk University station Exit 3</li>
                        <li>Seoul Konkuk University station Exit 4</li>
                        <li>Seoul Konkuk University station Exit 5</li>
                        <li>Seoul Konkuk University station Exit 6</li>
                    </ul>
                </div>
            </div>
        </KioskProvider>
    );
};

export default Kiosk;
