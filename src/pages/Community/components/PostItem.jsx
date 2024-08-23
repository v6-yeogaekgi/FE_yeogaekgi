import { useNavigate } from 'react-router-dom';
import React, {useState, useEffect} from 'react';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { ImageList, ImageListItem } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import SmsOutlinedIcon from '@mui/icons-material/SmsOutlined';
import TranslateIcon from '@mui/icons-material/Translate';

import LikeCheckbox from '../../../components/LikeCheckbox/LikeCheckbox';
import { getCountryImgById } from '../../../util';
import BasicButton from '../../../components/BasicButton/BasicButton';

const Images = ({ images, postId }) => {
    if (images && images.length >= 1) {
        console.log(images.length, images);
        console.log('postID: ', postId);
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
    countryId,
    images,
    content,
    hashtag,
    likeCnt,
    commentCnt,
    regDate,
    modDate,
    likeState,
    parentPage="register",
    currentMemberId
}) => {
    const navigate = useNavigate();
    const [viewContent, setViewContent] = useState(content);
    const [translateInfo, setTranslateInfo] = useState({state:false, translateContent:null})
    useEffect(() => {
    }, [viewContent]);

    // 번역 api
    const translateApi = (e) => {
        console.log(e.target.getAttribute('data-state')); // true면 번역 상태. false 면 원본 상태
    }

    // const goEdit = () => {
    //     navigate(`/edit/${id}`);
    // };
    //
    // const images = [
    //     'https://yeogaekgi.s3.ap-northeast-2.amazonaws.com/cf2236af-21ae-4222-b08e-349ea4f4b59a.png',
    //     'https://yeogaekgi.s3.ap-northeast-2.amazonaws.com/cec17c30-f39f-4ce7-b936-376c9bda55c5.png',
    // ];

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
                            alt="Remy Sharp"
                            src={getCountryImgById(countryId)}
                            sx={{ marginRight: '10px' }}
                        />
                        <Typography>{nickname}</Typography>
                    </div>
                    <div className="regDate">
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
                    </div>
                </CardActions>
                <CardActionArea className="post-content" onClick={()=>{
                    if(parentPage=='list') {
                        navigate("/community/post/" + postId);
                    }
                }}>
                    <CardContent>
                        <Typography className="hashtag" color="primary">
                            {hashtag}
                        </Typography>
                        <Typography
                            className="content"
                            variant="body2"
                            color="text.primary"
                        >
                            {viewContent}
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
                            checked={likeState == 0 ? false : true}
                        ></LikeCheckbox>
                        <Typography
                            className="likeCnt"
                            variant="body2"
                            color="text.secondary"
                        >
                            {likeCnt}
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
                    <div>
                        <TranslateIcon
                            sx={{
                                size:"small",
                                color:"#4653f9"
                            }}
                            onClick={translateApi}
                            data-state={translateInfo.state}
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
