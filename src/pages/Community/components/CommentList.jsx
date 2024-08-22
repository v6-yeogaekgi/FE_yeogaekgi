import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import React, { useState, useEffect, useRef, useContext } from 'react';
import CommentItem from './CommentItem';
import { CommentDispatchContext, CommentStateContext } from '../Post';

const CommentList = () => {
    const { comment } = useContext(CommentStateContext);
    const { onUpdate, onDelete, getApi } = useContext(CommentDispatchContext);

    // 처음 렌더링될 때 실행
    useEffect(() => {
        getApi();
    }, []);

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
