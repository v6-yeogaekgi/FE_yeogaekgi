import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useContext } from 'react';
import {
    Button,
    CardActionArea,
    CardActions,
    ListItemAvatar,
} from '@mui/material';
import { ImageList, ImageListItem } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import { Delete } from '@mui/icons-material';
import Avatar from '@mui/material/Avatar';
import SmsOutlinedIcon from '@mui/icons-material/SmsOutlined';
import TranslateIcon from '@mui/icons-material/Translate';
import LikeCheckbox from '../../../components/LikeCheckbox/LikeCheckbox';
import { getCountryImgById } from '../../../util';
import BasicButton from '../../../components/BasicButton/BasicButton';
import { AllStateContext } from '../../../App';
import axios from 'axios';
import { CommentDispatchContext } from '../Post';
import { getCountryCodeForTranslate } from '../../../util';

const Images = ({ images, postId }) => {
    if (images && images.length >= 1) {
        const width = images.length == 1 ? 348 : 165;

        return (
            <ImageList
                sx={{
                    justifyContent: 'space-between', // Center items horizontally
                    display: 'flex', // Use flexbox for layout
                    alignItems: 'center', // Center items vertically
                    width: `348px`,
                    height: '170px',
                    overflowX: 'auto', // Enable horizontal scrolling
                    overflowY: 'hidden', // Hide vertical scrolling
                    '&::-webkit-scrollbar': {
                        display: 'none', // Hide scrollbar in Webkit browsers
                    },
                }}
                cols={images.length}
                rowHeight={165}
            >
                {images.map((item, idx) => (
                    <ImageListItem
                        key={postId + '_' + idx}
                        sx={{
                            width: `${width}px`,
                            height: '165px',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <img
                            srcSet={`${item}?w=${width}&h=165&fit=clip&auto=format&dpr=2 2x`}
                            src={`${item}`}
                            style={{
                                width: `${width}px`,
                                height: '165px',
                                objectFit: 'cover',
                            }}
                            loading="lazy"
                        />
                    </ImageListItem>
                ))}
            </ImageList>
        );
    } else {
        return <div></div>;
    }
};

const PostItem = ({
    postId,
    memberId,
    nickname,
    code,
    images,
    content,
    hashtag,
    likeCnt,
    commentCnt,
    regDate,
    modDate,
    likeState,
    parentPage = '',
    currentMemberId,
    currentMemberCode,
    deepLApi,
}) => {
    const navigate = useNavigate();
    const [viewLikeState, setViewLikeState] = useState(likeState);
    const [viewLikeCnt, setViewLikeCnt] = useState(likeCnt);
    const [viewContent, setViewContent] = useState(content);
    const [translateInfo, setTranslateInfo] = useState({
        state: false,
        translateContent: null,
    });
    // const { deepLApi } = useContext(CommentDispatchContext);
    const [translatedContent, setTranslatedContent] = useState(null);
    const [translatedHashtag, setTranslatedHashtag] = useState(null);
    const [isTranslated, setIsTranslated] = useState(false);

    const { protocol, dialog } = useContext(AllStateContext);
    const token = localStorage.getItem('token');
    useEffect(() => {
    }, [viewContent]);

    // DeepL API
    const goDeepL = async () => {
        if (isTranslated) {
            // 번역 취소 (원래 값으로 복원)
            setIsTranslated(false);
        } else {
            // 번역 시작
            if (!translatedContent && !translatedHashtag) {
                try {
                    const translatedContentText = await deepLApi(
                        content,
                        getCountryCodeForTranslate(currentMemberCode),
                    );
                    const translatedHashtagText = await deepLApi(
                        hashtag,
                        getCountryCodeForTranslate(currentMemberCode),
                    );
                    setTranslatedContent(translatedContentText);
                    setTranslatedHashtag(translatedHashtagText);
                } catch (error) {
                    console.error('Translation failed:', error);
                }
            }
            setIsTranslated(true);
        }
    };

    // post 삭제 api
    const deleteApi = () => {
        return axios
            .delete(protocol + 'community/' + postId, {
                headers: {
                    Authorization: token,
                    'Content-Type': 'application/json', // 데이터 형식을 명시
                },
            })
            .then((res) => {
                dialog.alert.openAlertDialog(
                    'Success!',
                    'The post has been successfully deleted.',
                    () => navigate('/community'),
                );
            })
            .catch((error) => {
                console.error('API 호출 오류:', error);
                throw error;
            });
    };
    // like active api
    const likeAtiveApi = () => {
        if (viewLikeState) {
            // like off
            setViewLikeState(false);
            setViewLikeCnt(viewLikeCnt - 1);
        } else {
            // like on
            setViewLikeState(true);
            setViewLikeCnt(viewLikeCnt + 1);
        }
        // api 호출
        axios
            .post(
                protocol + 'community/like/' + postId,
                {},
                {
                    headers: {
                        Authorization: token,
                        'Content-Type': 'application/json', // 데이터 형식을 명시
                    },
                },
            )
            .then((res) => {
                return res;
            })
            .catch((error) => {
                console.error('API 호출 오류:', error);
                throw error;
            });
    };

    return (
        <div className="PostItem" style={{ marginBottom: '5px' }}>
            <Card sx={{ padding: '10px' }}>
                <CardActions
                    className="post-header"
                    sx={{
                        dispaly: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <div
                        className="profile"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            flexDirection: 'row',
                        }}
                        member={memberId}
                    >
                        <Avatar
                            alt="Country Flag"
                            src={getCountryImgById(code)}
                        />
                        <Typography sx={{ marginLeft: '8px' }}>
                            {nickname}
                        </Typography>
                    </div>
                    <div className="regDate">
                        <Typography
                            component="span"
                            variant="caption"
                            color="text.secondary"
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
                    </div>
                </CardActions>
                <CardActionArea
                    className="post-content"
                    onClick={() => {
                        if (parentPage == 'list') {
                            navigate('/community/post/' + postId);
                        }
                    }}
                >
                    <CardContent>
                        <Typography className="hashtag" color="primary">
                            {isTranslated ? translatedHashtag : hashtag}
                        </Typography>
                        <Typography
                            className="post-content"
                            variant="body2"
                            color="text.primary"
                        >
                            {isTranslated ? translatedContent : content}
                        </Typography>
                    </CardContent>
                    <CardContent
                        className="imageArea"
                        style={{ width: '348px', maxHeight: '220px' }}
                    >
                        <Images images={images} postId={postId}></Images>
                    </CardContent>
                </CardActionArea>
                <CardActions
                    className="post-footer"
                    sx={{ display: 'flex', justifyContent: 'space-between' }}
                >
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            flexDirection: 'row',
                        }}
                    >
                        <LikeCheckbox
                            className="likeCheck"
                            checked={viewLikeState}
                            onClick={likeAtiveApi}
                        ></LikeCheckbox>
                        <Typography
                            className="likeCnt"
                            variant="body2"
                            color="text.secondary"
                        >
                            {viewLikeCnt}
                        </Typography>
                        <SmsOutlinedIcon
                            color="disabled"
                            sx={{ marginLeft: '15px', marginRight: '5px' }}
                        ></SmsOutlinedIcon>
                        <Typography
                            className="commentCnt"
                            variant="body2"
                            color="text.secondary"
                        >
                            {commentCnt}
                        </Typography>
                    </div>
                    <div
                        style={{ display: 'flex', justifyContent: 'flex-end' }}
                    >
                        {currentMemberId == memberId ? (
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
                                onClick={() => {
                                    navigate('/community/modify/' + postId, {
                                        state: {
                                            hashtag: hashtag,
                                            content: content,
                                            images: images,
                                            type: 'mod',
                                        },
                                    });
                                }}
                            />
                        ) : (
                            <></>
                        )}
                        {currentMemberId == memberId ? (
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
                                    onClick={()=>{
                                        dialog.confirm.openConfirmDialog("Confirm Deletion","Are you sure you want to delete this?",deleteApi);
                                    }
                                }
                            />
                        ) : (
                            <></>
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
                </CardActions>
            </Card>

            <div className="info_section">
                {/*<div className="content_wrapper">{content.slice(0, 25)}</div>*/}
            </div>
        </div>
    );
};

export default PostItem;
