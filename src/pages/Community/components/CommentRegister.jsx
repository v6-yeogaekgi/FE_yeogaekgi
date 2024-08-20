import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import Box from '@mui/material/Box';
import { useContext, useRef, useState } from 'react';
import axios from 'axios';
import { PostDetailDispatchContext } from '../Post';


const CommentRegister = ({onCreateComment}) => {
    const [content, setContent] = useState("");
    const inputRef = useRef();

    const onChangeContent = (e) => {
        setContent(e.target.value);
    }
    const onSubmitComment = (e) => {
        e.preventDefault(); // 폼 제출 시 새로고침 방지

        if(!content){
            inputRef.current.focus();
            return;
        }
        onCreateComment(content);
        setContent("");
    }

    const onKeyDown = (e) => {
        if(e.KeyCode === 13){
            onSubmitComment();
        }
    };


    return (
        <Box sx={{
            position: 'fixed', // 고정 위치
            bottom: '70px',    // Footer 높이 만큼 위로 이동
            zIndex: 1000,      // Footer보다 위에 위치
            padding: '10px',   // 적절한 패딩 추가
        }}>


            <Paper
                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 370 }}
                onSubmit={onSubmitComment}
            >
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="댓글 남기기"
                    value={content}
                    onChange={onChangeContent}
                    onKeyDown={onKeyDown}

                />
                <IconButton type="button" sx={{ p: '10px' }} onClick={onSubmitComment} >
                    <SendIcon />
                </IconButton>

            </Paper>
        </Box>
    );
};

export default CommentRegister;