import './App.css';
import React, {useState} from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from "./layout/Footer/Footer";
import Header from "./layout/Header/Header";
import Wallet from './pages/Wallet/Wallet';
import HomePage from './pages/Home/Home';
import Community from './pages/Community/Community';
import MyPage from './pages/MyPage/MyPage';
import Map from './pages/Map/Map';

const PageLayout = ({ children, menuName }) => {
    return (
        <>
            <Header
                menuName={menuName}
            />
            <div>
                {children}
            </div>
            <Footer />
        </>
    );
};

function App() {
    return (
        <Router>
            <Routes>
                <Route path={'/'} element={<PageLayout menuName={'home'}><HomePage /></PageLayout>} />
                <Route path={"/home"} element={<PageLayout menuName={'home'}><HomePage /></PageLayout>} />
                <Route path={"/wallet"} element={<PageLayout menuName={'wallet'}><Wallet /></PageLayout>} />
                <Route path={"/map"} element={<PageLayout menuName={'map'}><Map/></PageLayout>} />
                <Route path={"/community"} element={<PageLayout menuName={'community'}><Community /></PageLayout>} />
                <Route path={"/myPage"} element={<PageLayout menuName={'my page'}><MyPage /></PageLayout>} />
            </Routes>
        </Router>
    );
}

export default App;