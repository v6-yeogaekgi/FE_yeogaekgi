import { Grid, Typography, Paper, IconButton } from '@mui/material';
import StarCheckbox from '../StarCheckbox/StarCheckBox';
import BasicButton from '../BasicButton/BasicButton';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import SettingsDrawer from '../SettingsDrawer/SettingsDrawer';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import { useCallback, useEffect, useState } from 'react';

export default function UserCardOnDetail({ initialData, onCardClick }) {
    const [data, setData] = useState({
        ...initialData,
        starred: initialData.starred === 1,  // Transform starred to boolean
    });
    const navigate = useNavigate();
    const { userCardId, status, cardName, payBalance, transitBalance, starred } = data;
    const isActive = status !== 0;
    const design = data.design;

    const handleCardClick = (e) => {
        // 버튼 클릭 이벤트가 아닐 때만 카드 상세 페이지로 이동
        if (!e.target.closest('button')) {
            if (onCardClick) {
                onCardClick(data);
            }
        }
    };

    const handleCardUpdate = useCallback((updatedData) => {
        console.log(updatedData);
        setData(prevData => ({
            ...prevData,
            ...updatedData,
        }));
    },[])

    const handleTopUpClick = (e) => {
        e.stopPropagation(); // 이벤트 버블링 방지
        navigate('/wallet/top-up', { state: { data } });
    };

    const handleBalanceConversionClick = (e) => {
        e.stopPropagation(); // 이벤트 버블링 방지
        navigate('/wallet/conversion', {state: {data}});
    };

    useEffect(() => {
    }, [data]);

    const CardButtons = ({ isActive }) => (
        <div
            style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '10px',
            }}
        >
            <BasicButton
                text={'Top Up'}
                width={'45%'}
                variant={'contained'}
                onClick={handleTopUpClick}
                disabled={!isActive}
            />
            <BasicButton
                text={'Balance Conversion'}
                width={'45%'}
                variant={'contained'}
                onClick={handleBalanceConversionClick}
                disabled={!isActive}
            />
        </div>
    );

    return (
        <Box
            sx={{
                position: 'relative',
            }}
        >
            <Card
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: 'auto',
                    width: 360,
                    position: 'relative',
                    boxShadow: 'none',
                    borderRadius: 5,
                }}
                onClick={handleCardClick}
            >
                <CardContent
                    sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}
                >
                    <Grid container spacing={3} sx={{marginBottom: '20px'}}>
                        <Grid
                            item
                            xs={4}
                            sx={{
                                display: 'flex',
                                alignItems: 'stretch',
                                height: '100%',
                            }}
                        >
                            <img
                                src={design}
                                alt="Card Image"
                                style={{
                                    width: '80%',
                                    height: '100%',
                                    objectFit: 'cover',
                                }}
                            />
                        </Grid>
                        <Grid item xs={8}>
                            <Grid container spacing={2}>
                                <Grid item xs={8}>
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            mt: 1,
                                            fontFamily: 'Noto Sans, sans-serif',
                                            fontWeight: 700,
                                        }}
                                    >
                                        {cardName}
                                    </Typography>
                                </Grid>

                                <Grid item xs={4} style={{ position: 'relative' }}>
                                    <div style={{
                                        position: 'absolute',
                                        top: 0,
                                        right: '1%',
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}>
                                        <div onClick={(e) => e.stopPropagation()} className='star-checkbox'>
                                            <StarCheckbox
                                                initialChecked={isActive && starred}
                                                userCardId={userCardId}
                                                isActive={isActive}
                                            />
                                        </div>
                                        <div onClick={(e) => e.stopPropagation()} className='settings-drawer'>
                                            <SettingsDrawer data={data}
                                                            onCardDelete={() => {
                                                                navigate('/wallet', { state: { data } })
                                                            }}
                                                            onCardUpdate={handleCardUpdate}
                                            />
                                        </div>
                                    </div>
                                </Grid>
                            </Grid>

                            <Grid container spacing={2} sx={{ mt: 0.5 }}>
                                <Grid item xs={6}>
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontFamily: 'Noto Sans, sans-serif',
                                            fontWeight: 700,
                                        }}
                                    >
                                        Pay
                                    </Typography>
                                    <Typography variant="h6">
                                        ₩{payBalance.toLocaleString()}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontFamily: 'Noto Sans, sans-serif',
                                            fontWeight: 700,
                                        }}
                                    >
                                        Transit
                                    </Typography>
                                    <Typography variant="h6">
                                        ₩{transitBalance.toLocaleString()}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <CardButtons isActive={isActive} />
                </CardContent>
            </Card>
        </Box>
    );
}