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

const Images = ({
  images, postId
}) => {
    if(images && images.length >= 1 ){
        console.log(images.length, images)
        console.log("postID: " , postId)
        if(images.length == 1) {
                return (
                <ImageList sx={{ width: '348', height: '220px' }} cols={1} rowHeight={164}>
                        <ImageListItem key={postId+"_"+"1"}>
                            <img
                                srcSet={`${images[0]}?w=348&h=164&fit=crop&auto=format&dpr=2 2x`}
                                src={`${images[0]}?w=348&h=164&fit=crop&auto=format`}
                                loading="lazy"
                            />
                        </ImageListItem>
                </ImageList>
                );
        } else {
            return (
                <ImageList sx={{ width: '500', height: '220px'}} cols={3} rowHeight={164}>
                    {images.map((item,idx) => (
                        <ImageListItem  key={postId+"_"+idx}>
                            <img
                                srcSet={`${item}?w=164&h=164&fit=clip&auto=format&dpr=2 2x`}
                                src={`${item}?w=164&h=164&fit=clip&auto=format`}
                                loading="lazy"
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
            );

        }
    } else {
        return <div></div>;
    }
}


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


    return (
        <div className="PostItem" style={{marginBottom:"5px"}}>
            <Card sx={{padding: "10px"}}>
                <CardActions className="post-header" sx={{dispaly:"flex",justifyContent: "space-between", alignItems: "center" }}>
                    <div className="profile" style={{display: "flex", alignItems: "center", flexDirection: "row"}}  member={memberId}>
                        <Avatar alt="Remy Sharp" src={getCountryImgById(countryId)} sx={{marginRight: "10px"}}/>
                        <Typography>{nickname}</Typography>
                    </div>
                    <div className="regDate">
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
                    <div className="imageArea" style={{overflow:'auto'}}>
                        <Images images={images}
                                postId={postId}
                        ></Images>
                    </div>
                </CardActionArea>
                <CardActions className="post-footer">
                    <div style={{ display: "flex", alignItems: "center", flexDirection: "row" }}>
                        <LikeCheckbox className="likeCheck" checked={likeState==0?false:true}></LikeCheckbox>
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