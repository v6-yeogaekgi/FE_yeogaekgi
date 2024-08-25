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

const SettingsDrawer = ({ data }) => {
    const [state, setState] = React.useState({
        bottom: false,
    });

    const navigate = useNavigate();

    const { openAlertDialog, AlertDialog } = useAlertDialog();

    const toggleDrawer = (open) => (event) => {
        if (
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }

        setState({ ...state, bottom: open });
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
                // onClick={toggleDrawer(false)}
                // onKeyDown={toggleDrawer(false)}
            >
                <List>
                    {/*{['주카드 설정', '충전', '환급', '잔액 전환'].map((text) => (*/}
                    <ListItem key={'주카드 설정'} disablePadding>
                        <ListItemButton>
                            <ListItemText primary={'주카드 설정'} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem key={'충전'} disablePadding onClick={() => navigate('/wallet/top-up', { state: { data } })}>
                        <ListItemButton>
                            <ListItemText primary={'충전'} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem key={'환급'} disablePadding onClick={() => navigate('refund', { state: { data } })}>
                        <ListItemButton>
                            <ListItemText primary={'환급'} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem key={'잔액 전환'} disablePadding>
                        <ListItemButton>
                            <ListItemText primary={'잔액 전환'} onClick={() => navigate('/wallet/conversion', { state: { data } })}/>
                        </ListItemButton>
                    </ListItem>
                </List>
                <Divider />
                <List>
                    <ListItem key={'카드 상세'} disablePadding onClick={openAlertDialog}>
                        <ListItemButton>
                            <ListItemText primary={'카드 상세'} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem key={'카드 삭제'} disablePadding>
                        <ListItemButton>
                            <ListItemText primary={'카드 삭제'} />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Box>
            <AlertDialog
                content={
                    <>
                        <List sx={{ color: 'black' }}>
                            <ListItem disablePadding>
                                <b>Card Number</b>
                            </ListItem>
                            <ListItem disablePadding>
                                {/*// todo 수정*/}
                                {data.userCardId}
                            </ListItem>
                            <ListItem disablePadding>
                                <b>Validity</b>
                            </ListItem>
                            <ListItem disablePadding>
                                {data.expiryDate}
                            </ListItem>
                        </List>
                    </>
                }
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