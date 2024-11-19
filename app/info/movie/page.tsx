import { redirect } from 'next/navigation';
import { getMovies } from '@/components/movies/get-movies';
import { MovieData } from '@/components/movies/movie-info';

export default async function InfoMovie() {
  const movies: Array<MovieData> = await getMovies('available');
  const randomMovie = movies[Math.floor(Math.random() * movies.length)];

  redirect(`/info/movie/${randomMovie.id}`);
}