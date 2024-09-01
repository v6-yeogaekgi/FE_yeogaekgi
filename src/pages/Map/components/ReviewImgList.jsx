import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useReview } from '../provider/ReviewProvider';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    maxWidth: '600px',
    bgcolor: 'background.paper',
    borderRadius: '10px',
    boxShadow: 24,
    p: 2,
    outline: 'none',
};

const ReviewImgList = () => {
    const { img } = useReview();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const openModal = (image) => {
        setSelectedImage(image);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setSelectedImage(null);
    };

    return (
        <>
            <Swiper spaceBetween={1} slidesPerView={1} className="mySwiper">
                {img && img.length > 0 ? (
                    img.map((item, index) => (
                        <SwiperSlide key={index}>
                            <Box
                                sx={{
                                    height: '100%',
                                    width: '100%',
                                    backgroundColor: 'grey',
                                    cursor: 'pointer',
                                }}
                                onClick={() => openModal(item)}
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

            <Modal open={modalIsOpen} onClose={closeModal}>
                <Box sx={style}>
                    {selectedImage && (
                        <>
                            <Box
                                component="img"
                                src={selectedImage.imageUrl}
                                alt={`Image by ${selectedImage.nickname}`}
                                sx={{
                                    width: '100%',
                                    height: 'auto',
                                    borderRadius: '10px',
                                    objectFit: 'cover',
                                }}
                            />
                            <Box
                                sx={{
                                    textAlign: 'center',
                                    mt: 2,
                                }}
                            >
                                <Typography variant="h6" color="textPrimary">
                                    {selectedImage.nickname}
                                </Typography>
                                <Typography
                                    variant="body1"
                                    color="textSecondary"
                                >
                                    Score: {selectedImage.score}
                                </Typography>
                            </Box>
                        </>
                    )}
                </Box>
            </Modal>
        </>
    );
};

export default ReviewImgList;
