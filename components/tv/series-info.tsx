'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';

type ImageData = {
  coverType: string,
  remoteUrl: string,
};

type StatisticsData = {
  seasonCount: number,
  episodeCount: number
};

export type SeriesData = {
  title: string,
  sortTitle: string,
  status: string,
  overview: string,
  network: string,
  images: Array<ImageData>,
  year: number,
  monitored: Boolean,
  runtime: number,
  tvdbId: number,
  tvRageId: number,
  tvMazeId: number,
  tmdbId: number,
  firstAired: Date,
  lastAired: Date,
  cleanTitle: string,
  imdbId: string,
  certification: string,
  genres: Array<string>,
  statistics: StatisticsData,
  id: number,
  relevance?: number,
};

export function SeriesInfo(props: SeriesData) {
  let imgSrc = '/no_poster.png';
  for (let i = 0; i < props.images.length; i++) {
    if (props.images[i].coverType == 'poster') {
      imgSrc = props.images[i].remoteUrl;
      break;
    }
  }

  return (
    <div className="flex flex-col md:flex-row h-full w-full md:gap-[20px]">
      <div className="flex flex-row md:flex-col items-center justify-center w-full md:w-2/6 h-full">
        <div className="w-1/2 px-[20px] md:px-0">
          <Image 
            src={imgSrc} 
            alt="Poster" 
            width={300}
            height={450}
            className="w-full h-auto md:w-auto"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mOcWw8AAb8BHjgUU1kAAAAASUVORK5CYII="
          />
        </div>
        <div className="flex flex-col text-center items-center">
          <p 
            className="text-center text-lg md:text-xl pt-[5px] px-[10px] md:px-[50px]"
          >
            {props.title}
          </p>
          <p className="text-xs md:text-sm text-slate-500 pb-[5px] mt-[-3px]">
            {props.genres.map((genre, i) => {
              if (i !== (props.genres.length - 1)) {
                return (
                  <a href={`/genre/movie?genre=${genre}`} key={genre.toLowerCase()}>{genre}, </a>
                );
              }
              return (
                <a href={`/genre/movie?genre=${genre}`} key={genre.toLowerCase()}>{genre}</a>
              );
            })}
          </p>
          <p className="flex space-evenly text-sm md:text-md">
            {(props.runtime > 0) &&
              <span>{`${props.runtime}`} minutes</span>
            }
            {(props.runtime > 0 && props.certification) &&
              <span className="px-[3px]">|</span>
            }
            {props.certification && 
              <span>{props.certification}</span>
            }
          </p>
          <p className="text-sm md:text-md">
            {(props.imdbId) &&
              <a href={`https://www.imdb.com/title/${props.imdbId}`}>IMDB <FontAwesomeIcon className="text-xs" icon={faArrowUpRightFromSquare} /></a>
            }
            {(props.imdbId && props.tmdbId) &&
              <span className="px-[3px]">|</span>
            }
            {props.tmdbId && 
              <a href={`https://www.themoviedb.org/movie/${props.tmdbId}`}>TMDB <FontAwesomeIcon className="text-xs" icon={faArrowUpRightFromSquare} /></a>
            }
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-[15px] md:gap-[50px] w-full md:w-4/6 h-full md:pr-[30px] text-sm md:text-lg items-center justify-center">
        {(props.overview.length > 0)
          ? <p>{props.overview}</p>
          : <p>No overview available.</p>
        }
      </div>
    </div>
  );
};