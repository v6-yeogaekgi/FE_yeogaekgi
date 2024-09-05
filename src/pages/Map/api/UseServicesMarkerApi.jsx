import { useEffect, useState, useCallback, useContext } from 'react';
import axios from 'axios';
import { AllStateContext } from '../../../App';

const useServicesMarkerApi = (state, activity, myState) => {
    const [servicesData, setServicesData] = useState(null);
    const [apiLoading, setApiLoading] = useState(false);
    const { protocol } = useContext(AllStateContext);
    const selectArea = localStorage.getItem('selectArea');
    const token = localStorage.getItem('token');

    const buildQueryString = useCallback(() => {
        const params = [];
        if (state.Tour) params.push('type=TouristAttraction');
        if (state.ACTIVITY) params.push('type=ACTIVITY');
        if (state.ETC) params.push('type=ETC');
        if (activity) params.push('type=ACTIVITY');
        if (myState.myLike) params.push('myLike=true');
        if (myState.myReview) params.push('myReview=true');
        return params.length > 0 ? `?${params.join('&')}` : '';
    }, [state, myState]);

    // Function to fetch service list data
    const fetchServiceList = useCallback(() => {
        const area = selectArea === 'Seoul' ? 'Seoul' : 'Jeju';
        setApiLoading(true);
        const queryString = buildQueryString();
        console.log(queryString);
        axios
            .get(`${protocol}services/servicesList/${area}${queryString}`, {
                headers: {
                    Authorization: token,
                },
            })
            .then((res) => {
                setServicesData(res.data);
                console.log(res.data);
                setApiLoading(false);
            })
            .catch((error) => {
                setApiLoading(false);
                console.error('Error fetching services data:', error);
            });
    }, [buildQueryString, protocol]);

    // Fetch data when the state changes
    useEffect(() => {
        console.log('새로운 상태로 데이터를 가져옵니다:', state); // 상태 변경 시 로깅
        fetchServiceList();
    }, [fetchServiceList, state]); // state가 추가되어야 함

    return { servicesData, apiLoading };
};

export default useServicesMarkerApi;
