import {
    Card,
    CardMedia,
    Box,
    Typography,
    Button,
    TextField,
    IconButton,
    Grid,
} from '@mui/material';
import { ArrowBack, SwapVert, ArrowForward, Clear } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import * as React from 'react';
import { useState, useContext } from 'react';
import { useLocation } from 'react-router';
import cardImg from '../../img/Design.png';
import axios from 'axios';
import { AllStateContext } from '../../App';

const StyledTextField = styled(TextField)({
    '& .MuiInputBase-input': {
        textAlign: 'right',
    },
});

export default function Conversion({ data }) {
    const location = useLocation();
    const cardData = location.state?.data;
    const { payBalance, transitBalance, userCardId } = cardData;
    // console.log(payBalance);
    const { protocol, token } = useContext(AllStateContext);
    const conversionUrl = protocol + 'transaction/conversion';
    const [transferType, setTransferType] = useState(0);
    console.log(transferType);
    const [leftSide, setLeftSide] = useState({
        label: 'Pay',
        balance: payBalance,
    });
    const [rightSide, setRightSide] = useState({
        label: 'Transit',
        balance: transitBalance,
    });
    const [transferAmount, setTransferAmount] = useState('0');

    const handleSwitch = () => {
        setTransferType(1);
        setLeftSide(rightSide);
        setRightSide(leftSide);
    };
    const handleTransfer = () => {
        alert(
            `Transferring ${transferAmount}₩ from ${leftSide.label} to ${rightSide.label}`,
        );
        axios.post(
            conversionUrl,
            {
                krwAmount: transferAmount,
                transferType: transferType,
                userCardNo: userCardId,
            },
            {
                headers: {
                    Authorization: token,
                    'Content-Type': 'application/json',
                },
            },
        );
    };
    return (
        <>
            <Box
                sx={{
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    paddingBottom: '75px', //
                    position: 'relative', //
                    overflow: 'hidden', //
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
                        paddingBottom: '150px', // 하단 여백 추가
                    }}
                >
                    <Box maxWidth="sm">
                        <Card
                            sx={{
                                mx: 'auto',
                                width: 160,
                                height: 280,
                                borderRadius: 2,
                            }}
                        >
                            <CardMedia
                                sx={{ widht: '100%', height: '100%' }}
                                component="img"
                                image={cardImg}
                                alt="Card Design"
                            />
                        </Card>

                        <Grid
                            container
                            spacing={2}
                            alignItems="center"
                            sx={{ mb: 2, mt: 2 }}
                        >
                            <Grid item xs={5}>
                                <Typography>{leftSide.label}</Typography>
                                <StyledTextField
                                    fullWidth
                                    variant="outlined"
                                    value={
                                        leftSide.balance - Number(transferAmount) >= 0 
                                        ? leftSide.balance - Number(transferAmount) 
                                        : (setTransferAmount(''), leftSide.balance)
                                    }
                                    InputProps={{ readOnly: true }}
                                />
                            </Grid>
                            <Grid
                                item
                                xs={2}
                                sx={{ textAlign: 'center', mt: 3 }}
                            >
                                <ArrowForward />
                            </Grid>
                            <Grid item xs={5}>
                                <Typography>{rightSide.label}</Typography>
                                <StyledTextField
                                    fullWidth
                                    variant="outlined"
                                    value={
                                        rightSide.balance +
                                        Number(transferAmount)
                                    }
                                    InputProps={{ readOnly: true }}
                                />
                            </Grid>
                        </Grid>

                        <Button
                            fullWidth
                            variant="outlined"
                            startIcon={<SwapVert />}
                            onClick={handleSwitch}
                            sx={{ mb: 2, mt: 1 }}
                        >
                            Switch
                        </Button>

                        <Box sx={{ display: 'flex', mb: 2, mt: 1 }}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                type="number"
                                value={transferAmount}
                                onChange={(e) =>
                                    setTransferAmount(e.target.value)
                                }
                                placeholder="0"
                            />
                            <IconButton
                                onClick={() => setTransferAmount('')}
                                sx={{ ml: -5, zIndex: 1 }}
                            >
                                <Clear />
                            </IconButton>
                        </Box>

                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={handleTransfer}
                            sx={{ mt: 2 }}
                        >
                            Transfer
                        </Button>
                    </Box>
                </Box>
            </Box>
        </>
    );
}
