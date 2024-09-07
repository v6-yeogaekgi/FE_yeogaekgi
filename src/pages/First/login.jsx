import React, { useState, useRef, useEffect, useMemo, useContext } from 'react';
import { AllStateContext } from '../../App';
import {
    Avatar,
    Box,
    Button,
    Checkbox,
    Container,
    FormControlLabel,
    Grid,
    Link,
    TextField,
    Typography,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import yeogakgi from '../../img/yeogakgi_full.png';
import BasicButton from '../../components/BasicButton/BasicButton';
import { CircularProgress } from '@mui/material';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { protocol } = useContext(AllStateContext);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const getApiUrl = protocol + 'members/login';
    const memberUrl = protocol + 'members/detail';

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {
            email: email,
            password: password,
        };

        try {
            setLoading(true);
            const response = await axios.post(getApiUrl, data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const { token } = response.data;
            localStorage.setItem('token', token);
            const memberDetailsResponse = await axios.post(memberUrl, data, {
                headers: {
                    Authorization: `${token}`,
                    'Content-Type': 'application/json',
                },
            });
            const { user } = memberDetailsResponse.data;
            localStorage.setItem('member', JSON.stringify(user));
            navigate('/home');
            console.log('로그', localStorage.getItem('member'));
        } catch (error) {
            setLoading(false);
            console.error('API 호출 오류:', error);
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '90vh',
            }}
        >
            <Container component="main" sx={{ width: '360px' }}>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <img
                        src={yeogakgi} // 여기에 이미지 경로를 넣으세요
                        alt="yeogakgi"
                        style={{ width: 360 }}
                    />

                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        noValidate
                        sx={{ mt: 1 }}
                    >
                        <TextField
                            label="Email Address"
                            required
                            fullWidth
                            name="email"
                            autoComplete="email"
                            autoFocus
                            margin="normal"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            InputProps={{
                                sx: {
                                    borderRadius: 5,
                                    backgroundColor: 'white',
                                    fontFamily: 'Noto Sans',
                                },
                            }}
                        />
                        <TextField
                            margin="normal"
                            label="Password"
                            type="password"
                            required
                            fullWidth
                            name="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            InputProps={{
                                sx: {
                                    borderRadius: 5,
                                    backgroundColor: 'white',
                                    fontFamily: 'Noto Sans',
                                },
                            }}
                        />

                        <BasicButton
                            type={'submit'}
                            text={'Sign In'}
                            size={'small'}
                            width={'100%'}
                            variant={'contained'}
                        ></BasicButton>
                        <Grid container sx={{ mt: 2 }}>
                            <Grid item xs>
                                <Link
                                    href="#"
                                    sx={{
                                        fontFamily: 'Noto Sans',
                                        color: 'gray',
                                        textDecoration: 'none',
                                        '&:hover': {
                                            textDecoration: 'underline',
                                        },
                                    }}
                                >
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link
                                    href="#"
                                    sx={{
                                        fontFamily: 'Noto Sans',
                                        color: 'gray',
                                        textDecoration: 'none',
                                        '&:hover': {
                                            textDecoration: 'underline',
                                        },
                                    }}
                                >
                                    Sign up
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
            {loading && (
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        zIndex: 1,
                    }}
                >
                    <CircularProgress sx={{ color: '#4653f9' }} />
                </Box>
            )}
        </Box>
    );
}

export default Login;
