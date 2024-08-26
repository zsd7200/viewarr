'use client';

import Modal from '@/components/modal/modal';
import { useState } from 'react';
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
};

export function Movie(props: MovieData) {
  const [showModal, setShowModal] = useState(false);
  const imgSrc: string = props.images[0]?.remoteUrl ?? '/no_poster.png';

  function onClickHandler() {
    setShowModal(true);
  }
  function onCloseHandler() {
    setShowModal(false);
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
  const onPlayerReady: YouTubeProps['onReady'] = (e) => {
    e.target.pauseVideo();
  }
  const opts: YouTubeProps['opts'] = {
    height: '390',
    width: '640',
    playerVars: {
      playsinline: 1,
    }
  }

  return (
    <div className="relative w-full inline-flex flex-col items-center text-black rounded-md transition-shadow shadow-custom-black hover:shadow-custom-white cursor-pointer">
      <button className="absolute top-0 left-0 w-full h-full z-50 opacity-0" onClick={onClickHandler}></button>
      <Image 
        src={imgSrc}
        alt="Poster" 
        width={160}
        height={240}
        className="rounded-t-md w-max bg-white"
        placeholder="blur"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mOcWw8AAb8BHjgUU1kAAAAASUVORK5CYII="
      />
      <p 
        className="bg-white h-full w-full rounded-b-md inline-flex justify-center items-center text-center text-sm my-auto p-[5px]" 
        title={(props.title !== props.originalTitle) ? props.originalTitle : ''}
      >
        {props.title}
      </p>

      {showModal &&
        <Modal
          isOpen={showModal}
          handleClose={onCloseHandler}
        >
          <div className="flex flex-col md:flex-row h-full w-full gap-[20px]">
            <div className="flex flex-col items-center justify-center w-2/6 h-full">
              <Image 
                src={imgSrc} 
                alt="Poster" 
                width={300}
                height={450}
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mOcWw8AAb8BHjgUU1kAAAAASUVORK5CYII="
              />
              <p 
                className="text-center text-xl pt-[5px] px-[50px]" 
                title={(props.title !== props.originalTitle) ? props.originalTitle : ''}
              >
                {props.title}
              </p>
              <p className="text-sm text-slate-500 pb-[5px] mt-[-3px]">
                {props.genres.map((genre, i) => {
                  if (i !== (props.genres.length - 1)) {
                    return (
                      <a href={`/genre/movie?genre=${genre}`}>{genre}, </a>
                    );
                  }
                  return (
                    <a href={`/genre/movie?genre=${genre}`}>{genre}</a>
                  );
                })}
              </p>
              <p className="flex space-evenly">
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
              <p>
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
                <div className="pt-[7px] text-center">
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
            <div className="flex flex-col gap-[50px] w-4/6 h-full pr-[30px] text-lg items-center justify-center">
              {props.youTubeTrailerId &&
                <YouTube
                  videoId={props.youTubeTrailerId}
                />
              }
              {(props.overview.length > 0)
                ? <p>{props.overview}</p>
                : <p>No overview available.</p>
              }
            </div>
          </div>
        </Modal>
      }
    </div>
  );
};