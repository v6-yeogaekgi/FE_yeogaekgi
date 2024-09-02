import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import useAlertDialog from '../../hooks/useAlertDialog/useAlertDialog';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { AllStateContext } from '../../App';
import useConfirmDialog from '../../hooks/useConfirmDialog/useConfirmDialog';
import { format } from 'date-fns';

const SettingsDrawer = ({ data, onCardDelete, onCardUpdate }) => {

    const { protocol } = useContext(AllStateContext);
    const token = localStorage.getItem('token');
    const [state, setState] = React.useState({
        bottom: false,
    });

    const [checked, setChecked] = useState(data.starred);
    const navigate = useNavigate();

    const { openAlertDialog, AlertDialog } = useAlertDialog();

    const { openConfirmDialog, ConfirmDialog } = useConfirmDialog();

    const toggleDrawer = (open) => (event) => {
        if (
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }

        setState({ ...state, bottom: open });
    };

    const handleClick = () => {
        const newState = !checked;
        const uri = newState
            ? `${protocol}usercard/modify/star`
            : `${protocol}usercard/delete/star`;

        axios.put(uri, { userCardId: data.userCardId }, {
            headers: {
                Authorization: token,
                'Content-Type': 'application/json',
            },
        })
            .then((res) => {
                if (res.status === 200) {
                    onCardUpdate({ starred: newState });
                    setChecked(newState);
                }
            })
            .catch((err) => {
                console.error('API 요청 중 오류 발생:', err);
            });
    };

    const handleCardDelete = () => {
        axios
            .put(protocol + 'usercard/delete/card',
                {
                    userCardId: data.userCardId,
                },
                {
                    headers: {
                        Authorization: token,
                        'Content-Type': 'application/json',
                    },
                },
            )
            .then((res) => {
                if (res.status === 200) {
                    console.log('카드 삭제');
                    setState({ ...state, bottom: false });
                    onCardDelete();
                } else {
                    console.log('카드 삭제');
                }
            })
            .catch((err) => {
                console.error('API 요청 중 오류 발생:', err);
            });
    };

    const list = () => (
        <>
            <Box
                sx={{
                    width: 400,
                    margin: '0 auto',
                    backgroundColor: 'white',
                    boxShadow: 'rgba(100, 100, 100, 0.2) 0px 7px 29px 0px',
                }}
                role="presentation"
            >
                {data.status === 1 ? (
                    <List>
                        <ListItem key={'주카드 설정'} disablePadding>
                            <ListItemButton onClick={(e) => {
                                e.stopPropagation();
                                handleClick();
                            }}>
                                {checked ?
                                    <ListItemText primary={'Remove Default Card'} /> :
                                    <ListItemText primary={'Set as Default Card'} />
                                }

                            </ListItemButton>
                        </ListItem>
                        <ListItem key={'충전'} disablePadding
                                  onClick={() => navigate('/wallet/top-up', { state: { data } })}>
                            <ListItemButton>
                                <ListItemText primary={'Top Up'} />
                            </ListItemButton>
                        </ListItem>
                        <ListItem key={'환급'} disablePadding
                                  onClick={() => navigate('/wallet/detail/refund', { state: { data } })}>
                            <ListItemButton>
                                <ListItemText primary={'Refund'} />
                            </ListItemButton>
                        </ListItem>
                        <ListItem key={'잔액 전환'} disablePadding>
                            <ListItemButton>
                                <ListItemText primary={'Balance Conversion (P-T)'}
                                              onClick={() => navigate('/wallet/conversion', { state: { data } })} />
                            </ListItemButton>
                        </ListItem>
                    </List>
                ) : null}
                {data.status === 1 ? (
                    <Divider />
                ) : (null)}
                <List>
                    <ListItem key={'카드 상세'} disablePadding>
                        <ListItemButton onClick={(e) => {
                            e.stopPropagation();
                            openAlertDialog();
                        }}>
                            <ListItemText primary={'View Card Details'} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem key={'카드 삭제'} disablePadding>
                        <ListItemButton onClick={(e) => {
                            e.stopPropagation();
                            openConfirmDialog();
                        }}>
                            {/*<ListItemButton onClick={(e) => {*/}
                            {/*    e.stopPropagation();*/}
                            {/*    handleCardDelete();*/}
                            {/*}}>*/}
                            <ListItemText primary={'Delete Card'} />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Box>
            <AlertDialog
                title={'Card Details'}
                content={
                    <>
                        <List sx={{ color: 'black' }}>
                            <ListItem disablePadding>
                                <b>Card Number</b>
                            </ListItem>
                            <ListItem disablePadding>
                                {data.userCardId}
                            </ListItem>
                            <ListItem disablePadding>
                                <b>Validity</b>
                            </ListItem>
                            <ListItem disablePadding>
                                {format(data.expiryDate, 'PPpp')}
                            </ListItem>
                        </List>
                    </>
                }
            />
            <ConfirmDialog
                title={'Delete Card'}
                content={'Are you sure you want to delete the card?'}
                onAgree={() => {
                    handleCardDelete();
                }}
            />
        </>
    );

    return (
        <div>
            <IconButton onClick={toggleDrawer(true)}>
                <MenuIcon />
            </IconButton>
            <Drawer
                anchor="bottom"
                open={state.bottom}
                onClose={toggleDrawer(false)}
                PaperProps={{
                    sx: {
                        width: '100%',
                        height: 'auto',
                        maxHeight: '80%',
                        backgroundColor: 'transparent',
                        boxShadow: 'none',
                    },
                }}
                BackdropProps={{
                    sx: {
                        backgroundColor: 'transparent',
                    },
                }}
            >
                {list()}
            </Drawer>
        </div>
    );
};

export default SettingsDrawer;