import * as React from "react";
import { Box } from '@mui/material';
// import Swiper from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

const ImageSwiper = ({images}) => {
    if(!images || images.length === 0) return null;
    return (
        <Box sx={{mt: 2}}>
            <Swiper 
                modules={[Navigation, Pagination]}
                spaceBetween={50}
                slidesPerView={1}
                navigation
                pagination={{clickable: true}}
                style={{height: '100%', marginBottom: '15px'}}
            >
                {images.map((image, index) => (
                    <SwiperSlide key={index}>
                        <img src={image} alt={`Review image ${index+1}`} style={{width: '100%', height: 'auto', objectFit: 'cover'}}/>
                    </SwiperSlide>
                ))}
            </Swiper>
        </Box>
    )    
}

export default ImageSwiper;