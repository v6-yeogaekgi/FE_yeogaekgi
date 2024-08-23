import React from 'react';
import Box from '@mui/material/Box';
import { getCountryImgById } from '../../util';
import Header from '../../layout/Header/Header';

const PageLayout = ({ children }) => {
    return (
        <>
            <Header />
            <Box
                sx={{
                    flexGrow: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 2,
                    minHeight: 'calc(100vh - 56px)',
                }}
            >
                {children}
            </Box>
        </>
    );
};

const ImageDetail = () => {
    return (
        <PageLayout>
            <img
                src={getCountryImgById('KR')}
                alt="Country"
                style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    objectFit: 'contain',
                }}
            />
        </PageLayout>
    );
};

export default ImageDetail;
