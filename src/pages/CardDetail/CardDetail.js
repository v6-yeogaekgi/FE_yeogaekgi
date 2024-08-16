import UserCard from '../../components/UserCard/UserCard';
import * as React from 'react';
import { useLocation } from 'react-router';
import UserCardOnDetail from '../../components/UserCardOnDetail/UserCardOnDetail';
import Box from '@mui/material/Box';

export default function CardDetail(props) {

    const location = useLocation();
    const cardData = location.state?.cardData;

    if (!cardData) {
        return <div>Card data not found</div>;
    }

    return (
        <>
            <Box sx={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                paddingBottom: '75px', //
                position: 'relative', //
                overflow: 'hidden', //
            }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        width: '90%',
                        margin: '0 auto',
                        gap: 2,
                        paddingTop: '20px',
                        flexGrow: 1,
                        paddingBottom: '150px', // 하단 여백 추가
                    }}
                >
                    <UserCardOnDetail data={cardData} />
                </Box>
            </Box>
        </>
    );
}