import React, { useRef, useState } from 'react';
import { Box, Button, IconButton, Rating, Typography } from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import CloseIcon from '@mui/icons-material/Close';
import { useSelected } from './SelectedProvider';
import { useReview } from './ReviewProvider';

const ReviewRegister = () => {
    const [content, setContent] = useState('');
    const [images, setImages] = useState([]); // 이미지들을 배열로 관리
    const { SelectedServiceInfo } = useSelected();
    const { onCreate } = useReview();
    const [score, setScore] = useState(0); // 초기값을 0으로 설정하여 숫자로 유지

    const inputRef = useRef();

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
        reviewData.append('score', score); // score는 숫자형이어야 함

        // 각 파일을 FormData에 개별적으로 추가
        images.forEach((image, index) => {
            reviewData.append('files', image);
        });

        onCreate(reviewData); // formData 객체를 제출
        setContent(''); // 제출 후 입력창 초기화
        setScore(0); // Rating 값 초기화
        setImages([]); // 이미지 초기화
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
                padding: '16px',
            }}
        >
            {/* Title */}
            <Typography variant="h6" gutterBottom>
                {SelectedServiceInfo.name}
            </Typography>

            {/* Rating */}
            <Rating
                name="simple-controlled"
                value={score}
                onChange={(event, newScore) => {
                    setScore(newScore); // newScore는 숫자형 값이므로 그대로 사용
                }}
                sx={{ marginBottom: '16px' }}
            />

            {/* Image Upload and Preview */}
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
                    style={{ display: 'none' }} // input 숨김
                    onChange={handleImageUpload}
                    accept="image/*"
                    multiple
                />
            </Box>

            {/* Uploaded Images Preview */}
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
                            src={URL.createObjectURL(image)}
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
                            onClick={() => handleImageRemove(index)}
                        >
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </Box>
                ))}
            </Box>

            {/* Placeholder Box */}
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
                onKeyDown={onKeyDown}
            ></textarea>

            {/* OK Button */}
            <Button
                variant="contained"
                color="primary"
                sx={{ width: '100%', borderRadius: '8px' }}
                onClick={onSubmit}
            >
                OK
            </Button>
        </Box>
    );
};

export default ReviewRegister;
