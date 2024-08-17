import { useNavigate } from 'react-router-dom';
import React from 'react';

const CommentItem = ({
                         postId,
                         memberId,
                         nickname,
                         images,
                         content,
                         hashtag,
                         likeCnt,
                         commentCnt,
                         regDate,
                         modDate,
                         likeState
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
                <img
                    alt={`country${countryId}`}
                    src={getCountryImgById(countryId)}
                />
            </div>
            <div className="info_section">
                <div className="content_wrapper">{content.slice(0, 25)}</div>
            </div>
        </div>
    );
};

export default CommentItem;