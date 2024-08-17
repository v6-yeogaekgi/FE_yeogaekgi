import './App.css';
import React, {useState} from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from "./layout/Footer/Footer";
import Header from "./layout/Header/Header";
import Wallet from './pages/Wallet/Wallet';
import HomePage from './pages/Home/Home';
import Community from './pages/Community/Main';
import MyPage from './pages/MyPage/MyPage';
import Map from './pages/Map/Map';
import Box from '@mui/material/Box';
import CardDetail from './pages/Wallet/CardDetail';

const PageLayout = ({ children, menuName }) => {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            paddingBottom: '70px', // Footer 높이만큼 패딩 추가
        }}>
            <Header menuName={menuName} />
            <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
                {children}
            </Box>
            <Footer />
        </Box>
    );
};

function App() {
    return (
        <Router>
            <Routes>
                <Route path={'/'} element={<PageLayout menuName={'home'}><HomePage /></PageLayout>} />
                <Route path={"/home"} element={<PageLayout menuName={'home'}><HomePage /></PageLayout>} />
                <Route path={"/wallet"} element={<PageLayout menuName={'wallet'}><Wallet /></PageLayout>} />
                <Route path={"/wallet/cardDetail"} element={<CardDetail/>}/>
                <Route path={"/map"} element={<PageLayout menuName={'map'}><Map/></PageLayout>} />
                <Route path={"/community"} element={<PageLayout menuName={'community'}><Community /></PageLayout>} />
                <Route path={"/myPage"} element={<PageLayout menuName={'my page'}><MyPage /></PageLayout>} />
            </Routes>
        </Router>
    );
}

export default App;