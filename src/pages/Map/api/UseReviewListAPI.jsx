// import { useContext, useEffect, useState } from 'react';
// import axios from 'axios';
// import { AllStateContext } from '../../../App';
// import { useReview } from '../provider/ReviewProvider';
// import { useSelected } from '../provider/SelectedProvider';
//
// const UseReviewListAPI = () => {
//     const [list, setList] = useReview();
//     const { selectedService } = useSelected();
//     const [listApiLoading, setlistApiLoading] = useState(false);
//     const { protocol } = useContext(AllStateContext);
//     const token = localStorage.getItem('token');
//
//     const serviceListAPI = () => {
//         setlistApiLoading(true);
//         if (selectedService != null) {
//             axios
//                 .get(
//                     `${protocol}review/${selectedService}/reviewList?page=0&size=3&sort=modDate,DESC`,
//                 )
//                 .then((res) => {
//                     setList(res.data);
//                     setlistApiLoading(false);
//                 })
//                 .catch((error) => {
//                     setlistApiLoading(false);
//                     console.error('Error fetching services data:', error);
//                 });
//         }
//     };
//
//     useEffect(() => {
//         // 컴포넌트가 마운트될 때 API 호출
//         serviceListAPI();
//     }, [SelectedService]);
//
//     return { list, listApiLoading };
// };
//
// export default UseReviewListAPI;
