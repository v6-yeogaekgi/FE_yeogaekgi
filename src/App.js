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
import { SelectedProvider } from './pages/Map/provider/SelectedProvider';
import { MapProvider } from './pages/Map/provider/MapProvider';
import CurrencyConverter from './pages/CurrencyConverter/CurrencyConverter';
import useAlertDialog from './hooks/useAlertDialog/useAlertDialog';
import useConfirmDialog from './hooks/useConfirmDialog/useConfirmDialog';
import axios from 'axios';
import MyLikes from './pages/MyLikes/MyLikes';
import Faq from './pages/Faq/Faq';
import Qna from './pages/Qna/Qna';
import QnaDetail from './pages/Qna/QnaDetail';
import QnaRegist from './pages/Qna/QnaRegist';
import QnaEdit from './pages/Qna/QnaEdit';
import { ThemeProvider } from '@mui/material';
import theme from './theme';
import CssBaseline from '@mui/material/CssBaseline';
import WriteReview from './pages/MyReviews/WriteReview';

// cicd test3

const PageLayout = ({ children, menuName, areas }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                paddingTop: '64px', // header 높이만큼 패딩 추가
                paddingBottom: '70px', // Footer 높이만큼 패딩 추가
                height: '844px',
                overflowY: 'auto', // Hide vertical scrolling
                '&::-webkit-scrollbar': {
                    display: 'none', // Hide scrollbar in Webkit browsers
                },
                backgroundColor: menuName === 'Account' ? 'white' : '#f0f4f8',
            }}
        >
            <Header menuName={menuName} areas={areas} />
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
    const areaUrl = protocol + 'usercard/area';
    const [area, setArea] = useState([]);
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

    const getArea = () => {
        axios
            .get(areaUrl)
            .then((res) => {
                if (res) {
                    console.log(res.data);
                    setArea(res.data);
                    const defaultArea = res.data.includes('Seoul')
                        ? 'Seoul'
                        : res.data[0];
                    localStorage.setItem('selectArea', defaultArea);
                }
            })
            .catch((err) => {
                console.error('API 요청 실패:', err);
            });
    };

    useEffect(() => {
        fetchAndStoreExchangeRate();
        getArea();
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AllStateContext.Provider value={{ protocol, dialog }}>
                <Router>
                    <ScrollToTop />
                    <Routes>
                        <Route path={'/'} element={<Login />} />
                        <Route
                            path={'/home'}
                            element={
                                <PageLayout menuName={'Home'} areas={area}>
                                    <HomePage />
                                </PageLayout>
                            }
                        />
                        <Route
                            path={'/wallet'}
                            element={
                                <PageLayout menuName={'Wallet'}>
                                    <Wallet />
                                </PageLayout>
                            }
                        />
                        <Route
                            path={'/map/:activity?'}
                            element={
                                <PageLayout menuName={'map'}>
                                    <MapProvider>
                                        <Map />
                                    </MapProvider>
                                </PageLayout>
                            }
                        />
                        <Route
                            path={
                                '/map/register'
                            }
                            element={
                                <PageLayout menuName={'Map'}>
                                    <SelectedProvider>
                                        <ReviewProvider>
                                            <ReviewRegister />
                                        </ReviewProvider>
                                    </SelectedProvider>
                                </PageLayout>
                            }
                        />
                        <Route
                            path={'/map/edit/:name/:serviceId/:reviewId'}
                            element={
                                <PageLayout menuName={'Map'}>
                                    <SelectedProvider>
                                        <ReviewProvider>
                                            <ReviewEdit />
                                        </ReviewProvider>
                                    </SelectedProvider>
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
                            path={'/community/modify/:postId'}
                            element={
                                <PageLayout menuName={'Community'}>
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
                                <PageLayout menuName={'Edit'}>
                                    <EditComment />
                                </PageLayout>
                            }
                        />
                        <Route
                            path={'/community/imageDetail/:postId'}
                            element={
                                <PageLayout menuName={''}>
                                    <ImageDetail />
                                </PageLayout>
                            }
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
                                <PageLayout menuName={'Detail'}>
                                    <CardDetail />
                                </PageLayout>
                            }
                        />
                        <Route
                            path={'/wallet/detail/refund'}
                            element={
                                <PageLayout menuName={'Refund'}>
                                    <Refund />
                                </PageLayout>
                            }
                        />
                        <Route
                            path={'/wallet/top-up'}
                            element={
                                <PageLayout menuName={'Top Up'}>
                                    <TopUp />
                                </PageLayout>
                            }
                        />

                        <Route
                            path={'/kiosk'}
                            element={
                                <PageLayout menuName={'Kiosk'}>
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
                            path={'/mypage/review/write'}
                            element={
                                <PageLayout menuName={'Recent Visits'}>
                                    <WriteReview />
                                </PageLayout>
                            }
                        />
                        <Route
                            path={'/mypage/likes'}
                            element={
                                <PageLayout menuName={'My Likes'}>
                                    <MyLikes />
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

                        <Route
                            path={'/faq'}
                            element={
                                <PageLayout menuName={'FAQ'}>
                                    <Faq />
                                </PageLayout>
                            }
                        />

                        <Route
                            path={'/qna'}
                            element={
                                <PageLayout menuName={'Q&A'}>
                                    <Qna />
                                </PageLayout>
                            }
                        />
                        <Route
                            path={'/qna/:qnaId'}
                            element={
                                <PageLayout menuName={'Q&A'}>
                                    <QnaDetail />
                                </PageLayout>
                            }
                        />
                        <Route
                            path={'/qna/regist/'}
                            element={
                                <PageLayout menuName={'Q&A'}>
                                    <QnaRegist />
                                </PageLayout>
                            }
                        />
                        <Route
                            path={'/qna/modify/:qnaId'}
                            element={
                                <PageLayout menuName={'Q&A'}>
                                    <QnaEdit />
                                </PageLayout>
                            }
                        />
                    </Routes>
                </Router>
            </AllStateContext.Provider>
        </ThemeProvider>
    );
}

export default App;
