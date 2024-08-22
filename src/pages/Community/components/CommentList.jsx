import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import React, { useState, useEffect, useRef, useContext } from 'react';
import axios from 'axios';
import CommentItem from './CommentItem';
import { CommentDispatchContext, CommentStateContext } from '../Post';

const CommentList = () => {
    const [comment, setComment] = useState([]);
    const { onUpdate, onDelete } = useContext(CommentDispatchContext);
    const getApiUrl = 'http://localhost:8090/community/comment/';

    //  api 호출 부분
    const getApi = () => {
        axios.get(getApiUrl + '1').then((res) => {
            setComment(res.data);
        });
    };

    useEffect(() => {
        getApi();
    }, []);

    console.log(comment);

    return (
        <List
            sx={{ width: '100%', maxWidth: 400, bgcolor: 'background.paper' }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                    댓글
                </ListSubheader>
            }
        >
            {comment.map((it) => (
                <CommentItem {...it} key={it.id} onDelete={onDelete} />
            ))}
        </List>
    );
};

export default CommentList;
