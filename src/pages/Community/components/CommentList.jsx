import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import CommentItem from './CommentItem';




const dummyComments = [
    {
        commentId: 1,
        comment: '영종도 놀러올 사람',
        regDate: '2024-08-15',
        modDate: '2024-08-16',
        postId: 101,
        memberId: 1001,
        nickname: '서석환',
        countryId: 1,
    },
    {
        commentId: 2,
        comment: '송도 놀러올 사람',
        regDate: '2024-08-14',
        modDate: '2024-08-16',
        postId: 102,
        memberId: 1002,
        nickname: '이봉욱',
        countryId: 1,
    },
    {
        commentId: 3,
        comment: '일본 놀러올 사람',
        regDate: '2024-08-14',
        modDate: '2024-08-16',
        postId: 102,
        memberId: 1002,
        nickname: '카즈하',
        countryId: 2,
    },
];

const CommentList = () => {
    return (
        <List
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                    댓글
                </ListSubheader>
            }
        >
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
        </List>

    );
};

export default CommentList;