import { Suspense } from 'react';
import Loading from '@/components/loading';
import { PageProps, MoviesProps, Movies } from '@/components/movies/movies';
import { paginationDefaults } from '@/components/pagination/defaults';
import { FilterControl } from '@/components/filter/movie/control';
import { RandomMovie } from '@/components/random/movie';

export default function AvailableMovie(props: PageProps) {
  const page = Number(props.searchParams['page'] ?? paginationDefaults.pageNumber);
  const perPage = Number(props.searchParams['per_page'] ?? paginationDefaults.perPageNumber);

  const moviesProps: MoviesProps = {
    filter: 'available',
    page: page,
    perPage: perPage,
  }

  return (
    <>
      <RandomMovie />
      <FilterControl />
      <h1 className="text-center text-2xl py-[15px] font-semibold">Available Movies</h1>
      <Suspense fallback={<Loading />}>
        <Movies {...moviesProps} />
      </Suspense>
    </>
  );
};