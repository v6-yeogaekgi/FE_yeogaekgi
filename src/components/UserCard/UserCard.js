import { Grid, Typography, Paper, IconButton } from '@mui/material';
import StarCheckbox from '../StarCheckbox/StarCheckBox';
import BasicButton from '../BasicButton/BasicButton';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const commonPaperStyle = {
    width: '90%',
    height: '330px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    cursor: 'pointer',
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
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <BasicButton
            text={'Balance Conversion (P - T)'}
            width={'80%'}
            variant={'outlined'}
            onClick={() => {
                alert('clicked Balance Conversion (P - T)');
            }}
            style={{ marginBottom: '10px' }}
            disabled={!isActive}
        />
        <BasicButton
            text={'Top Up'}
            width={'80%'}
            variant={'outlined'}
            onClick={() => {
                alert('clicked Ton Up');
            }}
            disabled={!isActive}
        />
    </div>
);

const Overlay = () => (
    <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(128, 128, 128, 0.3)',
        display: 'flex',
        justifyContent: 'center',
        // alignItems: 'center',
        zIndex: 1,
        borderRadius: '10px',
    }}>
        <Typography variant="h5" style={{ color: 'white' }}>Expiration</Typography>
    </div>
);

export default function UserCard({ data, onCardClick }) {
    const { status, card_name, pay_balance, transit_balance, starred, exp_date } = data;
    const isActive = status !== 0;

    const handleCardClick = () => {
        if (onCardClick) {
            onCardClick(data);
        }
    };

    return (
        <Paper
            style={commonPaperStyle}
            onClick={handleCardClick}
        >
            {status === 0 && <Overlay />}
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
                    </div>
                    <CardImage />
                </Grid>
            </Grid>
            <CardButtons isActive={isActive} />
        </Paper>
    );
}