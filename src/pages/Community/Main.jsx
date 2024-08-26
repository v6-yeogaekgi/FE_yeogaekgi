import PostList from './components/PostList'
import PostNav from './components/PostNav'
import React, { useContext, useState, useEffect } from 'react';
import { AllStateContext } from '../../App';
import axios from 'axios';

import useAlertDialog from '../../hooks/useAlertDialog/useAlertDialog';
import useConfirmDialog from '../../hooks/useConfirmDialog/useConfirmDialog';


export default function Main(props) {
    const { protocol, token } = useContext(AllStateContext);
    const { openAlertDialog, AlertDialog } = useAlertDialog();
    const { openConfirmDialog, ConfirmDialog } = useConfirmDialog();
    const getApiUrl = protocol + 'community/';


    const [search, setSearch] = useState({});
    const [likeList, setLikeList] = useState([]);
    const handleSearch = ( newSearch )=> { // PostNav 컴포넌트에서 search 값 set하기 위함.
        setSearch(newSearch);
    }
    const [posts, setPosts] = useState([]);
    const getListApi = () => {
        axios.get(getApiUrl+"list", {
            params: search,
            headers: {
                Authorization: token,
                'Content-Type': 'application/json', // 데이터 형식을 명시
            },
        }).then((res) => {
            setPosts(res.data);
        }).catch((error) => {
            console.error('API 호출 오류:', error);
            throw error;
        });
    };
    const getLikeListApi = () => {
        axios.get(getApiUrl+"likeList", {
            headers: {
                Authorization: token,
                'Content-Type': 'application/json', // 데이터 형식을 명시
            },
        }).then((res) => {
            setLikeList(res.data);
            // return res.data;
        }).catch((error) => {
            console.error('API 호출 오류:', error);
            throw error;
        });
    };








    const [page, setPage] = useState(0);
    useEffect(()=>{
        getLikeListApi();
    },[])
    useEffect(()=>{
        getListApi()

    }, [search])

    return(
        <div>
            <PostNav handleSearch={handleSearch} ></PostNav>
            <PostList posts = {posts}
                      likeList = {likeList}
                      alertDialog={openAlertDialog}
                      confirmDialog={openConfirmDialog}>
            </PostList>
            <AlertDialog></AlertDialog>
            <ConfirmDialog></ConfirmDialog>
        </div>
    );
}

