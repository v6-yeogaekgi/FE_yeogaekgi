import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelected } from '../provider/SelectedProvider';
import { useReview } from '../provider/ReviewProvider';

const UseReviewImgListAPI = (SelectedService) => {
    // Array of objects containing images and user data
    console.log('값 변경됨' + SelectedService);

    useEffect(() => {
        serviceImgListAPI();
    }, [SelectedService]);

    const [img, setImg] = useState();
    const [imgApiLoading, setApiLoading] = useState(false);

    const serviceImgListAPI = () => {
        setApiLoading(true);
        if (SelectedService != null) {
            console.log(
                `http://localhost:8090/review/${SelectedService}/ImgList`,
            );
            axios
                .get(`http://localhost:8090/review/${SelectedService}/ImgList`)
                .then((res) => {
                    const parsedData = res.data.flatMap((item) =>
                        item.images.map((image) => ({
                            imageUrl: image,
                            nickname: item.nickname,
                            countryCode: item.country.code,
                        })),
                    );
                    setImg(parsedData);
                    setApiLoading(false);
                })
                .catch((error) => {
                    setApiLoading(false);
                    console.error('Error fetching services data:', error);
                });
        }
    };

    return { img, imgApiLoading };
};

export default UseReviewImgListAPI;
