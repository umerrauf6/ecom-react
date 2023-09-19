import React, { useEffect, useState } from "react";
import { registerData } from "../assets";
import { Form } from "../components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, selectCount } from "../features/slice";
import Alert from "../components/Alert";

const Login = () => {
  const navigate = useNavigate();
  const { user, showAlert } = useSelector(selectCount);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);
  const [memberData, setMemberData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(registerUser(memberData));
    setMemberData({
      name: "",
      email: "",
      password: "",
    });
  };
  const handleChange = (e) => {
    setMemberData({
      ...memberData,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div className="mt-8 px-4 mx-auto lg:max-w-7xl md:px-8 w-[50%]">
      <h1 className="font-bold text-[2rem]">Register to Daraz</h1>
      <div className="bg-white p-[2rem] mt-[2rem]">
        <form onSubmit={handleSubmit} className="flex-grow-1 w-50">
          {showAlert && <Alert />}

          {registerData.map((form, index) => (
            <Form
              key={index}
              value={memberData}
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
            value="Register"
          />
        </form>
      </div>
    </div>
  );
};

export default Login;
