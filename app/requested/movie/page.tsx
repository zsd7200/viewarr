import { Suspense } from 'react';
import Loading from '@/components/loading';
import { PageProps, MoviesProps, Movies } from '@/components/movies/movies';

export default function RequestedMovie(props: PageProps) {
  const page = Number(props.searchParams['page'] ?? 1);
  const perPage = Number(props.searchParams['per_page'] ?? 30);

  const moviesProps: MoviesProps = {
    filter: 'missing',
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