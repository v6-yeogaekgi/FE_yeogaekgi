import { useNavigate } from 'react-router-dom';
import React from 'react';
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


const Images = ({
  images, postId
}) => {
    if(images && images.length >= 1 ){
        console.log(images.length, images)
        console.log("postID: " , postId)
        const width = images.length == 1? 348 : 165;

        return (
            <ImageList sx={{
                justifyContent: 'space-between',  // Center items horizontally
                display: 'flex',  // Use flexbox for layout
                alignItems: 'center',  // Center items vertically
                width: `348px`,
                height: '165px',
                overflow:"scroll",
            }} cols={images.length} rowHeight={165}>
                {images.map((item,idx) => (
                    <ImageListItem key={postId+"_"+idx}
                        sx={{
                        width: `${width}px`,
                        height: '165px',
                        justifyContent: 'center',
                        alignItems: 'center'}}
                    >
                        <img
                            srcSet={`${item}?w=${width}&h=165&fit=clip&auto=format&dpr=2 2x`}
                            src={`${item}`}
                            style={{ width: `${width}px`, height: '165px', objectFit: 'cover' }}
                            loading="lazy"
                        />
                    </ImageListItem>
                ))}
            </ImageList>
        );


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
                    <CardContent className="imageArea" style={{width:"348px", maxHeight:"220px"}}>
                        <Images images={images} postId={postId}></Images>
                    </CardContent>
                </CardActionArea>
                <CardActions className="post-footer" sx={{display:"flex", justifyContent:"space-between"}}>
                    <div style={{ display: "flex", alignItems: "center", flexDirection: "row" }}>
                        <LikeCheckbox className="likeCheck" checked={likeState==0?false:true}></LikeCheckbox>
                        <Typography className="likeCnt" variant="body2" color="text.secondary">{likeCnt}</Typography>
                        <SmsOutlinedIcon color="disabled" sx={{marginLeft:"15px", marginRight:"5px"}}></SmsOutlinedIcon>
                        <Typography  className="commentCnt" variant="body2" color="text.secondary">{commentCnt}</Typography>
                    </div>
                    <div>
                        <Button
                            size="small"
                            variant="text"
                            btnColor='#4653f9'
                            textColor="ffffff"
                        >
                            <TranslateIcon/>
                        </Button>

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