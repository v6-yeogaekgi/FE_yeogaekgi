import React, { useContext } from 'react';
import { getCountryImgById } from '../../../util';

import Avatar from '@mui/material/Avatar';

import TranslateIcon from '@mui/icons-material/Translate';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import { Delete } from '@mui/icons-material';
import { CommentDispatchContext } from '../Post';
import { useNavigate } from 'react-router-dom';


const CommentItem = ({
                         commentId, email, nickname, content, regDate, modDate, countryId,
                     }) => {

    const { onDelete } = useContext(CommentDispatchContext);


    const onClickDeleteComment = () => {
        onDelete(commentId, email);
    };

    const navigate = useNavigate();

    const goEdit = () =>{
        navigate(`/community/comment/edit/${commentId}`);
    }


    return (
        <div className="CommentItem">
            국적 : <Avatar alt="Country Flag" src={getCountryImgById(countryId)} /> <br />
            등록날짜 : {new Date(regDate).toLocaleDateString()} <br />
            내용 : {content} <br />
            email : {email} <br />
            닉네임 : {nickname} <br />
            수정날짜 : {new Date(modDate).toLocaleDateString()} <br />


            <Button
                id="edit-button"
                size="small"
                aria-label="edit"
                startIcon={<EditIcon />}
                sx={{
                    color: '#4653f9',
                    padding: '4px 8px',
                    fontSize: '0.75rem',
                    height: '24px',
                    minWidth: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    '& .MuiButton-startIcon': {
                        marginRight: 0,
                    },
                }}
                onClick={goEdit}
            />
            <Button
                id="translate-button"
                size="small"
                aria-label="translate"
                startIcon={<TranslateIcon />}
                sx={{
                    color: '#4653f9',
                    padding: '4px 8px',
                    fontSize: '0.75rem',
                    height: '24px',
                    minWidth: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    '& .MuiButton-startIcon': {
                        marginRight: 0,
                    },
                }}


            />
            <Button
                id="Delete-button"
                size="small"
                aria-label="translate"
                startIcon={<Delete />}
                sx={{
                    color: '#4653f9',
                    padding: '4px 8px',
                    fontSize: '0.75rem',
                    height: '24px',
                    minWidth: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    '& .MuiButton-startIcon': {
                        marginRight: 0,
                    },
                }}
                onClick={onClickDeleteComment}

            />
        </div>
    );
};


export default CommentItem;