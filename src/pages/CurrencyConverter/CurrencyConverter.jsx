import CurrencyConverForm from './CurrencyConverterForm';
import { Typography, Box, TextField, IconButton, Card } from '@mui/material';

const CurrencyConverter = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100vh',
                paddingBottom: '70px',
                flexGrow: 1,
                backgroundColor: '#f0f4f8',
                justifyContent: 'center',
                alignItems: 'center',
                transform: 'translateY(-7%)',
                overflow: 'auto',
            }}
        >
            <CurrencyConverForm />
        </Box>
    );
};

export default CurrencyConverter;
