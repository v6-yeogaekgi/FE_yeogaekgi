import React, { useRef, useState, useContext } from 'react';
import { Badge, Box, IconButton, Rating, Typography } from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import CloseIcon from '@mui/icons-material/Close';
import { useReview } from '../provider/ReviewProvider';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import BasicButton from '../../../components/BasicButton/BasicButton';
import useAlertDialog from '../../../hooks/useAlertDialog/useAlertDialog'; // useAlertDialog import
import CreditCardIcon from '@mui/icons-material/CreditCard';

const ReviewRegister = () => {
    const location = useLocation();
    const data = location.state?.data;
    console.log("review register data: ", data);

    const [content, setContent] = useState('');
    const [images, setImages] = useState([]);
    const { payNo, serviceNo, serviceName, formatPayDate } = data;
    const { createReview } = useReview();
    const [score, setScore] = useState(0);
    const inputRef = useRef();
    const navigate = useNavigate();

    // useAlertDialog 훅 사용
    const { openAlertDialog, AlertDialog } = useAlertDialog();

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        if (images.length + files.length > 3) {
            alert('최대 3개의 사진만 등록할 수 있습니다.');
            return;
        }
        setImages((prevImages) => [
            ...prevImages,
            ...files.slice(0, 3 - images.length),
        ]);
    };

    const handleImageRemove = (index) => {
        setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    };

    const onChangeContent = (e) => {
        setContent(e.target.value);
    };

    const onSubmit = () => {
        if (!content && !score) {
            inputRef.current.focus();
            return;
        }

        const reviewData = new FormData();
        reviewData.append('content', content);
        reviewData.append('score', score);
        reviewData.append('payNo', payNo);

        images.forEach((image) => {
            reviewData.append('files', image);
        });

        createReview(serviceNo, reviewData)
            .then(() => {
                openAlertDialog(
                    'Success!',
                    'Your review has been successfully submitted',
                    () => navigate('/mypage/review', {state: {refresh: true}}),
                );
            })
            .catch((error) => {
                openAlertDialog('Fail!', 'You already registered Review!', () =>
                    navigate('/mypage/review', {state: {refresh: true}}),
                );
            });

        setContent('');
        setScore(0);
        setImages([]);
    };

    const onKeyDown = (e) => {
        if (e.keyCode === 13) {
            onSubmit();
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
            <Box sx={{ display: 'flex' }}>
                <Typography
                    variant="h6"
                    gutterBottom
                    sx={{
                        fontWeight: '500',
                        color: '#333',
                        display: 'inline-block',
                    }}
                >
                    {serviceName}
                </Typography>
            </Box>
            <Rating
                name="simple-controlled"
                value={score}
                onChange={(event, newScore) => {
                    setScore(newScore);
                }}
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
                            src={URL.createObjectURL(image)}
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
                            onClick={() => handleImageRemove(index)}
                        >
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </Box>
                ))}
            </Box>
            {formatPayDate && (
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        width: '100%',
                        justifyContent: 'space-between',
                    }}
                >
                    <Typography sx={{ fontSize: '26px' }}>🙇🏻‍♂️️🙇🏼‍♂️🙇🏽‍♂️</Typography>
                    <Box
                        sx={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#007AFF', // 배경색
                            color: 'white', // 글씨색
                            fontSize: '16px',
                            padding: '4px 8px', // 내부 여백
                            borderRadius: '12px', // 배지처럼 둥글게
                            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', // 그림자 효과
                        }}
                    >
                        Paid!
                    </Box>
                </Box>
            )}
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
                placeholder="Write your review..."
                onChange={onChangeContent}
                value={content}
                onKeyDown={onKeyDown}
            ></textarea>

            <BasicButton
                text="Submit Review"
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

export default ReviewRegister;
