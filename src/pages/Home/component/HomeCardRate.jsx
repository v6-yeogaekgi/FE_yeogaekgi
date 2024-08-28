import {
    Box,
    Card,
    CardContent,
    Typography,
    IconButton,
    Button,
    Grid,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import cardImg from '../../../img/Design.png';
import Avatar from '@mui/material/Avatar';
import { useState, React } from 'react';
import { getCountryImgById, getCountryCodeToCurrency } from '../../../util';
import { getExchangeRate } from '../../../components/ExchangeRateManager/ExchangeRateManager';

const STYLE = {
    rateBox: {
        width: '150px',
        height: '100px',
        backgroundColor: '#f0f4f8',
        borderRadius: 5,
        margin: '15px',
        display: 'flex', // Flexbox 활성화
        flexDirection: 'column', // 항목을 수직으로 정렬
        justifyContent: 'center', // 수직 가운데 정렬
        alignItems: 'center', // 수평 가운데 정렬
        paddingTop: '2px',
    },
};

const HomaCardRate = () => {
    const [member, setMember] = useState(
        JSON.parse(localStorage.getItem('member')),
    );

    const storedRates = getExchangeRate();

    return (
        <div>
            <Card
                className={'box-title'}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: 'auto',
                    width: 360, // 가로 크기 360px 설정
                    boxShadow: 'none', // 그림자 효과 제거
                    borderRadius: 5, // 모서리를 둥글게 설정
                }}
            >
                <Typography
                    sx={{
                        backgroundColor: '#2e85e0',
                        color: '#FFFFFF',
                        textAlign: 'center',
                        padding: '5px',
                        fontFamily: 'Noto Sans, sans-serif',
                        height: 34,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    Exchange rate
                </Typography>

                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-around',
                    }}
                >
                    <Box sx={STYLE.rateBox}>
                        <Avatar
                            alt="Country Flag"
                            src={getCountryImgById(member.country.code)}
                            sx={{ mb: 1, mt: 1 }}
                        />
                        <Typography
                            sx={{
                                textAlign: 'center',
                                padding: '5px',
                                fontFamily: 'Noto Sans, sans-serif',
                            }}
                        >
                            {1} {getCountryCodeToCurrency(member)}
                        </Typography>
                    </Box>
                    <Box sx={STYLE.rateBox}>
                        <Avatar
                            alt="Country Flag"
                            src={getCountryImgById('KR')}
                            sx={{ mb: 1, mt: 1 }}
                        />
                        <Typography
                            sx={{
                                textAlign: 'center',
                                padding: '5px',
                                fontFamily: 'Noto Sans, sans-serif',
                            }}
                        >
                            {191.1} {'KRW'}
                        </Typography>
                    </Box>
                </div>
            </Card>
        </div>
    );
};
export default HomaCardRate;
