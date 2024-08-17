import { useSearchParams } from 'react-router-dom';
import BasicTable from '../../components/BasicTable/BasicTable';
import DrawerTable from '../../components/DrawerTable/DrawerTable';

export default function CardDetail(props) {
    const date = new Date();
    const mockData = [
        {
            pay_no: 1,
            pay_type: '카드결제',
            pay_price: 2500,
            status: '결제완료',
            service_name: 'GS25 연남한양',
            status: 1,
            user_card_no: '1234-5678-9012',
            pay_date: date.toLocaleString(),
        },
        {
            pay_no: 2,
            pay_type: '카드결제',
            pay_price: 12000,
            status: '결제완료',
            service_name: '블루보틀 연남',
            status: 1,
            user_card_no: '1234-5678-9012',
            pay_date: date.toLocaleString(),
        },
        {
            pay_no: 3,
            pay_type: '카드결제',
            pay_price: 24000,
            status: '결제완료',
            service_name: '다이소 홍대점',
            status: 1,
            user_card_no: '1234-5678-9012',
            pay_date: date.toLocaleString(),
        },
        {
            pay_no: 4,
            pay_type: '카드결제',
            pay_price: 3500,
            status: '결제완료',
            service_name: 'GS25 연남한양',
            status: 1,
            user_card_no: '1234-5678-9012',
            pay_date: date.toLocaleString(),
        },
    ];
    const [params, setParams] = useSearchParams();
    const no = params.get('no');
    const titles = ['pay_price', 'service_name', 'pay_date', 'pay_type', 'pay_no'];
    const rows = mockData;
    return (
        <div>
            <h2>카드{no} 상세 페이지입니다.</h2>
            <div>
                <h3>카드{no} 상세 정보</h3>
                카드번호 카드 잔액 교통 잔액 기타등등
            </div>
            <div>
                <h3>8월 이용내역</h3>
                <div>
                    <DrawerTable titles={titles} rows={rows}></DrawerTable>
                </div>
            </div>
        </div>
    );
}
