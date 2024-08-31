import { useContext, useState } from 'react';
import axios from 'axios';
import * as React from 'react';
import { Grid, IconButton, Paper, Typography } from '@mui/material';
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
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

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

    const { protocol } = useContext(AllStateContext);
    const token = localStorage.getItem('token');

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
                    <Grid item xs={2}
                    ></Grid>
                    <Grid item xs={1} style={{ display: 'flex', justifyContent: 'flex-start' }}>
                        <ArrowBackIosIcon onClick={() => handleMonthChange('prev')} />
                    </Grid>
                    <Grid item xs={4} style={{ textAlign: 'center' }}>
                        <b>{currentDate.getFullYear()}/{currentDate.getMonth() + 1}</b>
                    </Grid>
                    <Grid item xs={1} style={{ display: 'flex', justifyContent: 'flex-start' }}>
                        <ArrowForwardIosIcon onClick={() => handleMonthChange('next')} />
                    </Grid>
                    <Grid item xs={2}
                    ></Grid>
                </Grid>

                <Grid container spacing={1}>
                    <Grid item xs={10}>
                    </Grid>
                    <Grid item xs={2}>
                        <CustomizedSwitches checked={paymentType === 0} onChange={onSwitchChange} />
                    </Grid>
                </Grid>

                {filteredData && filteredData.length > 0 ? (
                    Object.entries(groupDataByDate(filteredData)).map(([date, items]) => (
                        <React.Fragment key={date}>
                            <Grid container spacing={1}>
                                <Grid item xs={12}>
                                    <Typography variant="subtitle1"
                                                style={{ fontWeight: 'bold', margin: '20px 0 10px' }}>
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
                                            paddingBottom: '5px',
                                        }}
                                        onClick={() => handleItemClick(item)}
                                    >
                                        <Grid item xs={1} sx={{ display: 'flex', alignItems: 'center' }}>
                                            {item.payment ? <RemoveIcon sx={{color: '#E84B54'}} /> :
                                                (item.tranType === 0 ?
                                                        (paymentType === 0 ?
                                                                (item.transferType === 0 ? <RemoveIcon sx={{color: '#E84B54'}}  /> :
                                                                    <AddIcon sx={{color: '#6899ED'}}/>) :
                                                                (item.transferType === 0 ? <AddIcon sx={{color: '#6899ED'}} /> : <RemoveIcon sx={{color: '#E84B54'}} />)
                                                        ) :
                                                        (item.tranType === 1 ? <AddIcon sx={{color: '#6899ED'}} /> : <RemoveIcon sx={{color: '#E84B54'}}/>)
                                                )
                                            }
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Grid container direction="column" spacing={1}
                                                  sx={{
                                                      marginTop: '5px',
                                                  }}
                                            >
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
                                                    <Typography variant="body2"
                                                                color="transparent">placeholder</Typography>
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
                                              sx={{
                                                  display: 'flex',
                                                  alignItems: 'center',
                                                  justifyContent: 'flex-end',
                                              }}>
                                            <Grid container direction="column" spacing={1}
                                                  style={{
                                                      textAlign: 'right',
                                                      paddingTop: '7px'
                                            }}>
                                                <Grid item>
                                                    <Typography variant="body2" color="textSecondary">
                                                        {item.payment ?
                                                            `- ₩${item.payPrice.toLocaleString()}` :
                                                            item.tranType === 0 ?
                                                                (paymentType === 0 ?
                                                                        (item.transferType === 0 ? `- ₩${item.krwAmount.toLocaleString()}` : `+ ₩${item.krwAmount.toLocaleString()}`) :
                                                                        (item.transferType === 0 ? `+ ₩${item.krwAmount.toLocaleString()}` : `- ₩${item.krwAmount.toLocaleString()}`)
                                                                ) :
                                                                `₩${item.krwAmount.toLocaleString()}`
                                                        }
                                                        {(item.tranType === 1 || item.tranType === 2) && item.foreignAmount ?
                                                            ` (${item.currencyType === 0 ? '$' : item.currencyType === 1 ? '¥' : item.currencyType === 2 ? '¥' : item.currencyType === 3 ? '₩' : ''}${item.foreignAmount.toLocaleString()})` :
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
                                                                        pay
                                                                        ₩{(item.payBalanceSnap + item.krwAmount).toLocaleString()} -&gt; transit {item.transitBalanceSnap.toLocaleString()}
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        transit
                                                                        ₩{(item.transitBalanceSnap - item.krwAmount).toLocaleString()} -&gt; pay {item.payBalanceSnap.toLocaleString()}
                                                                    </>
                                                                )
                                                            ) : (
                                                                item.transferType === 0 ? (
                                                                    <>
                                                                        pay
                                                                        ₩{(item.payBalanceSnap + item.krwAmount).toLocaleString()} -&gt; transit {item.transitBalanceSnap.toLocaleString()}
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        transit
                                                                        ₩{(item.transitBalanceSnap - item.krwAmount).toLocaleString()} -&gt; pay {item.payBalanceSnap.toLocaleString()}
                                                                    </>
                                                                )
                                                            )
                                                        ) : (
                                                            `balance ₩${paymentType === 0 ?
                                                                item.payBalanceSnap.toLocaleString() :
                                                                item.transitBalanceSnap.toLocaleString()}`
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
                                    primary="Type"
                                    secondary={
                                        selectedItem.payment
                                            ? 'Pay'
                                            : 'Transaction'
                                    }
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary="Card Number"
                                    secondary={selectedItem.userCardNo}
                                />
                            </ListItem>
                            {selectedItem.payment ? (
                                <>
                                    <ListItem>
                                        <ListItemText primary="Pay Type"
                                                      secondary={selectedItem.payType === 0 ? '일반' : '교통'} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="Pay Number" secondary={selectedItem.pno} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="Pay Price"
                                                      secondary={'₩' + selectedItem.payPrice.toLocaleString()}
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="Pay Date" secondary={selectedItem.datetime} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="Pay Balance Snap" secondary={
                                            '₩' + (paymentType === 0 ? selectedItem.payBalanceSnap : selectedItem.transitBalanceSnap)
                                        } />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="Status"
                                                      secondary={selectedItem.status === 1 ? 'Payment Completed' : 'Cancellation Completed'} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="Service" secondary={selectedItem.serviceName} />
                                    </ListItem>
                                </>
                            ) : (
                                <>
                                    <ListItem>
                                        <ListItemText primary="Transaction Type"
                                                      secondary={selectedItem.tranType === 0 ? 'Conversion' : selectedItem.tranType === 1 ? 'Top Up' : 'Refund'} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="Transaction Number" secondary={selectedItem.tno} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="Transaction Date" secondary={selectedItem.datetime} />
                                    </ListItem>
                                    {selectedItem.transferType !== null && (
                                        <ListItem>
                                            <ListItemText primary="Transfer Type"
                                                          secondary={selectedItem.transferType === 0 ? 'Pay -> Transit' : 'Transit -> pay'} />
                                        </ListItem>
                                    )}
                                    <ListItem>
                                        <ListItemText primary="KRW Amount"
                                                      secondary={'₩' + selectedItem.krwAmount.toLocaleString()} />
                                    </ListItem>
                                    {selectedItem.foreignAmount !== null && (
                                        <ListItem>
                                            <ListItemText primary="Foreign Amount"
                                                          secondary={`${
                                                              selectedItem.currencyType === 0 ? '$' :
                                                                  selectedItem.currencyType === 1 ? '¥' : '¥'} ${selectedItem.foreignAmount.toLocaleString()}`} />
                                        </ListItem>
                                    )}
                                    <ListItem>
                                        <ListItemText primary="Transaction Balance Snap" secondary={
                                            paymentType === 0 ? '₩' + selectedItem.payBalanceSnap.toLocaleString() : '₩' + selectedItem.transitBalanceSnap.toLocaleString()
                                        } />
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