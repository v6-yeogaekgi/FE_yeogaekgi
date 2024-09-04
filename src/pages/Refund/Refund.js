import Box from '@mui/material/Box';
import UserCardOnDetail from '../../components/UserCardOnDetail/UserCardOnDetail';
import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import UserCardOnRefund from '../../components/UserCardOnRefund/UserCardOnRefund';
import { Accordion, AccordionDetails, AccordionSummary, Grid, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Checkbox from '@mui/material/Checkbox';
import BasicButton from '../../components/BasicButton/BasicButton';
import axios from 'axios';
import { AllStateContext } from '../../App';
import { useNavigate } from 'react-router-dom';
import useAlertDialog from '../../hooks/useAlertDialog/useAlertDialog';
import { convertCurrency } from '../../components/ExchangeRateManager/ExchangeRateManager';
import useConfirmDialog from '../../hooks/useConfirmDialog/useConfirmDialog';

export default function Refund() {

    const [paymentType, setPaymentType] = useState(0);
    const [memberData, setMemberData] = useState(null);
    const [isAgreed, setIsAgreed] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const { openAlertDialog, AlertDialog } = useAlertDialog();
    const [alertContent, setAlertContent] = useState('');

    const navigate = useNavigate();

    const { protocol } = useContext(AllStateContext);
    const token = localStorage.getItem('token');
    const uri = protocol + 'transaction/refund';

    const location = useLocation();
    const data = location.state?.data;
    const fee = 3000;

    const { openConfirmDialog, ConfirmDialog } = useConfirmDialog();

    function getMemberCode() {
        return memberData.country.code;
    }

    function filterCurrency() {
        const memberCode = getMemberCode();
        if (memberCode === 'KR') return 'KRW';
        if (memberCode === 'US') return 'USD';
        if (memberCode === 'JP') return 'JPY';
        if (memberCode === 'CN') return 'CNY';
        return null;
    }

    function filterToFixed() {
        if (getMemberCode() === 'KR') return 0;
        return 2;
    }

    function filterCurrencySymbol() {
        if (getMemberCode() === 'US') return '$';
        if (getMemberCode() === 'KR') return '₩';
        if (getMemberCode() === 'JP') return '￥';
        if (getMemberCode() === 'CN') return '￥';
        return null;
    }

    function getCurrencyType(){
        if (getMemberCode() === 'US') return 0;
        if (getMemberCode() === 'JP') return 1;
        if (getMemberCode() === 'CN') return 2;
        if (getMemberCode() === 'KR') return 3;
    }

    useEffect(() => {
        const getUser = localStorage.getItem('member');
        if (getUser) {
            try {
                setMemberData(JSON.parse(getUser));
            } catch (e) {
                console.error('Failed to parse member data from localStorage', e);
            }
        }
    }, []);

    if (!memberData) {
        // 데이터가 아직 로드되지 않았을 때 로딩 메시지 표시
        return <Typography>Loading...</Typography>;
    }

    const handleAgreeChange = (event) => {
        setIsAgreed(event.target.checked);
    };

    const handleAccordionChange = (event, isExpanded) => {
        setExpanded(isExpanded);
    };

    const handleRefundClick = () => {
        if (!isAgreed) {
            setAlertContent('Please review and agree to the terms and conditions to proceed.');
            openAlertDialog();
            return;
        }


        if (data.payBalance < 3000) {
            setAlertContent('The remaining card balance is less than the processing fee. Please check your balance and try again.');
            openAlertDialog();
            return;
        }

        doRefund();
    };

    const doRefund = () => {
        axios
            .post(uri,
                {
                    userCardNo: data.userCardId,
                    foreignAmount: convertCurrency(
                        (data.payBalance - fee),
                        'KRW',
                        filterCurrency(),
                    ),
                    currencyType: getCurrencyType(),
                },
                {
                    headers: {
                        Authorization: token,
                        'Content-Type': 'application/json',
                    },
                },
            )
            .then((res) => {
                navigate('/wallet/detail', { state: { cardData: data } });
            })
            .catch((err) => {
                console.error('API 요청 중 오류 발생:', err);
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
                    alignItems: 'center', // 이 줄을 추가
                    position: 'relative', //
                    overflow: 'hidden', //
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        width: '95%',
                        margin: '0 auto',
                        gap: 2,
                        paddingTop: '20px',
                        flexGrow: 1,
                        marginBottom: '150px',
                    }}
                >
                    <UserCardOnRefund data={data} />
                    <div style={{
                        width: '100%',
                        backgroundColor: 'white',
                        padding: '10px',
                        borderRadius: '15px',
                    }}>
                        <Grid container spacing={2} sx={{ width: '100%', margin: 'auto', paddingTop: '20px' }}>
                            <Grid item xs={12}>
                                <Typography component="h1"
                                            variant="h5">Balance <b>₩{data.payBalance > fee ? fee.toLocaleString() : 0} </b></Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography component="h1" variant="h5">Fee <b>₩{fee.toLocaleString()}</b></Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography component="h1"
                                            variant="h5"><b>₩{(data.payBalance - fee) < 0 ? 0 : (data.payBalance - fee).toLocaleString()}</b></Typography>
                            </Grid>
                            <Grid item xs={9}>
                                <Typography>{memberData.code}</Typography>
                                <Typography>Refund Amount</Typography>
                            </Grid>
                            <Grid item xs={3}>
                                <Typography>
                                    {filterCurrencySymbol()}{
                                    convertCurrency(
                                        (data.payBalance - fee) < 0 ? 0 : ((data.payBalance - fee)),
                                        'KRW',
                                        filterCurrency(),
                                    ).toFixed(filterToFixed())
                                }
                                    {/*{(data.payBalance - fee) < 0 ? 0 :((data.payBalance - fee)/10).toLocaleString()}*/}
                                </Typography>
                            </Grid>
                        </Grid>

                        <Grid container spacing={2} sx={{ maxWidth: '100%', margin: 'auto', paddingTop: '20px' }}>
                            <Grid item xs={12} sx={{
                                bgcolor: '#f5f5f5',
                                padding: '15px',
                                marginBottom: '15px',
                                borderRadius: '15px',
                            }}>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>name</Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="body1"
                                                    sx={{ marginTop: '5px' }}>{memberData.name ? memberData.name : 'Hong Gil-dong'}</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid item xs={12} sx={{
                                bgcolor: '#f5f5f5',
                                padding: '15px',
                                marginBottom: '15px',
                                borderRadius: '15px',
                            }}>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Bank
                                            Name</Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="body1"
                                                    sx={{ marginTop: '5px' }}>{memberData.bank}</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid item xs={12} sx={{
                                bgcolor: '#f5f5f5',
                                padding: '15px',
                                marginBottom: '15px',
                                borderRadius: '15px',
                            }}>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Bank
                                            Account</Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="body1"
                                                    sx={{ marginTop: '5px' }}>{memberData.accountNumber}</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid item xs={12}
                                  sx={{ padding: '0 !important', marginBottom: '15px', borderRadius: '15px' }}>
                                <Accordion
                                    expanded={expanded}
                                    onChange={handleAccordionChange}
                                    sx={{
                                        width: '100%',
                                        margin: '0 !important',
                                        bgcolor: '#f5f5f5',
                                        '&:before': {
                                            display: 'none',
                                        },
                                        boxShadow: 'none',
                                        borderRadius: '15px',
                                    }}
                                >
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                        sx={{
                                            flexDirection: 'row',
                                            '& .MuiAccordionSummary-expandIconWrapper': {
                                                marginRight: '10px',
                                            },
                                            padding: '15px',
                                            '& .MuiAccordionSummary-content': {
                                                margin: '0 !important',
                                            },
                                        }}
                                    >
                                        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                            <Checkbox
                                                checked={isAgreed}
                                                onChange={handleAgreeChange}
                                                onClick={(event) => event.stopPropagation()}
                                                onFocus={(event) => event.stopPropagation()}
                                            />
                                            <Typography> I agree to the above terms </Typography>
                                        </Box>
                                    </AccordionSummary>
                                    <AccordionDetails sx={{ padding: '15px'}}>
                                        <Typography sx={{fontSize:'12px'}}>
                                            At Yeogaekgi, we are committed to ensuring a transparent and straightforward refund process for our prepaid card services. Please read our refund policy carefully to understand your rights and obligations regarding the refund of unused card balances.
                                        </Typography>
                                        <Typography sx={{ marginTop: '10px', fontSize:'15px'}}>
                                            1. Eligibility for Refunds
                                        </Typography>
                                        <Typography sx={{fontSize:'12px'}}>
                                            Refunds are available for the unused balance on your prepaid card under the following conditions:
                                        </Typography>
                                        <Typography sx={{fontSize:'12px'}}>
                                            • The remaining balance on the card is above the minimum refundable amount of 3,000 KRW.
                                        </Typography>
                                        <Typography sx={{fontSize:'12px'}}>
                                            • The prepaid card is active and has not expired.
                                        </Typography>
                                        <Typography sx={{fontSize:'12px'}}>
                                            • The refund request is made by the registered cardholder.
                                        </Typography>
                                        <Typography sx={{fontSize:'12px'}}>
                                            Please note that if the remaining balance is below the minimum refundable amount, a refund may not be processed.
                                        </Typography>
                                        <Typography sx={{ marginTop: '10px', fontSize:'15px'}}>
                                            2. Refund Request Process
                                        </Typography>
                                        <Typography sx={{fontSize:'12px'}}>
                                            To request a refund of the remaining balance on your prepaid card:
                                        </Typography>
                                        <Typography sx={{fontSize:'12px'}}>
                                            1. Contact our customer service team via our official website or customer service email.
                                        </Typography>
                                        <Typography sx={{fontSize:'12px'}}>
                                            2. Provide the necessary information, including your full name, contact information, prepaid card number, and the reason for the refund request.
                                        </Typography>
                                        <Typography sx={{fontSize:'12px'}}>
                                            3. Submit a valid identification document to verify your identity as the registered cardholder.
                                        </Typography>
                                        <Typography sx={{ marginTop: '10px', fontSize:'15px'}}>
                                            3. Processing Time
                                        </Typography>
                                        <Typography sx={{fontSize:'12px'}}>
                                            Once we receive your refund request and all required information, we will review the request and provide a response within 3 business days. If the refund is approved, the remaining balance will be processed for a refund.
                                        </Typography>
                                        <Typography sx={{ marginTop: '10px', fontSize:'15px'}}>
                                            4. Refund Fees
                                        </Typography>
                                        <Typography sx={{fontSize:'12px'}}>
                                            A non-refundable processing fee of 3,000 KRW will be deducted from the refundable balance. This fee is applied to cover the administrative costs associated with processing your refund.
                                        </Typography>
                                        <Typography sx={{ marginTop: '10px', fontSize:'15px'}}>
                                            5. Policy Updates
                                        </Typography>
                                        <Typography sx={{fontSize:'12px'}}>
                                            yeogaekgi reserves the right to update or modify this refund policy at any time. Any changes will be posted on our website, and it is the customer's responsibility to review the policy periodically.
                                        </Typography>


                                    </AccordionDetails>
                                </Accordion>
                            </Grid>

                            <Grid item xs={12} sx={{ padding: '15px', marginBottom: '15px' }}>
                                <Typography variant={'subtitle1'}>Estimated Refund Time</Typography>
                                <Typography variant={'h5'}>3days</Typography>
                            </Grid>

                        </Grid>

                        <BasicButton
                            variant={'contained'}
                            text={'Refund'}
                            width={'100%'}
                            size={'medium'}
                            onClick={openConfirmDialog}
                        ></BasicButton>

                        <AlertDialog
                            title={'Can\'t Refund'}
                            content={alertContent}
                        />
                    </div>
                </Box>

                <ConfirmDialog
                    title={"Refund"}
                    content={"Are you sure you want to proceed with the refund"}
                    onAgree={() => {
                        handleRefundClick();
                    }}
                />

                <Box
                    sx={{
                        bottom: 0,
                        left: 0,
                        right: 0,
                        flexGrow: 1,
                    }}
                >
                </Box>
            </Box>
        </>
    );

}