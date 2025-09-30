import { queryOptions } from '@tanstack/react-query';
import { getNotice, getNoticeList } from 'api/notice';
import type { NoticesParam, NoticesResponse, TransformedNoticesResponse } from 'model/notice.model';

const noticeQueries = {
  allkeys: () => ['notices'] as const,
  noticeKeys: (id: number) => [...noticeQueries.allkeys(), id] as const,
  notice: (id: number) => queryOptions({
    queryKey: noticeQueries.noticeKeys(id),
    queryFn: () => getNotice(id),
  }),
  noticeListKeys: (param: NoticesParam) => [...noticeQueries.allkeys(), param] as const,
  noticeList: (param: NoticesParam) => queryOptions({
    queryKey: noticeQueries.noticeListKeys(param),
    queryFn: () => getNoticeList(param),
    select: (data : NoticesResponse): TransformedNoticesResponse => {
      const notices = data.notices.map((notice) => {
        return {
          id: notice.id,
          post_number: notice.id,
          title: notice.title,
          author: notice.author,
          post_date: notice.created_at,
        };
      });

      return { notices, total_page: data.total_page };
    },
  }),
};

export default noticeQueries;
