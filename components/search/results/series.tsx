'use client';

import { useSearchParams } from 'next/navigation';
import { paginationDefaults } from '@/components/pagination/defaults';
import { SeriesData } from '@/components/tv/series-info';
import { SeriesProps, MultipleSeries } from '@/components/tv/multiple-series';
import searchMedia from '@/components/search/search';

export type SeriesSearchResultsProps = {
  series: Array<SeriesData>,
}

export function SeriesSearchResults(props: SeriesSearchResultsProps) {
  const searchParams = useSearchParams();
  if (!searchParams.get('query')) return;

  const params = {
    'query'   : searchParams.get('query') ?? '',
    'page'    : Number(searchParams.get('page') ?? paginationDefaults.pageNumber),
    'perPage' : Number(searchParams.get('per_page') ?? paginationDefaults.perPageNumber),
  };

  const seriesProps: SeriesProps = {
    page: params.page,
    perPage: params.perPage,
    series: searchMedia(props.series, params.query) as Array<SeriesData>,
  };
 
  return (
    <>
      <MultipleSeries {...seriesProps} />
    </>
  )
}