import { Box } from '@mui/material';
import HomeCardItem from './component/HomeCardItem';
import HomaCardRate from './component/HomeCardRate';
import Footer from '../../layout/Footer/Footer';
import Header from '../../layout/Header/Header';
import links from '../../img/Home_linkbtns.png';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import LocalActivityRoundedIcon from '@mui/icons-material/LocalActivityRounded';
import FoodBankRoundedIcon from '@mui/icons-material/FoodBankRounded';
import PhonelinkRingRoundedIcon from '@mui/icons-material/PhonelinkRingRounded';

import Card from '@mui/material/Card';

const STYLES = {
    pageLayout: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        paddingTop: '64px',
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
        height: 300,
        width: 360,
    },
};

const Home = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/home/currency');
    };

    return (
        <Box sx={STYLES.pageLayout}>
            <Header menuName={'▾ Seoul'} />
            <Box sx={STYLES.contentBox}>
                <Box sx={STYLES.cardContainer}>
                    <HomeCardItem />

                    <Box
                        sx={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '10px',
                            mb: 6,
                            mt: 6,
                        }}
                    >
                        <Card>
                            <Box>
                                <LocalActivityRoundedIcon />
                            </Box>
                            <Box>
                                <FoodBankRoundedIcon />
                            </Box>
                            <Box>
                                <PhonelinkRingRoundedIcon />
                            </Box>
                        </Card>
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
