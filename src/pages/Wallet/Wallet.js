import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import UserCard from '../../components/UserCard/UserCard';
import axios from 'axios';

export default function Wallet(props) {
    const [data, setData] = useState(null);
    const [param, setParam] = useState({
        page: 1,
    });

    const [error, setError] = useState(null);

    const getApi = () => {
        axios
            .get("https://api.yeogaekgi.site", { params: param })
            .then((res) => {
                setData(res.data.result.content);
            })
            .catch((err) => {
                console.error("API 요청 중 오류 발생:", err);
                setError("데이터를 불러오는 데 실패했습니다.");
            });
    };

    useEffect(() => {
        if (process.env.NODE_ENV !== 'development') {
            getApi();
        } else {
            setData([
                {
                    card_name: '예시 카드 1',
                    design: '디자인 예시',
                    pay_balance: 10000,
                    transit_balance: 5000,
                    status: 1,
                    starred: 1
                },
                {
                    card_name: '예시 카드 2',
                    design: '디자인 예시',
                    pay_balance: 20000,
                    transit_balance: 7000,
                    status: 0,
                    starred: 0
                },
                // {
                //     card_name: '예시 카드 3',
                //     design: '디자인 예시',
                //     pay_balance: 20000,
                //     transit_balance: 7000,
                //     status: 1,
                //     starred: 0
                // },
            ]);
        }
    }, []);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', gap: 2 }}>
            {data && data.map((cardData, index) => (
                <UserCard key={index} data={cardData} />
            ))}
        </Box>
    );
}