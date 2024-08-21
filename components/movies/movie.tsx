'use client';

import Modal from '@/components/movies/modal';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';

type ImageData = {
  coverType: string,
  remoteUrl: string,
};

type CollectionData = {
  title: string,
  tmdbId: number,
};

export type MovieData = {
  title: string,
  originalTitle: string,
  sortTitle: string,
  status: string,
  overview: string,
  images: Array<ImageData>,
  year: number,
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
  id: number,
};

export function Movie(props: MovieData) {
  const [showModal, setShowModal] = useState(false);
  function onClickHandler() {
    setShowModal(true);
  }
  function onCloseHandler() {
    setShowModal(false);
  }
  const imgSrc: string = props.images[0]?.remoteUrl ?? '/no_poster.png';

  return (
    <div className="relative inline-flex flex-col bg-gradient-to-b from-transparent from-0% via-white via-5% to-white to-5% text-black rounded-md transition-shadow shadow-custom-black hover:shadow-custom-white cursor-pointer">
      <button className="absolute top-0 left-0 w-full h-full z-50 opacity-0" onClick={onClickHandler}></button>
      <Image 
        src={imgSrc}
        alt="Poster" 
        width={160}
        height={240}
        className="rounded-t-md"
        placeholder="blur"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mOcWw8AAb8BHjgUU1kAAAAASUVORK5CYII="
      />
      <p 
        className="text-center text-sm my-auto p-[5px]" 
        title={(props.title !== props.originalTitle) ? props.originalTitle : ''}
      >
        {props.title}
      </p>

      {showModal &&
        <Modal
          isOpen={showModal}
          handleClose={onCloseHandler}
        >
          <div className="flex h-full w-full">
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
                className="text-center text-xl p-[5px]" 
                title={(props.title !== props.originalTitle) ? props.originalTitle : ''}
              >
                {props.title}
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
            </div>
            <div className="flex w-4/6 h-full pr-[30px] text-xl items-center">
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