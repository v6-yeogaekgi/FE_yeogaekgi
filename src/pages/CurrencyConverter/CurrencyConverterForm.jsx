import { useState, React } from 'react';
import { Typography, Box, TextField, IconButton, Card } from '@mui/material';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import ClearIcon from '@mui/icons-material/Clear';
import { getCountryImgById, getCountryCodeToCurrency } from '../../util';
import { getExchangeRate } from '../../components/ExchangeRateManager/ExchangeRateManager';
const CurrencyConverterForm = () => {
    const [member, setMember] = useState(
        JSON.parse(localStorage.getItem('member')),
    );
    const [krwAmount, setKrwAmount] = useState();
    const [foreignAmount, setForeignAmount] = useState();

    const storedRates = getExchangeRate();

    const handleKrwAmountChange = (e) => {
        if (e.currentTarget.id === 'krw') {
            const krInput = e.currentTarget.value;
            setKrwAmount(krInput);
            const rate =
                (1 / storedRates.KRW) *
                storedRates[getCountryCodeToCurrency(member)];
            const foreignAmount = krInput * rate;
            setForeignAmount(foreignAmount);
            console.log(foreignAmount);
        }
    };

    const handleForeingAmountChange = (e) => {
        if (e.currentTarget.id === 'forein') {
            const frInput = e.currentTarget.value;
            setForeignAmount(e.currentTarget.value);
            const rate =
                (1 / storedRates[getCountryCodeToCurrency(member)]) *
                storedRates.KRW;
            const krwAmount = frInput * rate;
            setKrwAmount(krwAmount);
            console.log(krwAmount);
        }
    };

    const onClickClearIcon = (e) => {
        if (e.currentTarget.id === 'krwClear') {
            setKrwAmount('');
        } else {
            setForeignAmount('');
        }
    };

    return (
        <>
            <Card
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: 'auto',
                    width: 360,
                    height: 120,
                    position: 'relative',
                    boxShadow: 'none',
                    borderRadius: 5,
                    overflow: 'hidden',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        mb: 1,
                        height: 40,
                        paddingLeft: 2,
                        paddingRight: 2,
                        backgroundColor: '#2E85E0',
                        borderRadius: '10px 10px 0 0',
                    }}
                >
                    <Box
                        component="img"
                        src={getCountryImgById(member.country.code)}
                        sx={{ width: 24, height: 24, mr: 1 }}
                    />

                    <Typography
                        sx={{
                            fontFamily: 'Noto Sans, sans-serif',
                            fontWeight: 'bold',
                            color: '#fff',
                        }}
                    >
                        {getCountryCodeToCurrency(member)}
                    </Typography>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <TextField
                        id="forein"
                        fullWidth
                        placeholder="0"
                        value={foreignAmount}
                        sx={{
                            mt: 1,
                            borderRadius: 2,
                            width: '340px',
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 2,
                            },
                            '& .MuiInputBase-input': {
                                padding: '10px',
                            },
                        }}
                        InputProps={{
                            endAdornment: (
                                <IconButton
                                    id="foreinClear"
                                    onClick={onClickClearIcon}
                                    sx={{
                                        p: 1,
                                        '& .MuiSvgIcon-root': {
                                            fontSize: 20,
                                            color: '#2E85E0',
                                        },
                                    }}
                                >
                                    <ClearIcon />
                                </IconButton>
                            ),
                        }}
                        onChange={handleForeingAmountChange}
                    />
                </Box>
            </Card>

            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
                <IconButton
                    sx={{
                        mt: 1,
                        color: '#4653f9', // 아이콘 색상 설정
                        pointerEvents: 'none', // 클릭 비활성화
                    }}
                >
                    <SwapVertIcon />
                </IconButton>
            </Box>

            <Card
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: 'auto',
                    width: 360,
                    height: 120,
                    position: 'relative',
                    boxShadow: 'none',
                    borderRadius: 5,
                    overflow: 'hidden',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        mb: 1,
                        height: 40,
                        paddingLeft: 2,
                        paddingRight: 2,
                        backgroundColor: '#2E85E0',
                        borderRadius: '10px 10px 0 0',
                    }}
                >
                    <Box
                        component="img"
                        src={getCountryImgById('KR')}
                        sx={{ width: 24, height: 24, mr: 1 }}
                    />

                    <Typography
                        sx={{
                            fontFamily: 'Noto Sans, sans-serif',
                            fontWeight: 'bold',
                            color: '#fff',
                        }}
                    >
                        KRW
                    </Typography>
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <TextField
                        id="krw"
                        fullWidth
                        placeholder="0"
                        value={krwAmount}
                        sx={{
                            mt: 1,

                            borderRadius: 2,
                            width: '340px',
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 2,
                            },
                            '& .MuiInputBase-input': {
                                padding: '10px',
                            },
                        }}
                        onChange={handleKrwAmountChange}
                        InputProps={{
                            endAdornment: (
                                <IconButton
                                    id="krwClear"
                                    onClick={onClickClearIcon}
                                    sx={{
                                        p: 1,
                                        '& .MuiSvgIcon-root': {
                                            fontSize: 20,
                                            color: '#2E85E0',
                                        },
                                    }}
                                >
                                    <ClearIcon />
                                </IconButton>
                            ),
                        }}
                    />
                </Box>
            </Card>
        </>
    );
};

export default CurrencyConverterForm;
