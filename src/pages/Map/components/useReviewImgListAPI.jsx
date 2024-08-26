import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelected } from './SelectedProvider';
import { useReview } from './ReviewProvider';

const UseReviewImgListAPI = () => {
    const [img, setImg] = useState([]); // Array of objects containing images and user data
    const [imgApiLoading, setApiLoading] = useState(false);
    const { SelectedService } = useSelected();

    const serviceImgListAPI = () => {
        setApiLoading(true);
        if (SelectedService != null) {
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

    useEffect(() => {
        serviceImgListAPI();
    }, [SelectedService]);

    return { img, imgApiLoading };
};

export default UseReviewImgListAPI;
