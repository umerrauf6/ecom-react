import React, { useEffect, useState } from "react";
import { selectCount, showWishlist } from "../features/slice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Wishlist = () => {
  const { wishlist, isLoading, user } = useSelector(selectCount);
  const [collapsedProduct, setCollapsedProduct] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [hasEffectRun, setHasEffectRun] = useState(false);
  useEffect(() => {
    if (!user) {
      navigate("/signin");
    }
    if (!hasEffectRun) {
      dispatch(showWishlist());
      setHasEffectRun(true);
    }
  }, [hasEffectRun, dispatch]);

  const toggleCollapse = (productId) => {
    setCollapsedProduct((prevCollapsedProduct) =>
      prevCollapsedProduct === productId ? null : productId
    );
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (wishlist.length === 0) {
    return <div>No Product</div>;
  } else {
    return (
      <div>
        <div className="mx-auto container px-4 md:px-6 2xl:px-0 py-12 flex justify-center items-center">
          <div className="flex flex-col justify-start items-start">
            <div>
              <p class="text-sm leading-4 text-gray-600 dark:text-white">
                Home
              </p>
            </div>
            <div class="mt-3">
              <h1
                class="
                  text-3xl
                  lg:text-4xl
                  tracking-tight
                  font-semibold
                  leading-8
                  lg:leading-9
                  text-gray-800
                  dark:text-white dark:text-white
                "
              >
                Favourites
              </h1>
            </div>
            <div class="mt-4">
              <p
                class="
                  text-2xl
                  tracking-tight
                  leading-6
                  text-gray-600
                  dark:text-white
                "
              >
                {wishlist.length} Items
              </p>
            </div>
            <div
              class="
                mt-10
                lg:mt-12
                grid grid-cols-1
                lg:grid-cols-3
                gap-x-8 gap-y-10
                lg:gap-y-0
              "
            >
              {wishlist.map((product) => (
                <div key={product._id} class="flex flex-col">
                  <div class="relative">
                    <img
                      class="hidden lg:block"
                      src={product.productImage}
                      alt={product.productName}
                    />
                    <img
                      class="hidden sm:block lg:hidden"
                      src={product.productImage}
                      alt={product.productName}
                    />
                    <img
                      class="sm:hidden"
                      src={product.productImage}
                      alt={product.productName}
                    />
                    <button
                      aria-label="close"
                      class="
                      top-4
                      right-4
                      focus:outline-none
                      focus:ring-2
                      focus:ring-offset-2
                      focus:ring-gray-800
                      absolute
                      p-1.5
                      bg-gray-800
                      dark:bg-white dark:text-gray-800
                      text-white
                      hover:text-gray-400
                    "
                    >
                      <img
                        class="dark:hidden"
                        src="https://tuk-cdn.s3.amazonaws.com/can-uploader/wishlist-1-svg1.svg"
                        alt="close"
                      />
                      <img
                        class="hidden dark:block"
                        src="https://tuk-cdn.s3.amazonaws.com/can-uploader/wishlist-1-svg1dark.svg"
                        alt="close"
                      />
                    </button>
                  </div>
                  <div class="mt-6 flex justify-between items-center">
                    <div class="flex justify-center items-center">
                      <p
                        class="
                        tracking-tight
                        text-2xl
                        font-semibold
                        leading-6
                        text-gray-800
                        dark:text-white
                      "
                      >
                        {product.productName}
                      </p>
                    </div>
                    <div class="flex justify-center items-center">
                      <button
                        aria-label="show menu"
                        onClick={() => toggleCollapse(product._id)}
                        class="
                        focus:outline-none
                        focus:ring-2
                        focus:ring-offset-2
                        focus:ring-gray-800
                        py-2.5
                        px-2
                        bg-gray-800
                        dark:bg-white dark:text-gray-800
                        text-white
                        hover:text-gray-400 hover:bg-gray-200
                      "
                      >
                        <svg
                          id="chevronUp1"
                          class={`  ${
                            collapsedProduct !== product._id ? "hidden" : ""
                          } fill-stroke`}
                          width="10"
                          height="6"
                          viewBox="0 0 10 6"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9 5L5 1L1 5"
                            stroke="currentColor"
                            stroke-width="1.25"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                        <svg
                          id="chevronDown1"
                          class={`  ${
                            collapsedProduct !== product._id ? "" : "hidden"
                          } fill-stroke`}
                          width="10"
                          height="6"
                          viewBox="0 0 10 6"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1 1L5 5L9 1"
                            stroke="currentColor"
                            stroke-width="1.25"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div
                    id={`menu${product._id}`}
                    className={`
              ${collapsedProduct !== product._id ? "hidden" : ""}
              flex flex-col justify-start items-start mt-12
            `}
                  >
                    <div>
                      <p
                        class="
                        tracking-tight
                        text-xs
                        leading-3
                        text-gray-800
                        dark:text-white
                      "
                      >
                        {product._id}
                      </p>
                    </div>

                    <div class="mt-6">
                      <p
                        class="
                        tracking-tight
                        text-base
                        font-medium
                        leading-4
                        text-gray-800
                        dark:text-white
                      "
                      >
                        {product.price}
                      </p>
                    </div>
                    <div
                      class="
                      flex
                      jusitfy-between
                      flex-col
                      lg:flex-row
                      items-center
                      mt-10
                      w-full
                      space-y-4
                      lg:space-y-0 lg:space-x-4
                      xl:space-x-8
                    "
                    >
                      <div class="w-full">
                        <button
                          class="
                          focus:outline-none
                          focus:ring-gray-800
                          focus:ring-offset-2
                          focus:ring-2
                          text-gray-800
                          dark:text-white
                          w-full
                          tracking-tight
                          py-4
                          text-lg
                          leading-4
                          hover:bg-gray-300 hover:text-gray-800
                          dark:text-white
                          dark:bg-transparent
                          dark:border-white
                          dark:hover:bg-gray-800
                          bg-white
                          border border-gray-800
                          dark:hover:text-white
                        "
                        >
                          More information
                        </button>
                      </div>
                      <div class="w-full">
                        <button
                          class="
                          focus:outline-none
                          focus:ring-gray-800
                          focus:ring-offset-2
                          focus:ring-2
                          text-white
                          w-full
                          tracking-tight
                          py-4
                          text-lg
                          leading-4
                          hover:bg-black
                          bg-gray-800
                          border border-gray-800
                          dark:hover:bg-gray-700 dark:hover:text-white
                        "
                        >
                          Add to cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Wishlist;
