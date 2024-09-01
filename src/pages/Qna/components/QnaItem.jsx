import React from 'react';
import { useNavigate } from 'react-router-dom';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import { getFormattedDate } from '../../../util';

const QnaItem = ({qnaId ,title, qnaDate, status }) => {
    const navigate = useNavigate();
    const targetDate = new Date(qnaDate);
    return (
        <ListItem>
            <ListItemAvatar>
                {status ? (
                    <CheckCircleIcon sx={{ color: '#4653f9' }} />
                ) : (
                    <HourglassEmptyIcon sx={{ color: '#FF69B4' }} />
                )}
            </ListItemAvatar>
            <ListItemText
                primary={title}
                secondary={getFormattedDate(targetDate)}
                sx={{
                    '& .MuiListItemText-primary': {
                        fontWeight: 'bold',
                        fontFamily: 'NotoSans, sans-serif',
                    },
                    '& .MuiListItemText-secondary': {
                        fontFamily: 'NotoSans, sans-serif',
                    },
                }}
            />
            <ListItemSecondaryAction
                onClick={() => {
                    navigate('/qna/'+qnaId); // 네비게이션할 경로
                }}
            >
                <ChevronRightIcon sx={{ color: '#6E7072' }} />
            </ListItemSecondaryAction>
        </ListItem>
    );
};

export default QnaItem;
