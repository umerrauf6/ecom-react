import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCount, uploadProduct } from "../features/slice";
import Alert from "../components/Alert";
import { useNavigate } from "react-router-dom";

const AdminPanel = () => {
  const navigate = useNavigate();
  const { user } = useSelector(selectCount);
  useEffect(() => {
    if (user) {
      if (user.access !== "admin") navigate("/");
    }
  }, [user, navigate]);
  const { showAlert } = useSelector(selectCount);
  const dispatch = useDispatch();

  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productImage, setProductImage] = useState("");
  const [isSpecial, setIsSpecial] = useState(false);
  const [discountPrice, setDiscountPrice] = useState("");

  const handleFormSubmit = (event) => {
    event.preventDefault();

    // Create a new product object with the form data
    const newProduct = {
      productName,
      price,
      productDescription,
      productImage,
      discountPrice,
      isSpecial,
    };

    // TODO: Add logic to handle uploading the new product to your server
    console.log("New product:", newProduct);
    dispatch(uploadProduct(newProduct));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const imageUrl = reader.result;
      setProductImage(imageUrl);
      // Now you can upload the imageUrl to the server
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="flex justify-center mt-5">
      <div class="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <form className="space-y-6" onSubmit={handleFormSubmit}>
          <h5 class="text-xl font-medium text-gray-900 dark:text-white">
            Upload New Product
          </h5>
          {showAlert && <Alert />}
          <div class="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="floating_ProductName"
              id="floating_ProductName"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
            <label
              for="floating_ProductName"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Product Name
            </label>
          </div>
          <div class="relative z-0 w-full mb-6 group">
            <input
              name="floating_price"
              id="floating_price"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <label
              for="floating_price"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Price
            </label>
          </div>
          <div class="relative z-0 w-full mb-6 group">
            <input
              name="floating_DiscountPrice"
              id="floating_DiscountPrice"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              type="number"
              value={discountPrice}
              onChange={(e) => setDiscountPrice(e.target.value)}
            />
            <label
              for="floating_DiscountPrice"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Discounted Price
            </label>
          </div>
          <div class="relative z-0 w-full mb-6 group">
            <textarea
              name="ProductDescription"
              id="floating_ProductDescription"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
            />
            <label
              for="floating_ProductDescription"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Product Description
            </label>
          </div>
          <div class="relative z-0 w-full mb-6 group">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              name="floating_image"
              id="floating_image"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              for="floating_image"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Product Image URL:
            </label>
          </div>
          <div class="flex items-center mb-4">
            <input
              id="default-checkbox"
              type="checkbox"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              checked={isSpecial}
              onChange={(e) => setIsSpecial(e.target.checked)}
            />
            <label
              for="default-checkbox"
              class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Is Special
            </label>
          </div>
          <button
            type="submit"
            class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Upload
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminPanel;
