import * as React from 'react';
import { useState } from 'react';
import { Box, Typography, TextField, Divider, IconButton, Drawer } from '@mui/material';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import ClearIcon from '@mui/icons-material/Clear';

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
                        component="span"
                        sx={{
                            width: 24,
                            height: 24,
                            borderRadius: '50%',
                            backgroundColor: 'red',
                            display: 'inline-block',
                            mr: 1,
                        }}
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
                    sx={{ mb: 2 }}
                />

                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                    <IconButton>
                        <SwapVertIcon />
                    </IconButton>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Box
                        component="img"
                        src="path_to_korean_flag.png"
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

                <Divider sx={{ mb: 2 }} />

                <Box
                    onClick={openDrawer}
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <Typography>환불안내</Typography>
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
                        margin: '0 auto',
                    },
                }}
            >
                환불 안내 사항 환불 안내 사항 환불 안내 사항 환불 안내 사항 환불
                안내 사항 환불 안내 사항 환불 안내 사항 환불 안내 사항 환불 안내
                사항 환불 안내 사항 환불 안내 사항 환불 안내 사항
            </Drawer>
        </>
    );
}
