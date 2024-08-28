import { useState, React } from 'react';
import { Typography, Box, TextField, IconButton } from '@mui/material';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import ClearIcon from '@mui/icons-material/Clear';
import { getCountryImgById, getCountryCodeToCurrency } from '../../util';
import { getExchangeRate } from '../../components/ExchangeRateManager/ExchangeRateManager';
const CurrencyConverterForm = () => {
    const [member, setMember] = useState(
        JSON.parse(localStorage.getItem('member')),
    );
    console.log(member);
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
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Box
                    component="img"
                    src={getCountryImgById(member.country.code)}
                    sx={{ width: 24, height: 24, mr: 1 }}
                />
                <Typography>{getCountryCodeToCurrency(member)}</Typography>
            </Box>

            <TextField
                id="forein"
                fullWidth
                placeholder="0"
                value={foreignAmount}
                sx={{ mb: 1 }}
                InputProps={{
                    endAdornment: (
                        <IconButton id="foreinClear" onClick={onClickClearIcon}>
                            <ClearIcon />
                        </IconButton>
                    ),
                }}
                onChange={handleForeingAmountChange}
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
                id="krw"
                fullWidth
                placeholder="0"
                value={krwAmount}
                onChange={handleKrwAmountChange}
                InputProps={{
                    endAdornment: (
                        <IconButton id="krwClear" onClick={onClickClearIcon}>
                            <ClearIcon />
                        </IconButton>
                    ),
                }}
                sx={{ mb: 3 }}
            />
        </>
    );
};

export default CurrencyConverterForm;
