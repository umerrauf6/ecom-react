import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCount, showCart } from "../features/slice";

const Cart = () => {
  const { cart } = useSelector(selectCount);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(showCart());
  }, []);

  if (cart.length === 0) {
    return <div>Loading</div>;
  }
  return (
    <div class="container  py-8 mt-8 px-4 mx-auto lg:max-w-7xl md:px-8">
      <div class="flex flex-col md:flex-row md:justify-between md:items-center">
        <h1 class="text-2xl font-bold my-4">Shopping Cart</h1>
        <button class="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
          Checkout
        </button>
      </div>
      <div class="mt-8">
        {cart.map((product) => (
          <div class="flex flex-col md:flex-row border-b border-gray-400 py-4">
            <div class="flex-shrink-0">
              <img
                src={product.productImage}
                alt="Product image"
                class="w-32 h-32 object-cover"
              />
            </div>
            <div class="mt-4 md:mt-0 md:ml-6">
              <h2 class="text-lg font-bold">{product.productName}</h2>
              <div class="mt-4 flex items-center">
                <span class="mr-2 text-gray-600">Quantity:</span>
                <div class="flex items-center">
                  <button class="bg-gray-200 rounded-l-lg px-2 py-1" disabled>
                    -
                  </button>
                  <span class="mx-2 text-gray-600">1</span>
                  <button class="bg-gray-200 rounded-r-lg px-2 py-1" disabled>
                    +
                  </button>
                </div>
                <span class="ml-auto font-bold">${product.price}</span>
              </div>
            </div>
          </div>
        ))}

        {/* <div class="flex flex-col md:flex-row border-b border-gray-400 py-4">
          <div class="flex-shrink-0">
            <img
              src="https://picsum.photos/id/237/150/150"
              alt="Product image"
              class="w-32 h-32 object-cover"
            />
          </div>
          <div class="mt-4 md:mt-0 md:ml-6">
            <h2 class="text-lg font-bold">Product Title</h2>
            <p class="mt-2 text-gray-600">Product Description</p>
            <div class="mt-4 flex items-center">
              <span class="mr-2 text-gray-600">Quantity:</span>
              <div class="flex items-center">
                <button class="bg-gray-200 rounded-l-lg px-2 py-1" disabled>
                  -
                </button>
                <span class="mx-2 text-gray-600">1</span>
                <button class="bg-gray-200 rounded-r-lg px-2 py-1" disabled>
                  +
                </button>
              </div>
              <span class="ml-auto font-bold">$15.00</span>
            </div>
          </div>
        </div> */}
      </div>
      <div class="flex justify-end items-center mt-8">
        <span class="text-gray-600 mr-4">Subtotal:</span>
        <span class="text-xl font-bold">$35.00</span>
      </div>
    </div>
  );
};
// };

export default Cart;
