import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser, selectCount } from "../features/slice";
import { BsFillCartCheckFill } from "react-icons/bs";

export default function NavBar() {
  const [navbar, setNavbar] = useState(false);
  const { user } = useSelector(selectCount);
  const dispatch = useDispatch();

  return (
    <nav className="w-full bg-orange-400 shadow">
      <div className="justify-between gap-5 px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
        <div>
          <div className="flex items-center justify-between py-3 md:py-5 md:block">
            <Link to="/">
              <h2 className="text-2xl font-bold text-white">Ecommerce Store</h2>
            </Link>
            <div className="md:hidden">
              <button
                className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                onClick={() => setNavbar(!navbar)}
              >
                {navbar ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-white"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        <div className="flex-1">
          <div
            className={` justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
              navbar ? "block" : "hidden"
            }`}
          >
            <form>
              <label class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
                Search
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    class="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="search"
                  id="default-search"
                  class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search Products..."
                  required
                />
                <button
                  type="submit"
                  class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Search
                </button>
              </div>
            </form>
            {user ? (
              <div className="mt-3 space-y-2 md:hidden ">
                <Link
                  onClick={() => dispatch(logoutUser())}
                  to="/signin"
                  className="inline-block w-full px-4 py-2 text-center text-white bg-gray-600 rounded-md shadow hover:bg-gray-800"
                >
                  Sign Out
                </Link>
                <Link
                  to="/cart"
                  className="inline-block w-full px-4 py-2 flex justify-center text-center text-white bg-gray-600 rounded-md shadow hover:bg-gray-800"
                >
                  <BsFillCartCheckFill />
                </Link>
              </div>
            ) : (
              <div className="mt-3 space-y-2 md:hidden ">
                <Link
                  to="/signin"
                  className="inline-block w-full px-4 py-2 text-center text-white bg-gray-600 rounded-md shadow hover:bg-gray-800"
                >
                  Sign in
                </Link>
                <Link
                  to="signup"
                  className="inline-block w-full px-4 py-2 text-center text-white bg-gray-600 rounded-md shadow hover:bg-gray-800"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
        {user ? (
          <div className="hidden space-x-2 md:inline-block">
            <div className="flex justify-center items-center gap-2">
              <Link
                onClick={() => dispatch(logoutUser())}
                to="/signin"
                className="px-4 py-2 text-white bg-gray-600 rounded-md shadow hover:bg-gray-800"
              >
                Sign Out
              </Link>
              <Link
                to="/cart"
                className="px-4 py-2 text-white bg-gray-600 rounded-md shadow hover:bg-gray-800"
              >
                <BsFillCartCheckFill size={"24px"} />
              </Link>
            </div>
          </div>
        ) : (
          <div className="hidden space-x-2 md:inline-block">
            <Link
              to="/signin"
              className="px-4 py-2 text-white bg-gray-600 rounded-md shadow hover:bg-gray-800"
            >
              Sign in
            </Link>
            <Link
              to="signup"
              className="px-4 py-2 text-gray-800 bg-white rounded-md shadow hover:bg-gray-100"
            >
              Sign up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
