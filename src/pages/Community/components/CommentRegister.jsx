import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import Box from '@mui/material/Box';
import { useContext, useRef, useState } from 'react';
import axios from 'axios';
import { CommentDispatchContext, PostDetailDispatchContext } from '../Post';


const CommentRegister = () => {
    const [content, setContent] = useState("");
    const inputRef = useRef();
    const { onCreate } = useContext(CommentDispatchContext);

    const onChangeContent = (e) => {
        setContent(e.target.value);
    }
    const onSubmit = (e) => {
        e.preventDefault(); // 폼 제출 시 새로고침 방지

        if(!content.trim()){
            inputRef.current.focus();
            alert("댓글을 입력해주세요.")
            return;
        }
        onCreate(content);
        setContent("");
    }

    const onKeyDown = (e) => {
        if(e.KeyCode === 13){
            onSubmit();
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
                onSubmit={onSubmit}
            >
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="댓글 남기기"
                    value={content}
                    onChange={onChangeContent}
                    onKeyDown={onKeyDown}
                    inputRef={inputRef}

                />
                <IconButton type="button" sx={{ p: '10px' }} onClick={onSubmit} >
                    <SendIcon />
                </IconButton>

            </Paper>
        </Box>
    );
};

export default CommentRegister;