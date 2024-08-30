import React, { useContext, useState } from 'react';
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
import { AllStateContext } from '../../../App';
import { getCountryCodeForTranslate } from '../../../util';

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
    currentMemberId,
    currentMemberCode,
    deepLApi,
}) => {
    const { dialog } = useContext(AllStateContext);
    const [translatedContent, setTranslatedContent] = useState(null);
    const [isTranslated, setIsTranslated] = useState(false);

    const onClickDeleteComment = () => {
        // const isConfirmed = window.confirm(
        //     'Would you like to delete the comment?',
        // );
        dialog.confirm.openConfirmDialog("Confirm Deletion","Would you like to delete the comment?",()=>onDelete(commentId, postId));

    };

    const navigate = useNavigate();

    const goEdit = () => {
        navigate(`/community/comment/edit/${commentId}`);
    };

    const goDeepL = async () => {
        if (isTranslated) {
            setIsTranslated(false);
        } else {
            if (!translatedContent) {
                try {
                    const translated = await deepLApi(
                        content,
                        getCountryCodeForTranslate(currentMemberCode),
                    );
                    setTranslatedContent(translated);
                } catch (error) {
                    console.error('Translation failed:', error);
                }
            }
            setIsTranslated(true);
        }
    };

    const shouldRenderButtons = currentMemberId === memberId;

    return (
        <List sx={{ width: '95%', bgcolor: 'background.paper' }}>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar
                        alt="Country Flag"
                        src={getCountryImgById(currentMemberCode)}
                    />
                </ListItemAvatar>
                <div style={{ flex: 1 }}>
                    <Typography>
                        {nickname}
                    </Typography>
                    <Typography
                        component="span"
                        variant="caption"
                        color="text.secondary"
                        sx={{ marginLeft: '8px' }}
                    >
                        {new Date(regDate).toLocaleDateString()}
                        {modDate && modDate !== regDate && (
                            <Typography
                                component="span"
                                variant="caption"
                                color="text.secondary"
                                sx={{ marginLeft: '4px' }}
                            >
                                (modified)
                            </Typography>
                        )}
                    </Typography>

                    <Typography
                        variant="body2"
                        color="text.primary"
                        sx={{
                            mt: 1,
                            mb: 1,
                            wordWrap: 'break-word',
                            wordBreak: 'break-word',
                            overflowWrap: 'break-word',
                        }}
                    >
                        {isTranslated ? translatedContent : content}
                    </Typography>

                    <div
                        style={{
                            display: 'flex',
                            gap: '8px',
                            justifyContent: 'flex-end',
                        }}
                    >


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
                            onClick={goDeepL}
                        />
                    </div>
                </div>
            </ListItem>
            <Divider variant="inset" component="li" />
        </List>
    );
};

export default CommentItem;
