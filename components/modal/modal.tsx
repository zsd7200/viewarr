'use client';

import { useEffect } from 'react';
import ReactPortal from '@/components/modal/react-portal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

type ModalProps = {
  children: React.ReactNode,
  isOpen: boolean,
  handleClose: () => void,
}

export default function Modal({children, isOpen, handleClose}: ModalProps) {
  // close on esc
  useEffect(() => {
    const closeOnEsc = (e: KeyboardEvent) => e.key === 'Escape' ? handleClose() : null;
    document.body.addEventListener('keydown', closeOnEsc);
    return () => {
      document.body.removeEventListener('keydown', closeOnEsc);
    }
  }, [handleClose]);

  // prevents scrolling when modal is open
  useEffect(() => {
    let lockScroll = (e: Event) => e.preventDefault();
    document.addEventListener('mousewheel', lockScroll);
    document.addEventListener('touchmove', lockScroll);
    return () => {
      document.removeEventListener('mousewheel', lockScroll);
      document.removeEventListener('touchmove', lockScroll);
    }
  }, [isOpen]);

  if (!isOpen) {
    return <></>;
  }
  
  return (
    <ReactPortal wrapperId="modal-wrapper">
      <>
        <div onClick={handleClose} className="fixed z-[100] top-0 left-0 w-screen h-screen bg-neutral-800 opacity-50" />
        <div className="fixed z-[110] rounded flex flex-col box-border min-w-fit overflow-hidden p-5 bg-zinc-800 inset-y-20 inset-x-4 sm:inset-x-16 lg:inset-x-32">
          <button
            onClick={handleClose}
            className="self-end flex items-center justify-center text-xl min-w-[30px] w-[30px] min-h-[30px] h-[30px] hover:bg-rose-800 border-2 rounded-full transition"
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
          <div className="flex box-border h-full pb-[25px]">{children}</div>
        </div>
      </>
    </ReactPortal>
  );
};