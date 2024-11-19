import SearchBar from '@/components/search/search-bar';
import { SeriesSearchResultsProps, SeriesSearchResults } from '@/components/search/results/series';
import { getSeries } from '@/components/tv/get-series';
import { SeriesData } from '@/components/tv/series-info';

export default async function SearchMovies() {
  const series: Array<SeriesData> = await getSeries('all');
  const seriesSearchResultProps: SeriesSearchResultsProps = {
    series: series
  };
  return (
    <>
      <SearchBar />
      <SeriesSearchResults {...seriesSearchResultProps} />
    </>
  );
};