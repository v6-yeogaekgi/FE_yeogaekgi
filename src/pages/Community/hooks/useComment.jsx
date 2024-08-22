import { useContext, useEffect, useState } from 'react';
import { CommentStateContext } from '../Post';
import { useNavigate } from 'react-router-dom';

const useComment = (commentId) => {
    const data = useContext(CommentStateContext);
    const [comment, setComment] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        const matchComment = data.find((it) => String(it.commentId) === String(commentId));
        if (matchComment) {
            setComment(matchComment);
        }else{
            alert("댓글이 존재하지 않습니다")
            navigate("/community",{replace:true});
        }
    }, [commentId, data]);

    return comment;
};

export default useComment;