import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { getCountryImgById } from '../../../util';

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
        <div
            className="post-editor"
            style={{ margin: '10px', height: '600px' }}
        >
            <div
                className="profile"
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'row',
                    marginBottom: '10px',
                }}
                member={initialComment.memberId}
            >
                <Avatar
                    src={getCountryImgById(initialComment.code)}
                    sx={{
                        marginRight: '10px',
                        fontFamily: 'Noto Sans, sans-serif',
                    }}
                />
                <Typography component="span" variant="h6">
                    {initialComment.nickname}
                </Typography>
                <Typography
                    component="span"
                    variant="body2"
                    color="text.secondary"
                    sx={{ marginLeft: '8px' }}
                >
                    {new Date(initialComment.regDate).toLocaleDateString()}
                    {initialComment.modDate &&
                        initialComment.modDate !== initialComment.regDate && (
                            <Typography
                                component="span"
                                variant="body2"
                                color="text.secondary"
                                sx={{ marginLeft: '4px' }}
                            >
                                (modified)
                            </Typography>
                        )}
                </Typography>
            </div>

            <br />
            <TextField
                id="outlined-multiline-static"
                sx={{ width: '100%', fontFamily: 'Noto Sans, sans-serif' }}
                multiline
                rows={4}
                placeholder="Please edit the comment"
                value={commentState.content}
                onChange={handleChangeContent}
                fullWidth
            />

            <div style={{ width: '100%', textAlign: 'right' }}>
                <Typography variant="caption" color="text.secondary">
                    {`${(commentState.content || '').length} / 500`}
                </Typography>
            </div>

            <div
                style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '8px',
                }}
            ></div>
            <Button
                variant="contained"
                sx={{
                    width: '100%',
                    mt: 3,
                    borderRadius: 5,
                    textTransform: 'capitalize',
                    height: 50,
                    fontSize: '16px',
                    fontFamily: 'Noto Sans, sans-serif',
                    backgroundColor: '#4653f9',
                    '&:hover': {
                        backgroundColor: '#3a43d1',
                    },
                }}
                onClick={handleSubmit}
            >
                Edit
            </Button>
            <Button
                variant="contained"
                sx={{
                    width: '100%',
                    mt: 2,
                    borderRadius: 5,
                    textTransform: 'capitalize',
                    height: 50,
                    fontSize: '16px',
                    fontFamily: 'Noto Sans, sans-serif',
                    backgroundColor: '#9e9e9e',
                    '&:hover': {
                        backgroundColor: '#757575',
                    },
                }}
                onClick={handleOnGoBack}
            >
                Cancel
            </Button>
        </div>
    );
};

export default CommentEditor;
