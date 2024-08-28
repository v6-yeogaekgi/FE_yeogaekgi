import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import axios from 'axios';
import { useContext, useEffect } from 'react';
import { AllStateContext } from '../../App';

const StarCheckbox = ({ initialChecked, userCardId, isActive }) => {
    const { protocol } = useContext(AllStateContext);
    const token = localStorage.getItem('token');
    const [checked, setChecked] = React.useState(initialChecked);

    const getApi = (uri) => {
        axios
            .put(uri,
                {
                    userCardId: userCardId,
                },
                {
                    headers: {
                        Authorization: token,
                        'Content-Type': 'application/json',
                    },
                },
            )
            .then((res) => {
                if (res.status === 200) {
                    console.log('주카드 설정');
                    setChecked(!checked);
                } else {
                    console.log('에러 발생');
                    setChecked(!checked);
                }
            })
            .catch((err) => {
                console.error('API 요청 중 오류 발생:', err);
            });
    };

    const handleClick = () => {
        if(!isActive) return;

        if (checked) {
            getApi(protocol + 'usercard/delete/star');
        } else {
            getApi(protocol + 'usercard/modify/star');
        }
    };

    useEffect(() => {
        setChecked(initialChecked);
    }, [initialChecked]);

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
            onChange={() => {
                handleClick();
            }}
        />
    );
};

export default StarCheckbox;