import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import {
    Box,
    Typography,
    TextField,
    Divider,
    IconButton,
    Drawer,
    Grid,
} from '@mui/material';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import ClearIcon from '@mui/icons-material/Clear';
import { getCountryImgById } from '../../util';

import BasicButton from '../BasicButton/BasicButton';
import { useNavigate } from 'react-router-dom';
import { AllStateContext } from '../../App';
import axios from 'axios';

export default function TopUpInput({ cardData }) {
    const navigate = useNavigate();
    const { userCardId } = cardData;
    const [userData, setUserData] = useState(null);
    // const [data, setData] = useState(null);
    const { protocol, token } = useContext(AllStateContext);
    const topupUrl = protocol + 'transaction/toptup';
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [krwAmount, setKrwAmount] = useState();
    const [foreignAmount, setForeignAmount] = useState();
    const [currency, setCurrency] = useState({
        code: 'JPY',
        flag: getCountryImgById('JP'),
        rate: 0.108,
    });

    useEffect(() => {
        const userString = localStorage.getItem('user');
        const user = JSON.parse(userString);
        if (user) {
            try {
                console.log(user);
                setUserData(user);
                if (user.country.code === 'US') {
                    setCurrency({
                        code: 'USD',
                        flag: getCountryImgById('US'),
                        rate: 0.00075,
                    });
                } else if (user.country.code === 'JP') {
                    setCurrency({
                        code: 'JPY',
                        flag: getCountryImgById('JP'),
                        rate: 0.108,
                    });
                } else if (user.country.code === 'CN') {
                    setCurrency({
                        code: 'CNY',
                        flag: getCountryImgById('CN'),
                        rate: 0.0053,
                    });
                } else {
                    console.log('user country unknown');
                }
            } catch (e) {
                console.error(
                    'Failed to parse member data from localStorage',
                    e,
                );
            }
        }
    }, []);

    if (!userData) {
        // 데이터가 아직 로드되지 않았을 때 로딩 메시지 표시
        return <Typography>Loading...</Typography>;
    }

    const handleKrwAmountChange = (e) => {
        let krInput = e.target.value;
        let frOutput = krInput * currency.rate;
        setKrwAmount(krInput);
        setForeignAmount(frOutput.toFixed(2));
    };

    const onClickClearIcon = (e) => {
        setKrwAmount('');
        setForeignAmount('');
    };

    const openDrawer = () => {
        setDrawerOpen(true);
    };

    const closeDrawer = () => {
        setDrawerOpen(false);
    };

    const onClickTopUp = () => {
        axios
            .post(
                topupUrl,
                {
                    krwAmount: Number(krwAmount),
                    currencyType: 1,
                    userCardNo: userCardId,
                    foreignAmount: Number(foreignAmount),
                },
                {
                    headers: {
                        Authorization: token,
                        'Content-Type': 'application/json',
                    },
                },
            )
            .then(function (res) {
                console.log(res);
                if (res.ok) {
                    navigate('/wallet/detail', { state: { cardData } });
                }
            })
            .catch(function (error) {
                console.log('axios error');
            })
            .then(function () {
                // always
                navigate('/wallet/detail', { state: { cardData } });
            });
    };

    return (
        <>
            <Box sx={{ p: 2, backgroundColor: 'white' }}>
                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                    {userData.bank}
                </Typography>
                <TextField
                    fullWidth
                    value={userData.accountNumber}
                    InputProps={{
                        readOnly: true,
                    }}
                    sx={{ mb: 3 }}
                />

                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                    충전 금액
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Box
                        component="img"
                        src={currency.flag}
                        alt={currency.code}
                        sx={{ width: 24, height: 24, mr: 1 }}
                    />
                    <Typography>{currency.code}</Typography>
                </Box>

                <TextField
                    fullWidth
                    placeholder="0"
                    value={foreignAmount}
                    InputProps={{
                        readOnly: true,
                    }}
                    sx={{ mb: 1 }}
                />

                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
                    <IconButton>
                        <SwapVertIcon />
                    </IconButton>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Box
                        component="img"
                        src={getCountryImgById('KR')}
                        alt="KRW"
                        sx={{ width: 24, height: 24, mr: 1 }}
                    />
                    <Typography>KRW</Typography>
                </Box>

                <TextField
                    fullWidth
                    placeholder="0"
                    value={krwAmount}
                    onChange={handleKrwAmountChange}
                    InputProps={{
                        endAdornment: (
                            <IconButton onClick={onClickClearIcon}>
                                <ClearIcon />
                            </IconButton>
                        ),
                    }}
                    sx={{ mb: 3 }}
                />

                <BasicButton
                    text={'Top Up'}
                    variant={'contained'}
                    btnColor={'#4653f9'}
                    width={'100%'}
                    onClick={onClickTopUp}
                ></BasicButton>

                <Divider sx={{ mt: 2, mb: 2 }} />

                <Box
                    onClick={openDrawer}
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <Typography>충전 안내</Typography>
                    <Typography>&gt;</Typography>
                </Box>
            </Box>

            <Drawer
                anchor="bottom"
                open={drawerOpen}
                onClose={closeDrawer}
                PaperProps={{
                    style: {
                        maxWidth: '400px',
                        width: '100%',
                        height: '80%',
                        margin: '0 auto',
                    },
                }}
            >
                <Typography
                    variant="h6"
                    sx={{ padding: 1, fontWeight: 'bold' }}
                >
                    여객기 Terms and Conditions
                </Typography>
                <Divider sx={{ mb: 2, borderBottomWidth: 3 }} />
                <Typography sx={{ whiteSpace: 'pre-wrap', padding: 1 }}>
                    ✅ Notices when topping up with 'Wire Transfer' in the app{' '}
                    <br />
                    <br />※ Wire Transfer can be topped up with a minimum of
                    1,000 won <br />
                    <br />
                    ※ A full refund is available if you request a refund within
                    7 days without using the charged amount. <br />
                    <br />
                    ※ For the amount that has passed 7 days after charging, you
                    can only refund the amount remaining after using more than
                    60% of the final balance. (Excluding Card, Easy payment
                    charging) <br />
                </Typography>
            </Drawer>
        </>
    );
}
