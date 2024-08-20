import React from 'react';
import NaverMap from '../../components/NaverMap/NaverMap';

const Kiosk = () => {
    return (
        <div>
            <div style={{ padding: '20px' }}>
                <NaverMap />
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
    );
};

export default Kiosk;
