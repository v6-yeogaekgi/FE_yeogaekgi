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
import { useNavigate } from 'react-router-dom';
import BasicButton from '../../components/BasicButton/BasicButton';

const StyledTextField = styled(TextField)({
    '& .MuiInputBase-input': {
        textAlign: 'right',
    },
});

export default function Conversion({ data }) {
    const navigate = useNavigate();
    const location = useLocation();
    const cardData = location.state?.data;
    const { payBalance, transitBalance, userCardId } = cardData;
    // console.log(payBalance);
    const { protocol } = useContext(AllStateContext);
    const token = localStorage.getItem('token');
    const conversionUrl = protocol + 'transaction/conversion';
    const [transferAmount, setTransferAmount] = useState(0);
    const [transferType, setTransferType] = useState(0);
    // console.log(transferType);

    const [leftSide, setLeftSide] = useState({
        label: 'Pay',
        balance: payBalance,
    });
    const [rightSide, setRightSide] = useState({
        label: 'Transit',
        balance: transitBalance,
    });

    React.useEffect(() => {
        if (transferAmount > leftSide.balance) {
            setTransferAmount(leftSide.balance);
        }
    }, [transferAmount, leftSide.balance]);

    const handleTransferAmountChange = (e) => {
        const value = e.target.value;
        if (value === '') {
            setTransferAmount(0);
        } else {
            let cleanVal = parseFloat(
                value.replace(/[^0-9.,-]/g, '').replace(/,/g, ''),
            );
            if (isNaN(cleanVal)) {
                setTransferAmount(0);
            } else {
                setTransferAmount(cleanVal);
            }
        }
    };

    const handleSwitch = () => {
        setTransferType(1);
        setLeftSide(rightSide);
        setRightSide(leftSide);
    };

    const handleTransfer = () => {
        axios
            .post(
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
            )
            .then(function (res) {
                if (res.ok) {
                    console.log('conversion success');
                    navigate('/wallet/detail', { state: { cardData } });
                }
            })
            .catch(function (error) {
                console.log('axios api error');
            })
            .then(function () {
                // always
                navigate('/wallet/detail', { state: { cardData } });
            });
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
                        justifyContent: 'center', // Center the items horizontally and vertically
                        margin: '0 auto',
                        gap: 2,
                        paddingTop: '10px',
                        flexGrow: 1,
                        paddingBottom: '150px',
                    }}
                >
                    <Box maxWidth="sm" alignItems="center">
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
                        {/* ----- 절취선 ----- */}
                        <Box
                            sx={{
                                width: '90%',
                                backgroundColor: 'white',
                                marginLeft: 'calc(6vw)',
                                // paddingLeft: 'calc(60vw - 50%)',
                                paddingRight: 'calc(6vw)',
                                paddingLeft: 'calc(6vw)',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                paddingBottom: '20px',
                                borderRadius: '20px',
                            }}
                        >
                            <Grid
                                container
                                spacing={2}
                                alignItems="center"
                                sx={{ mb: 3, mt: 2 }}
                            >
                                <Grid item xs={5}>
                                    <Typography
                                        variant="subtitle1"
                                        marginBottom="8px"
                                    >
                                        {leftSide.label}
                                    </Typography>
                                    <StyledTextField
                                        fullWidth
                                        variant="outlined"
                                        value={Math.max(
                                            leftSide.balance - transferAmount,
                                            0,
                                        )}
                                        InputProps={{ readOnly: true }}
                                    />
                                </Grid>
                                <Grid
                                    item
                                    xs={2}
                                    sx={{ textAlign: 'center', mt: 5 }}
                                >
                                    <ArrowForward />
                                </Grid>
                                <Grid item xs={5}>
                                    <Typography
                                        variant="subtitle1"
                                        marginBottom="8px"
                                    >
                                        {rightSide.label}
                                    </Typography>
                                    <StyledTextField
                                        fullWidth
                                        variant="outlined"
                                        value={
                                            rightSide.balance + transferAmount
                                        }
                                        InputProps={{ readOnly: true }}
                                    />
                                </Grid>
                            </Grid>

                            <BasicButton
                                variant="contained"
                                text="Switch"
                                startIcon={<SwapVert />}
                                onClick={handleSwitch}                           
                                width="100%"
                                // height=""
                            >
                                Switch
                            </BasicButton>

                            <Box sx={{ display: 'flex', mb: 3, mt: 3 }}>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    type="text"
                                    inputProps={{
                                        inputMode: 'numeric',
                                        pattern: '[0-9]*',
                                    }}
                                    value={transferAmount.toLocaleString('ko-KR',
                                        {
                                            style: 'currency',
                                            currency: 'KRW',
                                        },
                                    )}
                                    onChange={handleTransferAmountChange}
                                    placeholder="0"
                                />
                                <IconButton
                                    onClick={() => setTransferAmount(0)}
                                    sx={{ ml: -5, zIndex: 1 }}
                                >
                                    <Clear />
                                </IconButton>
                            </Box>

                            <BasicButton
                                variant="contained"
                                color="primary"
                                onClick={handleTransfer}
                                text="Transfer"
                                width="100%"
                                // height=""
                                // btnColor="#2e85e0"
                            ></BasicButton>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    );
}
