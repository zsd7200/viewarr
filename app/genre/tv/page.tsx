import { Suspense } from 'react';
import Loading from '@/components/loading';
import { PageProps, SeriesProps, MultipleSeries } from '@/components/tv/multiple-series';
import { paginationDefaults } from '@/components/pagination/defaults';
import { randomGenre, filterDefaults } from '@/components/filter/defaults';
import { FilterControlProps, FilterControl } from '@/components/filter/control';

export default function GenreSeries(props: PageProps) {
  const page = Number(props.searchParams['page'] ?? paginationDefaults.pageNumber);
  const perPage = Number(props.searchParams['per_page'] ?? paginationDefaults.perPageNumber);
  const genre = props.searchParams['genre'] ?? randomGenre();
  const method = props.searchParams['method'] ?? filterDefaults.filter.genre.method;
  const available = Boolean(props.searchParams['available'] ?? filterDefaults.filter.genre.available);
  
  // add formatting to genres if array
  let genreStr = () => {
    if (!Array.isArray(genre)) return genre;
    let str = '';
    let concat = (genre.length == 2) ? ' ' : ', ';

    for (let i = 0; i < genre.length; i++) {
      str += genre[i];
      if (i !== (genre.length - 1)) {
        str += concat;
      }
      if (i == (genre.length - 2)) {
        let strMethod = (Array.isArray(method)) ? method[0] : method;
        if (!filterDefaults.availableMethods.genre.includes(strMethod)) {
          strMethod = filterDefaults.filter.genre.method;
        }
        str += strMethod;
        str += ' ';
      }
    }

    return str;
  };

  const filterControlProps: FilterControlProps = {
    mode: 'movie',
  }

  const seriesProps: SeriesProps = {
    filter: 'genre',
    filterData: {
      genres: {
        value: genre,
        method: method,
        available: available,
      },
    },
    page: page,
    perPage: perPage,
  }

  return (
    <>
      <FilterControl {...filterControlProps} />
      <h1 className="text-center text-2xl py-[15px] font-semibold">Available {genreStr()} Shows</h1>
      <Suspense fallback={<Loading />}>
        <MultipleSeries {...seriesProps} />
      </Suspense>
    </>
  );
};