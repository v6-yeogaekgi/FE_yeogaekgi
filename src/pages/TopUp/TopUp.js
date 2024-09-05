import * as React from 'react';
import { useLocation } from 'react-router';
import UserCardOnDetail from '../../components/UserCardOnDetail/UserCardOnDetail';
import Box from '@mui/material/Box';
import TopUpInput from './components/TopUpInput';
import { useContext } from 'react';
import { AllStateContext } from '../../App';
import UserCardOnRefund from '../../components/UserCardOnRefund/UserCardOnRefund';

export default function TopUp({ data }) {
    // console.log("top up page 확인");
    const location = useLocation();
    const cardData = location.state?.data;
    const { protocol } = useContext(AllStateContext);

    if (!cardData) {
        return <div>Card data not found</div>;
    }

    const memberData = {
        member_no: 1,
        bank: 'SBI SHINSEI BANK, LIMITED',
        account_number: '1234-567-890123',
        code: 'JP',
    };

    return (
        <>
            <Box
                sx={{
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    position: 'relative', //
                    overflow: 'hidden', //
                    // paddingBottom: '70px',
                }}
            >
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
                        marginBottom: '30px',
                    }}
                >
                    <UserCardOnRefund data={cardData} />
                </Box>
                <Box
                    sx={{
                        bottom: 0,
                        left: 0,
                        right: 0,
                        flexGrow: 1,
                    }}
                >
                    <TopUpInput cardData={cardData} memberData={memberData} />
                </Box>
            </Box>
        </>
    );
}
