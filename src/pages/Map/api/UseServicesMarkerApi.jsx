import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useSelected } from '../provider/SelectedProvider';

const UseServicesMarkerApi = (state) => {
    const [data, setData] = useState(null);
    const [apiLoading, setApiLoading] = useState(false);

    const buildQueryString = useCallback(() => {
        const params = [];
        if (state.Tour) params.push('TouristAttraction=TouristAttraction');
        if (state.ACTIVITY) params.push('ACTIVITY=ACTIVITY');
        if (state.ETC) params.push('ETC=ETC');
        return params.length > 0 ? `?${params.join('&')}` : '';
    }, [state]);

    const serviceListAPI = useCallback(() => {
        setApiLoading(true);
        const queryString = buildQueryString();
        axios
            .get(`http://localhost:8090/services/servicesList${queryString}`)
            .then((res) => {
                setData(res.data);
                setApiLoading(false);
            })
            .catch((error) => {
                setApiLoading(false);
                console.error('Error fetching services data:', error);
            });
    }, [buildQueryString]);

    useEffect(() => {
        serviceListAPI();
        console.log('리렌더링됨');
    }, [serviceListAPI]);

    return { data, apiLoading };
};

export default UseServicesMarkerApi;
