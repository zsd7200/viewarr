import { FilterData, filterMovies } from '../filter/movie/filter';

async function fetchData(url: string) {
  const headers: HeadersInit = {
    'X-Api-Key': process.env.RADARR_API_KEY ?? '',
  };
  const res = await fetch(url, {
    method: 'GET',
    headers: headers,
    cache: 'force-cache',
  });

  if (!res.ok) {
    return [];
  }

  return await res.json();
}

export async function getMovieById(id: string) {
  const url: string = (process.env.RADARR_URL ?? 'http://localhost:7878/') + 'api/v3/movie/' + id;
  return await fetchData(url);
}

export async function getMovies(filter: string | undefined = undefined, filterData: FilterData | undefined = undefined) {
  const url: string = (process.env.RADARR_URL ?? 'http://localhost:7878/') + 'api/v3/movie';
  const body = await fetchData(url);
  return filterMovies(body, filter, filterData);
}