import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useSelected } from './SelectedProvider';

const UseServicesMarkerApi = () => {
    const [data, setData] = useState(null);
    const [apiLoading, setApiLoading] = useState(false);
    const { State } = useSelected();

    const buildQueryString = useCallback(() => {
        const params = [];
        if (State.Tour) params.push('TouristAttraction=TouristAttraction');
        if (State.ACTIVITY) params.push('ACTIVITY=ACTIVITY');
        if (State.ETC) params.push('ETC=ETC');
        return params.length > 0 ? `?${params.join('&')}` : '';
    }, [State]);

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
    }, [serviceListAPI]);

    return { data, apiLoading };
};

export default UseServicesMarkerApi;
