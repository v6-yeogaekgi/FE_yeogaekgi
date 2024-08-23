import React, { useState, useRef, useEffect, useMemo, useContext } from 'react';
import Box from '@mui/material/Box';
import Header from '../../layout/Header/Header';
import Footer from '../../layout/Footer/Footer';
import CommentList from './components/CommentList';
import CommentRegister from './components/CommentRegister';
import PostItem from './components/PostItem';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AllStateContext } from '../../App';

const PageLayout = ({ menuName, children }) => (
    <Box
        sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            paddingBottom: '140px', // Footer 높이만큼 패딩 추가
        }}
    >
        <Header menuName={menuName} />
        <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>{children}</Box>
        <Footer />
    </Box>
);

const mockComment = [
    {
        commentId: 1,
        postNo: 1,
        email: 'user1@test.com',
        nickname: 'test1',
        content:
            'cotent...1cotent...1cotent...1cotent...1cotent...1cotent...1cotent...1cotent...1cotent...1cotent...1cotent...1cotent...1cotent...1cotent...1cotent...1cotent...1cotent...1cotent...1cotent...1cotent...1cotent...1cotent...1cotent...1cotent...1cotent...1cotent...1cotent...1cotent...1cotent...1cotent...1cotent...1cotent...1cotent...1cotent...1cotent...1cotent...1cotent...1cotent...1cotent...1cotent...1',
        regDate: new Date().getTime(),
        modDate: new Date().getTime(),
        countryId: 2,
    },
    {
        commentId: 2,
        postNo: 1,
        email: 'user2@test.com',
        nickname: 'test2',
        content: 'cotent...2.',
        regDate: new Date().getTime(),
        countryId: 1,
    },
    {
        commentId: 3,
        postNo: 2,
        email: 'user3@test.com',
        nickname: 'test3',
        content: 'cotent...3',
        regDate: new Date().getTime(),
        countryId: 1,
    },
    {
        commentId: 4,
        postNo: 2,
        email: 'user4@test.com',
        nickname: 'test4',
        content: 'cotent...4',
        regDate: new Date().getTime(),
        countryId: 2,
    },
];

export const CommentStateContext = React.createContext();
export const CommentDispatchContext = React.createContext();

const Post = () => {
    const [comment, setComment] = useState([]);
    const [post, setPost] = useState({});
    const { protocol, token } = useContext(AllStateContext);

    const { postId } = useParams();
    const navigate = useNavigate();



    // ================ [start] comment api 호출 부분 ================
    const getApiUrl = protocol + 'community/comment/';
    const postApi = (content) => {
        return axios
            .post(
                getApiUrl + postId,
                { content },
                {
                    headers: {
                        Authorization: token,
                        'Content-Type': 'application/json', // 데이터 형식을 명시
                    },
                },
            )
            .then((res) => {
                return res;
            })
            .catch((error) => {
                console.error('API 호출 오류:', error);
                throw error;
            });
    };

    const getApi = () => {
        axios.get(getApiUrl + 'all/' + postId).then((res) => {
            setComment(res.data);
        });
    };

    const onCreate = (content) => {
        postApi(content).then(() => {
            getApi();
        });
    };

    const onDelete = (commentId, postId) => {
        return axios
            .delete(getApiUrl + commentId, {
                headers: {
                    Authorization: token,
                    'Content-Type': 'application/json', // 데이터 형식을 명시
                },
            })
            .then((res) => {
                alert('댓글이 삭제되었습니다.');
                getApi();
            })
            .catch((error) => {
                console.error('API 호출 오류:', error);
                throw error;
            });
    };
    // ================ [end] comment api 호출 부분 ================
    // ================ [start] post api 호출 부분 ================
    const getPostApiUrl = protocol + '/';
    const getPostApi = () => {
        axios.get(protocol + 'community/' + postId).then((res) => {
            setPost(res.data);
        });
    };
    // ================ [end] post api 호출 부분 ================

    const [isDataLoaded, setIsDataLoaded] = useState(false);

    useEffect(() => {
        setComment([]);
        setIsDataLoaded(true);
        getPostApi();
    }, []);
    useEffect(() => {
        getPostApi();
    }, [comment]);

    const memoizedDispatch = useMemo(() => {
        return { onCreate, onDelete, postApi, getApi };
    }, [comment]);

    if (!isDataLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            // <PageLayout menuName="post">
                <CommentStateContext.Provider value={{ comment, postId }}>
                    <CommentDispatchContext.Provider value={memoizedDispatch}>
                        <PostItem
                            key={post.postId}
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
                            currentMemberId={post.currentMemberId}
                        />
                        <CommentList />
                        <CommentRegister />
                    </CommentDispatchContext.Provider>
                </CommentStateContext.Provider>
            // </PageLayout>
        );
    }
};

export default Post;
