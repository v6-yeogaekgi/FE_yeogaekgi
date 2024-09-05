import React, { useState, useRef, useContext, useEffect } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import BasicTextField from '../../../components/BasicTextField/BasicTextField';
import BasicButton from '../../../components/BasicButton/BasicButton';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import CancelSharpIcon from '@mui/icons-material/CancelSharp';
import axios from 'axios';
import { AllStateContext } from '../../../App';
import { Card, Box, CircularProgress } from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import JSZip from 'jszip';
import SearchIcon from '@mui/icons-material/Search';

const SelectImage = ({
    existingImgs,
    handleDeleteImg,
    setNewImgs,
    newImgs,
}) => {
    const imageInputButton = useRef(null);
    const onClick = (e, ref) => {
        ref.current?.click();
    };
    const handleAdd = (e) => {
        if (e.target.files.length + newImgs.length + existingImgs.length > 3) {
            // 사진은 최대 3개까지만 가능하다는 내용
        } else {
            setNewImgs([...newImgs, ...e.target.files]);
            console.log(newImgs);
        }
    };
    const handleCancel = (indexToRemove) => {
        setNewImgs([
            ...newImgs.slice(0, indexToRemove),
            ...newImgs.slice(indexToRemove + 1),
        ]);
    };

    const cancelBtnStyle = {
        position: 'absolute',
        top: '5px', // 조정할 위치
        right: '5px', // 조정할 위치
        backgroundColor: 'white', // 배경색 (투명도 조절)
        borderRadius: '50%', // 둥근 버튼
        padding: '1px',
    };

    return (
        <div>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center', // 세로 가운데 정렬
                    justifyContent: 'center', // 수평 가운데 정렬 (필요 시)
                    height: '100px', // 상위 div의 높이 (필요에 따라 조정)
                }}
            >
                {/*image 추가 버튼*/}
                <input
                    ref={imageInputButton}
                    type="file"
                    onChange={handleAdd}
                    multiple
                    style={{
                        visibility: 'hidden',
                        position: 'absolute',
                    }}
                />
                <CameraAltIcon
                    sx={{ color: '#4653f9', height: '70px', width: '70px' }}
                    onClick={(event) => onClick(event, imageInputButton)}
                ></CameraAltIcon>

                {/*image 미리보기*/}
                <div
                    style={{
                        width: '280px',
                        height: '125px',
                        overflow: 'auto',
                    }}
                >
                    <div
                        style={{
                            width: `${
                                125 * (existingImgs.length + newImgs.length)
                            }px`,
                            height: '120px',
                            justifyContent: 'space-around',
                        }}
                    >
                        {existingImgs.map((image, index) => (
                            <div
                                style={{
                                    position: 'relative',
                                    display: 'inline-block',
                                    marginLeft: '5px',
                                }}
                            >
                                <img
                                    src={image}
                                    alt={`img-${index}`}
                                    style={{ height: '120px', width: '120px' }}
                                />
                                <CancelSharpIcon
                                    sx={{ color: '#FF69B4' }}
                                    onClick={() => handleDeleteImg(index)}
                                    style={cancelBtnStyle}
                                ></CancelSharpIcon>
                            </div>
                            //     ))}
                            //         <img
                            //         idx={index}
                            //     src={image}
                            //     alt="img"
                            //     style={{ height: '120px', width: '120px', marginLeft: '5px' }}
                            // />
                        ))}
                        {newImgs.map((image, index) => (
                            <div
                                style={{
                                    position: 'relative',
                                    display: 'inline-block',
                                    marginLeft: '5px',
                                }}
                            >
                                <img
                                    src={URL.createObjectURL(image)}
                                    alt="img"
                                    style={{ height: '120px', width: '120px' }}
                                />
                                <CancelSharpIcon
                                    sx={{ color: '#FF69B4' }}
                                    onClick={() => handleCancel(index)}
                                    style={cancelBtnStyle}
                                ></CancelSharpIcon>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const PostEditor = () => {
    const { protocol, dialog } = useContext(AllStateContext);
    const token = localStorage.getItem('token');
    const { postId } = useParams();
    const navigate = useNavigate();

    const registerApi = (data) => {
        setLoading(true);
        return axios
            .post(protocol + 'community/register', data, {
                headers: {
                    Authorization: token,
                    'Content-Type': 'multipart/form-data', // 데이터 형식을 명시
                },
            })
            .then((res) => {
                setLoading(false);
                dialog.alert.openAlertDialog(
                    'Success!',
                    'Go check out your post.',
                    () => navigate('/community/post/' + res.data),
                );
            })
            .catch((error) => {
                setLoading(false);
                console.error('API 호출 오류:', error);
                throw error;
            });
    };

    const modifyApi = (data) => {
        setLoading(true);
        return axios
            .put(protocol + 'community/' + postId, data, {
                headers: {
                    Authorization: token,
                    'Content-Type': 'multipart/form-data', // 데이터 형식을 명시
                },
            })
            .then((res) => {
                setLoading(false);
                dialog.alert.openAlertDialog(
                    'Success!',
                    'Go check out your post.',
                    () => navigate('/community/post/' + postId),
                );
            })
            .catch((error) => {
                setLoading(false);
                console.error('API 호출 오류:', error);
                throw error;
            });
    };

    const location = useLocation();
    const [newImgs, setNewImgs] = useState([]);
    const [existingImgs, setExistingImgs] = useState(
        location.state?.images || [],
    );
    const [deleteImgs, setDeleteImgs] = useState([]);
    const [fileImgs, setFileImgs] = useState(location.state?.images || []);
    const [hashtag, setHashtag] = useState(location.state?.hashtag || '');
    const [content, setContent] = useState(location.state?.content || '');
    const [loading, setLoading] = useState(false);

    const handleDeleteImg = (indexToRemove) => {
        setDeleteImgs([...deleteImgs, existingImgs[indexToRemove]]);
        setExistingImgs([
            ...existingImgs.slice(0, indexToRemove),
            ...existingImgs.slice(indexToRemove + 1),
        ]);
    };

    const makeZip = async (newImgs) => {
        const zip = new JSZip();

        // 파일들을 압축하기
        newImgs.forEach((file) => {
            zip.file(file.name, file);
        });

        // 압축 파일 생성
        const compressedBlob = await zip.generateAsync({ type: 'blob' });

        // Blob을 File로 변환
        return new File([compressedBlob], 'images.zip', {
            type: 'application/zip',
        });
    };

    const onClick = async (e) => {
        e.preventDefault(); // 폼 제출 시 새로고침 방지

        if (!content.trim()) {
            // alert('Please enter the content');
            dialog.alert.openAlertDialog('Error', 'Please enter the content');
            return;
        }
        const formData = new FormData();

        // 압축된 파일을 기다리고 추가
        try {
            const compressedFile = await makeZip(newImgs);
            formData.append('multipartFile', compressedFile);
        } catch (error) {
            console.error('Error creating ZIP file:', error);
            return;
        }

        formData.append('deleteImages', deleteImgs);
        formData.append('existingImages', existingImgs);
        formData.append('hashtag', hashtag);
        formData.append('content', content);

        if (location.state?.type === 'mod') {
            modifyApi(formData);
        } else {
            registerApi(formData);
        }
    };

    return (
        <div
            className="post-editor"
            style={{ margin: '10px', height: '600px' }}
        >
            <Card
                sx={{
                    padding: '10px',
                    boxShadow: 'none',
                    borderRadius: 5,
                    backgroundColor: '#ffffff',
                    mb: 2,
                }}
            >
                <Box
                    sx={{
                        mt: 2,
                        width: '95%', // 원하는 폭으로 조정
                        mx: 'auto', // 수평 가운데 정렬
                        display: 'flex',
                        flexDirection: 'column', // 내부 요소들을 세로로 정렬
                        alignItems: 'center', // 수평 가운데 정렬
                        textAlign: 'center', // 텍스트 가운데 정렬
                    }}
                >
                    <BasicTextField
                        name="hashtag"
                        label={'Hashtag'}
                        variant={'outlined'}
                        sx={{
                            width: '100%',
                            fontFamily: 'Noto Sans',
                            borderRadius: 2,
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 5,
                            },
                            '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#4653f9',
                            },
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#c0c0c0',
                            },
                        }}
                        fullWidth={true}
                        onChange={(e) => {
                            setHashtag(e.target.value);
                        }}
                        defaultValue={hashtag}
                        inputProps={{ maxLength: 20 }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    #
                                </InputAdornment>
                            ),
                        }}
                    ></BasicTextField>
                    <div
                        style={{
                            width: '100%',
                            textAlign: 'right',
                        }}
                    >
                        <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{
                                fontFamily: 'Noto Sans',
                            }}
                        >
                            {hashtag.length} / 20
                        </Typography>
                    </div>
                </Box>

                <Box
                    sx={{
                        mt: 2,
                        width: '95%',
                        mx: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                    }}
                >
                    <BasicTextField
                        name="content"
                        label={'Content'}
                        variant={'outlined'}
                        sx={{
                            width: '100%',
                            fontFamily: 'Noto Sans',
                            borderRadius: 2,
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 5,
                            },
                            '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#4653f9',
                            },
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#c0c0c0',
                            },
                        }}
                        fullWidth={true}
                        rows={5}
                        multiline={true}
                        onChange={(e) => {
                            setContent(e.target.value);
                        }}
                        defaultValue={content}
                        inputProps={{ maxLength: 500 }}
                    ></BasicTextField>
                    <div style={{ width: '100%', textAlign: 'right' }}>
                        <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{
                                fontFamily: 'Noto Sans',
                            }}
                        >
                            {content.length} / 500
                        </Typography>
                    </div>
                </Box>
            </Card>

            <Card
                sx={{
                    padding: '10px',
                    boxShadow: 'none',
                    borderRadius: 5,
                    backgroundColor: '#ffffff',
                    mt: 2,
                }}
            >
                <SelectImage
                    existingImgs={existingImgs}
                    handleDeleteImg={handleDeleteImg}
                    setNewImgs={setNewImgs}
                    newImgs={newImgs}
                    sx={{ mr: 2, ml: 2 }}
                />
            </Card>

            <div
                style={{
                    width: '100%',
                    textAlign: 'center',
                    marginTop: '10px',
                }}
            >
                <BasicButton
                    variant={'contained'}
                    size={'small'}
                    width={'100%'}
                    text={'Confirm'}
                    onClick={onClick}
                ></BasicButton>
            </div>
            {loading && (
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        zIndex: 1,
                    }}
                >
                    <CircularProgress sx={{ color: '#4653f9' }} />
                </Box>
            )}
            <dialog.alert.AlertDialog></dialog.alert.AlertDialog>
        </div>
    );
};

export default PostEditor;
