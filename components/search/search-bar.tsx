'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function SearchBar() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((input: string) => {
    const params = new URLSearchParams(searchParams);

    if (input) {
      params.set('query', input);
    } else {
      params.delete('query');
    }

    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <>
      <div className="w-full flex justify-center align-center my-[20px]">
        <input 
          className="text-black p-2.5 rounded-lg" 
          placeholder="Search here..."
          onChange={(e) => { handleSearch(e.target.value) }}
          defaultValue={searchParams.get('query')?.toString()}
        />
      </div>
    </>
  );
}