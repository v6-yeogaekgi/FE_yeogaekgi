import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './layout/Footer/Footer';
import Header from './layout/Header/Header';
import Wallet from './pages/Wallet/Wallet';
import HomePage from './pages/Home/Home';
import Kiosk from './pages/Kiosk/Kiosk';
import Main from './pages/Community/Main';
import MyPage from './pages/MyPage/MyPage';
import Map from './pages/Map/Map';
import Box from '@mui/material/Box';
import Post from './pages/Community/Post';
import EditComment from './pages/Community/EditComment';
import ImageDetail from './pages/Community/ImageDetail';
import TopUp from './pages/TopUp/TopUp';
import CardDetail from './pages/CardDetail/CardDetail';
import Refund from './pages/Refund/Refund';

import NewPost from './pages/Community/NewPost';
import EditPost from './pages/Community/EditPost';
import { AddBoxSharp } from '@mui/icons-material';
import First from './pages/First/First';
import Conversion from './pages/Conversion/Conversion';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import Login from './pages/First/login';
import { ReviewProvider } from './pages/Map/provider/ReviewProvider';
import ReviewRegister from './pages/Map/pages/ReviewRegister';
import ReviewEdit from './pages/Map/pages/ReviewEdit';
import { fetchAndStoreExchangeRate } from './components/ExchangeRateManager/ExchangeRateManager';
import MyReviews from './pages/MyReviews/MyReviews';
import CurrencyConverter from './pages/CurrencyConverter/CurrencyConverter';

import useAlertDialog from './hooks/useAlertDialog/useAlertDialog';
import useConfirmDialog from './hooks/useConfirmDialog/useConfirmDialog';

const PageLayout = ({ children, menuName }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                paddingTop: '64px', // header 높이만큼 패딩 추가
                paddingBottom: '70px', // Footer 높이만큼 패딩 추가
                width: '390px',
                height: '844px',
                overflowY: 'auto', // Hide vertical scrolling
                '&::-webkit-scrollbar': {
                    display: 'none', // Hide scrollbar in Webkit browsers
                },
            }}
        >
            <Header menuName={menuName} />
            <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>{children}</Box>
            <Footer />
        </Box>
    );
};

const FirstPage = ({ children }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
            }}
        >
            {children}
        </Box>
    );
};

export const AllStateContext = React.createContext();
const protocol = process.env.REACT_APP_API_PROTOCOL;

function App() {
    const { openAlertDialog, AlertDialog } = useAlertDialog();
    const { openConfirmDialog, ConfirmDialog } = useConfirmDialog();
    const dialog = {
        confirm: {
            openConfirmDialog,
            ConfirmDialog,
        },
        alert: {
            openAlertDialog,
            AlertDialog,
        },
    };

    useEffect(() => {
        fetchAndStoreExchangeRate();
    }, []);

    return (
        <AllStateContext.Provider value={{ protocol, dialog }}>
            <Router>
                <ScrollToTop />
                <Routes>
                    <Route
                        path={'/'}
                        element={
                            <FirstPage>
                                <First />
                            </FirstPage>
                        }
                    />
                    <Route path={'/home'} element={<HomePage />} />
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
                        path={'/map/register/:serviceId/:name'}
                        element={
                            <PageLayout menuName={'map'}>
                                <ReviewProvider>
                                    <ReviewRegister />
                                </ReviewProvider>
                            </PageLayout>
                        }
                    />
                    <Route
                        path={'/map/edit/:name/:serviceId/:reviewId'}
                        element={
                            <PageLayout menuName={'map'}>
                                <ReviewProvider>
                                    <ReviewEdit />
                                </ReviewProvider>
                            </PageLayout>
                        }
                    />
                    <Route
                        path={'/community'}
                        element={
                            <PageLayout menuName={'community'}>
                                <Main />
                            </PageLayout>
                        }
                    />

                    <Route
                        path={'/community/regist'}
                        element={
                            <PageLayout menuName={'community'}>
                                <NewPost />
                            </PageLayout>
                        }
                    />
                    <Route
                        path={'/community/modify/:postId'}
                        element={
                            <PageLayout menuName={'community'}>
                                <EditPost />
                            </PageLayout>
                        }
                    />

                    <Route
                        path={'/community/post/:postId'}
                        element={
                            <PageLayout menuName={'Community'}>
                                <Post />
                            </PageLayout>
                        }
                    />
                    <Route
                        path={'/community/comment/edit/:commentId'}
                        element={
                            <PageLayout menuName={'comment edit'}>
                                <EditComment />
                            </PageLayout>
                        }
                    />
                    <Route
                        path={'/community/imageDetail/:postId'}
                        element={<ImageDetail />}
                    />
                    <Route
                        path={'/mypage'}
                        element={
                            <PageLayout menuName={'Account'}>
                                <MyPage />
                            </PageLayout>
                        }
                    />
                    <Route
                        path={'/wallet/detail'}
                        element={
                            <PageLayout menuName={'detail'}>
                                <CardDetail />
                            </PageLayout>
                        }
                    />
                    <Route
                        path={'/wallet/detail/refund'}
                        element={
                            <PageLayout menuName={'refund'}>
                                <Refund />
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

                    <Route
                        path={'/kiosk'}
                        element={
                            <PageLayout menuName={'kiosk'}>
                                <Kiosk />
                            </PageLayout>
                        }
                    />

                    <Route
                        path={'/login'}
                        element={
                            <FirstPage>
                                <Login />
                            </FirstPage>
                        }
                    />
                    <Route
                        path={'/wallet/conversion'}
                        element={
                            <PageLayout menuName={'Conversion'}>
                                <Conversion />
                            </PageLayout>
                        }
                    />
                    <Route
                        path={'/mypage/review'}
                        element={
                            <PageLayout menuName={'My Reviews'}>
                                <MyReviews />
                            </PageLayout>
                        }
                    />

                    <Route
                        path={'/home/currency'}
                        element={
                            <PageLayout menuName={'Currency Converter'}>
                                <CurrencyConverter />
                            </PageLayout>
                        }
                    />
                </Routes>
            </Router>
        </AllStateContext.Provider>
    );
}

export default App;
