import { Grid, Typography, Paper, IconButton } from '@mui/material';
import StarCheckbox from '../StarCheckbox/StarCheckBox';
import BasicButton from '../BasicButton/BasicButton';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SettingsDrawer from '../SettingsDrawer/SettingsDrawer';

const commonPaperStyle = {
    width: '90%',
    height: '250px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    position: 'relative',  // 추가: 오버레이 위치 기준점
};

const CardImage = ({ imageUrl }) => (
    <div style={{
        width: '100%',
        height: '150px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '10px',
        marginTop: '30px',
        overflow: 'hidden',
    }}>
        <img
            src={imageUrl}
            alt="Card"
            style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
            }}
        />
    </div>
);

export default function UserCardOnDetail({ data, onCardClick }) {
    const navigate = useNavigate();
    const { status, card_name, pay_balance, transit_balance, starred } = data;
    const isActive = status !== 0;

    const handleCardClick = (e) => {
        // 버튼 클릭 이벤트가 아닐 때만 카드 상세 페이지로 이동
        if (!e.target.closest('button')) {
            if (onCardClick) {
                onCardClick(data);
            }
        }
    };

    const handleTopUpClick = (e) => {
        e.stopPropagation(); // 이벤트 버블링 방지
        navigate('/wallet/top-up', { state: { data } });
    };

    const handleBalanceConversionClick = (e) => {
        e.stopPropagation(); // 이벤트 버블링 방지
        alert('clicked Balance Conversion (P - T)');
    };

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
                text={'Balance Conversion'}
                width={'45%'}
                variant={'outlined'}
                onClick={handleBalanceConversionClick}
                disabled={!isActive}
            />
            <BasicButton
                text={'Top Up'}
                width={'45%'}
                variant={'outlined'}
                onClick={handleTopUpClick}
                disabled={!isActive}
            />
        </div>
    );

    return (
        <>
            <Paper
                style={commonPaperStyle}
                onClick={handleCardClick}
            >
                <Grid container spacing={2} style={{ zIndex: 2 }}>
                    <Grid item xs={8}>
                        <Typography variant="h7">{card_name}</Typography>
                        <Typography>Pay Balance </Typography>
                        <Typography variant="h5">{pay_balance.toLocaleString()}₩</Typography>
                        <Typography>Transit Balance </Typography>
                        <Typography variant="h5">{transit_balance.toLocaleString()}₩</Typography>
                    </Grid>
                    <Grid item xs={4} style={{ position: 'relative' }}>
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            left: '30%',
                            display: 'flex',
                            alignItems: 'center',
                        }}>
                            <StarCheckbox checked={isActive && starred === 1} />
                            <SettingsDrawer data={data}/>
                        </div>
                        <CardImage imageUrl={data.design}/>
                    </Grid>
                </Grid>
                <CardButtons isActive={isActive} />
            </Paper>
        </>
    );
}