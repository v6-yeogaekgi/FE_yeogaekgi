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

// const CardButtons = ({ isActive }) => (
//     <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//         <BasicButton
//             text={'Balance Conversion (P - T)'}
//             width={'80%'}
//             variant={'outlined'}
//             onClick={() => {
//                 alert('clicked Balance Conversion (P - T)');
//             }}
//             style={{ marginBottom: '10px' }}
//             disabled={!isActive}
//         />
//         <BasicButton
//             text={'Top Up'}
//             width={'80%'}
//             variant={'outlined'}
//             onClick={() => {
//                 alert('clicked Ton Up');
//             }}
//             disabled={!isActive}
//         />
//     </div>
// );

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
    const navigate = useNavigate();
    const { status, card_name, pay_balance, transit_balance, starred } = data;
    const isActive = status !== 0;

    console.log(data.design);

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
        navigate('/wallet/top-up', {state: {data}});
    };

    const handleBalanceConversionClick = (e) => {
        e.stopPropagation(); // 이벤트 버블링 방지
        alert('clicked Balance Conversion (P - T)');
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
                    <CardImage imageUrl={data.design}/>
                    {/*<CardImage imageUrl={'https://yeogaekgi.s3.ap-northeast-2.amazonaws.com/Design.png?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFQaDmFwLW5vcnRoZWFzdC0yIkcwRQIhANBmBjdsmSiWX7IQOpKYjzrWQNR3g7vCNmBBLGny70wWAiBSIQ5Hw4Sa2hsh3a18gh6ZP1EH2VMJSx08ZbG8VYUDCirJAwhdEAAaDDAyNjA5MDU0MTg4MiIMDdiHKOlWcxhmFKlKKqYDz4tosXZSJa%2FExglWT1WHy7QzZTBngDA6xmqOqOpOBBuKrmwT%2Fk24aPVoIV7i2KwKtY3yJQ%2FAZgUqns%2B9%2B4NYBHOFIHG3jmjdw5dzTqdzPih06gyG7fIOJf%2BILaU9%2FfzX3i8iLTjxWUfouXjBsCTbUca8wo9%2BTuqPzmpd9%2B9oIn5Cec%2FNFlVSDozXZyvcrbQhRFNrmiZtqSG4BDUkAjKy4WwnMCjC%2B%2FAI0l9sKxyVH8F8i%2BzCEZPwdzXjXEtXOrcbwJMPeC6HIX1RxCcZ8pjqgWh8sFPQ%2FrQktlAi5iQy7gmarQGx4Ka8lgMGlbU0fQt8Lk%2BMNuKHYgL0Rq9mMX0ooIxHLh66NquyFxQ1fI0G2y%2FXDqLr0bbhUN4X20mX4%2FDB6I7uC8qic5Grc24Ffj4iQFtOCDTgCyWWUZsHO5kOl5SY5%2B16x6tPIArYC0DstDHloTqli6h1WKTeH%2FMkLKxzjbJqKH%2FTNj09hLhjLxAaBozuhtdYAQ1KPc99RQbjngT6QthrUMXJ%2BR5SMw79pDyf9gTGGAM3Q3TRe1shmKzqPZ9GZIRkGVUw%2FIWStgY6lAKRZkmr8X2mJKsLlqCut9CJh9I4%2FmcckkmMk9N96PgapbCEMe6CtDM8soMuWmDLS9kNkYbUidYjGaBPZloa9jIpou9zq5r4aQhOUGr5JMVIc6oXJn8SBh5F0ZRbQZtjr6tbb8qbD6JNLviREuxFNzX7fziI%2FUXWjUXXoYLVfnQpNAsKkUGtwsjxdatZ9hvpwOmd1X9dBPb3pmY%2FRqQBnFwDt1a4tza4FBoros6AdKy4%2F7xCHmlrugD1jSR3Qb8TfCsycjlNROu8%2BWrH5ACDknneGC2QZuLxmW0yWYfnJ9XXi745q3QpmXSgVOqnBmP07CfWLtpLJfVHL%2B8Lg4Rbf3xk5x02fTgDZickO2fXfDB9Wun1nIc%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240820T115222Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIAQMEY6CM5EPA62VFQ%2F20240820%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Signature=e081add374efee6b59d80f18443bf51f669d035f92f95d4aa929e67ae7dfe610'}/>*/}
                </Grid>
            </Grid>
            <CardButtons isActive={isActive} />
        </Paper>
    );
}