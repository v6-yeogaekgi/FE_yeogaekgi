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
import useAlertDialog from '../../hooks/useAlertDialog/useAlertDialog';
import useConfirmDialog from '../../hooks/useConfirmDialog/useConfirmDialog';

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

export const CommentStateContext = React.createContext();
export const CommentDispatchContext = React.createContext();

const Post = () => {
    const { openAlertDialog, AlertDialog } = useAlertDialog();
    const { openConfirmDialog, ConfirmDialog } = useConfirmDialog();
    const [comment, setComment] = useState([]);
    const [post, setPost] = useState({});
    const { protocol } = useContext(AllStateContext);
    const token = localStorage.getItem('token');

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
                        'Content-Type': 'application/json',
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
                    'Content-Type': 'application/json',
                },
            })
            .then((res) => {
                alert('댓글이 삭제되었습니다.');
                getApi();
                getPostApi();
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
        axios
            .get(protocol + 'community/' + postId, {
                headers: {
                    Authorization: token,
                    'Content-Type': 'application/json', // 데이터 형식을 명시
                },
            })
            .then((res) => {
                setPost(res.data);
                console.log(res);
            });
    };
    // ================ [end] post api 호출 부분 ================

    const [isDataLoaded, setIsDataLoaded] = useState(false);

    useEffect(() => {
        setComment([]);
        setIsDataLoaded(true);
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
                        alertDialog={openAlertDialog}
                        confirmDialog={openConfirmDialog}
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
                <AlertDialog></AlertDialog>
                <ConfirmDialog></ConfirmDialog>
            </CommentStateContext.Provider>
            // </PageLayout>
        );
    }
};

export default Post;
