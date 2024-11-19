import { MovieData } from '@/components/movies/movie-info';
import { SeriesData } from '@/components/tv/series-info';

export default function searchMedia(data: Array<MovieData> | Array<SeriesData>, query: string): Array<MovieData> | Array<SeriesData> {
  let getRelevance = (title: string) => {
    let index = title.indexOf(query);
    let wordIndex = title.indexOf(' ' + query);

    if (index === 0) return 3;          // if search term is at beginning of title
    if (wordIndex !== -1) return 2;     // if search term is at beginning of a word in the title
    if (index !== -1) return 1;         // if search term exists somewhere within the title
    return 0;                           // if search term does not exist in the title at all
  }

  let filtered: Array<any> = [];

  for (let i = 0; i < data.length; i++) {
    let relevance = getRelevance(data[i].sortTitle);
    if (relevance !== 0) {
      let entry = data[i];
      entry.relevance = relevance;
      filtered.push(entry);
    }
  }

  // sort by relevancy
  filtered.sort((a, b) => b.relevance - a.relevance);

  return filtered;
}