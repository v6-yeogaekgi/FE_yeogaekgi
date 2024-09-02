import PostList from './components/PostList';
import PostNav from './components/PostNav';
import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    useRef,
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AllStateContext } from '../../App';
import axios from 'axios';
import Box from '@mui/material/Box';

export default function Main(props) {
    // ======================== 무한스크롤 구현 ========================
    const observeTarget = useRef(null); // observe 타겟이 될 요소
    const callback = (entries) => {
        // target이 화면에 나타날때만 호출됨.
        if (isLoading || !hasNext) {
            return;
        } // 로딩중이면 무사
        console.log('hasNext: ', hasNext);
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                setSearch({
                    ...search,
                    ...{ page: search.page + 1 },
                });
            }
        });
    };
    const options = {
        threshold: 1.0, // 타겟 요소가 얼마나 들어왔을때 백함수를 실행할 것인지 결정합니다. 1이면 타겟 요소 전체가 들어와야함.
    };
    const observer = new IntersectionObserver(callback, options);
    // =============================================================

    const { protocol, dialog } = useContext(AllStateContext);
    const location = useLocation();
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const getApiUrl = protocol + 'community/';

    const [likeList, setLikeList] = useState([]);
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasNext, setHasNext] = useState(true);
    const [search, setSearch] = useState({
        type: location?.state?.hashtag ? 'hashtag' : 'content',
        keyword: location?.state?.hashtag || '',
        myPost: false,
        page: 0,
    });
    const [inputValue, setInputValue] = useState(
        search.type === 'hashtag' ? `#${search.keyword}` : search.keyword,
    );

    // 처음 렌더링 될 때만 실행
    useEffect(() => {
        observer.observe(observeTarget.current); // observe 타겟 요소 관측 시작
        getLikeListApi();
        if (location.state && location.state.hashtag) {
            setInputValue(`#${location.state.hashtag}`);
            handleSearch({
                type: 'hashtag',
                keyword: location.state.hashtag,
                myPost: false,
                page: 0,
            });
            console.log(search);
            navigate('/community', { replace: true });
        }
    }, [location.state]);
    // useEffect(() => {
    // }, [location.state]);

    // 처음 렌더링 && search 조건 바뀔때 실행
    useEffect(() => {
        console.log('search');
        if (!isLoading) {
            console.log('search:', search);
            // Api 호출 중이 아닐 때
            getListApi();
        }
        console.log('hasNext: ', hasNext);
    }, [search]);

    // observe 타겟 요소 관측 시작 및 종료
    useEffect(() => {
        console.log('isLoading');
        const target = observeTarget.current;
        if (target) {
            if (!isLoading) {
                observer.observe(target);
            } else {
                observer.unobserve(target);
            }
        }
        return () => {
            if (target) {
                observer.unobserve(target);
            }
        };
    }, [isLoading]);

    const getListApi = () => {
        console.log('search : ', search);
        setIsLoading(true); // 데이터 로드 시작 시 로딩 상태를 true로 설정
        axios
            .get(getApiUrl + 'list', {
                params: search,
                headers: {
                    Authorization: token,
                    'Content-Type': 'application/json', // 데이터 형식을 명시
                },
            })
            .then((res) => {
                setPosts((prevPosts) => [...prevPosts, ...res?.data?.content]);
                console.log('여기');
                console.log(res.data.content); // 데이터 추가
                setIsLoading(false);
                setHasNext(res.data.hasNext);
                console.log('res.data:', res.data);
            })
            .catch((error) => {
                console.error('API 호출 오류:', error);
                setIsLoading(false);
                setPosts((prevPosts) => [...prevPosts]);
            });
    };
    const getLikeListApi = () => {
        axios
            .get(getApiUrl + 'likeList', {
                headers: {
                    Authorization: token,
                    'Content-Type': 'application/json', // 데이터 형식을 명시
                },
            })
            .then((res) => {
                setLikeList(res.data);
                // return res.data;
            })
            .catch((error) => {
                console.error('API 호출 오류:', error);
            });
    };

    const handleSearch = (newSearch) => {
        // PostNav 컴포넌트에서 search 값 set하기 위함.
        if (JSON.stringify(search) !== JSON.stringify(newSearch)) {
            setPosts([]);
            setHasNext(true);
            setIsLoading(false);
            setSearch(newSearch);
        }
    };
    // ================ [start] DeepL api 호출 부분 ================

    const deepLApi = (text, target_lang) => {
        const data = {
            text: [text],
            target_lang: target_lang,
        };

        return axios
            .post(protocol + 'api/translate', data, {
                headers: {
                    Authorization: token,
                    'Content-Type': 'application/json',
                },
            })
            .then((res) => {
                console.log(res.data.translations[0].text);
                return res.data.translations[0].text;
            })
            .catch((error) => {
                console.error('API 호출 오류:', error);
                throw error;
            });
    };

    return (
        <div>
            <Box className="PostList" sx={{ mr: 2, ml: 2, mt: 1 }}>
                <PostNav
                    handleSearch={handleSearch}
                    inputValue={inputValue}
                    setInputValue={setInputValue}
                ></PostNav>
            </Box>

            <PostList
                posts={posts}
                likeList={likeList}
                deepLApi={deepLApi}
            ></PostList>
            <dialog.alert.AlertDialog></dialog.alert.AlertDialog>
            <dialog.confirm.ConfirmDialog></dialog.confirm.ConfirmDialog>
            <div
                ref={observeTarget}
                style={{
                    display: 'flex',
                    height: '30px',
                }}
            >
                {/*무한스크롤 : 여기까지 내리면 데이터 로드 */}
            </div>
        </div>
    );
}
