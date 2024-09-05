import React from 'react';
import BasicButton from '../../../components/BasicButton/BasicButton';
import { Box, Button, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

export default function RecentVisit({ data }) {
    const { serviceNo, serviceName, payPrice, formatPayDate } = data;
    return (
        <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            border="1px solid #e0e0e0"
            borderRadius="8px"
            padding="16px"
            marginBottom="16px"
        >
            <Box>
                <Typography variant="h6" component="div">
                    {serviceName}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    Visited on {formatPayDate}
                </Typography>
            </Box>

            <Box display="flex" alignItems="center">
                <Button
                    startIcon={<EditIcon />}
                    variant="text"
                    color="primary"
                    onClick={() => alert('리뷰 쓰기 클릭')}
                >
                    리뷰 쓰기
                </Button>
                <Typography variant="h6" style={{ marginLeft: '16px' }}>
                    {payPrice}원
                </Typography>
            </Box>
        </Box>
        // <>
        //     받아온 값: {serviceNo}<br/>
        //     장소 이름: {serviceName}<br/>
        //     방문 일자: {formatPayDate}<br/>
        //     금액: {payPrice}<br/>
        //     <BasicButton text={"Write Review"}></BasicButton>
        //     <br/><br/>
        // </>
    );
}
