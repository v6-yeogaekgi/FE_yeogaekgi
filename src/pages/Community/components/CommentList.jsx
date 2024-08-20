import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import CommentItem from './CommentItem';

const CommentList = ({ comment }) => {

    return (
        <List
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                    댓글
                </ListSubheader>
            }
        >
            {comment.map((comment) => (
                <CommentItem {...comment} key={comment.id} />
            ))}

        </List>
    );
};

export default CommentList;
