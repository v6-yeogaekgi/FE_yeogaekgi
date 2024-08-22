import * as React from 'react';
import { useState } from 'react';
import { Box, Typography, TextField, Divider, IconButton, Drawer, Grid } from '@mui/material';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import ClearIcon from '@mui/icons-material/Clear';
import korFlag from '../../img/korea.png';
import japFlag from '../../img/japan.png';
import BasicButton from '../BasicButton/BasicButton';

export default function TopUpInput({cardData, memberData}) {
    // console.log(cardData);
    // console.log(memberData);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [foreignAmount, setForeignAmount] = useState();

    const handleForeignAmountChange = (e) => {
        setForeignAmount(e.target.value);
    }

    const currencyTable = [
        {
            no: 1,
            country: 'JP',
            currency: 'JPY',
        },
        {
            no: 2,
            country: 'CN',
            currency: 'CNY',
        }
    ];

    const onClickClearIcon = (e) => {
        setForeignAmount('');
    };

    const openDrawer = () => {
        setDrawerOpen(true);
    };

    const closeDrawer = () => {
        setDrawerOpen(false);
    };

    return (
        <>
            <Box sx={{ p: 2, backgroundColor: 'white' }}>
                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                    {memberData.bank}
                </Typography>
                <TextField
                    fullWidth
                    value={memberData.account_number}
                    InputProps={{
                        readOnly: true,
                    }}
                    sx={{ mb: 3 }}
                />

                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                    충전 금액
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Box
                        component="img"
                        src={japFlag}
                        alt="JPY"
                        sx={{ width: 24, height: 24, mr: 1 }}
                    />
                    <Typography>JPY</Typography>
                </Box>

                <TextField
                    fullWidth
                    placeholder="0"
                    value={foreignAmount}
                    onChange={handleForeignAmountChange}
                    InputProps={{
                        endAdornment: (
                            <IconButton onClick={onClickClearIcon}>
                                <ClearIcon />
                            </IconButton>
                        ),
                    }}
                    sx={{ mb: 1 }}
                />

                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
                    <IconButton>
                        <SwapVertIcon />
                    </IconButton>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Box
                        component="img"
                        src={korFlag}
                        alt="KRW"
                        sx={{ width: 24, height: 24, mr: 1 }}
                    />
                    <Typography>KRW</Typography>
                </Box>

                <TextField
                    fullWidth
                    value="000,000₩"
                    InputProps={{
                        readOnly: true,
                    }}
                    sx={{ mb: 3 }}
                />

                <BasicButton text={"Top Up"} variant={"contained"} btnColor={"#4653f9"} width={"100%"}>
                </BasicButton>

                <Divider sx={{ mt:2, mb: 2 }} />

                <Box
                    onClick={openDrawer}
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <Typography>충전 안내</Typography>
                    <Typography>&gt;</Typography>
                </Box>
            </Box>

            <Drawer
                anchor="bottom"
                open={drawerOpen}
                onClose={closeDrawer}
                PaperProps={{
                    style: {
                        maxWidth: '400px',
                        width: '100%',
                        height: '80%',
                        margin: '0 auto',
                    },
                }}
            >
                <Typography variant="h6" sx={{padding: 1, fontWeight: 'bold'}}>
                    여객기 Terms and Conditions
                </Typography>
                <Divider sx={{ mb: 2, borderBottomWidth: 3 }}/>
                <Typography sx={{ whiteSpace: 'pre-wrap' , padding: 1}} >
                    ✅ Notices when topping up with 'Wire Transfer' in the app <br/><br/>
                    ※ Wire Transfer can be topped up with a minimum of 1,000 won <br/><br/>
                    ※ A full refund is available if you request a refund within 7 days without using the charged amount. <br/><br/>
                    ※ For the amount that has passed 7 days after charging, you can only refund the amount remaining after using more than 60% of the final balance. (Excluding Card, Easy payment charging) <br/>
                </Typography>   
            </Drawer>
        </>
    );
}
