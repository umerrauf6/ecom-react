import React from "react";

const Form = ({ title, type, placeholder, pattern, handleChange, value }) => {
  return (
    <div>
      <div>
        <label class="block  mb-2 text-sm font-medium text-gray-900 dark:text-white">
          {placeholder}
        </label>
        <input
          type={type}
          name={title}
          class="bg-gray-50 border mb-[1rem] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          id={title}
          value={value[title]}
          placeholder={placeholder}
          pattern={pattern}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default Form;
