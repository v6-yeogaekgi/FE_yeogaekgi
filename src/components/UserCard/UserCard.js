import { Grid, Typography, Paper, IconButton } from '@mui/material';
import StarCheckbox from '../StarCheckbox/StarCheckBox';
import BasicButton from '../BasicButton/BasicButton';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SettingsDrawer from '../SettingsDrawer/SettingsDrawer';

const commonPaperStyle = (isActive) => ({
    width: '90%',
    height: '330px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    cursor: isActive ? 'pointer' : 'default',
    position: 'relative',  // 오버레이 위치 기준점
});

const CardImage = ({ imageUrl, isOverlayActive }) => (
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
                ...(isOverlayActive ? { filter: 'brightness(80%)' } : {})
            }}
        />
    </div>
);

const Overlay = () => (
    <div style={{
        position: 'absolute',
        top: -10,
        left: -30,
        right: -30,
        bottom: -10,
        backgroundColor: 'rgba(19, 19, 19, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        // alignItems: 'center',
        zIndex: 1,
        borderRadius: '10px',
    }}>
        <Typography variant="h5" style={{ color: 'white' }}></Typography>
    </div>
);

export default function UserCard({ data, onCardClick }) {
    const navigate = useNavigate();
    const { status, cardName, payBalance, transitBalance, starred } = data;
    const isActive = status !== 0;
    const imageUrl = status === 0 ? '../../img/exp_design.png' : data.design;

    const handleCardClick = (e) => {

        if (!isActive) return;

        // SettingsDrawer나 버튼 영역을 클릭했는지 확인
        if (e.target.closest('.MuiDrawer-root') || e.target.closest('button')) {
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
        navigate('/wallet/top-up', { state: { data } });
    };

    const handleBalanceConversionClick = (e) => {
        e.stopPropagation(); // 이벤트 버블링 방지
        navigate('/wallet/conversion', { state: { data } });
    };

    const CardButtons = ({ isActive }) => (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <BasicButton
                text={'Balance Conversion (P - T)'}
                width={'80%'}
                variant={'outlined'}
                onClick={handleBalanceConversionClick}
                style={{ marginBottom: '10px' }}
                disabled={!isActive}
            />
            <BasicButton
                text={'Top Up'}
                width={'80%'}
                variant={'outlined'}
                onClick={handleTopUpClick}
                disabled={!isActive}
            />
        </div>
    );

    return (
        <Paper
            style={commonPaperStyle(isActive)}
            onClick={handleCardClick}
        >
            {status === 0 && <Overlay />}
            <Grid container spacing={2} style={{ zIndex: 2 }}>
                <Grid item xs={8}>
                    <Typography variant="h7">{cardName}</Typography>
                    <Typography>Pay Balance </Typography>
                    <Typography variant="h5">₩{payBalance.toLocaleString()}</Typography>
                    <Typography>Transit Balance </Typography>
                    <Typography variant="h5">₩{transitBalance.toLocaleString()}</Typography>
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
                        <div onClick={(e) => e.stopPropagation()}>
                            <SettingsDrawer data={data} />
                        </div>
                    </div>
                    <CardImage imageUrl={imageUrl} isOverlayActive={status === 0} />
                </Grid>
            </Grid>
            <CardButtons isActive={isActive} />
        </Paper>
    );
}