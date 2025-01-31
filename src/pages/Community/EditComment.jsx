import * as React from 'react';
import CommentEditor from './components/CommentEditor';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useContext } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { Card, Box } from '@mui/material';
import { AllStateContext } from '../../App';

const EditComment = () => {
    const { dialog } = useContext(AllStateContext);
    const [initialComment, setInitialComment] = useState([]);
    const { protocol } = useContext(AllStateContext);
    const navigate = useNavigate();

    const { commentId } = useParams();
    const getApiUrl = protocol + 'community/comment/';
    const token = localStorage.getItem('token');

    //  api 호출 부분

    // Api 호출 부분
    const getOneCommentApi = () => {
        axios
            .get(getApiUrl + commentId, {
                headers: {
                    Authorization: token,
                    'Content-Type': 'application/json', // 데이터 형식을 명시
                },
            })
            .then((res) => {
                setInitialComment(res.data);
            });
    };

    const onUpdate = (newContent) => {
        console.log(newContent);
        const postId = newContent.postId;
        return axios
            .put(getApiUrl + commentId, newContent, {
                headers: {
                    Authorization: token,
                    'Content-Type': 'application/json', // 데이터 형식을 명시
                },
            })
            .then((res) => {
                dialog.alert.openAlertDialog(
                    'Success!',
                    'Your comment has been updated!',
                    () => {
                        navigate('/community/post/' + postId);
                    },
                );
            })
            .catch((error) => {
                console.error('API 호출 오류:', error);
                throw error;
            });
    };

    // 처음 렌더링될 때 실행
    useEffect(() => {
        getOneCommentApi();
    }, []);

    return (
        <Box sx={{ mt: 2 }}>
            <CommentEditor
                initialComment={initialComment}
                onUpdate={onUpdate}
            />
            <dialog.alert.AlertDialog></dialog.alert.AlertDialog>
        </Box>
    );
};
export default EditComment;
