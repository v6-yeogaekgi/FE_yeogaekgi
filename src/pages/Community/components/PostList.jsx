import * as React from 'react';
import PostItem from './PostItem';


const dummyPosts = [
    {
        postId: 1,
        memberId: 1,
        nickname: "test1",
        countryId: "1",
        images: ["https://thumbnail.laftel.net/items/home/020f441d-303f-4715-b4ce-b280d3eac8c6.jpg","https://thumbnail.laftel.net/items/home/020f441d-303f-4715-b4ce-b280d3eac8c6.jpg", "https://getfile.fmkorea.com/getfile.php?code=44e796e779e0071d6d25e830f1cf34e6&file=http%3A%2F%2Fimg1.daumcdn.net%2Fthumb%2FR1024x0%2F%3Ffname%3Dhttp%3A%2F%2Fi1.daumcdn.net%2Fcfile265%2Fimage%2F99535933599AADE801DEC7&redir=Y"],
        content: "안녕하세요 반갑습니다~",
        hashtag: "첫인사",
        likeCnt: 123,
        commentCnt:0,
        regDate: "2024-08-14",
        modDate: "2024-08-14",
        likeState: 1,
    },
    {
        postId: 2,
        memberId: 2,
        nickname: "test2",
        countryId: "2",
        images: ["https://thumbnail.laftel.net/items/home/020f441d-303f-4715-b4ce-b280d3eac8c6.jpg"],
        content: "1님 안녕하세요 반갑습니다~",
        likeCnt: 123,
        commentCnt:123,
        regDate: "2024-08-14",
        modDate: "2024-08-14",
        likeState: 0,
    },
    {
        postId: 3,
        memberId: 3,
        nickname: "test3",
        countryId: "3",
        images: ["https://thumbnail.laftel.net/items/home/020f441d-303f-4715-b4ce-b280d3eac8c6.jpg", "https://getfile.fmkorea.com/getfile.php?code=44e796e779e0071d6d25e830f1cf34e6&file=http%3A%2F%2Fimg1.daumcdn.net%2Fthumb%2FR1024x0%2F%3Ffname%3Dhttp%3A%2F%2Fi1.daumcdn.net%2Fcfile265%2Fimage%2F99535933599AADE801DEC7&redir=Y"],
        content: "test3이다. 안녕하세요 반갑습니다~",
        hashtag: "첫인사",
        likeCnt: 123,
        commentCnt:333,
        regDate: "2024-08-14",
        modDate: "2024-08-14",
        likeState: 0,
    },
    {
        postId: 4,
        memberId: 4,
        nickname: "test4",
        countryId: "4",
        images: null,
        content: "test3이다. 안녕하세요 반갑습니다~",
        hashtag: "첫인사",
        likeCnt: 123,
        commentCnt:333,
        regDate: "2024-08-14",
        modDate: "2024-08-14",
        likeState: 0,
    },
];

const PostList = (posts) => {
    posts = dummyPosts;
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
                />
            ))}
        </div>
    );
}

export default PostList;