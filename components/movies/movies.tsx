import { getMovies } from '@/components/movies/get-movies';
import { MovieData } from '@/components/movies/movie-info';
import { Movie } from '@/components/movies/movie';
import { PaginationControlProps, PaginationControl } from '@/components/pagination/control';
import { FilterData } from '../filter/movie/filter';

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
      <ul className="flex flex-wrap justify-center lg:gap-6">
        {paginatedMovies.map(mov => (
          <li className="inline-flex w-1/4 md:w-1/6 xl:w-1/12 mx-2.5 lg:mx-0 my-2.5" key={`${mov.cleanTitle}-${mov.year}`}>
            <Movie {...mov} />
          </li>
        ))}
      </ul>
      <PaginationControl {...paginationControlProps} />
    </>
  );
};