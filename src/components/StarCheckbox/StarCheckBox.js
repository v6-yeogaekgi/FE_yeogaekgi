import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import axios from 'axios';
import { useContext, useEffect } from 'react';
import { AllStateContext } from '../../App';

const StarCheckbox = ({ initialChecked, userCardId, onStarChange, isActive }) => {
    const [checked, setChecked] = React.useState(initialChecked);
    const { protocol } = useContext(AllStateContext);
    const token = localStorage.getItem('token');

    useEffect(() => {
        setChecked(initialChecked);
    }, [initialChecked]);

    const handleClick = () => {
        if (!isActive) return;

        const newState = !checked;
        const uri = newState
            ? `${protocol}usercard/modify/star`
            : `${protocol}usercard/delete/star`;

        axios.put(uri, { userCardId }, {
            headers: {
                Authorization: token,
                'Content-Type': 'application/json',
            },
        })
            .then((res) => {
                if (res.status === 200) {
                    setChecked(newState);
                    onStarChange(newState);
                }
            })
            .catch((err) => {
                console.error('API 요청 중 오류 발생:', err);
            });
    };

    return (
        <Checkbox
            checked={checked}
            icon={<StarBorderIcon />}
            checkedIcon={<StarIcon />}
            sx={{
                color: 'yellow',
                '&.Mui-checked': {
                    color: 'yellow',
                },
            }}
            onChange={handleClick}
            disabled={!isActive}
        />
    );
};

export default StarCheckbox;