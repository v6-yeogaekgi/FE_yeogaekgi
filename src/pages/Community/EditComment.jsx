import * as React from 'react';
import CommentEditor from './components/CommentEditor';
import { useParams } from 'react-router-dom';
import useComment from './hooks/useComment';
import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';

const drawerBleeding = 56;

const Root = styled('div')(({ theme }) => ({
    height: '100%',
    backgroundColor:
        theme.palette.mode === 'light'
            ? grey[100]
            : theme.palette.background.default,
}));

const StyledBox = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'light' ? '#fff' : grey[800],
}));

const Puller = styled('div')(({ theme }) => ({
    width: 30,
    height: 6,
    backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
    borderRadius: 3,
    position: 'absolute',
    top: 8,
    left: 'calc(50% - 15px)',
}));

const EditComment = (props) => {
    const { window } = props;
    const [open, setOpen] = React.useState(false);

    const { commentId } = useParams();

    return (
        <>
            <div>{commentId}번 comment</div>

            <CommentEditor
                initData={{
                    commentId: 1,
                    postNo: 1,
                    email: 'user1@test.com',
                    nickname: 'test1',
                    content: 'test입니다.',
                    regDate: new Date().getTime(),
                    modDate: new Date().getTime(),
                    countryId: 2,
                }}
                onSubmit={() => alert('Edit 버튼 클릭')}
            />
        </>
    );
};
export default EditComment;
