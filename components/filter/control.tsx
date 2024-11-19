'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { filterDefaults } from '@/components/filter/defaults';
import { genres } from '@/components/filter/genres';
import Modal from '@/components/modal/modal';

export type FilterControlProps = {
  mode: string,
}

export function FilterControl(props: FilterControlProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showModal, setShowModal] = useState(false);
  function modalClickHandler() {
    setShowModal(true);
  }
  function modalCloseHandler() {
    setShowModal(false);
  }
  function filterClickHandler() {
    const genreList = Array.from(document.querySelectorAll('#genre-list input:checked'));
    const methodList = Array.from(document.querySelectorAll('#method-list input:checked'));
    let str = '';

    switch (props.mode) {
      case 'tv':
        str = '/genre/tv?'
        break;
      case 'movie':
      default:
        str = '/genre/movie?'
        break;
    }

    str += 'method=' + (methodList[0]?.getAttribute('id')?.split('radio-')[1] ?? filterDefaults.filter.genre.method) + '&';

    for (let i = 0; i < genreList.length; i++) {
      str += 'genre=' + (genreList[i].getAttribute('id')?.split('checkbox-')[1] ?? filterDefaults.filter.genre.value) + '&';
    }

    setShowModal(false);
    router.push(str);
  }
  function clearFilterClickHandler() {
    switch (props.mode) {
      case 'tv':
        router.push('/available/movie');
        break;
      case 'movie':
      default:
        router.push('/available/movie');
        break;
    }
  }

  return (
    <>
      <button className="absolute top-[5px] right-[10px] text-white hover:text-gray-300 transition" onClick={modalClickHandler}><FontAwesomeIcon icon={faFilter} /></button>
      {showModal &&
        <Modal
          isOpen={showModal}
          handleClose={modalCloseHandler}
        >
          <>
            <div className="flex w-full justify-center gap-[25px]">
              <div>
                <h1 className="text-xl text-center border-b-2 border-slate-600 mb-[10px]">Genres</h1>
                <ul id="genre-list" className="px-[10px]">
                  {genres.map(gen => (
                    <li className="flex gap-[5px]" key={gen}>
                      <input type="checkbox" id={`checkbox-${gen}`} name={gen} />
                      <label htmlFor={`checkbox-${gen}`}>{gen}</label>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h1 className="text-xl text-center border-b-2 border-slate-600 mb-[10px]">Method</h1>
                <ul id="method-list" className="px-[30px]">
                  {filterDefaults.availableMethods.genre.map(method => (
                    <li className="flex gap-[5px]" key={method}>
                      <input type="radio" id={`radio-${method}`} name="method" />
                      <label htmlFor={`radio-${method}`}>{method}</label>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="absolute bottom-[30px] right-[45px] flex gap-[20px]">
              <button className="bg-violet-600 hover:bg-violet-800 px-[10px] py-[5px] rounded-md transition" onClick={clearFilterClickHandler}>Clear Filter</button>
              <button className="bg-violet-600 hover:bg-violet-800 px-[10px] py-[5px] rounded-md transition" onClick={filterClickHandler}>Submit</button>
            </div>
          </>
        </Modal>
      }
    </>
  );
}