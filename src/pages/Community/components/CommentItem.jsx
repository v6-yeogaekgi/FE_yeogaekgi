import React, { useContext } from 'react';
import { getCountryImgById } from '../../../util';

import Avatar from '@mui/material/Avatar';

import TranslateIcon from '@mui/icons-material/Translate';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import { Delete } from '@mui/icons-material';
import { CommentDispatchContext, CommentStateContext } from '../Post';
import { useNavigate } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import { ListItemAvatar } from '@mui/material';
import Divider from '@mui/material/Divider';

const CommentItem = ({
    commentId,
    postId,
    email,
    memberId,
    nickname,
    content,
    regDate,
    modDate,
    code,
    onDelete,
}) => {
    const onClickDeleteComment = () => {
        const isConfirmed = window.confirm('댓글을 삭제하시겠습니까?');
        if (isConfirmed) {
            onDelete(commentId, postId);
        }
    };

    const navigate = useNavigate();

    const goEdit = () => {
        navigate(`/community/comment/edit/${commentId}`);
    };

    const currentMemberNo = 402;
    const shouldRenderButtons = currentMemberNo === memberId;

    return (
        <List sx={{ width: '95%', bgcolor: 'background.paper' }}>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar alt="Country Flag" src={getCountryImgById(code)} />
                </ListItemAvatar>
                <div style={{ flex: 1 }}>
                    <Typography component="span" variant="h6">
                        {nickname}
                    </Typography>
                    <Typography
                        component="span"
                        variant="body2"
                        color="text.secondary"
                        sx={{ marginLeft: '8px' }}
                    >
                        {new Date(regDate).toLocaleDateString()}
                        {modDate && modDate !== regDate && (
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

                    <Typography
                        variant="body1"
                        sx={{
                            mt: 1,
                            mb: 1,
                            wordWrap: 'break-word', // 긴 단어가 있을 때 줄바꿈
                            wordBreak: 'break-word', // 줄바꿈시 단어 단위로 나눔
                            overflowWrap: 'break-word', // 긴 단어를 잘라서 줄바꿈
                        }}
                    >
                        {content}
                    </Typography>

                    <div
                        style={{
                            display: 'flex',
                            gap: '8px',
                            justifyContent: 'flex-end',
                        }}
                    >
                        <Button
                            id="translate-button"
                            size="small"
                            aria-label="translate"
                            startIcon={<TranslateIcon />}
                            sx={{
                                color: '#4653f9',
                                padding: '4px 8px',
                                fontSize: '0.75rem',
                                height: '24px',
                                minWidth: '32px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                textAlign: 'center',
                                '& .MuiButton-startIcon': {
                                    marginRight: 0,
                                },
                            }}
                        />

                        {shouldRenderButtons && (
                            <>
                                <Button
                                    id="edit-button"
                                    size="small"
                                    aria-label="edit"
                                    startIcon={<EditIcon />}
                                    sx={{
                                        color: '#4653f9',
                                        padding: '4px 8px',
                                        fontSize: '0.75rem',
                                        height: '24px',
                                        minWidth: '32px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        textAlign: 'center',
                                        '& .MuiButton-startIcon': {
                                            marginRight: 0,
                                        },
                                    }}
                                    onClick={goEdit}
                                />

                                <Button
                                    id="delete-button"
                                    size="small"
                                    aria-label="delete"
                                    startIcon={<Delete />}
                                    sx={{
                                        color: '#4653f9',
                                        padding: '4px 8px',
                                        fontSize: '0.75rem',
                                        height: '24px',
                                        minWidth: '32px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        textAlign: 'center',
                                        '& .MuiButton-startIcon': {
                                            marginRight: 0,
                                        },
                                    }}
                                    onClick={onClickDeleteComment}
                                />
                            </>
                        )}
                    </div>
                </div>
            </ListItem>
            <Divider variant="inset" component="li" />
        </List>
    );
};

export default CommentItem;
