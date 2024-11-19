import { redirect } from 'next/navigation';
import { getSeries } from '@/components/tv/get-series';
import { SeriesData } from '@/components/tv/series-info';

export default async function InfoSeries() {
  const series: Array<SeriesData> = await getSeries('available');
  const randomSeries = series[Math.floor(Math.random() * series.length)];

  redirect(`/info/tv/${randomSeries.id}`);
}