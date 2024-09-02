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
import { getExchangeRate, convertCurrency } from '../ExchangeRateManager/ExchangeRateManager';
import BasicButton from '../BasicButton/BasicButton';
import { useNavigate } from 'react-router-dom';
import { AllStateContext } from '../../App';
import axios from 'axios';
import useConfirmDialog from '../../hooks/useConfirmDialog/useConfirmDialog';

export default function TopUpInput({ cardData }) {
    const navigate = useNavigate();
    const { userCardId } = cardData;
    const [userData, setUserData] = useState(null);

    // console.log("topup input userData: ", userData);

    const { protocol } = useContext(AllStateContext);
    const token = localStorage.getItem('token');
    const topupUrl = protocol + 'transaction/toptup';
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [krwAmount, setKrwAmount] = useState(0);
    const [foreignAmount, setForeignAmount] = useState(0);
    const [currency, setCurrency] = useState();
    const { openConfirmDialog, ConfirmDialog } = useConfirmDialog();

    useEffect(() => {
        const storedRates = getExchangeRate();
        console.log(storedRates);
        const userString = localStorage.getItem('user');
        const user = JSON.parse(userString);
        if (user && storedRates) {
            try {
                console.log(user);
                setUserData(user);
                if (user.country.code === 'US') {
                    setCurrency({
                        id: 0,
                        code: 'USD',
                        locales: 'en-US',
                        flag: getCountryImgById('US'),
                        rate: (1 / storedRates.KRW) * storedRates.USD,
                    });
                } else if (user.country.code === 'JP') {
                    setCurrency({
                        id: 1,
                        code: 'JPY',
                        locales: 'ja-JP',
                        flag: getCountryImgById('JP'),
                        rate: (1 / storedRates.KRW) * storedRates.JPY,
                    });
                } else if (user.country.code === 'CN') {
                    setCurrency({
                        id: 2,
                        code: 'CNY',
                        locales: 'zh-CN',
                        flag: getCountryImgById('CN'),
                        rate: (1 / storedRates.KRW) * storedRates.CNY,
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
        if (krInput === '') {
            setKrwAmount(0);
            setForeignAmount(0);
        } else {
            let cleanKrVal = parseFloat(krInput.replace(/[^0-9.,-]/g, '').replace(/,/g, ''));

            // If parseFloat returns NaN, set the value to 0
            if (isNaN(cleanKrVal)) {
                cleanKrVal = 0;
            }

            let frOutput = cleanKrVal * currency.rate;
            setKrwAmount(cleanKrVal);
            setForeignAmount(frOutput);
        }
    };

    const onClickClearIcon = (e) => {
        setKrwAmount(0);
        setForeignAmount(0);
    };

    const openDrawer = () => {
        setDrawerOpen(true);
    };

    const closeDrawer = () => {
        setDrawerOpen(false);
    };

    const onClickTopUp = () => {
        const currencyType = currency.id;
        axios
            .post(
                topupUrl,
                {
                    krwAmount: krwAmount,
                    currencyType: currencyType,
                    userCardNo: userCardId,
                    foreignAmount: foreignAmount,
                },
                {
                    headers: {
                        Authorization: token,
                        'Content-Type': 'application/json',
                    },
                },
            )
            .then(function(res) {
                console.log(res);
                if (res.ok) {
                    navigate('/wallet/detail', { state: { cardData } });
                }
            })
            .catch(function(error) {
                console.log('axios error');
            })
            .then(function() {
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
                    value={foreignAmount.toLocaleString(currency.locales, {
                        style: 'currency',
                        currency: currency.code,
                    })}
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
                    value={krwAmount.toLocaleString('ko-KR', { style: 'currency', currency: 'KRW' })}
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
                    onClick={openConfirmDialog}
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

            <ConfirmDialog
                title={'Top Up'}
                content={'Are you sure you want to top up '+ krwAmount + 'won?'}
                onAgree={
                    () => {
                        onClickTopUp();
                    }
                }
            />
        </>
    );
}
