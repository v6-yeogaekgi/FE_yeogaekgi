import React, { useState, useRef, useEffect, useMemo } from 'react';
import Box from '@mui/material/Box';
import Header from '../../layout/Header/Header';
import Footer from '../../layout/Footer/Footer';
import CommentList from './components/CommentList';
import CommentRegister from './components/CommentRegister';
import PostItem from './components/PostItem';
import { useParams } from 'react-router-dom';
import useComment from './hooks/useComment';


const PageLayout = ({ menuName, children }) => (
    <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        paddingBottom: '140px', // Footer 높이만큼 패딩 추가
    }}>
        <Header menuName={menuName} />
        <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
            {children}
        </Box>
        <Footer />
    </Box>
);

const mockComment = [
    {
        commentId: 1,
        postNo: 1,
        email: 'user1@test.com',
        nickname: 'test1',
        content: 'cotent...1cotent...1cotent...1cotent...1cotent...1cotent...1cotent...1cotent...1cotent...1cotent...1cotent...1cotent...1cotent...1cotent...1cotent...1cotent...1cotent...1cotent...1cotent...1cotent...1cotent...1cotent...1cotent...1cotent...1cotent...1cotent...1cotent...1cotent...1cotent...1cotent...1cotent...1cotent...1cotent...1cotent...1cotent...1cotent...1cotent...1cotent...1cotent...1cotent...1',
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

    }, {
        commentId: 3,
        postNo: 2,
        email: 'user3@test.com',
        nickname: 'test3',
        content: 'cotent...3',
        regDate: new Date().getTime(),
        countryId: 1,

    }, {
        commentId: 4,
        postNo: 2,
        email: 'user4@test.com',
        nickname: 'test4',
        content: 'cotent...4',
        regDate: new Date().getTime(),
        countryId: 2,

    },
];

const mockCurrentMemberEmail = [
    {
        currentMemberEmail : "user2@test.com",
    }
];

export const CommentStateContext = React.createContext();
export const CommentDispatchContext = React.createContext();

const Post = () => {
    const [comment, setComment] = useState(mockComment);
    const [currentMemberEmail, setCurrentMemberEmail] = useState(mockCurrentMemberEmail);
    const commentIdRef = useRef(5);



    const onCreate = (content) => {
        const newComment = {
            commentId: commentIdRef.current,
            content: content,
            email: 'user' + commentIdRef.current + '@test.com',
            nickname: 'test' + commentIdRef.current,
            regDate: new Date().getTime(),
            countryId: Math.random() < 0.5 ? 1 : 2,
        };

        setComment([newComment, ...comment]);

        commentIdRef.current += 1;
    };

    const onUpdate = (targetId, newContent) => {
        setComment(
            comment.map((it) =>
                it.commentId === targetId ? { ...it, content: newContent } : it,
            ),
        );
    };

    const onDelete = (targetId, targetEmail) => {

        setComment(
            comment.filter((it) => it.email !== targetEmail && it.commentId !== targetId),
        );
    };

    const [isDataLoaded, setIsDataLoaded] = useState(false);

    useEffect(() => {
        setComment(mockComment);
        setIsDataLoaded(true);
    }, []);

    const memoizedDispatch = useMemo(()=>{
        return {onCreate,onUpdate,onDelete};
    },[]);

    if (!isDataLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <PageLayout menuName="post">
                <CommentStateContext.Provider value={{comment,currentMemberEmail}}>
                    <CommentDispatchContext.Provider value={memoizedDispatch}>
                        <PostItem />
                        <CommentList />
                        <CommentRegister />
                    </CommentDispatchContext.Provider>
                </CommentStateContext.Provider>
            </PageLayout>

        );

    }
};

export default Post;
