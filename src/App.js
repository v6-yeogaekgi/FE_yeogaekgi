import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './layout/Footer/Footer';
import Header from './layout/Header/Header';
import Wallet from './pages/Wallet/Wallet';
import HomePage from './pages/Home/Home';
import CardDetail from './pages/CardDetail/CardDetail';

import Main from './pages/Community/Main';
import MyPage from './pages/MyPage/MyPage';
import Map from './pages/Map/Map';
import Box from '@mui/material/Box';
import Post from './pages/Community/Post';
import EditComment from './pages/Community/EditComment';
import ImageDetail from './pages/Community/ImageDetail';
import TopUp from './pages/TopUp/TopUp';

import NewPost from './pages/Community/NewPost';
import EditPost from './pages/Community/EditPost';

const PageLayout = ({ children, menuName }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
                paddingTop: '64px', // header 높이만큼 패딩 추가
                paddingBottom: '70px', // Footer 높이만큼 패딩 추가
            }}
        >
            <Header menuName={menuName} />
            <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>{children}</Box>
            <Footer />
        </Box>
    );
};

function App() {
    return (
        <Router>
            <Routes>
                <Route
                    path={'/'}
                    element={
                        <PageLayout menuName={'home'}>
                            <HomePage />
                        </PageLayout>
                    }
                />
                <Route
                    path={'/home'}
                    element={
                        <PageLayout menuName={'home'}>
                            <HomePage />
                        </PageLayout>
                    }
                />
                <Route
                    path={'/wallet'}
                    element={
                        <PageLayout menuName={'wallet'}>
                            <Wallet />
                        </PageLayout>
                    }
                />
                <Route
                    path={'/map'}
                    element={
                        <PageLayout menuName={'map'}>
                            <Map />
                        </PageLayout>
                    }
                />
                <Route
                    path={'/community'}
                    element={
                        <PageLayout menuName={'Community'}>
                            <Main />
                        </PageLayout>
                    }
                />
                <Route
                    path={'/community/regist'}
                    element={
                        <PageLayout menuName={'Community'}>
                            <NewPost />
                        </PageLayout>
                    }
                />
                <Route
                    path={'/community/modify'}
                    element={
                        <PageLayout menuName={'Community'}>
                            <EditPost />
                        </PageLayout>
                    }
                />
                <Route path={'/community/post'} element={<Post />} />
                <Route
                    path={'/community/comment/edit'}
                    element={
                        <PageLayout menuName={'comment edit'}>
                            <EditComment />
                        </PageLayout>
                    }
                />
                <Route
                    path={'/community/imageDetail'}
                    element={<ImageDetail />}
                />
                <Route
                    path={'/myPage'}
                    element={
                        <PageLayout menuName={'my page'}>
                            <MyPage />
                        </PageLayout>
                    }
                />
                <Route
                    path={'/wallet/card-detail'}
                    element={
                        <PageLayout menuName={'detail'}>
                            <CardDetail />
                        </PageLayout>
                    }
                />
                <Route
                    path={'/wallet/top-up'}
                    element={
                        <PageLayout menuName={'top-up'}>
                            <TopUp />
                        </PageLayout>
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;
