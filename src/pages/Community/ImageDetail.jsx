import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { AllStateContext } from '../../App';
import Header from '../../layout/Header/Header';
import Box from '@mui/material/Box';

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
    const [currentIndex, setCurrentIndex] = useState(0);
    const { protocol, token } = useContext(AllStateContext);
    const { postId } = useParams();

    const getApiUrl = protocol + 'community/';

    // API 호출 부분
    const getApi = () => {
        axios
            .get(getApiUrl + postId)
            .then((res) => {
                // 문자열로 받은 JSON 데이터를 배열로 변환
                const imagesArray = JSON.parse(res.data.images);
                setImages(imagesArray || []);
                console.log(imagesArray);
            })
            .catch((error) => {
                console.error('API 호출 중 오류 발생:', error);
                setImages([]);
            });
    };

    useEffect(() => {
        getApi();
    }, []);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const handlePrev = () => {
        setCurrentIndex(
            (prevIndex) => (prevIndex - 1 + images.length) % images.length,
        );
    };

    return (
        <PageLayout>
            {images.length > 0 ? (
                <div>
                    <img
                        src={images[currentIndex]}
                        alt={`Image ${currentIndex + 1}`}
                    />
                    <div>
                        <button onClick={handlePrev}>Prev</button>
                        <button onClick={handleNext}>Next</button>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </PageLayout>
    );
};

export default ImageDetail;
