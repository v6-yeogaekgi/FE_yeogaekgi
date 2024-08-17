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

const CardImage = () => (
    <div style={{
        width: '100%',
        height: '150px',
        backgroundColor: '#f0f0f0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '10px',
        marginTop: '30px',
    }}>
        Card Image
    </div>
    // <IconButton
    //     onClick={() => {
    //     //     상세 이동
    //     }}
    // >
    // {/* 카드 이미지 임포트 */}
    // </IconButton>
);

const CardButtons = ({ isActive }) => (
    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
        <BasicButton
            text={'Transit Details'}
            width={'45%'}
            variant={'outlined'}
            onClick={() => {
                alert('clicked Transit Details');
            }}
            disabled={!isActive}
        />
        <BasicButton
            text={'Pays Details'}
            width={'45%'}
            variant={'outlined'}
            onClick={() => {
                alert('clicked Pays Details');
            }}
            disabled={!isActive}
        />
    </div>
);

export default function UserCardOnDetail({ data, onCardClick }) {
    const { status, card_name, pay_balance, transit_balance, starred } = data;
    const isActive = status !== 0;

    const handleCardClick = () => {
        if (onCardClick) {
            onCardClick(data);
        }
    };

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
                            <SettingsDrawer />
                        </div>
                        <CardImage />
                    </Grid>
                </Grid>
                <CardButtons isActive={isActive} />
            </Paper>
        </>
    );
}