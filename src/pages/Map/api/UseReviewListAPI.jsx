import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelected } from '../provider/SelectedProvider';
import { useReview } from '../provider/ReviewProvider';

const UseReviewListAPI = (SelectedService) => {
    const [list, setList] = useState();
    const [listApiLoading, setlistApiLoading] = useState(false);

    const serviceListAPI = () => {
        setlistApiLoading(true);
        if (SelectedService != null) {
            axios
                .get(
                    `http://localhost:8090/review/${SelectedService}/reviewList?page=0&size=3&sort=modDate,DESC`,
                )
                .then((res) => {
                    setList(res.data);
                    setlistApiLoading(false);
                })
                .catch((error) => {
                    setlistApiLoading(false);
                    console.error('Error fetching services data:', error);
                });
        }
    };

    useEffect(() => {
        // 컴포넌트가 마운트될 때 API 호출
        serviceListAPI();
    }, [SelectedService]);

    return { list, listApiLoading };
};

export default UseReviewListAPI;
