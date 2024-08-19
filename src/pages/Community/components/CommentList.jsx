import CommentRegister from './CommentRegister';
import CommentItem from './CommentItem';
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Main from '../Main';


const dummyComments = [
    {
        commentId: 1,
        comment: '영종도 놀러올 사람',
        regDate: '2024-08-15',
        modDate: '2024-08-16',
        postId: 101,
        memberId: 1001,
        nickname: '서석환',
        countryId: 2,
    },
    {
        commentId: 2,
        comment: '송도 놀러올 사람',
        regDate: '2024-08-14',
        modDate: '2024-08-16',
        postId: 102,
        memberId: 1002,
        nickname: '이봉욱',
        countryId: 2,
    },
    {
        commentId: 3,
        comment: '일본 놀러올 사람',
        regDate: '2024-08-14',
        modDate: '2024-08-16',
        postId: 102,
        memberId: 1002,
        nickname: '카즈하',
        countryId: 1,
    },
];

const CommentList = () => {
    return (
        <div className="CommentList">

            {dummyComments.map((comment) => (
                <CommentItem
                    key={comment.commentId}
                    commentId={comment.commentId}
                    comment={comment.comment}
                    regDate={comment.regDate}
                    modDate={comment.modDate}
                    postId={comment.postId}
                    memberId={comment.memberId}
                    nickname={comment.nickname}
                    countryId={comment.countryId}
                />
            ))}
        </div>
    );
}

export default CommentList;