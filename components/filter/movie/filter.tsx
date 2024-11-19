import { MovieData } from '@/components/movies/movie-info';

export type FilterData = {
  value: Array<string> | string,
  method: Array<string> | string,
  available: boolean,
};

export function filterMovies(movies: Array<MovieData>, filter: string | undefined = undefined, filterData: FilterData | undefined = undefined) {
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