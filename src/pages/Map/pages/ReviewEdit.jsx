import React, { useRef, useState, useEffect, useContext } from 'react';
import { Box, IconButton, Rating, Typography } from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import CloseIcon from '@mui/icons-material/Close';
import { useReview } from '../provider/ReviewProvider';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { AllStateContext } from '../../../App';
import BasicButton from '../../../components/BasicButton/BasicButton';
import useAlertDialog from '../../../hooks/useAlertDialog/useAlertDialog'; // useAlertDialog import

const ReviewEdit = () => {
    const [content, setContent] = useState('');
    const [images, setImages] = useState([]);
    const [chooseImages, setChooseImages] = useState([]);
    const { name, serviceId, reviewId } = useParams();
    const [score, setScore] = useState(0);
    const inputRef = useRef();
    const { openAlertDialog, AlertDialog } = useAlertDialog(); // useAlertDialog 훅 사용
    const { updateReview } = useReview();
    const { protocol } = useContext(AllStateContext);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

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
    }, [serviceId, reviewId, protocol, token]);

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
            await updateReview(serviceId, reviewId, formData)
                .then(() => {
                    openAlertDialog(
                        'Success!',
                        'Your review has been successfully updated',
                        () => navigate(-1),
                    );
                })
                .catch((error) => {
                    openAlertDialog('Error', 'Failed to update review');
                });
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
                padding: '20px',
                backgroundColor: '#F8F8F8',
                borderRadius: '24px',
                boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1)',
                maxWidth: '500px',
                margin: 'auto',
                height: '720px',
            }}
        >
            <Typography
                variant="h6"
                gutterBottom
                sx={{
                    fontWeight: '500',
                    color: '#333',
                }}
            >
                {name}
            </Typography>

            <Rating
                name="simple-controlled"
                value={score}
                onChange={(event, newScore) => setScore(newScore)}
                sx={{ marginBottom: '20px', fontSize: '36px' }}
            />

            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    marginBottom: '20px',
                    width: '100%',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '2px dashed #007AFF',
                        borderRadius: '16px',
                        width: '100px',
                        height: '100px',
                        position: 'relative',
                        cursor: 'pointer',
                        backgroundColor: '#FFF',
                    }}
                    onClick={() =>
                        document.getElementById('image-upload').click()
                    }
                >
                    <CameraAltIcon sx={{ fontSize: 40, color: '#007AFF' }} />
                    <Typography
                        sx={{
                            position: 'absolute',
                            bottom: 0,
                            fontSize: '12px',
                            color: '#007AFF',
                            fontWeight: '500',
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
                    gap: '12px',
                    marginBottom: '20px',
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
                            borderRadius: '16px',
                            overflow: 'hidden',
                            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                        }}
                    >
                        <img
                            src={image.url}
                            alt={`Preview ${index}`}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                borderRadius: '16px',
                            }}
                        />
                        <IconButton
                            size="small"
                            sx={{
                                position: 'absolute',
                                top: '4px',
                                right: '4px',
                                backgroundColor: 'rgba(255, 255, 255, 0.8)',
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
                    backgroundColor: '#F1F1F1',
                    borderRadius: '16px',
                    marginBottom: '20px',
                    border: 'none',
                    padding: '12px',
                    fontSize: '16px',
                    fontFamily: 'Arial, sans-serif',
                    outline: 'none',
                    resize: 'none',
                }}
                placeholder="Edit your review..."
                onChange={onChangeContent}
                value={content}
            ></textarea>

            <BasicButton
                text="Update Review"
                variant="contained"
                btnColor="#4653f9"
                width="100%"
                onClick={onSubmit}
                textColor="white"
                height="50px"
                isActive={true}
            />

            {/* AlertDialog 컴포넌트를 렌더링 */}
            <AlertDialog />
        </Box>
    );
};

export default ReviewEdit;
