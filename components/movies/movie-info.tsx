'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import YouTube, { YouTubeProps } from 'react-youtube';

type ImageData = {
  coverType: string,
  remoteUrl: string,
};

type CollectionData = {
  title: string,
  tmdbId: number,
};

type RatingData = {
  votes: number,
  value: number,
  type: string,
};

type RatingsObject = {
  imdb: RatingData,
  tmdb: RatingData,
  rottenTomatoes: RatingData,
}

export type MovieData = {
  title: string,
  originalTitle: string,
  sortTitle: string,
  status: string,
  overview: string,
  images: Array<ImageData>,
  year: number,
  youTubeTrailerId: string,
  studio: string,
  monitored: Boolean,
  isAvailable: Boolean,
  runtime: number,
  cleanTitle: string,
  imdbId: string,
  tmdbId: number,
  certification: string,
  genres: Array<string>,
  collection: CollectionData | undefined,
  ratings: RatingsObject,
  id: number,
  relevance?: number,
};

export function MovieInfo(props: MovieData) {
  let imgSrc = '/no_poster.png';
  for (let i = 0; i < props.images.length; i++) {
    if (props.images[i].coverType == 'poster') {
      imgSrc = props.images[i].remoteUrl;
      break;
    }
  }

  function aggregateRating(ratings: RatingsObject) {
    let total: number = 0;
    let divisor: number = 0;

    if (ratings['imdb'] && ratings['imdb'].value) {
      total += ratings['imdb'].value;
      divisor++;
    }
    if (ratings['tmdb'] && ratings['tmdb'].value) {
      total += ratings['tmdb'].value;
      divisor++;
    }
    if (ratings['rottenTomatoes'] && ratings['rottenTomatoes'].value) {
      total += ratings['rottenTomatoes'].value / 10;
      divisor++;
    }
    total /= divisor;
    return Math.round(total * 10) / 10;
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
            title={(props.title !== props.originalTitle) ? props.originalTitle : ''}
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

          {(props.collection !== undefined) &&
            <p className="text-xs pt-[5px]">
              {(props.collection.title) &&
                <span>Part of the </span>
              }
              {(props.collection.tmdbId)
                ? <a href={`https://www.themoviedb.org/collection/${props.collection.tmdbId}`}>{props.collection.title} <FontAwesomeIcon icon={faArrowUpRightFromSquare} /></a>
                : <span>{props.collection.title}</span>
              }
            </p>
          }

          {(props.ratings !== undefined) &&
            <div className="pt-[7px] text-center text-sm md:text-md">
              <p>
                {(props.ratings.imdb) && 
                  <span className="hover:cursor-help" title="IMDB user score.">{props.ratings.imdb.value}</span>
                }
                {(props.ratings.imdb && (props.ratings.tmdb || props.ratings.rottenTomatoes)) &&
                  <span className="px-[3px]">|</span>
                }
                {(props.ratings.tmdb && props.ratings.tmdb.value !== 0) && 
                  <span className="hover:cursor-help" title="TMDB user score.">{props.ratings.tmdb.value}</span>
                }
                {(props.ratings.tmdb && props.ratings.rottenTomatoes) &&
                  <span className="px-[3px]">|</span>
                }
                {(props.ratings.rottenTomatoes) && 
                  <span className="hover:cursor-help" title="RottenTomatoes user score.">{props.ratings.rottenTomatoes.value}</span>
                }
              </p>
              {(props.ratings.imdb && props.ratings.tmdb && props.ratings.rottenTomatoes) &&
                <p className="hover:cursor-help" title="Aggregate rating (out of 10) of the above scores.">
                  {aggregateRating(props.ratings)}
                </p>
              }
            </div>
          }
        </div>
      </div>
      <div className="flex flex-col gap-[15px] md:gap-[50px] w-full md:w-4/6 h-full md:pr-[30px] text-sm md:text-lg items-center justify-center">
        {props.youTubeTrailerId &&
          <YouTube
            videoId={props.youTubeTrailerId}
            iframeClassName="w-[300px] h-[169px] md:w-auto md:h-auto lg:w-[400px] lg:h-[225px] xl:w-[650px] xl:h-[366px]"
          />
        }
        {(props.overview.length > 0)
          ? <p>{props.overview}</p>
          : <p>No overview available.</p>
        }
      </div>
    </div>
  );
};