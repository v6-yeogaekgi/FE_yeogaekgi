import React from 'react';
import Box from '@mui/material/Box';

import {getCountryImgById} from "../../util";
import Header from "../../layout/Header/Header"; // Header 컴포넌트 import

const PageLayout = ({ children }) => {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '80vh',
        }}>
            <Header />
            <Box sx={{
                flexGrow: 1,
                overflowY: 'auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 2 // 필요에 따라 패딩 추가 가능
            }}>
                <img
                    src={getCountryImgById(2)}
                    alt="Country"
                    style={{
                        maxWidth: '100%',  // 화면 너비에 맞게 이미지 조절
                        maxHeight: '100%', // 화면 높이에 맞게 이미지 조절
                        objectFit: 'contain' // 이미지 비율을 유지하며 화면에 맞게 조절
                    }}
                />
            </Box>
        </Box>
    );
};

const ImageDetail = () => {
    return (
        <>
            <PageLayout />
        </>
    );
};

export default ImageDetail;
