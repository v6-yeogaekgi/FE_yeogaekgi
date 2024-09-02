import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import Box from '@mui/material/Box';
import { useContext, useRef, useState } from 'react';
import { CommentDispatchContext } from '../Post';
import { Avatar } from '@mui/material';
import { getCountryImgById } from '../../../util';

const CommentRegister = () => {
    const [content, setContent] = useState('');
    const [member, setMember] = useState(
        JSON.parse(localStorage.getItem('member')),
    );
    const inputRef = useRef();
    const { onCreate } = useContext(CommentDispatchContext);

    const onChangeContent = (e) => {
        setContent(e.target.value);
    };
    const onSubmit = (e) => {
        e.preventDefault(); // 폼 제출 시 새로고침 방지
        console.log(member.country.code);

        if (!content.trim()) {
            inputRef.current.focus();
            alert('댓글을 입력해주세요.');
            return;
        }
        // JSON으로 변환하여 onCreate에 전달
        onCreate(content);
        setContent('');
    };

    const onKeyDown = (e) => {
        if (e.KeyCode === 13) {
            onSubmit();
        }
    };

    return (
        <Paper
            component="form"
            sx={{
                p: '2px 1px',
                display: 'flex',
                alignItems: 'center',
                width: 380,
                borderRadius: '16px',
            }}
            onSubmit={onSubmit}
        >
            <Avatar
                alt="Country Flag"
                src={getCountryImgById(member.country.code)}
                sx={{
                    width: 25,
                    height: 25,
                    ml: 2,
                }}
            />
            <InputBase
                sx={{ ml: 2, flex: 1, fontFamily: 'Noto Sans' }}
                placeholder="Leave a comment ..."
                value={content}
                onChange={onChangeContent}
                onKeyDown={onKeyDown}
                inputRef={inputRef}
            />
            <IconButton
                type="button"
                sx={{
                    p: '8px',
                    color: '#4653f9',
                    mr: 1,
                }}
                onClick={onSubmit}
            >
                <SendIcon />
            </IconButton>
        </Paper>
    );
};

export default CommentRegister;
