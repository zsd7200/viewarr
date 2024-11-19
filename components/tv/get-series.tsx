import { FilterData, filterSeries } from '../filter/tv/filter';
import fetchData from '@/components/fetch-data';

export async function getSeriesById(id: string) {
  const url: string = (process.env.SONARR_URL ?? 'http://localhost:8989/') + 'api/v3/series/' + id;
  return await fetchData(url, process.env.SONARR_API_KEY);
}

export async function getSeries(filter: string | undefined = undefined, filterData: FilterData | undefined = undefined) {
  const url: string = (process.env.SONARR_URL ?? 'http://localhost:8989/') + 'api/v3/series';
  const body = await fetchData(url, process.env.SONARR_API_KEY);
  return filterSeries(body, filter, filterData);
}