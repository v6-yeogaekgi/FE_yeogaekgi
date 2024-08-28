import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { useReview } from '../provider/ReviewProvider';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useEffect } from 'react';

const ReviewImgList = ({ img }) => {
    useEffect(() => {
        console.log('ReviewList received new list:', img);
    }, [img]);
    return (
        <>
            <Swiper
                spaceBetween={1}
                slidesPerView={1}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
                className="mySwiper"
            >
                {img && img.length > 0 ? (
                    img.map((item, index) => (
                        <SwiperSlide key={index}>
                            <Box
                                sx={{
                                    height: '100%',
                                    width: '100%',
                                    backgroundColor: 'grey',
                                }}
                            >
                                <img
                                    src={item.imageUrl}
                                    alt={`Image by ${item.nickname}`}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                    }}
                                />
                            </Box>
                        </SwiperSlide>
                    ))
                ) : (
                    <SwiperSlide>
                        <Box
                            sx={{
                                height: '100%',
                                width: '100%',
                                backgroundColor: 'grey',
                            }}
                        >
                            <Typography
                                variant="h6"
                                color="textSecondary"
                                align="center"
                            >
                                No images available.
                            </Typography>
                        </Box>
                    </SwiperSlide>
                )}
            </Swiper>
        </>
    );
};
export default ReviewImgList;
