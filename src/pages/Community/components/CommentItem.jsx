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
import { Box, Card, CardContent } from '@mui/material';
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
        const isConfirmed = window.confirm(
            'Would you like to delete the comment?',
        );
        dialog.confirm.openConfirmDialog(
            'Confirm Deletion',
            'Would you like to delete the comment?',
            onDelete(commentId, postId),
        );
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
        <Card
            sx={{
                boxShadow: 'none',
                borderRadius: '0px 0px 20px 20px',
            }}
        >
            <CardContent
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%',
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar
                            alt="Country Flag"
                            src={getCountryImgById(code)}
                            sx={{
                                width: 25,
                                height: 25,
                            }}
                        />
                        <Typography
                            sx={{
                                marginLeft: '8px',
                                fontWeight: 'bold',
                                fontFamily: 'Noto Sans',
                            }}
                        >
                            {nickname}
                        </Typography>
                    </Box>

                    <Typography
                        component="span"
                        variant="caption"
                        color="text.secondary"
                        sx={{ fontFamily: 'Noto Sans', mr: 0.5 }}
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
                </Box>

                <Typography
                    variant="body2"
                    color="text.primary"
                    sx={{
                        mt: 2,
                        ml: 2,
                        wordWrap: 'break-word',
                        wordBreak: 'break-word',
                        overflowWrap: 'break-word',
                    }}
                >
                    {isTranslated ? translatedContent : content}
                </Typography>
            </CardContent>
            <Box sx={{ mr: 2, mb: 2 }}>
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
            </Box>
        </Card>
    );
};

export default CommentItem;
