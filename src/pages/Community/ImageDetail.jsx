import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { AllStateContext } from '../../App';
import Header from '../../layout/Header/Header';
import Box from '@mui/material/Box';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

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
    const [images, setImages] = useState([]);
    const { protocol, token } = useContext(AllStateContext);
    const { postId } = useParams();

    const getApiUrl = protocol + 'community/';

    const getApi = () => {
        axios
            .get(getApiUrl + postId)
            .then((res) => {
                const imagesArray = JSON.parse(res.data.images);
                setImages(imagesArray || []);
            })
            .catch((error) => {
                console.error('API 호출 중 오류 발생:', error);
                setImages([]);
            });
    };

    useEffect(() => {
        getApi();
    }, []);

    return (
        <PageLayout>
            {images.length > 0 ? (
                <Swiper
                    spaceBetween={50}
                    slidesPerView={1}
                    pagination={{ clickable: true }} // 네비게이션 제거
                    style={{ width: '400px', height: 'auto' }}
                >
                    {images.map((image, index) => (
                        <SwiperSlide key={index}>
                            <img
                                src={image}
                                alt={`Image ${index + 1}`}
                                style={{ width: '100%', height: 'auto' }}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            ) : (
                <p>Loading...</p>
            )}
        </PageLayout>
    );
};

export default ImageDetail;
