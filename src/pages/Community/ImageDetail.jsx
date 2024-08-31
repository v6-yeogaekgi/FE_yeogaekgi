import React, { useState, useContext, useEffect } from 'react';
import { useParams , useLocation} from 'react-router-dom';
import axios from 'axios';
import { AllStateContext } from '../../App';
import Header from '../../layout/Header/Header';
import Box from '@mui/material/Box';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';



const ImageDetail = () => {
    const location = useLocation();
    const [images, setImages] = useState(location.state?.images || []);


    return (
        <div>
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
        </div>
    );
};

export default ImageDetail;
