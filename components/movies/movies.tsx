import { MovieData, Movie } from '@/components/movies/movie';
import { PaginationControlProps, PaginationControl }from '@/components/pagination/control';

export type PageProps = {
  searchParams: {
    [key: string]: string | Array<string> | undefined
  }
};

type FilterData = {
  value: Array<string> | string,
  method: Array<string> | string,
  available: boolean,
};

export type MoviesProps = {
  filter: string,
  filterData?: {
    genres?: FilterData,
  },
  page: number,
  perPage: number,
};

let filterMovies = (movies: Array<MovieData>, filter: string, filterData: FilterData | undefined = undefined) => {
  // add to filtered array if missing
  let getMissing = () => {
    let filtered: Array<MovieData> = [];
    for (let i = 0; i < movies.length; i++) {
      if (movies[i].monitored && !movies[i].isAvailable && movies[i].status !== 'released') {
        filtered.push(movies[i]);
      }
    }

    // sort alphabetically
    filtered.sort((a, b) => a.sortTitle.localeCompare(b.sortTitle));

    return filtered;
  }

  // add to filtered array if available
  let getAvailable = () => {
    let filtered: Array<MovieData> = [];
    for (let i = 0; i < movies.length; i++) {
      if (movies[i].isAvailable) {
        filtered.push(movies[i]);
      }
    }

    // sort alphabetically
    filtered.sort((a, b) => a.sortTitle.localeCompare(b.sortTitle));
    return filtered;
  }

  // add to filtered array if available
  let getGenre = (genres: string | Array<string>, method: string, available: boolean) => {
    let filtered: Array<MovieData> = [];
    movies = (available) ? getAvailable() : movies;

    if (Array.isArray(genres)) {
      // multiple genres based on method
      let intersecting = [];

      switch (method) {
        case 'or':
          for (let i = 0; i < movies.length; i++) {
            intersecting = movies[i].genres.filter(genre => genres.includes(genre));
            if (intersecting.length > 0) {
              filtered.push(movies[i]);
            }
          }
          break;
        case 'and':
        default:
          for (let i = 0; i < movies.length; i++) {
            intersecting = movies[i].genres.filter(genre => genres.includes(genre));
            if (intersecting.length == genres.length) {
              filtered.push(movies[i]);
            }
          }
          break;
      }
    } else {
      // single genre
      for (let i = 0; i < movies.length; i++) {
        if (movies[i].genres.includes(genres)) {
          filtered.push(movies[i]);
        }
      }
    }

    // sort alphabetically
    filtered.sort((a, b) => a.sortTitle.localeCompare(b.sortTitle));
    return filtered;
  }

  switch (filter) {
    case 'missing':
      return getMissing();
    case 'available':
      return getAvailable();
    case 'genre':
      if (filterData && filterData.value && filterData.method) {
        if (Array.isArray(filterData.method)) return getGenre(filterData.value, filterData.method[0], filterData.available);
        return getGenre(filterData.value, filterData.method, filterData.available);
      }
      return getAvailable();
    case 'all':
    default:
      return movies;
  }
};

async function getMovies(filter: string, filterData: FilterData | undefined = undefined) {
  const url: string = (process.env.RADARR_URL ?? 'http://localhost:7878/') + 'api/v3/movie';
  const headers: HeadersInit = {
    'X-Api-Key': process.env.RADARR_API_KEY ?? '',
  };
  const res = await fetch(url, {
    method: 'GET',
    headers: headers,
    cache: 'no-store',  // results are too large to store in cache
  });

  if (!res.ok) {
    return [];
  }

  const body = await res.json();
  return filterMovies(body, filter, filterData);
};

export async function Movies(props: MoviesProps) {
  const movies: Array<MovieData> = await getMovies(props.filter, props.filterData?.genres);

  if (movies.length == 0) {
    return (
      <>
        <p>Error retrieving movies from Radarr API.</p>
      </>
    );
  }

  const start = (props.page - 1) * props.perPage;
  const end = start + props.perPage;
  const pageCount = Math.ceil(movies.length / props.perPage);
  const paginatedMovies: Array<MovieData> = movies.slice(start, end);

  const paginationControlProps: PaginationControlProps = {
    pageCount: pageCount,
  };

  return (
    <>
      <ul className="flex flex-wrap gap-6 justify-center">
        {paginatedMovies.map(mov => (
          <li className="inline-flex w-1/12" key={`${mov.cleanTitle}`}>
            <Movie {...mov} />
          </li>
        ))}
      </ul>
      <PaginationControl {...paginationControlProps} />
    </>
  );
};