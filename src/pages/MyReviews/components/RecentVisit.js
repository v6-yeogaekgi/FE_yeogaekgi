import React from 'react';
import BasicButton from '../../../components/BasicButton/BasicButton';
import {
    Box,
    Button,
    Card,
    CardContent,
    Divider,
    Rating,
    Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

export default function RecentVisit({ data }) {
    const { serviceNo, serviceName, payPrice, formatPayDate } = data;
    return (
        <Card
            key={serviceNo}
            sx={{
                padding: '14px 10px 0px 10px',
                boxShadow: 'none',
                borderRadius: 5,
                backgroundColor: '#ffffff',
                position: 'relative',
                margin: 2,
            }}
        >
            <CardContent sx={{ marginBottom: '0px', paddingBottom: '0px' }}>
                <Typography sx={{ ml: 0.8, fontWeight: 'bold' }}>
                    {serviceName}
                </Typography>

                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        width: '70%',
                    }}
                >
                    <Typography
                        component="span"
                        variant="caption"
                        color="text.secondary"
                        // variant="body2"
                        sx={{ ml: 1 }}
                    >
                        {formatPayDate || 'N/A'}
                    </Typography>
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        width: '70%',
                    }}
                >
                    <Typography
                        component="span"
                        variant="caption"
                        color="text.secondary"
                        // variant="body2"
                        sx={{ ml: 1 }}
                    >
                        {payPrice}원
                    </Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                        startIcon={<EditIcon />}
                        variant="text"
                        color="primary"
                        onClick={() => alert('리뷰 쓰기 클릭')}
                        sx={{ textTransform: 'capitalize' }}
                    >
                        Write Review
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
}
