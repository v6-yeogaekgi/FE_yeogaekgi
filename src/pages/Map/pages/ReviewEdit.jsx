import React, { useRef, useState, useEffect, useContext } from 'react';
import { Box, Button, IconButton, Rating, Typography } from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import CloseIcon from '@mui/icons-material/Close';
import { useReview } from '../provider/ReviewProvider';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { AllStateContext } from '../../../App';

const ReviewEdit = () => {
    const [content, setContent] = useState('');
    const [images, setImages] = useState([]);
    const [chooseImages, setChooseImages] = useState([]);
    const { name, serviceId, reviewId } = useParams();
    const [score, setScore] = useState(0);
    const inputRef = useRef();

    const { updateReview } = useReview();
    const { protocol } = useContext(AllStateContext);
    const token = localStorage.getItem('token');

    useEffect(() => {
        axios
            .get(`${protocol}review/${serviceId}/${reviewId}/detail`, {
                headers: {
                    Authorization: token,
                },
            })
            .then((res) => {
                const data = res.data;
                setContent(data.content);
                setScore(data.score);
                setImages(data.images.map((url, index) => ({ url, index })));
            })
            .catch((error) => {
                console.error('Error fetching review data:', error);
            });
    }, [serviceId, reviewId]);

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        if (images.length + files.length > 3) {
            alert('최대 3개의 사진만 등록할 수 있습니다.');
            return;
        }
        const newImages = files.map((file) => ({
            file,
            url: URL.createObjectURL(file),
            isNew: true,
        }));
        setImages((prevImages) => [...prevImages, ...newImages].slice(0, 3));
    };

    const handleImageRemove = (index) => {
        setImages((prevImages) => prevImages.filter((_, i) => i !== index));
        setChooseImages((prev) => [...prev, index]);
    };

    const onChangeContent = (e) => {
        setContent(e.target.value);
    };

    const onSubmit = async () => {
        if (!content && !score) {
            inputRef.current.focus();
            return;
        }

        const formData = new FormData();
        formData.append('content', content);
        formData.append('score', score);

        const newImages = images.filter((img) => img.isNew);
        newImages.forEach((image, index) => {
            formData.append('images', image.file);
        });

        chooseImages.forEach((index) => {
            formData.append('chooseImages', index);
        });

        try {
            await updateReview(serviceId, reviewId, formData);
            // 성공 처리 (예: 리뷰 목록 페이지로 리다이렉트)
        } catch (error) {
            console.error('Error updating review:', error);
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '16px',
            }}
        >
            <Typography variant="h6" gutterBottom>
                {name}
            </Typography>

            <Rating
                name="simple-controlled"
                value={score}
                onChange={(event, newScore) => setScore(newScore)}
                sx={{ marginBottom: '16px' }}
            />

            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    marginBottom: '16px',
                    width: '100%',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1px dashed #1976d2',
                        borderRadius: '8px',
                        width: '100px',
                        height: '100px',
                        marginRight: '8px',
                        position: 'relative',
                        cursor: 'pointer',
                    }}
                    onClick={() =>
                        document.getElementById('image-upload').click()
                    }
                >
                    <CameraAltIcon sx={{ fontSize: 40, color: '#1976d2' }} />
                    <Typography
                        sx={{
                            position: 'absolute',
                            bottom: 0,
                            fontSize: '12px',
                            color: '#1976d2',
                        }}
                    >
                        Add Image
                    </Typography>
                </Box>
                <input
                    type="file"
                    id="image-upload"
                    style={{ display: 'none' }}
                    onChange={handleImageUpload}
                    accept="image/*"
                    multiple
                />
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    gap: '8px',
                    marginBottom: '16px',
                    width: '100%',
                }}
            >
                {images.map((image, index) => (
                    <Box
                        key={index}
                        sx={{
                            position: 'relative',
                            width: '100px',
                            height: '100px',
                            borderRadius: '8px',
                            overflow: 'hidden',
                        }}
                    >
                        <img
                            src={image.url}
                            alt={`Preview ${index}`}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                            }}
                        />
                        <IconButton
                            size="small"
                            sx={{
                                position: 'absolute',
                                top: '4px',
                                right: '4px',
                                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                            }}
                            onClick={() =>
                                handleImageRemove(image.index || index)
                            }
                        >
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </Box>
                ))}
            </Box>

            <textarea
                ref={inputRef}
                style={{
                    width: '100%',
                    height: '150px',
                    backgroundColor: '#e0e0e0',
                    borderRadius: '8px',
                    marginBottom: '16px',
                }}
                onChange={onChangeContent}
                value={content}
            ></textarea>

            <Button
                variant="contained"
                color="primary"
                sx={{ width: '100%', borderRadius: '8px' }}
                onClick={onSubmit}
            >
                Edit
            </Button>
        </Box>
    );
};

export default ReviewEdit;
