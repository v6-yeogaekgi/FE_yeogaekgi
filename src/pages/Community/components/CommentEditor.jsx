import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
            regDate: new Date().getTime(),
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
        <>
            <TextField
                id="outlined-multiline-static"
                multiline
                rows={4}
                placeholder="댓글을 수정해주세요"
                value={commentState.content}
                onChange={handleChangeContent}
                fullWidth
            />

            <Button
                variant="contained"
                sx={{
                    backgroundColor: '#4653f9',
                    color: 'white',
                    marginRight: 1,
                }}
                onClick={handleSubmit}
            >
                Edit
            </Button>
            <Button
                variant="contained"
                sx={{
                    backgroundColor: 'gray',
                    color: 'white',
                }}
                onClick={handleOnGoBack}
            >
                Cancel
            </Button>
        </>
    );
};

export default CommentEditor;
