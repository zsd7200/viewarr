'use client';

import Modal from '@/components/modal/modal';
import { SeriesData, SeriesInfo } from '@/components/tv/series-info';
import { useState } from 'react';
import Image from 'next/image';

export function SingleSeries(props: SeriesData) {
  const [showModal, setShowModal] = useState(false);
  const imgSrc: string = props.images[1]?.remoteUrl ?? '/no_poster.png';

  function onClickHandler() {
    setShowModal(true);
  }
  function onCloseHandler() {
    setShowModal(false);
  }

  return (
    <div className="relative w-full inline-flex flex-col items-center text-black rounded-md transition-shadow shadow-custom-black hover:shadow-custom-white cursor-pointer">
      <button className="absolute top-0 left-0 w-full h-full z-50 opacity-0" onClick={onClickHandler}></button>
      <Image 
        src={imgSrc}
        alt="Poster" 
        width={160}
        height={240}
        className="rounded-t-md w-max"
        placeholder="blur"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mOcWw8AAb8BHjgUU1kAAAAASUVORK5CYII="
      />
      <p 
        className="bg-white h-full w-full rounded-b-md inline-flex justify-center items-center text-center text-sm my-auto p-[5px]"
      >
        {props.title}
      </p>

      {showModal &&
        <Modal
          isOpen={showModal}
          handleClose={onCloseHandler}
        >
          <SeriesInfo {...props} />
        </Modal>
      }
    </div>
  );
};