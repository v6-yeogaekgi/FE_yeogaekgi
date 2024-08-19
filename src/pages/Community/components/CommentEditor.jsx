import * as React from 'react';
import TextField from '@mui/material/TextField';

const CommentEditor = () => {
    return(
        <>
            <TextField
                id="outlined-multiline-static"
                multiline
                rows={4}
                defaultValue="Default Value"
                fullWidth
            />
        </>
    );
}
export default CommentEditor;