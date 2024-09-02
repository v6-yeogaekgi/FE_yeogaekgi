import * as React from 'react';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import BasicButton from '../../../components/BasicButton/BasicButton';
import { Card, Box } from '@mui/material';
import BasicTextField from '../../../components/BasicTextField/BasicTextField';

const CommentEditor = ({ initialComment, onUpdate }) => {
    const [commentState, setCommentState] = useState([]);
    const navigate = useNavigate();

    const handleOnGoBack = () => {
        navigate(-1);
    };

    const handleChangeContent = (e) => {
        setCommentState({
            ...commentState,
            content: e.target.value,
        });
    };

    useEffect(() => {
        if (initialComment) {
            setCommentState({
                ...initialComment,
            });
        }
    }, [initialComment]);

    const handleSubmit = () => {
        onUpdate(commentState);
    };

    return (
        <Box sx={{ ml: 2, mr: 2 }}>
            <Card
                sx={{
                    padding: '10px',
                    boxShadow: 'none',
                    borderRadius: 5,
                    backgroundColor: '#ffffff',
                    mb: 2,
                }}
            >
                <BasicTextField
                    name="content"
                    value={commentState.content}
                    onChange={handleChangeContent}
                    rows={5}
                    sx={{
                        mt: 2,
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
                />

                <div style={{ width: '100%', textAlign: 'right' }}>
                    <Typography variant="caption" color="text.secondary">
                        {`${(commentState.content || '').length} / 500`}
                    </Typography>
                </div>
            </Card>

            <div
                style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '8px',
                }}
            ></div>

            <BasicButton
                variant={'contained'}
                size={'small'}
                width={'100%'}
                text={'Confirm'}
                onClick={handleSubmit}
            ></BasicButton>
        </Box>
    );
};

export default CommentEditor;
