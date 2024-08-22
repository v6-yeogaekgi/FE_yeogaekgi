import * as React from 'react';
import { useLocation } from 'react-router';
import UserCardOnDetail from '../../components/UserCardOnDetail/UserCardOnDetail';
import Box from '@mui/material/Box';
import { useState } from 'react';
import PaymentHistory from '../../components/PaymentHistory/PaymentHistory';


export default function CardDetail(props) {

    const [paymentType, setPaymentType] = useState(0);
    const location = useLocation();
    const cardData = location.state?.cardData;

    const handleSwitchChange = (event) => {
        setPaymentType(event.target.checked ? 0 : 1);
    };

    if (!cardData) {
        return <div>Card data not found</div>;
    }

    return (
        <>
            <Box sx={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative', //
                overflow: 'hidden', //
                // paddingBottom: '70px',
            }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        width: '90%',
                        margin: '0 auto',
                        gap: 2,
                        paddingTop: '20px',
                        flexGrow: 1,
                        marginBottom: '150px',
                    }}
                >
                    <UserCardOnDetail data={cardData} />
                </Box>
                <Box sx={{
                    bottom: 0,
                    left: 0,
                    right: 0,
                    flexGrow: 1,
                }}>
                    <PaymentHistory cardData={cardData} paymentType={paymentType} onSwitchChange={handleSwitchChange} />
                </Box>
            </Box>

        </>
    );
}