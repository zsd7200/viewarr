'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft, faAnglesRight } from '@fortawesome/free-solid-svg-icons';
import { paginationDefaults } from '@/components/pagination/defaults';

export type PaginationControlProps = {
  pageCount: number,
  maxPages?: number,
  defaultPage?: number,
  defaultPerPage?: number,
}

export function PaginationControl(props: PaginationControlProps) {
  const defaultPage = props.defaultPage ?? paginationDefaults.pageNumber;
  const defaultPerPage = props.defaultPerPage ?? paginationDefaults.perPageNumber;
  const maxPages = (props.maxPages && props.maxPages >= 5) ? props.maxPages : 5; // works best at 5
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page') ?? defaultPage);
  const perPage = Number(searchParams.get('per_page') ?? defaultPerPage);
  const pageArr = [...Array(props.pageCount)];
  const hasPrevPage = (page == 1) ? false : true;
  const hasNextPage = (page == props.pageCount) ? false : true;

  // use router to push new params
  function routeNewPage(newPageNumber: number) {
    router.push(
      (perPage == defaultPerPage)
        ? `?page=${newPageNumber}`
        : `?page=${newPageNumber}&per_page=${perPage}`
    );
  }

  // route to different pages if page is crazy high through user input on url
  if (page < 1) routeNewPage(defaultPage);
  else if (page > props.pageCount) routeNewPage(props.pageCount);

  // handle input after clicking ... in pagination
  function handleInput() {
    let page;
    do {
      page = prompt('Enter page number.', '1');
      if (page === null) break;
      page = Number(page);
    } while (Number.isNaN(page) || page < 1 || page > props.pageCount)

    if (page !== null) {
      routeNewPage(page);
    }
  }

  return (
    <ul className="flex justify-center gap-[10px] py-[10px]">
      {/* previous button */}
      <li key="prev">
        <button
          className={hasPrevPage
            ? "bg-zinc-600 hover:bg-violet-600 w-[24px] h-[24px] rounded-lg transition"
            : "bg-zinc-700 w-[24px] h-[24px] rounded-lg"
          }
          disabled={!hasPrevPage}
          onClick={() => routeNewPage(page - 1)}
        >
          <FontAwesomeIcon icon={faAnglesLeft} />
        </button>
      </li>

      {/* restrict pages */}
      {((maxPages - 2) < props.pageCount && props.pageCount > maxPages) &&
        <>
          {pageArr.map((key, i) => {
            // always display first, current, and last
            if (i == 0 || (i + 1) == page || (i + 1) == props.pageCount) {
              return (
                <li key={i}>
                  <button
                    className={((i+1) == page)
                      ? "bg-violet-600 w-[24px] h-[24px] rounded-lg transition"
                      : "bg-zinc-600 hover:bg-violet-600 w-[24px] h-[24px] rounded-lg transition"
                    }
                    disabled={((i+1) == page)}
                    onClick={() => routeNewPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                </li>
              );
            } else if ((i == 1 && page > (maxPages - 2)) || ((i == (props.pageCount - 2)) && page <= (props.pageCount - (maxPages - 2)))) {
              return (
                <li key={i}>
                  <button
                    className="bg-zinc-600 hover:bg-violet-600 w-[24px] h-[24px] rounded-lg transition"
                    onClick={() => handleInput()}
                  >
                    ...
                  </button>
                </li>
              );
            } else if (((i + 1) < (maxPages - 1) && page < (maxPages - 1)) || (((i + 1) > (props.pageCount - (maxPages - 2))) && page > (props.pageCount - (maxPages - 2)))) {
              return (
                <li key={i}>
                  <button
                    className={"bg-zinc-600 hover:bg-violet-600 w-[24px] h-[24px] rounded-lg transition"}
                    disabled={false}
                    onClick={() => routeNewPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                </li>
              );
            } 
          })}
        </>
      }
      
      {/* don't restrict pages */}
      {((maxPages - 2) >= props.pageCount || props.pageCount <= maxPages) &&
        <>
          {pageArr.map((key, i) => (
            <li key={i}>
              <button
                className={((i+1) == page)
                  ? "bg-violet-600 w-[24px] h-[24px] rounded-lg transition"
                  : "bg-zinc-600 hover:bg-violet-600 w-[24px] h-[24px] rounded-lg transition"
                }
                disabled={((i+1) == page)}
                onClick={() => routeNewPage(i + 1)}
              >
                {i + 1}
              </button>
            </li>
          ))}
        </>
      }

      {/* next button */}
      <li key="next">
        <button
          className={hasNextPage
            ? "bg-zinc-600 hover:bg-violet-600 w-[24px] h-[24px] rounded-lg transition"
            : "bg-zinc-700 w-[24px] h-[24px] rounded-lg"
          }
          disabled={!hasNextPage}
          onClick={() => routeNewPage(page + 1)}
        >
          <FontAwesomeIcon icon={faAnglesRight} />
        </button>
      </li>
    </ul>
  );
}