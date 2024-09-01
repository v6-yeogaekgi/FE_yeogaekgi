import QnaItem from './/QnaItem';
import React from 'react';
import List from '@mui/material/List';
import { Box } from '@mui/material';

const mockData = [
    {
        id: 1,
        title: '첫 번째 문의',
        qnaDate: '2024-08-25',
        status: true, // 답변 완료
    },
    {
        id: 2,
        title: '두 번째 문의',
        qnaDate: '2024-08-26',
        status: false, // 답변 대기중
    },
    {
        id: 3,
        title: '세 번째 문의',
        qnaDate: '2024-08-27',
        status: true, // 답변 완료
    },
    {
        id: 4,
        title: '네 번째 문의',
        qnaDate: '2024-08-28',
        status: false, // 답변 대기중
    },
];

const QnaList = ({ qnaItem }) => {
    return (
        <List
            sx={{
                width: '100%',
                maxWidth: 360,
                bgcolor: 'background.paper',
                mt: 2,
                borderRadius: 5,
            }}
        >
            {qnaItem?.length > 0 ? (
                qnaItem.map((item) => <QnaItem key={item.id} {...item} />)
            ) : (
                <Box>Qna가 없습니다</Box>
            )}
        </List>
    );
};

export default QnaList;
