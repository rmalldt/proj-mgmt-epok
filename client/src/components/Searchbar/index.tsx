"use client";

import useOutsideClick from "@/hooks/useOutsideClick";
import { SearchResults, useSearchQuery } from "@/state/api";
import { debounce } from "lodash";
import { Search } from "lucide-react";
import React, { RefObject, useCallback, useEffect, useState } from "react";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const [isVisible, setIsVisible] = useState(false);

  const searchList = useOutsideClick(handleOutsideClick);

  function handleOutsideClick() {
    console.log("OUTSIDE");
    if (!searchList.current) return;
    setIsVisible(false);
  }

  const {
    data: searchResults,
    isLoading,
    isError,
  } = useSearchQuery(searchTerm, { skip: searchTerm.length < 3 });

  const handleSearch = debounce(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
    },
    500,
  );

  useEffect(() => {
    return handleSearch.cancel;
  }, [handleSearch.cancel]);

  useEffect(() => {
    if (searchResults?.tasks && searchResults.tasks.length > 0)
      setIsVisible(true);
  }, [searchResults?.tasks]);

  console.log("RESULT", isVisible);

  return (
    <div className="relative flex h-min w-[200px]">
      <Search className="absolute left-[4px] top-1/2 mr-2 h-5 w-5 -translate-y-1/2 transform cursor-pointer dark:text-white" />
      <input
        className="w-full rounded border-none bg-gray-100 p-2 pl-8 placeholder-gray-500 focus:border-transparent focus:outline-none dark:bg-gray-700 dark:text-white dark:placeholder-white"
        type="text"
        placeholder="Search..."
        onChange={handleSearch}
      />
      <div className="p-5">
        <SearchResultList
          data={searchResults}
          isVisible={isVisible}
          reference={searchList}
        />
      </div>
    </div>
  );
};

type SearchResultItemProps = {
  data: SearchResults | undefined;
  isVisible: boolean;
  reference: RefObject<HTMLUListElement>;
};

export const SearchResultList = ({
  data,
  isVisible,
  reference,
}: SearchResultItemProps) => {
  return isVisible ? (
    <ul
      ref={reference}
      className="absolute left-0 top-[36px] z-50 mb-3 flex h-96 w-80 flex-col gap-3 overflow-hidden overflow-y-auto rounded-md border bg-white p-4 shadow dark:bg-dark-secondary dark:text-white"
    >
      {data?.tasks &&
        data.tasks.length > 0 &&
        data.tasks?.map((task) => (
          <SearchItem id={task.id} title={task.title} key={task.title} />
        ))}
    </ul>
  ) : null;
};

export const SearchItem = ({ id, title }: { id: number; title: string }) => {
  return (
    <li className="flex gap-2 border-b">
      <p>{id}</p>
      <p>{title}</p>
    </li>
  );
};

export default SearchBar;
