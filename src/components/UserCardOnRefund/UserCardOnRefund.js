import { Grid, Typography, Paper, IconButton } from '@mui/material';
import StarCheckbox from '../StarCheckbox/StarCheckBox';
import BasicButton from '../BasicButton/BasicButton';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const commonPaperStyle = {
    width: '90%',
    height: '200px',
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

export default function UserCardOnRefund({ data }) {
    const navigate = useNavigate();
    const { cardName, payBalance, transitBalance, starred } = data;

    return (
        <Paper
            style={commonPaperStyle}
        >
            <Grid container spacing={2} style={{ zIndex: 2 }}>
                <Grid item xs={8} marginTop={'10px'}>
                    <Typography variant="h7">{cardName}</Typography>
                    <Typography marginTop={'30px'}>Pay Balance </Typography>
                    <Typography variant="h5">{payBalance.toLocaleString()}₩</Typography>
                    {/*<Typography>Transit Balance </Typography>*/}
                    {/*<Typography variant="h5">{transitBalance.toLocaleString()}₩</Typography>*/}
                </Grid>
                <Grid item xs={4} style={{ position: 'relative' }}>
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: '30%',
                        display: 'flex',
                        alignItems: 'center',
                    }}>
                    </div>
                    <CardImage imageUrl={data.design} />
                </Grid>
            </Grid>
        </Paper>
    );
}