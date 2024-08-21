import Box from '@mui/material/Box';
import UserCardOnDetail from '../../components/UserCardOnDetail/UserCardOnDetail';
import * as React from 'react';
import { useState } from 'react';
import { useLocation } from 'react-router';
import UserCardOnRefund from '../../components/UserCardOnRefund/UserCardOnRefund';
import { Accordion, AccordionDetails, AccordionSummary, Grid, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Checkbox from '@mui/material/Checkbox';
import BasicButton from '../../components/BasicButton/BasicButton';

export default function Refund() {

    const [paymentType, setPaymentType] = useState(0);
    const location = useLocation();
    const data = location.state?.data;
    const fee = 3000;

    const [isAgreed, setIsAgreed] = useState(false);
    const [expanded, setExpanded] = useState(false);

    const handleAgreeChange = (event) => {
        setIsAgreed(event.target.checked);
    };

    const handleAccordionChange = (event, isExpanded) => {
        setExpanded(isExpanded);
    };
    
    // 로그인된 정보를 활용해서 가져오기 user 정보 가져오기
    
    //{
    //                     user_card_no: 0,
    //                     card_name: '예시 카드 1',
    //                     design: '디자인 예시',
    //                     payBalance: 10000,
    //                     transit_balance: 5000,
    //                     status: 1,
    //                     starred: 1,
    //                     exp_date: new Date(),
    //                 }


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
                    <div style={{ width : '100%' }}>
                        <Grid container spacing={2} sx={{maxWidth: '100%', margin: 'auto', paddingTop: '20px'}}>
                            <Grid item xs={12}>
                                <Typography component="h1" variant="h5">잔액 <b>{data.payBalance.toLocaleString()} ₩</b></Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography component="h1" variant="h5">수수료 <b>{fee.toLocaleString()} ₩</b></Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography component="h1" variant="h5"><b>{(data.payBalance-fee).toLocaleString()} ₩</b></Typography>
                            </Grid>
                            <Grid item xs={9}>
                                {/* 환율 API 적용 */}
                                <Typography>최종 환급 금액</Typography>
                            </Grid>
                            <Grid item xs={3}>
                                <Typography>000,000 ¥</Typography>
                            </Grid>
                        </Grid>

                        <Grid container spacing={2} sx={{maxWidth: '100%', margin: 'auto', paddingTop : '20px'}}>
                            <Grid item xs={12} sx={{ bgcolor: '#f5f5f5', padding: '15px', marginBottom: '15px', borderRadius: '15px' }}>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>이름</Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="body1" sx={{ marginTop: '5px' }}>홍길동</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid item xs={12} sx={{ bgcolor: '#f5f5f5', padding: '15px', marginBottom: '15px', borderRadius: '15px' }}>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>은행명</Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="body1" sx={{ marginTop: '5px' }}>OO은행</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid item xs={12} sx={{ bgcolor: '#f5f5f5', padding: '15px', marginBottom: '15px', borderRadius: '15px' }}>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>계좌번호</Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="body1" sx={{ marginTop: '5px' }}>0000 - 0000 - 0000 - 0000</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid item xs={12} sx={{ padding: '0 !important' , marginBottom: '15px', borderRadius: '15px'}}>
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
                                                marginRight: '10px'
                                            },
                                            padding: '15px',
                                            '& .MuiAccordionSummary-content': {
                                                margin: '0 !important',
                                            }
                                        }}
                                    >
                                        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                            <Checkbox
                                                checked={isAgreed}
                                                onChange={handleAgreeChange}
                                                onClick={(event) => event.stopPropagation()}
                                                onFocus={(event) => event.stopPropagation()}
                                            />
                                            <Typography>약관 동의 </Typography>
                                        </Box>
                                    </AccordionSummary>
                                    <AccordionDetails sx={{ padding: '15px' }}>
                                        <Typography>
                                            약관 내용 <br></br>
                                            약관 내용 <br></br>
                                            약관 내용 <br></br>
                                            약관 내용 <br></br>
                                            약관 내용 <br></br>
                                            약관 내용 <br></br>
                                            약관 내용 <br></br>
                                            약관 내용 <br></br>
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                            </Grid>

                            <Grid item xs={12} sx={{ padding: '15px', marginBottom: '15px' }}>
                                <Typography variant={'subtitle1'}>예상 환급 소요일</Typography>
                                <Typography variant={'h5'}>3일</Typography>
                            </Grid>

                        </Grid>

                        <BasicButton
                            variant={'contained'}
                            text={'신청하기'}
                            width={'100%'}
                            size={'medium'}
                        ></BasicButton>
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