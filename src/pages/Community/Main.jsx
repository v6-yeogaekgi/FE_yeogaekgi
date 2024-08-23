import PostList from './components/PostList'
import PostNav from './components/PostNav'
import { useContext, useState, useEffect } from 'react';
import { AllStateContext } from '../../App';
import axios from 'axios';


export default function Main(props) {
    const { protocol, token } = useContext(AllStateContext);
    const getApiUrl = protocol + 'community/';


    const [search, setSearch] = useState({});
    const handleSearch = ( newSearch )=> { // PostNav 컴포넌트에서 search 값 set하기 위함.
        setSearch(newSearch);
        console.log(newSearch);
    }
    const [posts, setPosts] = useState([]);
    const getListApi = () => {
        console.log(search);
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








    const [page, setPage] = useState(0);



    useEffect(()=>{
        getListApi()
    }, [search])

    return(
        <div>
            <PostNav handleSearch={handleSearch}></PostNav>
            <PostList posts = {posts}>
            </PostList>
        </div>
    );
}

