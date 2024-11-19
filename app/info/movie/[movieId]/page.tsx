import { Suspense } from 'react';
import Loading from '@/components/loading';
import { getMovieById } from '@/components/movies/get-movies';
import { MovieData, MovieInfo } from '@/components/movies/movie-info';
import RandomMovie from '@/components/random/movie';

type PageProps = {
  params: {
    movieId: string,
  },
};

export default async function InfoMovieById(props: PageProps) {
  const movie: MovieData = await getMovieById(props.params.movieId);

  return (
    <>
      <RandomMovie />
      <Suspense fallback={<Loading />}>
        <div className="w-screen h-screen flex justify-center align-center">
          <MovieInfo {...movie} />
        </div>
      </Suspense>
    </>
  );
};