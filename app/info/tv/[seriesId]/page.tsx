import { Suspense } from 'react';
import Loading from '@/components/loading';
import { getSeriesById } from '@/components/tv/get-series';
import { SeriesData, SeriesInfo } from '@/components/tv/series-info';
import RandomSeries from '@/components/random/series';

type PageProps = {
  params: {
    seriesId: string,
  },
};

export default async function InfoSeriesById(props: PageProps) {
  const series: SeriesData = await getSeriesById(props.params.seriesId);

  return (
    <>
      <RandomSeries />
      <Suspense fallback={<Loading />}>
        <div className="w-screen h-screen flex justify-center align-center">
          <SeriesInfo {...series} />
        </div>
      </Suspense>
    </>
  );
};