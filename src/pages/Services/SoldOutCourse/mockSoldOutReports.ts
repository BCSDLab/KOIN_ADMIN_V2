import type { SoldOutReport } from 'model/soldOutReport.model';

const MOCK_SOLD_OUT_REPORTS: SoldOutReport[] = [
  {
    id: 1,
    report_status: 'PENDING',
    sold_out_course: '9/25(수) 점심 C 코너',
    reported_at: '2026.09.25 12:31',
    processor: null,
    processed_at: null,
    reporter: '홍길동',
    image_urls: ['https://picsum.photos/seed/soldout1/200'],
    process_type: null,
  },
  {
    id: 2,
    report_status: 'PENDING',
    sold_out_course: '9/25(수) 저녁 A 코너',
    reported_at: '2026.09.25 17:45',
    processor: null,
    processed_at: null,
    reporter: '김철수',
    image_urls: null,
    process_type: null,
  },
  {
    id: 3,
    report_status: 'CONFIRMED',
    sold_out_course: '9/24(화) 점심 B 코너',
    reported_at: '2026.09.24 11:58',
    processor: '조여름_ProductManager',
    processed_at: '2026.09.24 12:10',
    reporter: '이영희',
    image_urls: ['https://picsum.photos/seed/soldout3a/200', 'https://picsum.photos/seed/soldout3b/200'],
    process_type: 'APPROVE',
  },
  {
    id: 4,
    report_status: 'CONFIRMED',
    sold_out_course: '9/23(월) 저녁 C 코너',
    reported_at: '2026.09.23 18:20',
    processor: '박성주_Developer',
    processed_at: '2026.09.23 18:30',
    reporter: '최민수',
    image_urls: null,
    process_type: 'REJECT',
  },
];

export default MOCK_SOLD_OUT_REPORTS;
