import { FilterData, filterMovies } from '../filter/movie/filter';
import fetchData from '@/components/fetch-data';

export async function getMovieById(id: string) {
  const url: string = (process.env.RADARR_URL ?? 'http://localhost:7878/') + 'api/v3/movie/' + id;
  return await fetchData(url, process.env.RADARR_API_KEY);
}

export async function getMovies(filter: string | undefined = undefined, filterData: FilterData | undefined = undefined) {
  const url: string = (process.env.RADARR_URL ?? 'http://localhost:7878/') + 'api/v3/movie';
  const body = await fetchData(url, process.env.RADARR_API_KEY);
  return filterMovies(body, filter, filterData);
}