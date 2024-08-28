import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useSelected } from '../provider/SelectedProvider';
import { useReview } from '../provider/ReviewProvider';
import { AllStateContext } from '../../../App';

const UseReviewImgListAPI = (SelectedService) => {
    // Array of objects containing images and user data
    useEffect(() => {
        serviceImgListAPI();
    }, [SelectedService]);

    const [img, setImg] = useState();
    const [imgApiLoading, setApiLoading] = useState(false);
    const { protocol } = useContext(AllStateContext);

    const serviceImgListAPI = () => {
        setApiLoading(true);
        if (SelectedService != null) {
            console.log(
                `http://localhost:8090/review/${SelectedService}/ImgList`,
            );
            axios
                .get(`${protocol}review/${SelectedService}/ImgList`)
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
