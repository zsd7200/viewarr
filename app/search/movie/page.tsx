import { Suspense } from 'react';
import Loading from '@/components/loading';
import SearchBar from '@/components/search/search-bar';
import { MovieSearchResultsProps, MovieSearchResults } from '@/components/search/results/movie';
import { getMovies } from '@/components/movies/get-movies';
import { MovieData } from '@/components/movies/movie-info';

export default async function SearchMovies() {
  const movies: Array<MovieData> = await getMovies('all');
  const movieSearchResultProps: MovieSearchResultsProps = {
    movies: movies
  };

  return (
    <>
      <Suspense fallback={<Loading />}>
        <SearchBar />
        <MovieSearchResults {...movieSearchResultProps} />
      </Suspense>
    </>
  );
};