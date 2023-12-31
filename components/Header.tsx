"use client";

import Image from "next/image";
import { MagnifyingGlassIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import Avatar from "react-avatar";
import { useBoardStore } from "@/store/BoardStore";
import { useEffect, useState } from "react";
import fetchSuggestion from "@/lib/fetchSuggestion";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/AuthStore";

function Header() {
  const [board, searchString, setSearchString] = useBoardStore((state) => [
    state.board,
    state.searchString,
    state.setSearchString,
  ]);

  const [user, getUser] = useUserStore((state) => [state.user, state.getUser]);

  const [loading, setLoading] = useState<boolean>(false);
  const [isOpenMenu, setIsOpenMenu] = useState<null | HTMLElement>(null);
  const [suggestion, setSuggestion] = useState<string>("");
  const router = useRouter();

  const handleLogout = () => {
    router.push("/");
  };

  const getUserFunc = async () => {
    getUser();
  };

  const handleOpenUserMenu = (e: React.MouseEvent<HTMLElement>) => {
    setIsOpenMenu(e.currentTarget);
  };

  useEffect(() => {
    if (board.columns.size === 0) return;
    setLoading(true);

    const fetchSuggestionFunc = async () => {
      const suggestion = await fetchSuggestion(board, user);
      setSuggestion(suggestion);
      setLoading(false);
    };

    getUserFunc();
    fetchSuggestionFunc();
  }, [board]);

  return (
    <header>
      <div className="flex flex-col md:flex-row items-center p-5 bg-gray-500/10 rounded-b-2xl">
        <div
          className="
      absolute 
      top-0 
      left-0 
      w-full
      h-96
      bg-gradient-to-br
      from-pink-400
      to-[#0055D1]
      filter
      blur-3xl
      opacity-50
      -z-50
      "
        />

        <Image
          src="https://links.papareact.com/c2cdd5"
          alt="Trello Logo"
          width={300}
          height={100}
          className="w-44 md:w-56 pb-10 md:pb-0 object-contain"
        />

        <div className="flex items-center space-x-5  flex-1 justify-end w-full">
          <form className="flex items-center space-x-5 bg-white rounded-md p-2 shadow-md flex-1 md:flex-initial">
            <MagnifyingGlassIcon className="h-6 w-6 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              value={searchString}
              onChange={(e) => setSearchString(e.target.value)}
              className="flex-1 outline-none p-2"
            />
            <button type="submit" hidden>
              Search
            </button>
          </form>

          {/* profile dropdown */}
          <div>
            <button onClick={handleOpenUserMenu}>
              <Avatar
                name={user ? `${user.name}` : "unknown"}
                round
                size="50"
              />
            </button>

            <div
              className={`absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none   ${
                !isOpenMenu && "hidden"
              }`}
            >
              <button
                className={
                  "w-full block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                }
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center px-5 py-2 md:py-5">
        <p className="flex items-center p-5 text-sm font-light pr-5 shadow-xl rounded-xl w-fit bg-white italic max-w-3xl text-[#0055D1]">
          <UserCircleIcon
            className={`inline-block h-10 w-10 text-[#0055D1] mr-1  
            ${loading && "animate-spin "}`}
          />
          {suggestion && !loading
            ? suggestion
            : "GPT is summarising your tasks for the day..."}
        </p>
      </div>
    </header>
  );
}

export default Header;
