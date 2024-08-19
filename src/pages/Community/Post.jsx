import CommentList from './components/CommentList';
import CommentRegister from './components/CommentRegister';
import * as React from 'react';
import Box from '@mui/material/Box';
import Header from '../../layout/Header/Header';
import Footer from '../../layout/Footer/Footer';


const PageLayout = ({ children, menuName }) => {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            paddingBottom: '140px', // Footer 높이만큼 패딩 추가
        }}>
            <Header menuName="post" />
            <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
                <CommentList />
            </Box>

            {/* CommentRegister를 화면 하단에 고정 */}
            <Box sx={{
                position: 'fixed', // 고정 위치
                bottom: '60px',    // Footer 높이 만큼 위로 이동
                left: 0,
                zIndex: 1000,      // Footer보다 위에 위치
                bgcolor: 'background.paper', // 배경색 지정
                padding: '10px',   // 적절한 패딩 추가
            }}>
                <CommentRegister />
            </Box>

            <Footer />
        </Box>
    );
};

const Post = () => {
    return(
        <>
            <PageLayout/>
        </>
    );
}
export default Post;
