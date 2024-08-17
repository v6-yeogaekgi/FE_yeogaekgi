import * as React from 'react';
import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch, { SwitchProps } from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    '& .MuiSwitch-switchBase': {
        margin: 1,
        padding: 0,
        transform: 'translateX(6px)',
        '&.Mui-checked': {
            color: '#fff',
            transform: 'translateX(22px)',
            '& .MuiSwitch-thumb:before': {
                backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                    '#fff',
                )}" d="M18 4H2C.9 4 0 4.9 0 6v8c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 10H2V9h16v5zm0-7H2V6h16v1z"/></svg>')`,
            },
            '& + .MuiSwitch-track': {
                opacity: 1,
                backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
            },
        },
    },
    '& .MuiSwitch-thumb': {
        backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
        width: 32,
        height: 32,
        '&::before': {
            content: "''",
            position: 'absolute',
            width: '100%',
            height: '100%',
            left: 0,
            top: 0,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                '#fff',
            )}" d="M4 11a1 1 0 100 2 1 1 0 000-2zm12 0a1 1 0 100 2 1 1 0 000-2zm2-7H2C1.45 4 1 4.45 1 5v9c0 .55.45 1 1 1h1c0 1.66 1.34 3 3 3s3-1.34 3-3h4c0 1.66 1.34 3 3 3s3-1.34 3-3h1c.55 0 1-.45 1-1V5c0-.55-.45-1-1-1zM6 16.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm9 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM17 11H3V6h14v5z" stroke="${encodeURIComponent('#fff')}" stroke-width="0.5"/></svg>')`,
        },
    },
    '& .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
        borderRadius: 20 / 2,
    },
}));

export default function CustomizedSwitches({checked, onChange}) {
    return (
        <FormGroup>
            <FormControlLabel
                control={<MaterialUISwitch sx={{ m: 1 }} checked={checked} onChange={onChange} />}
            />
        </FormGroup>
    );
}