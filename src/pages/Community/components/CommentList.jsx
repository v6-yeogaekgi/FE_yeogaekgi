import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import CommentItem from './CommentItem';



const apiUrl = "http://localhost:8090/community/comment/";

const CommentList = ({ postId }) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const getApi = () => {
        axios
            .get(apiUrl + postId)
            .then((res) => {

                setData(res.data);
            })
            .catch((error) => {
                console.error("Error fetching comments:", error);
                setError(error);
                setLoading(false);
            });
    };

    useEffect(() => {
        if (postId) {
            getApi();
        }
    }, [postId]);



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
            {data.length > 0 ? (
                data.map((comment) => (
                    <CommentItem {...comment} />
                ))
            ) : (
                <div>No comments available</div> // 데이터가 없을 때 표시
            )}
        </List>
    );
};

export default CommentList;
