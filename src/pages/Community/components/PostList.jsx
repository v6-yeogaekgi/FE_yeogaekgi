import * as React from 'react';
import PostItem from './PostItem';


const PostList = ({ posts }) => {

    return (
        <div className="PostList">
            {posts.map((post) => (
                <PostItem key={post.postId}
                    postId={post.postId}
                    memberId={post.memberId}
                    nickname={post.nickname}
                    countryId={post.countryId}
                    images={post.images}
                    content={post.content}
                    hashtag={post.hashtag}
                    likeCnt={post.likeCnt}
                    commentCnt={post.commentCnt}
                    regDate={post.regDate}
                    modDate={post.modDate}
                    likeState={post.likeState}
                    parentPage={"list"}
                    currentMemberId={post.currentMemberId}
                />
            ))}
        </div>
    );
}

export default PostList;