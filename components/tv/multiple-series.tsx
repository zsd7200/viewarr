import { getSeries } from '@/components/tv/get-series';
import { SeriesData } from '@/components/tv/series-info';
import { SingleSeries } from '@/components/tv/single-series';
import { PaginationControlProps, PaginationControl } from '@/components/pagination/control';
import { FilterData } from '../filter/movie/filter';

export type PageProps = {
  searchParams: {
    [key: string]: string | Array<string> | undefined
  }
};

export type SeriesProps = {
  filter: string,
  filterData?: {
    genres?: FilterData,
  },
  page: number,
  perPage: number,
};

export async function MultipleSeries(props: SeriesProps) {
  const series: Array<SeriesData> = await getSeries(props.filter, props.filterData?.genres);

  if (series.length == 0) {
    return (
      <>
        <div className="flex flex-col mt-[200px] items-center justify-center">
          <p>No data retrieved.</p>
          <p>This is caused by an error reaching the Radarr API, or your filters are too specific.</p>
          <p className="mt-[40px]">Please try again with less filters.</p>
        </div>
      </>
    );
  }

  const start = (props.page - 1) * props.perPage;
  const end = start + props.perPage;
  const pageCount = Math.ceil(series.length / props.perPage);
  const paginatedSeries: Array<SeriesData> = series.slice(start, end);

  const paginationControlProps: PaginationControlProps = {
    pageCount: pageCount,
  };

  return (
    <>
      <ul className="flex flex-wrap justify-center lg:gap-6">
        {paginatedSeries.map(ser => (
          <li className="inline-flex w-1/4 md:w-1/6 xl:w-1/12 mx-2.5 lg:mx-0 my-2.5" key={`${ser.cleanTitle}-${ser.year}`}>
            <SingleSeries {...ser} />
          </li>
        ))}
      </ul>
      <PaginationControl {...paginationControlProps} />
    </>
  );
};