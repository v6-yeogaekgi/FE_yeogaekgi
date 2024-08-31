import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import axios from 'axios';
import { useContext, useEffect } from 'react';
import { AllStateContext } from '../../App';

const CustomStarIcon = ({ filled }) => (
    <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill={filled ? "#FFCB00" : "none"}
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
            stroke={filled ? '#FFCB00' : '#E8E9EB'}
            strokeWidth="2"
        />
    </svg>
);

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
            icon={<CustomStarIcon filled={false}/> }
            checkedIcon={<CustomStarIcon filled={true}/>}
            // icon={<StarBorderIcon />}
            // checkedIcon={<StarIcon />}
            // sx={{
            //     color: 'yellow',
            //     '&.Mui-checked': {
            //         color: 'yellow',
            //     },
            // }}
            onChange={handleClick}
            disabled={!isActive}
        />
    );
};

export default StarCheckbox;