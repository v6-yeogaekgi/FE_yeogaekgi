import { useNavigate } from 'react-router-dom';
import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { ImageList, ImageListItem } from '@mui/material';

import SmsOutlinedIcon from '@mui/icons-material/SmsOutlined';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';

import LikeCheckbox from '../../../components/LikeCheckbox/LikeCheckbox'

import ListItemAvatar from '@mui/material/ListItemAvatar';

import { getCountryImgById } from '../../../util';

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
                         parentPage,

                    }) => {
    const navigate = useNavigate();

    // const goEdit = () => {
    //     navigate(`/edit/${id}`);
    // };
    images = ["https://thumbnail.laftel.net/items/home/020f441d-303f-4715-b4ce-b280d3eac8c6.jpg?w=760&webp=0&c=0%2C0%2C640%2C360"]
    console.log(images)
    return (
        <div className="PostItem" postId={postId} style={{marginBottom:"5px"}}>
            <Card sx={{padding: "10px"}}>
                <CardActions className="post-header"sx={{dispaly:"flex",justifyContent: "space-between", alignItems: "center" }}>
                    <div className="profile" style={{display: "flex", alignItems: "center", flexDirection: "row"}}  memberId={memberId}>
                        <Avatar alt="Remy Sharp" src={getCountryImgById(countryId)} sx={{marginRight: "10px"}}/>
                        <Typography>{nickname}</Typography>
                    </div>
                    <div classNema="regDate">
                        <Typography variant="caption" color="text.secondary">{regDate}</Typography>
                    </div>

                </CardActions>
                <CardActionArea className="post-content">
                    <CardContent>
                        <Typography className="hashtag" color="primary">
                            {hashtag}
                        </Typography>
                        <Typography  className="content" variant="body2" color="text.primary">
                            {content}
                        </Typography>
                    </CardContent>
                    <div className="imageArea">
                        {/*<ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>*/}
                        {/*    {images.map((item) => (*/}
                        {/*        <ImageListItem key={item.img}>*/}
                        {/*            <img*/}
                        {/*                srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}*/}
                        {/*                src={`${item.img}?w=164&h=164&fit=crop&auto=format`}*/}
                        {/*                alt={item.title}*/}
                        {/*                loading="lazy"*/}
                        {/*            />*/}
                        {/*        </ImageListItem>*/}
                        {/*    ))}*/}
                        {/*</ImageList>*/}

                    </div>
                </CardActionArea>
                <CardActions className="post-footer">
                    <div style={{ display: "flex", alignItems: "center", flexDirection: "row" }}>
                        <LikeCheckbox className="likeCheck" checked={likeState==0?"":"checked"}></LikeCheckbox>
                        <Typography className="likeCnt" variant="body2" color="text.secondary">{likeCnt}</Typography>
                        <SmsOutlinedIcon color="disabled" sx={{marginLeft:"15px", marginRight:"5px"}}></SmsOutlinedIcon>
                        <Typography  className="commentCnt" variant="body2" color="text.secondary">{commentCnt}</Typography>
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