// import { createContext, useContext, useEffect, useState } from 'react';
// import * as React from 'react';
// import { ReviewProvider } from './ReviewProvider';
//
// // Context 생성
// const SelectedContext = createContext();
//
// // Provider 컴포넌트
// export const SelectedProvider = ({ children }) => {
//     const [SelectedService, setSelectedService] = useState(null);
//     const [SelectedServiceInfo, setSelectedServiceInfo] = useState({});
//     const [Open, setOpen] = useState(false);
//     const [State, setState] = useState({
//         Tour: false,
//         ACTIVITY: false,
//         ETC: false,
//     });
//     console.log('-----------------');
//     console.log(SelectedService);
//     console.log('----------------');
//
//     const handleFilterChange = (event) => {
//         setState({
//             ...State,
//             [event.target.name]: event.target.checked,
//         });
//     };
//
//     return (
//         <SelectedContext.Provider
//             value={{
//                 SelectedServiceInfo,
//                 setSelectedServiceInfo,
//                 SelectedService,
//                 handleServiceSelect,
//                 Open,
//                 setOpen,
//                 State,
//                 setState,
//                 handleFilterChange,
//             }}
//         >
//             {children}
//         </SelectedContext.Provider>
//     );
// };
//
// // Context를 사용하는 커스텀 훅
// export const useSelected = () => {
//     const context = useContext(SelectedContext);
//     return context;
// };
