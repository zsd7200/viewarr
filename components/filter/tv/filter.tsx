import { SeriesData } from '@/components/tv/series-info';

export type FilterData = {
  value: Array<string> | string,
  method: Array<string> | string,
  available: boolean,
};

export function filterSeries(series: Array<SeriesData>, filter: string | undefined = undefined, filterData: FilterData | undefined = undefined) {
  let isAvailable = (singleSeries: SeriesData) => {
    if (new Date(singleSeries.firstAired) < new Date()) {
      return true;
    }

    return false;
  }
  
  // add to filtered array if missing
  let getMissing = () => {
    let filtered: Array<SeriesData> = [];
    for (let i = 0; i < series.length; i++) {
      if (series[i].monitored && !isAvailable(series[i]) && series[i].status !== 'released') {
        filtered.push(series[i]);
      }
    }

    // sort alphabetically
    filtered.sort((a, b) => a.sortTitle.localeCompare(b.sortTitle));

    return filtered;
  }

  // add to filtered array if available
  let getAvailable = () => {
    let filtered: Array<SeriesData> = [];
    for (let i = 0; i < series.length; i++) {
      if (isAvailable(series[i])) {
        filtered.push(series[i]);
      }
    }

    // sort alphabetically
    filtered.sort((a, b) => a.sortTitle.localeCompare(b.sortTitle));
    return filtered;
  }

  // add to filtered array if available
  let getGenre = (genres: string | Array<string>, method: string, available: boolean) => {
    let filtered: Array<SeriesData> = [];
    series = (available) ? getAvailable() : series;

    if (Array.isArray(genres)) {
      // multiple genres based on method
      let intersecting = [];

      switch (method) {
        case 'or':
          for (let i = 0; i < series.length; i++) {
            intersecting = series[i].genres.filter(genre => genres.includes(genre));
            if (intersecting.length > 0) {
              filtered.push(series[i]);
            }
          }
          break;
        case 'and':
        default:
          for (let i = 0; i < series.length; i++) {
            intersecting = series[i].genres.filter(genre => genres.includes(genre));
            if (intersecting.length == genres.length) {
              filtered.push(series[i]);
            }
          }
          break;
      }
    } else {
      // single genre
      for (let i = 0; i < series.length; i++) {
        if (series[i].genres.includes(genres)) {
          filtered.push(series[i]);
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
      return series;
  }
};