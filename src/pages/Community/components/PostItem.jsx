import { useNavigate } from 'react-router-dom';
import React from 'react';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
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

                    }) => {
    const navigate = useNavigate();

    // const goEdit = () => {
    //     navigate(`/edit/${id}`);
    // };

    return (
        <div className="PostItem">
            <div
                className={['img_section', `img_section_${countryId}`].join(
                    ' ',
                )}
            >


                <Avatar alt="Remy Sharp" src={getCountryImgById(countryId)} />

            </div>
            <div className="info_section">
                <div className="content_wrapper">{content.slice(0, 25)}</div>
            </div>
        </div>
    );
};

export default PostItem;