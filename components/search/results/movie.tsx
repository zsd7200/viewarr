'use client';

import { useSearchParams } from 'next/navigation';
import { paginationDefaults } from '@/components/pagination/defaults';
import { MovieData } from '@/components/movies/movie-info';
import { MoviesProps, Movies } from '@/components/movies/movies';
import searchMedia from '@/components/search/search';

export type MovieSearchResultsProps = {
  movies: Array<MovieData>,
}

export function MovieSearchResults(props: MovieSearchResultsProps) {
  const searchParams = useSearchParams();
  if (!searchParams.get('query')) return;

  const params = {
    'query'   : searchParams.get('query') ?? '',
    'page'    : Number(searchParams.get('page') ?? paginationDefaults.pageNumber),
    'perPage' : Number(searchParams.get('per_page') ?? paginationDefaults.perPageNumber),
  };

  const moviesProps: MoviesProps = {
    page: params.page,
    perPage: params.perPage,
    movies: searchMedia(props.movies, params.query) as Array<MovieData>,
  };
 
  return (
    <>
      <Movies {...moviesProps} />
    </>
  )
}