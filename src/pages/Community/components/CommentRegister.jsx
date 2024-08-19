import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';


const CommentRegister = () => {
    return (
        <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
        >

            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="댓글 남기기"
                inputProps={{ 'aria-label': 'search google maps' }}
            />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="send">
                <SendIcon />
            </IconButton>
            
        </Paper>
    );
};

export default CommentRegister;