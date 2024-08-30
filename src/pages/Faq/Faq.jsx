import { Typography, Box, TextField, IconButton, Card } from '@mui/material';
import FaqList from './component/FaqList';

const Faq = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100vh',
                paddingBottom: '70px',
                backgroundColor: '#f0f4f8',
                alignItems: 'center',
                overflow: 'auto',
                maxHeight: 'calc(100vh - 70px)',
            }}
        >
            <FaqList />
        </Box>
    );
};

export default Faq;
