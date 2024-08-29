import { Box } from '@mui/material';
import HomeCardItem from './component/HomeCardItem';
import HomaCardRate from './component/HomeCardRate';
import Footer from '../../layout/Footer/Footer';
import Header from '../../layout/Header/Header';
import links from '../../img/Home_linkbtns.png';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import HomeLink from './component/HomeLink';
import { useContext, useEffect, useState } from 'react';
import { AllStateContext } from '../../App';
import axios from 'axios';

import Card from '@mui/material/Card';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

const STYLES = {
    pageLayout: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        paddingBottom: '70px',
    },
    contentBox: {
        flexGrow: 1,
        backgroundColor: '#f0f4f8',
        display: 'flex',
        justifyContent: 'center',
        padding: 2,
    },
    cardContainer: {
        mt: 2,
        height: 300,
        width: 360,
    },
};

const Home = () => {
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const { protocol } = useContext(AllStateContext);
    const token = localStorage.getItem('token');
    const uri = protocol + 'usercard/list';

    // console.log(data);

    const getApi = () => {
        //toDo 비활성화 카드(status === 0) 맨 아래에서 렌더링 되도록 수정
        axios
            .post(
                uri,
                {},
                {
                    headers: {
                        Authorization: token,
                        'Content-Type': 'application/json',
                    },
                },
            )
            .then((res) => {
                if (Array.isArray(res.data) && res.data.length > 0) {
                    const filteredData = res.data.filter(
                        (item) => item.status !== 2,
                    );
                    const formattedData = filteredData.map((item) => ({
                        userCardId: item.userCardId,
                        expiryDate: item.expiryDate,
                        payBalance: item.payBalance,
                        transitBalance: item.transitBalance,
                        starred: item.starred,
                        status: item.status,
                        cardId: item.cardId,
                        design: item.design,
                        area: item.area,
                        cardName: item.cardName,
                        memberId: item.memberId,
                    }));
                    setData(formattedData);
                }
            })
            .catch((err) => {
                console.error('API 요청 중 오류 발생:', err);
            });
    };

    useEffect(() => {
        getApi();
    }, []);

    const handleClick = () => {
        navigate('/home/currency');
    };

    return (
        <Box sx={STYLES.pageLayout}>
            <Box sx={STYLES.contentBox}>
                <Box sx={STYLES.cardContainer}>
                    <Swiper
                        pagination={{
                            dynamicBullets: true,
                        }}
                        modules={[Pagination]}
                        style={{height: '100%', borderRadius: 25}}
                    >
                        {data &&
                            data.map((cardData, index) => (
                                <SwiperSlide key={index}>
                                    <HomeCardItem data={cardData}/>
                                </SwiperSlide>
                            ))}
                    </Swiper>

                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mb: 3,
                            mt: 3,
                        }}
                    >
                        <HomeLink />
                    </Box>

                    <Box onClick={handleClick}>
                        <HomaCardRate />
                    </Box>
                </Box>
            </Box>
            <Footer />
        </Box>
    );
};

export default Home;
