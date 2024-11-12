"use client";

import useOutsideClick from "@/hooks/useOutsideClick";
import { SearchResults, useSearchQuery } from "@/state/api";
import { debounce } from "lodash";
import { Search } from "lucide-react";
import Link from "next/link";
import React, { RefObject, useEffect, useState } from "react";

interface SearchItem {
  id: string;
  title: string;
  description: string;
}

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchListVisible, setIsSearchListVisible] = useState(false);

  const searchListRef = useOutsideClick(handleOutsideClick, true);

  function handleOutsideClick() {
    if (!searchListRef.current) return;
    setIsSearchListVisible(false);
  }

  const { data: searchResults } = useSearchQuery(searchTerm, {
    skip: searchTerm.length < 3,
  });

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
    if (searchTerm.length === 0) setIsSearchListVisible(false);
    if (searchTerm) setIsSearchListVisible(true);
  }, [searchTerm]);

  return (
    <div className="relative flex h-min w-[200px] sm:w-[26.4rem]">
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
          isVisible={isSearchListVisible}
          handleItemClick={setIsSearchListVisible}
          reference={searchListRef}
        />
      </div>
    </div>
  );
};

type SearchResultItemProps = {
  data: SearchResults | undefined;
  isVisible: boolean;
  handleItemClick: (isVisisble: boolean) => void;
  reference: RefObject<HTMLUListElement>;
};

export const SearchResultList = ({
  data,
  isVisible,
  handleItemClick,
  reference,
}: SearchResultItemProps) => {
  const projects =
    data?.projects && data.projects.length > 0
      ? data.projects.map(
          (project) =>
            ({
              id: `Id: ${project.id}`,
              title: `Project: ${project.name}`,
              description: project.description?.slice(0, 18) + "..." || "",
            }) as SearchItem,
        )
      : [];

  const tasks =
    data?.tasks && data.tasks.length > 0
      ? data.tasks.map(
          (task) =>
            ({
              id: `Id: ${task.id}`,
              title: `Task: ${task.title}`,
              description: task.description?.slice(0, 18) + "..." || "",
            }) as SearchItem,
        )
      : [];

  const users =
    data?.users && data.users.length > 0
      ? data.users.map(
          (user) =>
            ({
              id: `Id: ${user.userId}`,
              title: `User: ${user.username}`,
              description: `Team ID: ${user.teamId || "N/A"}`,
            }) as SearchItem,
        )
      : [];

  const searchListItems = [...projects, ...tasks, ...users];
  console.log("SEARCH DATA", searchListItems);

  return isVisible ? (
    <ul
      ref={reference}
      className="absolute left-0 top-[36px] z-50 mb-3 flex max-h-96 w-[24rem] flex-col gap-3 overflow-hidden overflow-y-auto rounded-md border bg-white p-4 shadow dark:bg-dark-secondary dark:text-white"
    >
      {searchListItems.length > 0 ? (
        searchListItems.map((item) => (
          <SearchResultItem
            key={item.title}
            id={item.id}
            title={item.title}
            description={item.description}
            handleOnItemClick={handleItemClick}
          />
        ))
      ) : (
        <div>No item found </div>
      )}
    </ul>
  ) : null;
};

export const SearchResultItem = ({
  id,
  title,
  description,
  handleOnItemClick,
}: {
  id: string;
  title: string;
  description: string;
  handleOnItemClick: (isVisisble: boolean) => void;
}) => {
  return (
    <Link href={"/search?query=test"}>
      <li
        className="flex gap-2 border-b"
        onClick={() => handleOnItemClick(false)}
      >
        <p>{title}</p>
        <p>{id}</p>
        <p>{description}</p>
      </li>
    </Link>
  );
};

export default SearchBar;
