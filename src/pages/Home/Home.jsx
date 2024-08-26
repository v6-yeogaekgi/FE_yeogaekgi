import { Box } from '@mui/material';
import HomeCardItem from './component/HomeCardItem';
import HomaCardRate from './component/HomeCardRate';
import Footer from '../../layout/Footer/Footer';
import Header from '../../layout/Header/Header'
import links from '../../img/Home_linkbtns.png';
import React from 'react';

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

const Home = () => (
    <Box sx={STYLES.pageLayout}>
        <Header menuName={"▾ Seoul"}/>
        <Box sx={STYLES.contentBox}>
            <Box sx={STYLES.cardContainer}>
                <HomeCardItem />
                <div
                    style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '10px',
                    }}>
                <img
                    src={links}
                    alt="links"
                    style={{
                        width: '90%',
                    }}
                />
                </div>
                <HomaCardRate></HomaCardRate>
            </Box>
        </Box>
        <Footer />
    </Box>
);

export default Home;
