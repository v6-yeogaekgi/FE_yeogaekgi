import * as React from 'react';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import { getFormattedDate } from '../../../util';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const CommentEditor = ({ initData, onSubmit }) => {
    const [comment, setComment] = useState({
        content: 'test입니다.',
    });

    const navigate = useNavigate();

    const handleOnGoBack = () => {
        navigate(-1);
    }

    const handleChangeContent = (e) => {
        setComment({
            ...comment,
            content: e.target.value,
            regDate: new Date().getTime(),
        });
    };

    useEffect(() => {
        if(initData) {
            setComment({
                ...initData,
            });
        }
    },[initData]);

    const handleSubmit = (e) => {
        onSubmit(comment);
    }
    return (
        <>
            <TextField
                id="outlined-multiline-static"
                multiline
                rows={4}
                placeholder="댓글을 수정해주세요"
                value={comment.content}
                onChange={handleChangeContent}
                fullWidth
            />


            <Button
                text="edit"
                variant="contained"
                sx={{
                    backgroundColor: '#4653f9',
                    color: 'white',
                    marginRight: 1, // 오른쪽 마진을 추가하여 버튼 간의 간격 조절
                }}
                onClick={handleSubmit}
            >
                Edit
            </Button>
            <Button
                text="cancel"
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