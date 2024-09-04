import * as React from 'react';
import { useLocation } from 'react-router';
import UserCardOnDetail from '../../components/UserCardOnDetail/UserCardOnDetail';
import Box from '@mui/material/Box';
import { useContext, useState } from 'react';
import PaymentHistory from '../../components/PaymentHistory/PaymentHistory';
import axios from 'axios';
import { AllStateContext } from '../../App';
import { CircularProgress } from '@mui/material';

export default function CardDetail(props) {
    const [paymentType, setPaymentType] = useState(0);
    const location = useLocation();
    const userCardId = location.state?.cardData.userCardId;
    const [cardData, setCardData] = useState();
    const { protocol} = useContext(AllStateContext);
    const token = localStorage.getItem('token');
    const [loading, setLoading] = useState(false);

    const handleSwitchChange = (event) => {
        setPaymentType(event.target.checked ? 0 : 1);
    };

    const uri = protocol + 'usercard/' + userCardId;

    const getApi = () => {
        setLoading(true);
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
            }).finally(() => {
            setLoading(false);
        });
    };

    React.useEffect(() => {
        getApi(userCardId);
    }, []);

    if (!cardData) {
        return (
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    zIndex: 1,
                }}
            >
                <CircularProgress sx={{ color: '#4653f9' }} />
            </Box>
        );
    }

    return (
        <>
            <Box sx={{
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
                        minHeight: '320px',
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