import { useState } from 'react';
import axios from 'axios';
import * as React from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import BasicButton from '../BasicButton/BasicButton';
import CustomizedSwitches from '../CustomizedSwitches/CustomizedSwitches';
import Divider from '@mui/material/Divider';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

// TODO
// 결제내역 pay와 transit의 분리

// TODO
// 월 변경 시 getApi 호출
// getApi의 로직을 '월' 데이터에 따라 받아오도록 재정의

// TODO
// 상세 날짜 추가

// 예상 DTO 구조
// 1.사용자 카드 번호 user_card_no
//     [결제 내역]
// 1.결제 번호
// 1.내역 종류 pay_type (0 : 결제, 1: 교통)
// 1.결제 금액 pay_price
// 1.결제 일자 (월별) pay_date(timestamp)
// 1.결제 상태 status (0: 결제 취소, 1: 결제 완료)
// 1.결제처 service_name
// 1.결제후 페이 잔액 transit_balance_snap
// 1.결제후 교통 잔액 pay_balance_snap
//
// [거래 내역]
// 1.거래 번호
// 1.내역 종류 tran_type (0: 전환 1: 충전 2: 환급)
// 1.거래 일자 (월별) tran_date
// 1.방향 transfer_type (0: 페이에서 교통으로 금액 전환, 1: 교통에서 페이로 금액 전환)
// 1.원화 금액 krw_amount (얼마나 충전, 환급했는지)
// 1.외화 금액 foreign_amount (얼마나 충전, 환급했는지)
// 1.통화 종류 currency_type (0:USD 1:JPY 2:CNY 3:KRW )
// 1.결제후 페이 잔액 transit_balance_snap
// 1.결제후 교통 잔액 pay_balance_snap
//
// 1.결제인지 거래인지[결제면 0 거래면1] type

const PaymentHistory = ({ cardData, paymentType, onSwitchChange }) => {
    // 실제 api 연동되었을 때 -> cardData.user_card_no
    // const userCardNo = cardData.user_card_no;
    const userCardNo = '1';
    const [data, setData] = useState();
    const [currentDate, setCurrentDate] = useState(new Date());
    const [filteredData, setFilteredData] = useState([]);

    const getApi = (userCardNo, year, month) => {
        axios
            .post('https://api.yeogaekgi.site', { params: { userCardNo, year, month } })
            .then((res) => {
                setData(res.data.result.content);
            })
            .catch((err) => {
                console.error('API 요청 중 오류 발생:', err);
                setData(
                    [
                        {
                            user_card_no: '1234567890',
                            type: 0, // 결제
                            pay_type: 0, // 일반 결제
                            pay_price: 15000,
                            pay_no: '123',
                            pay_date: '2024-08-15T10:30:00Z',
                            status: 1, // 결제 완료
                            service_name: '스타벅스',
                            pay_balance_snap: 85000,
                            transit_balance_snap: 10000,
                        },
                        {
                            user_card_no: '1234567890',
                            type: 0, // 결제
                            pay_type: 1, // 교통
                            pay_no: '124',
                            pay_price: 1250,
                            pay_date: '2024-08-15T08:15:00Z',
                            status: 1, // 결제 완료
                            service_name: '서울 지하철',
                            pay_balance_snap: 100000,
                            transit_balance_snap: 8750,
                        },
                        {
                            user_card_no: '1234567890',
                            type: 1, // 거래
                            tran_no: '12345',
                            tran_type: 1, // 충전
                            tran_date: '2024-08-14T14:00:00Z',
                            transfer_type: null, // 충전이므로 해당 없음
                            krw_amount: 50000,
                            foreign_amount: 0,
                            currency_type: 3, // KRW
                            pay_balance_snap: 150000,
                            transit_balance_snap: 8750,
                        },
                        {
                            user_card_no: '1234567890',
                            type: 1, // 거래
                            tran_type: 0, // 전환
                            tran_no: '12346',
                            tran_date: '2024-08-13T11:20:00Z',
                            transfer_type: 0, // 페이에서 교통으로
                            krw_amount: 10000,
                            foreign_amount: 0,
                            currency_type: 3, // KRW
                            pay_balance_snap: 140000,
                            transit_balance_snap: 18750,
                        },
                        {
                            user_card_no: '1234567890',
                            type: 1, // 거래
                            tran_type: 2, // 환급
                            tran_no: '12347',
                            tran_date: '2024-08-12T16:45:00Z',
                            transfer_type: null, // 환급이므로 해당 없음
                            krw_amount: 30000,
                            foreign_amount: 0,
                            currency_type: 3, // KRW
                            pay_balance_snap: 110000,
                            transit_balance_snap: 18750,
                        },
                    ],
                );
            });
    };

    React.useEffect(() => {
        if (userCardNo) {
            getApi(userCardNo, currentDate.getFullYear(), currentDate.getMonth() + 1);
        }
    }, [userCardNo, currentDate]);

    React.useEffect(() => {
        if (data) {
            const filtered = data.filter(item => {
                if (item.type === 0) { // 결제 내역
                    if (paymentType === 0) {
                        return item.pay_type === 0; // 페이 결제
                    } else {
                        return item.pay_type === 1; // 교통 결제
                    }
                } else { // 거래 내역
                    if (item.tran_type === 0) { // 전환
                        return true; // 전환 내역은 페이, 교통에도 표시
                    } else if (paymentType === 0) {
                        return item.tran_type === 1 || item.tran_type === 2; //충전 환급
                    } else {
                        return false;
                    }
                }
            });
            setFilteredData(filtered);
        }
    }, [data, paymentType]);

    const handleMonthChange = (direction) => {
        setCurrentDate(preDate => {
            const newDate = new Date(preDate);
            if (direction === 'prev') {
                newDate.setMonth(newDate.getMonth() - 1);
            } else {
                newDate.setMonth(newDate.getMonth() + 1);
            }
            return newDate;
        });
    };

    const handleItemClick = (item) => {
        if (item.type === 0) {
            // 결제 정보 요청
            alert(`결제 번호 ${item.pay_no}에 대한 상세 정보`);
        } else {
            // 거래 정보 요청
            alert(`거래 번호 ${item.tran_no}에 대한 상세 정보`);
        }
    };

    return (
        <Paper
            sx={{
                width: '100%',
                minHeight: '500px',
                flexGrow: 1,
                border: '1px solid #ccc',
                borderRadius: '10px 10px 0 0',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: 'white',
                boxSizing: 'border-box',
                margin: '0 auto',
                alignItems: 'center',
                transition: 'background-color 0.3s, box-shadow 0.3s',
            }}
        >
            <Grid container spacing={2} style={{ zIndex: 2, justifyContent: 'space-between', alignItems: 'center' }}>
                <Grid item xs={1} style={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <BasicButton text={'<'} onClick={() => handleMonthChange('prev')} />
                </Grid>
                <Grid item xs={10} style={{ textAlign: 'center' }}>
                    <b>{currentDate.getFullYear()}/{currentDate.getMonth() + 1}</b>
                </Grid>
                <Grid item xs={1} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <BasicButton text={'>'} onClick={() => handleMonthChange('next')} />
                </Grid>
                <Grid item xs={10}>
                </Grid>
                <Grid item xs={2}>
                    <CustomizedSwitches checked={paymentType === 0} onChange={onSwitchChange} />
                </Grid>
            </Grid>

            {filteredData && filteredData.map((item, index) => (
                <React.Fragment key={index}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Divider />
                        </Grid>
                    </Grid>

                    <Grid
                        container
                        spacing={2}
                        sx={{
                            cursor: 'pointer',
                        }}
                        onClick={() => handleItemClick(item)}
                    >
                        <Grid item xs={12}>
                            <Typography variant="body2" color="textSecondary">
                                {item.type === 0 ? `결제 번호: ${item.pay_no}` : `거래 번호: ${item.tran_no}`}
                            </Typography>
                        </Grid>
                        <Grid item xs={1} sx={{ display: 'flex', alignItems: 'center' }}>
                            {item.type === 0 ? <RemoveIcon /> : <AddIcon />}
                        </Grid>
                        <Grid item xs={4}>
                            <Grid container direction="column" spacing={1}>
                                <Grid item>
                                    <Typography variant="body2">
                                        {item.type === 0 ? '결제' : '거래'}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant="body2" color="textSecondary">
                                        {item.type === 0 ? item.service_name :
                                            (item.tran_type === 0 ? '전환' :
                                                item.tran_type === 1 ? '충전' : '환급')}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={2}>
                            <Grid container direction="column" spacing={1}>
                                <Grid item>
                                    <Typography variant="body2" color="transparent">placeholder</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant="body2" color="textSecondary">
                                        {new Date(item.type === 0 ? item.pay_date : item.tran_date).toLocaleTimeString([], {
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={5} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                            <Grid container direction="column" spacing={1} style={{ textAlign: 'right' }}>
                                <Grid item>
                                    <Typography variant="body2" color="textSecondary">
                                        {item.type === 0 ?
                                            `- ${item.pay_price.toLocaleString()}₩` :
                                            item.tran_type === 0 ?
                                                (paymentType === 0 ?
                                                        (item.transfer_type === 0 ? `- ${item.krw_amount.toLocaleString()}₩` : `+ ${item.krw_amount.toLocaleString()}₩`) :
                                                        (item.transfer_type === 0 ? `+ ${item.krw_amount.toLocaleString()}₩` : `- ${item.krw_amount.toLocaleString()}₩`)
                                                ) :
                                                `${item.krw_amount.toLocaleString()}₩`
                                        }
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant="body2" color="textSecondary">
                                        {item.type === 1 && item.tran_type === 0 ? (
                                            paymentType === 0 ? (
                                                item.transfer_type === 0 ? (
                                                    <>
                                                        pay {(item.pay_balance_snap + item.krw_amount).toLocaleString()} -&gt; transit {item.transit_balance_snap.toLocaleString()}₩
                                                    </>
                                                ) : (
                                                    <>
                                                        transit {(item.transit_balance_snap - item.krw_amount).toLocaleString()} -&gt; pay {item.pay_balance_snap.toLocaleString()}₩
                                                    </>
                                                )
                                            ) : (
                                                item.transfer_type === 0 ? (
                                                    <>
                                                        pay {(item.pay_balance_snap + item.krw_amount).toLocaleString()} -&gt; transit {item.transit_balance_snap.toLocaleString()}₩
                                                    </>
                                                ) : (
                                                    <>
                                                        transit {(item.transit_balance_snap - item.krw_amount).toLocaleString()} -&gt; pay {item.pay_balance_snap.toLocaleString()}₩
                                                    </>
                                                )
                                            )
                                        ) : (
                                            `balance ${paymentType === 0 ?
                                                item.pay_balance_snap.toLocaleString() :
                                                item.transit_balance_snap.toLocaleString()}₩`
                                        )}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </React.Fragment>
            ))}
        </Paper>
    );
};

export default PaymentHistory;