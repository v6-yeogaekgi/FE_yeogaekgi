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

export default function Refund() {

    const [paymentType, setPaymentType] = useState(0);
    const [memberData, setMemberData] = useState(null);
    const [isAgreed, setIsAgreed] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const { openAlertDialog, AlertDialog } = useAlertDialog();
    const [alertContent, setAlertContent] = useState('');

    const navigate = useNavigate();

    const { protocol, token } = useContext(AllStateContext);
    const uri = protocol + 'transaction/refund';

    const location = useLocation();
    const data = location.state?.data;
    const fee = 3000;

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
        if( !isAgreed ){
            setAlertContent('약관 동의 체크    문구');
            openAlertDialog();
            return;
        }


        if (data.payBalance < 3000) {
            setAlertContent('보유 잔액이 수수료보다 적을 시 알리는 문구');
            openAlertDialog();
            return;
        }

        doRefund();
    };

    const doRefund = () => {
        axios
            .post(uri,
                { userCardNo: data.userCardId },
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
                        marginBottom: '150px',
                    }}
                >
                    <UserCardOnRefund data={data} />
                    <div style={{ width: '100%' }}>
                        <Grid container spacing={2} sx={{ maxWidth: '100%', margin: 'auto', paddingTop: '20px' }}>
                            <Grid item xs={12}>
                                <Typography component="h1"
                                            variant="h5">Balance <b>{data.payBalance.toLocaleString()} ₩</b></Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography component="h1" variant="h5">Fee <b>{fee.toLocaleString()} ₩</b></Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography component="h1"
                                            variant="h5"><b>{(data.payBalance - fee).toLocaleString()} ₩</b></Typography>
                            </Grid>
                            <Grid item xs={9}>
                                {/* 환율 API 적용 */}
                                <Typography>Refund Amount</Typography>
                            </Grid>
                            <Grid item xs={3}>
                                <Typography>{((data.payBalance - fee)/10).toLocaleString()}¥</Typography>
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
                                                    sx={{ marginTop: '5px' }}>{memberData.name?memberData.name:'Hong Gil-dong'}</Typography>
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
                                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>은행명</Typography>
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
                                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Bank Account</Typography>
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
                                    <AccordionDetails sx={{ padding: '15px' }}>
                                        <Typography>
                                            terms of service <br></br>
                                            terms of service <br></br>
                                            terms of service <br></br>
                                            terms of service <br></br>
                                            terms of service <br></br>
                                            terms of service <br></br>
                                            terms of service <br></br>
                                            terms of service <br></br>
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
                            onClick={handleRefundClick}
                        ></BasicButton>

                        <AlertDialog
                            title={'open alert test'}
                            content={alertContent}
                        />
                    </div>
                </Box>


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