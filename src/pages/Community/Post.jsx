import React, { useReducer, createContext, useState, useRef } from 'react';
import Box from '@mui/material/Box';
import Header from '../../layout/Header/Header';
import Footer from '../../layout/Footer/Footer';
import CommentList from './components/CommentList';
import CommentRegister from './components/CommentRegister';
import PostItem from './components/PostItem';


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
        commentId : 1,
        postNo: 1,
        memberId: "user1",
        nickname: "test1",
        content: "test입니다.",
        regDate : new Date().getTime(),
        modDate: new Date().getTime(),
        countryId: 2

    }
];



const Post = () => {
    const [comment, setComment] = useState(mockComment);

    const commentIdRef = useRef(2);
    const onCreateComment = (content) => {
        const newComment = {
            id : commentIdRef.current,
            content : content,
            regDate: new Date().getTime(),
            countryId : Math.random() < 0.5 ? 1 : 2
        };
        setComment([newComment,...comment]);
        commentIdRef.current += 1;
    }


    return (
            <PageLayout menuName="post">
                <PostItem />
                <CommentList comment={comment} />
                <CommentRegister onCreateComment={onCreateComment}/>
            </PageLayout>
    );
};

export default Post;
