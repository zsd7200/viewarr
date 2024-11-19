import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDice } from '@fortawesome/free-solid-svg-icons';

export function RandomMovie() {
  return (
    <>
      <a className="absolute top-[5px] right-[40px] text-white hover:text-gray-300 transition" href="/info/movie"><FontAwesomeIcon icon={faDice} /></a>
    </>
  );
}