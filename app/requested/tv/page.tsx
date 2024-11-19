import { Suspense } from 'react';
import Loading from '@/components/loading';
import { PageProps, SeriesProps, MultipleSeries } from '@/components/tv/multiple-series';
import { paginationDefaults } from '@/components/pagination/defaults';

export default function RequestedSeries(props: PageProps) {
  const page = Number(props.searchParams['page'] ?? paginationDefaults.pageNumber);
  const perPage = Number(props.searchParams['per_page'] ?? paginationDefaults.perPageNumber);

  const seriesProps: SeriesProps = {
    filter: 'missing',
    page: page,
    perPage: perPage,
  }

  return (
    <>
      <h1 className="text-center text-2xl py-[15px] font-semibold">Requested Shows</h1>
      <Suspense fallback={<Loading />}>
        <MultipleSeries {...seriesProps} />
      </Suspense>
    </>
  );
};