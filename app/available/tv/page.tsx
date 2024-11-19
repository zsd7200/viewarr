import { Suspense } from 'react';
import Loading from '@/components/loading';
import { PageProps, SeriesProps, MultipleSeries } from '@/components/tv/multiple-series';
import { paginationDefaults } from '@/components/pagination/defaults';
import { FilterControlProps, FilterControl } from '@/components/filter/control';
import RandomSeries from '@/components/random/series';

export default function AvailableSeries(props: PageProps) {
  const page = Number(props.searchParams['page'] ?? paginationDefaults.pageNumber);
  const perPage = Number(props.searchParams['per_page'] ?? paginationDefaults.perPageNumber);

  const filterControlProps: FilterControlProps = {
    mode: 'movie',
  }

  const seriesProps: SeriesProps = {
    filter: 'available',
    page: page,
    perPage: perPage,
  }

  return (
    <>
      <RandomSeries />
      <FilterControl {...filterControlProps} />
      <h1 className="text-center text-2xl py-[15px] font-semibold">Available Shows</h1>
      <Suspense fallback={<Loading />}>
        <MultipleSeries {...seriesProps} />
      </Suspense>
    </>
  );
};