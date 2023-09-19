import React, { useEffect } from "react";
import { Slider, SpecialProducts } from "../components";
import { useSelector } from "react-redux";
import { selectCount } from "../features/slice";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useSelector(selectCount);
  useEffect(() => {
    if (user) {
      if (user.access === "admin") navigate("/adminPanel");
    }
  }, [user, navigate]);
  return (
    <div className="mt-4 px-4 mx-auto lg:max-w-7xl md:px-8">
      <Slider />
      <SpecialProducts />
    </div>
  );
};

export default Home;
