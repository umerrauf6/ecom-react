import React, { useEffect, useState } from "react";
import { signinForm } from "../assets";
import { Form } from "../components";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginUser, selectCount } from "../features/slice";
import Alert from "../components/Alert";

const Login = () => {
  const { showAlert, user, isLoading } = useSelector(selectCount);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  useEffect(() => {
    if (user) {
      // setTimeout(() => {
      navigate("/");
      // }, 3000);
    }
  }, [user, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(loginData));
  };
  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div className="mt-8 px-4 mx-auto lg:max-w-7xl md:px-8 w-[50%]">
      <h1 className="font-bold text-[2rem]">Welcome to Ecommerce</h1>
      <div className="bg-white p-[2rem] mt-[2rem]">
        {showAlert && <Alert />}
        <form onSubmit={handleSubmit} className="flex-grow-1 w-50">
          {signinForm.map((form, index) => (
            <Form
              key={index}
              value={loginData}
              title={form.title}
              placeholder={form.placeholder}
              pattern={form.pattern}
              type={form.type}
              handleChange={handleChange}
            />
          ))}
          <input
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-full"
            type="submit"
            value="Login"
          />
        </form>
      </div>
    </div>
  );
};

export default Login;
