import { useEffect, useState, useCallback, useContext } from 'react';
import axios from 'axios';
import { AllStateContext } from '../../../App';

const UseServicesMarkerApi = (state) => {
    const [servicesData, setData] = useState(null);
    const [apiLoading, setApiLoading] = useState(false);
    const { protocol } = useContext(AllStateContext);

    const buildQueryString = useCallback(() => {
        const params = [];
        if (state.Tour) params.push('type=TouristAttraction');
        if (state.ACTIVITY) params.push('type=ACTIVITY');
        if (state.ETC) params.push('type=ETC');
        return params.length > 0 ? `?${params.join('&')}` : '';
    }, [state]);

    const serviceListAPI = useCallback(() => {
        setApiLoading(true);
        const queryString = buildQueryString();
        console.log(`${protocol}services/servicesList${queryString}`);
        axios
            .get(`${protocol}services/servicesList${queryString}`)
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
    }, [serviceListAPI]);
    return { servicesData, apiLoading };
};

export default UseServicesMarkerApi;
