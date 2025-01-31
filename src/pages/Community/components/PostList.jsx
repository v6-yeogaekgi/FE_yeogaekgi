import * as React from 'react';
import PostItem from './PostItem';
import { Box } from '@mui/material';
import { useEffect } from 'react';

const PostList = ({
    posts,
    likeList = [],
    alertDialog,
    confirmDialog,
    deepLApi,
}) => {
    return (
        <Box className="PostList" sx={{ mr: 2, ml: 2 }}>
            {posts.map((post) => (
                <PostItem
                    key={post.postId}
                    alertDialog={alertDialog}
                    confirmDialog={confirmDialog}
                    postId={post.postId}
                    memberId={post.memberId}
                    nickname={post.nickname}
                    code={post.code}
                    images={post.images}
                    content={post.content}
                    hashtag={post.hashtag}
                    likeCnt={post.likeCnt}
                    commentCnt={post.commentCnt}
                    regDate={post.regDate}
                    modDate={post.modDate}
                    likeState={likeList.includes(post.postId)}
                    parentPage={'list'}
                    currentMemberId={post.currentMemberId}
                    currentMemberCode={post.currentMemberCode}
                    deepLApi={deepLApi}
                />
            ))}
        </Box>
    );
};

export default PostList;
