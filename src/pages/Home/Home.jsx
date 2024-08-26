import { Box } from '@mui/material';
import HomeCardItem from './component/HomeCardItem';
import Footer from '../../layout/Footer/Footer';

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
        overflowY: 'auto',
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
        <Box sx={STYLES.contentBox}>
            <Box sx={STYLES.cardContainer}>
                <HomeCardItem />
            </Box>
        </Box>
        <Footer />
    </Box>
);

export default Home;
