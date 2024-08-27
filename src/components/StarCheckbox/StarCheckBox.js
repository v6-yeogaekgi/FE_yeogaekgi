import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import axios from 'axios';
import { useContext } from 'react';
import { AllStateContext } from '../../App';

const StarCheckbox = ({ checked, userCardId, onChange }) => {
    const { protocol } = useContext(AllStateContext);
    const token = localStorage.getItem('token');

    const uri = protocol + 'usercard/modify/star';


    const handleClick = () => {

        if (checked) {
            alert('test')
        } else {
            axios
                .post(uri,
                    {
                        userCardId : userCardId
                    },
                    {
                        headers: {
                            Authorization: token,
                            'Content-Type': 'application/json',
                        },
                    },
                )
                .then((res) => {
                    if(res.ok) {
                        console.log("주카드 설정");
                    }else{
                        console.log("에러 발생");
                    }
                })
                .catch((err) => {
                    console.error('API 요청 중 오류 발생:', err);
                });
        }
    }

    return (
        <Checkbox
            checked={checked}
            icon={<StarBorderIcon />}
            checkedIcon={<StarIcon />}
            sx={{
                color: "yellow",
                "&.Mui-checked": {
                    color: "yellow",
                },
            }}
            // onClick={onClick}
            onClick={handleClick}
            onChange={onChange}
        />
    );
};

export default StarCheckbox;