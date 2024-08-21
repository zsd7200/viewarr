import { MovieData, Movie } from '@/components/movies/movie';
import { PaginationControlProps, PaginationControl }from '@/components/pagination/control';

export type PageProps = {
  searchParams: {
    [key: string]: string | Array<string> | undefined
  }
}

export type MoviesProps = {
  filter: string,
  page: number,
  perPage: number,
};

async function getMovies(filter: string) {
  const url: string = (process.env.RADARR_URL ?? 'http://localhost:7878/') + 'api/v3/movie';
  const headers: HeadersInit = {
    'X-Api-Key': process.env.RADARR_API_KEY ?? '',
  };
  const res = await fetch(url, {
    method: 'GET',
    headers: headers,
    cache: 'no-store',  // results are too large to store in cache
  });

  let filterMovies = (allMovies: Array<MovieData>, movieFilter: string) => {
    let filtered: Array<MovieData> = [];

    switch (movieFilter) {
      case 'missing':
        // add to filtered array if missing
        for (let i = 0; i < allMovies.length; i++) {
          if (allMovies[i].monitored && !allMovies[i].isAvailable && allMovies[i].status !== 'released') {
            filtered.push(allMovies[i]);
          }
        }

        // sort alphabetically
        filtered.sort((a, b) => a.sortTitle.localeCompare(b.sortTitle));

        return filtered;
      case 'released':
        // add to filtered array if available
        for (let i = 0; i < allMovies.length; i++) {
          if (allMovies[i].isAvailable) {
            filtered.push(allMovies[i]);
          }
        }

        // sort alphabetically
        filtered.sort((a, b) => a.sortTitle.localeCompare(b.sortTitle));
        return filtered;
      case 'all':
      default:
        return allMovies;
    }
  };

  if (!res.ok) {
    return [];
  }

  const body = await res.json();
  return filterMovies(body, filter);
};

export async function Movies(props: MoviesProps) {
  const movies: Array<MovieData> = await getMovies(props.filter);

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