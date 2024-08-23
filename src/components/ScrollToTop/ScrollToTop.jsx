import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0); // 페이지가 변경될 때 스크롤을 맨 위로 이동
    }, [pathname]);

    return null; // 이 컴포넌트는 UI를 렌더링하지 않음
};

export default ScrollToTop;
