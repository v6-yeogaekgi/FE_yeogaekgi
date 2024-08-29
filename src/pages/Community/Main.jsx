import PostList from './components/PostList'
import PostNav from './components/PostNav'
import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate} from 'react-router-dom';
import { AllStateContext } from '../../App';
import axios from 'axios';


export default function Main(props) {

    // ======================== 무한스크롤 구현 ========================
    const observeTarget = useRef(null);    // observe 타겟이 될 요소
    const callback = (entries) =>{ // target이 화면에 나타날때만 호출됨.
        if(isLoading){
            entries.forEach(entry => {
                if(entry.isIntersecting){
                    setIsLoading(false);
                    setSearch({
                        ...search,
                        ...{page:page+1}
                    })

                    console.log({
                        ...search,
                        ...{page:page+1}
                    });

                }
            })
        }
    };
    const options = {
        threshold: 1.0,  // 타겟 요소가 얼마나 들어왔을때 백함수를 실행할 것인지 결정합니다. 1이면 타겟 요소 전체가 들어와야함.
    };
    const observer = new IntersectionObserver(callback, options);
    // =============================================================


    const { protocol ,dialog} = useContext(AllStateContext);
    const location = useLocation();
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const getApiUrl = protocol + 'community/';

    const [likeList, setLikeList] = useState([]);
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [hasMore, setHasMore] = useState(false);
    const [search, setSearch] = useState({
        content:'',
        hashtag:'',
        myPost:false,
        page:page,
    });

    // 처음 렌더링 될 때만 실행
    useEffect(() => {
        if (location.state && location.state.hashtag) {
            console.log(location.state.hashtag)
            setSearch({
                ...search,
                ...{
                    hashtag: location.state.hashtag,
                    page: page
                }
            });
            // 데이터 사용 후 상태를 클리어
            // navigate('/community', { replace: true });
        }
        observer.observe(observeTarget.current);    // observe 타겟 요소 관측 시작
        getLikeListApi();

        return () => {
            // 컴포넌트가 언마운트될 때 실행될 작업
            console.log('컴포넌트가 언마운트되었습니다.');
        };
    }, []);

    // 처음 렌더링 될때와 search 조건 바뀔때
    useEffect(() => {
        getListApi();
        setIsLoading(true);
    }, [search]);



    const getListApi = () => {
        console.log("search : ",search);
        axios.get(getApiUrl+"list", {
            params: search,
            headers: {
                Authorization: token,
                'Content-Type': 'application/json', // 데이터 형식을 명시
            },
        }).then((res) => {
            setPosts(prevPosts => [...prevPosts, ...res.data]); // 데이터 추가
            setPage(prevPage => { // page +1 해주기
                const newPage = prevPage + 1;
                return newPage;
            });
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


    const handleSearch = ( newSearch )=> { // PostNav 컴포넌트에서 search 값 set하기 위함.
        setSearch(newSearch);
    }


    return(
        <div>
            <PostNav handleSearch={handleSearch} search={search}></PostNav>
            <PostList posts = {posts}
                      likeList = {likeList}
            >
            </PostList>
            <dialog.alert.AlertDialog></dialog.alert.AlertDialog>
            <dialog.confirm.ConfirmDialog></dialog.confirm.ConfirmDialog>
            <div ref={observeTarget} style={{display:'flex', height:"30px"}}>
                {/*무한스크롤 : 여기까지 내리면 데이터 로드 */}
            </div>
        </div>
    );
}

