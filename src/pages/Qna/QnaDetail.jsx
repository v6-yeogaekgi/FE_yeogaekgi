import React, { useState, useRef, useContext, useEffect } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import BasicTextField from '../../components/BasicTextField/BasicTextField';
import BasicButton from '../../components/BasicButton/BasicButton';
import Typography from '@mui/material/Typography';
import CancelSharpIcon from '@mui/icons-material/CancelSharp';
import axios from 'axios';
import { AllStateContext } from '../../App';
import { Card, Box } from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';


const QnaDetail = () => {
    const { protocol, dialog } = useContext(AllStateContext);
    const token = localStorage.getItem('token');
    const { qnaId } = useParams();
    const navigate = useNavigate();
    const [qna , setQna] = useState({});

    const getApiUrl = protocol + 'qna/'+qnaId;
    const getApi = () => {
        axios
            .get(getApiUrl, {
                headers: {
                    Authorization: token,
                    'Content-Type': 'application/json',
                },
            })
            .then((res) => {
                setQna(res.data);
                console.log(res.data);
            });
    };
    useEffect(() => {
        getApi();
    }, []);

    return (
        <div
            className="qna-detail"
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
                <div className="regDate" style={{ dispaly:"flex", textAlign:'right' }}>
                    <Typography
                        component="span"
                        variant="caption"
                        color="text.secondary"
                        sx={{ fontFamily: 'Noto Sans', mr: 0.5 }}
                    >
                        {new Date(qna?.qnaDate).toLocaleDateString()}
                    </Typography>
                </div>
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
                        name="title"
                        label={'Title'}
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
                        onChange={()=>{}}
                        value={qna.title}
                        defaultValue={'  '}
                        inputProps={{ maxLength: 20 }}
                        InputProps={{ readOnly: true }}
                    ></BasicTextField>
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
                        defaultValue={'  '}
                        value={qna.content}
                        inputProps={{ maxLength: 500 }}
                        InputProps={{ readOnly: true }}
                        onChange={()=>{}}
                    ></BasicTextField>
                    <div  style={{
                        width:"100%",
                        overflowX:'auto',
                        overflowY: 'hidden', // Hide vertical scrolling
                        '&::-webkit-scrollbar': {
                            display: 'none', // Hide scrollbar in Webkit browsers
                        },
                        whiteSpace: 'nowrap',
                        marginTop: '10px'
                    }}>
                    {qna?.images &&
                        <div
                            style={{ display: 'inline-block'}}
                        >
                            {qna?.images.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={`img-${index}`}
                                style={{ height: '120px', width: '120px', margin:"2px", display: 'inline-block'}}
                                onClick={()=>{}}
                            />
                            ))}
                        </div>
                    }
                    </div>
                </Box>
            </Card>

            {! qna?.status && (
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
                    text={'Modify'}
                    onClick={() => {
                        navigate('/qna/modify/' + qnaId, {
                            state: {
                                title: qna.title,
                                content: qna.content,
                                images: qna.images,
                                type: 'mod',
                            },
                        });
                    }}
                ></BasicButton>
            </div>
            )}
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
                    text={'delete'}
                    onClick={() => {
                    }}
                ></BasicButton>
            </div>


            {qna?.status && (
                <Card
                    sx={{
                        padding: '10px',
                        boxShadow: 'none',
                        borderRadius: 5,
                        backgroundColor: '#ffffff',
                        mt: 2,
                    }}
                >
                    <div className="regDate" style={{ dispaly: "flex", textAlign: 'right' }}>
                        <Typography
                            component="span"
                            variant="caption"
                            color="text.secondary"
                            sx={{ fontFamily: 'Noto Sans', mr: 0.5 }}
                        >
                            {new Date(qna?.replyDate).toLocaleDateString()}
                        </Typography>
                    </div>
                    <BasicTextField
                        name="reply"
                        label={'Reply'}
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
                        defaultValue={'  '}
                        value={qna.reply}
                        onChange={()=>{}}
                        inputProps={{ maxLength: 500 }}
                        InputProps={{ readOnly: true }}
                    ></BasicTextField>

                </Card>
            )}
            <dialog.alert.AlertDialog></dialog.alert.AlertDialog>
        </div>
    );
};

export default QnaDetail;
