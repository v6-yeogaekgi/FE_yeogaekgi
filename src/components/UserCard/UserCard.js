import { Grid, Typography, Paper, IconButton } from '@mui/material';
import StarCheckbox from '../StarCheckbox/StarCheckBox';
import BasicButton from '../BasicButton/BasicButton';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import SettingsDrawer from '../SettingsDrawer/SettingsDrawer';
import { useEffect, useState } from 'react';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';

const Overlay = () => (
    <div style={{
        position: 'absolute',
        top: -10,
        left: -30,
        right: -30,
        bottom: -10,
        backgroundColor: 'rgba(19, 19, 19, 0.3)',
        justifyContent: 'center',
        borderRadius: '10px',
        pointerEvents: 'none',
    }}>
        <Typography variant="h5" style={{ color: 'white' }}></Typography>
    </div>
);

export default function UserCard({ data, onCardClick, onStarChange, onCardDelete }) {
    const navigate = useNavigate();
    const { userCardId, status, cardName, payBalance, transitBalance, starred } = data;
    const isActive = status !== 0;
    const design = data.design;

    const [starredState, setStarredState] = useState(starred === 1);

    const handleStarChange = () => {
        if (onStarChange) {
            onStarChange();
        }
    };

    useEffect(() => {
        if (onStarChange) {
            onStarChange();
        }
    }, [starredState]);

    const handleCardClick = (e) => {

        if (!isActive) return;

        // SettingsDrawer나 버튼 영역을 클릭했는지 확인
        if (e.target.closest('.settings-drawer') || e.target.closest('.star-checkbox')) {
            return;
        }

        // 버튼 클릭 이벤트가 아닐 때만 카드 상세 페이지로 이동
        if (!e.target.closest('button')) {
            if (onCardClick) {
                onCardClick(data);
            }
        }
    };

    const handleTopUpClick = (e) => {
        e.stopPropagation(); // 이벤트 버블링 방지
        if(isActive){
            navigate('/wallet/top-up', { state: { data } });
        }
    };

    const handleBalanceConversionClick = (e) => {
        e.stopPropagation(); // 이벤트 버블링 방지
        if(isActive){
            navigate('/wallet/conversion', { state: { data } });
        }
    };

    const handleCardDelete = () => {
        onCardDelete();
    };

    const CardButtons = () => (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <BasicButton
                    text={'Top Up'}
                    width={'100%'}
                    variant={'contained'}
                    onClick={handleTopUpClick}
                    isActive={isActive}
                />
            </Grid>
            <Grid item xs={12}>
                <BasicButton
                    text={'Balance Conversion (P - T)'}
                    width={'100%'}
                    variant={'contained'}
                    onClick={handleBalanceConversionClick}
                    style={{ marginBottom: '10px' }}
                    isActive={isActive}
                />
            </Grid>
        </Grid>
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
                                                initialChecked={starred}
                                                userCardId={userCardId}
                                                onStarChange={handleStarChange}
                                                isActive={isActive}
                                            />
                                        </div>
                                        <div onClick={(e) => e.stopPropagation()} className='settings-drawer'>
                                            <SettingsDrawer data={data} onCardDelete={handleCardDelete} />
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
                                        ₩{payBalance}
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
                                        ₩{transitBalance}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                    <CardButtons isActive={isActive} />
                </CardContent>
                {!isActive && <Overlay />}
            </Card>
        </Box>
    );
}