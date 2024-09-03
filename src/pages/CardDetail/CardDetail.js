import * as React from 'react';
import { useLocation } from 'react-router';
import UserCardOnDetail from '../../components/UserCardOnDetail/UserCardOnDetail';
import Box from '@mui/material/Box';
import { useContext, useState } from 'react';
import PaymentHistory from '../../components/PaymentHistory/PaymentHistory';
import axios from 'axios';
import { AllStateContext } from '../../App';

export default function CardDetail(props) {
    const [paymentType, setPaymentType] = useState(0);
    const location = useLocation();
    const userCardId = location.state?.cardData.userCardId;
    const [cardData, setCardData] = useState();
    const { protocol} = useContext(AllStateContext);
    const token = localStorage.getItem('token');

    const handleSwitchChange = (event) => {
        setPaymentType(event.target.checked ? 0 : 1);
    };

    const uri = protocol + 'usercard/' + userCardId;

    const getApi = () => {
        axios
            .get(uri,
                {
                    headers: {
                        Authorization: token,
                        'Content-Type': 'application/json',
                    },
                },
            )
            .then((res) => {
                setCardData({
                    userCardId: res.data.userCardId,
                    expiryDate: res.data.expiryDate,
                    payBalance: res.data.payBalance,
                    transitBalance: res.data.transitBalance,
                    starred: res.data.starred,
                    status: res.data.status,
                    cardId: res.data.cardId,
                    design: res.data.design,
                    area: res.data.area,
                    cardName: res.data.cardName,
                    memberId: res.data.memberId,
                });
            })
            .catch((err) => {
                console.error('API 요청 중 오류 발생:', err);
            });
    };

    React.useEffect(() => {
        getApi(userCardId);
    }, []);

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
                position: 'relative',
                overflow: 'hidden',
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
                        marginBottom: '30px',
                    }}
                >
                    <UserCardOnDetail
                        initialData={cardData} />
                </Box>
                <PaymentHistory cardData={cardData} paymentType={paymentType} onSwitchChange={handleSwitchChange} />
            </Box>
        </>
    );
}