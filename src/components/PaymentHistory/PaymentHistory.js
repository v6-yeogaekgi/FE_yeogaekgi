import { useContext, useState } from 'react';
import axios from 'axios';
import * as React from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import BasicButton from '../BasicButton/BasicButton';
import CustomizedSwitches from '../CustomizedSwitches/CustomizedSwitches';
import Divider from '@mui/material/Divider';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Drawer from '@mui/material/Drawer';
import { AllStateContext } from '../../App';
import { format } from 'date-fns';

// TODO
// 상세 날짜 추가


const PaymentHistory = ({ cardData, paymentType, onSwitchChange }) => {
    const userCardNo = cardData.userCardId;
    const [data, setData] = useState();
    const [currentDate, setCurrentDate] = useState(new Date());
    const [filteredData, setFilteredData] = useState([]);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [selectedItem, setselectedItem] = useState(null);

    const groupDataByDate = (data) => {
        const grouped = {};
        data.forEach(item => {
            const date = format(new Date(item.datetime), 'yyyy-MM-dd');
            if (!grouped[date]) {
                grouped[date] = [];
            }
            grouped[date].push(item);
        });
        return grouped;
    };

    const handleItemClick = (item) => {
        setselectedItem(item);
        setDrawerOpen(true);
    };

    const closeDrawer = () => {
        setDrawerOpen(false);
    };

    const { protocol, token } = useContext(AllStateContext);
    const uri = protocol + 'payTrack/list';

    const getApi = (userCardNo, year, month) => {

        axios
            .post(uri,
                { userCardNo, year, month },
                {
                    headers: {
                        Authorization: token,
                        'Content-Type': 'application/json',
                    },
                },
            )
            .then((res) => {
                if (Array.isArray(res.data) && res.data.length > 0) {
                    const formattedData = res.data.map(item => ({
                        userCardNo: item.userCardNo,
                        datetime: item.datetime,
                        transitBalanceSnap: item.transitBalanceSnap,
                        payBalanceSnap: item.payBalanceSnap,
                        pno: item.pno,
                        payType: item.payType,
                        payPrice: item.payPrice,
                        status: item.status,
                        serviceName: item.serviceName,
                        tno: item.tno,
                        tranType: item.tranType,
                        transferType: item.transferType,
                        krwAmount: item.krwAmount,
                        foreignAmount: item.foreignAmount,
                        currencyType: item.currencyType,
                        payment: item.payment,
                    }));

                    setData(formattedData);

                } else {
                    setData([]);
                }
            })
            .catch((err) => {
                console.error('API 요청 중 오류 발생:', err);
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
                if (item.payment) { // 결제 내역
                    if (paymentType === 0) {
                        return item.payType === 0; // 페이 결제
                    } else {
                        return item.payType === 1; // 교통 결제
                    }
                } else { // 거래 내역
                    if (item.tranType === 0) { // 전환
                        return true; // 전환 내역은 페이, 교통에도 표시
                    } else if (paymentType === 0) {
                        return item.tranType === 1 || item.tranType === 2; //충전 환급
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

    return (
        <div>
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
                <Grid container spacing={2}
                      style={{ zIndex: 2, justifyContent: 'space-between', alignItems: 'center' }}>
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

                {filteredData && filteredData.length > 0 ? (
                    Object.entries(groupDataByDate(filteredData)).map(([date, items]) => (
                        <React.Fragment key={date}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Typography variant="subtitle1" style={{ fontWeight: 'bold', margin: '20px 0 10px' }}>
                                        {format(new Date(date), 'MM/dd')}
                                    </Typography>
                                </Grid>
                            </Grid>
                            {items.map((item, index) => (
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
                                                {item.payment ? `Payment no: ${item.pno}` : `Transaction no: ${item.tno}`}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={1} sx={{ display: 'flex', alignItems: 'center' }}>
                                            {item.payment ? <RemoveIcon /> :
                                                (item.tranType === 0 ?
                                                        (paymentType === 0 ?
                                                                (item.transferType === 0 ? <RemoveIcon /> : <AddIcon />) :
                                                                (item.transferType === 0 ? <AddIcon /> : <RemoveIcon />)
                                                        ) :
                                                        (item.tranType === 1 ? <AddIcon /> : <RemoveIcon />)
                                                )
                                            }
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Grid container direction="column" spacing={1}>
                                                <Grid item>
                                                    <Typography variant="body2">
                                                        {item.payment ? 'Payment' : 'Transaction'}
                                                    </Typography>
                                                </Grid>
                                                <Grid item>
                                                    <Typography variant="body2" color="textSecondary">
                                                        {item.payment ? item.serviceName :
                                                            (item.tranType === 0 ? 'Conversion' :
                                                                item.tranType === 1 ? 'Top Up' : 'Refund')}
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
                                                        {new Date(item.datetime).toLocaleTimeString('en-US', {
                                                            hour: '2-digit',
                                                            minute: '2-digit',
                                                        })}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={6}
                                              sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                                            <Grid container direction="column" spacing={1} style={{ textAlign: 'right' }}>
                                                <Grid item>
                                                    <Typography variant="body2" color="textSecondary">
                                                        {item.payment ?
                                                            `- ${item.payPrice.toLocaleString()}₩` :
                                                            item.tranType === 0 ?
                                                                (paymentType === 0 ?
                                                                        (item.transferType === 0 ? `- ${item.krwAmount.toLocaleString()}₩` : `+ ${item.krwAmount.toLocaleString()}₩`) :
                                                                        (item.transferType === 0 ? `+ ${item.krwAmount.toLocaleString()}₩` : `- ${item.krwAmount.toLocaleString()}₩`)
                                                                ) :
                                                                `${item.krwAmount.toLocaleString()}₩`
                                                        }
                                                        {(item.tranType === 1 || item.tranType === 2) && item.foreignAmount && item.currencyType ?
                                                            ` (${item.foreignAmount.toLocaleString()} ${item.currencyType === 0 ? 'USD' : item.currencyType === 1 ? 'JPY' : item.currencyType === 2 ? 'CNY' : item.currencyType === 3 ? 'KRW' : ''})` :
                                                            ''
                                                        }
                                                    </Typography>
                                                </Grid>
                                                <Grid item>
                                                    <Typography variant="body2" color="textSecondary">
                                                        {item.type === 1 && item.tranType === 0 ? (
                                                            paymentType === 0 ? (
                                                                item.transferType === 0 ? (
                                                                    <>
                                                                        pay {(item.payBalanceSnap + item.krwAmount).toLocaleString()} -&gt; transit {item.transitBalanceSnap.toLocaleString()}₩
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        transit {(item.transitBalanceSnap - item.krwAmount).toLocaleString()} -&gt; pay {item.payBalanceSnap.toLocaleString()}₩
                                                                    </>
                                                                )
                                                            ) : (
                                                                item.transferType === 0 ? (
                                                                    <>
                                                                        pay {(item.payBalanceSnap + item.krwAmount).toLocaleString()} -&gt; transit {item.transitBalanceSnap.toLocaleString()}₩
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        transit {(item.transitBalanceSnap - item.krwAmount).toLocaleString()} -&gt; pay {item.payBalanceSnap.toLocaleString()}₩
                                                                    </>
                                                                )
                                                            )
                                                        ) : (
                                                            `balance ${paymentType === 0 ?
                                                                item.payBalanceSnap.toLocaleString() :
                                                                item.transitBalanceSnap.toLocaleString()}₩`
                                                        )}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </React.Fragment>
                            ))}
                        </React.Fragment>
                    ))
                ) : (
                    <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '200px' }}>
                        <Typography variant="h6" color="textSecondary">
                            No data
                        </Typography>
                    </Grid>
                )}
            </Paper>
            <Drawer
                anchor="bottom"
                open={drawerOpen}
                onClose={closeDrawer}
                PaperProps={{
                    style: {
                        maxWidth: '400px',
                        width: '100%',
                        margin: '0 auto',
                    },
                }}
            >
                <List style={{ width: 250 }}>
                    {selectedItem && (
                        <>
                            <ListItem>
                                <ListItemText
                                    primary="거래 유형"
                                    secondary={
                                        selectedItem.payment
                                            ? '일반결제'
                                            : '기타거래'
                                    }
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary="카드번호"
                                    secondary={selectedItem.userCardNo}
                                />
                            </ListItem>
                            {selectedItem.payment ? (
                                <>
                                    <ListItem>
                                        <ListItemText primary="결제 유형"
                                                      secondary={selectedItem.payType === 0 ? '일반' : '교통'} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="결제번호" secondary={selectedItem.pno} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="결제 금액" secondary={selectedItem.payPrice.toLocaleString()}
                                                      원 />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="결제 일시" secondary={selectedItem.datetime} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="거래 후 잔액" secondary={
                                            paymentType === 0 ? selectedItem.payBalanceSnap : selectedItem.transitBalanceSnap
                                        } 원 />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="결제 상태"
                                                      secondary={selectedItem.status === 1 ? '결제완료' : '취소완료'} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="가맹점" secondary={selectedItem.serviceName} />
                                    </ListItem>
                                </>
                            ) : (
                                <>
                                    <ListItem>
                                        <ListItemText primary="거래 유형"
                                                      secondary={selectedItem.tranType === 0 ? '전환' : selectedItem.tranType === 1 ? '충전' : '환급'} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="거래 번호" secondary={selectedItem.tno} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="거래 일시" secondary={selectedItem.datetime} />
                                    </ListItem>
                                    {selectedItem.transferType !== null && (
                                        <ListItem>
                                            <ListItemText primary="거래 방향"
                                                          secondary={selectedItem.transferType === 0 ? '페이 -> 교통' : '교통 -> 페이'} />
                                        </ListItem>
                                    )}
                                    <ListItem>
                                        <ListItemText primary="원화 금액"
                                                      secondary={selectedItem.krwAmount.toLocaleString() + ' ₩'} />
                                    </ListItem>
                                    {selectedItem.foreignAmount !== null && (
                                        <ListItem>
                                            <ListItemText primary="외화 금액"
                                                          secondary={`${selectedItem.foreignAmount.toLocaleString()} ${
                                                              selectedItem.currencyType === 0 ? '달러' :
                                                                  selectedItem.currencyType === 1 ? '엔' : '위안'}`} />
                                        </ListItem>
                                    )}
                                    <ListItem>
                                        <ListItemText primary="거래 후 잔액" secondary={
                                            paymentType === 0 ? selectedItem.payBalanceSnap.toLocaleString() + ' ₩' : selectedItem.transitBalanceSnap.toLocaleString() + ' ₩'
                                        } 원 />
                                    </ListItem>
                                </>
                            )}
                        </>
                    )}
                </List>
            </Drawer>
        </div>
    );
};

export default PaymentHistory;