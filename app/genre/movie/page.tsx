import { Suspense } from 'react';
import Loading from '@/components/loading';
import { PageProps, MoviesProps, Movies } from '@/components/movies/movies';
import { paginationDefaults } from '@/components/pagination/defaults';

export default function RequestedMovie(props: PageProps) {
  const page = Number(props.searchParams['page'] ?? paginationDefaults.pageNumber);
  const perPage = Number(props.searchParams['per_page'] ?? paginationDefaults.perPageNumber);
  const genre = props.searchParams['genre'] ?? paginationDefaults.filter.genre.value;
  const method = props.searchParams['method'] ?? paginationDefaults.filter.genre.method;

  const moviesProps: MoviesProps = {
    filter: 'genre',
    filterData: {
      genres: {
        value: genre,
        method: method,
      },
    },
    page: page,
    perPage: perPage,
  }

  return (
    <>
      <h1 className="text-center text-2xl py-[15px] font-semibold">Requested Movies</h1>
      <Suspense fallback={<Loading />}>
        <Movies {...moviesProps} />
      </Suspense>
    </>
  );
};