import { MovieData, Movie } from '@/components/movies/movie';
import { PaginationControlProps, PaginationControl }from '@/components/pagination/control';
import { FilterData, filterMovies } from '../filter/movie/filter';

export type PageProps = {
  searchParams: {
    [key: string]: string | Array<string> | undefined
  }
};

export type MoviesProps = {
  filter: string,
  filterData?: {
    genres?: FilterData,
  },
  page: number,
  perPage: number,
};

async function getMovies(filter: string, filterData: FilterData | undefined = undefined) {
  const url: string = (process.env.RADARR_URL ?? 'http://localhost:7878/') + 'api/v3/movie';
  const headers: HeadersInit = {
    'X-Api-Key': process.env.RADARR_API_KEY ?? '',
  };
  const res = await fetch(url, {
    method: 'GET',
    headers: headers,
    cache: 'no-store',  // results are too large to store in cache
  });

  if (!res.ok) {
    return [];
  }

  const body = await res.json();
  return filterMovies(body, filter, filterData);
};

export async function Movies(props: MoviesProps) {
  const movies: Array<MovieData> = await getMovies(props.filter, props.filterData?.genres);

  if (movies.length == 0) {
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
  const pageCount = Math.ceil(movies.length / props.perPage);
  const paginatedMovies: Array<MovieData> = movies.slice(start, end);

  const paginationControlProps: PaginationControlProps = {
    pageCount: pageCount,
  };

  return (
    <>
      <ul className="flex flex-wrap gap-6 justify-center">
        {paginatedMovies.map(mov => (
          <li className="inline-flex w-1/12" key={`${mov.cleanTitle}`}>
            <Movie {...mov} />
          </li>
        ))}
      </ul>
      <PaginationControl {...paginationControlProps} />
    </>
  );
};