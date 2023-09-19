import React, { useEffect } from "react";
import { sliderpic1, sliderpic2, sliderpic3 } from "../assets";
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";
import ReactSwipe from "react-swipe";

const Slider = () => {
  let reactSwipeEl;

  return (
    <div className=" relative ">
      <ReactSwipe
        className="carousel rounded-lg w-full h-[40vh] "
        swipeOptions={{ continuous: true }}
        ref={(el) => (reactSwipeEl = el)}
      >
        <div className="w-full">
          <img className="w-full" src={sliderpic1} alt="" />
        </div>
        <div className="w-full">
          <img className="w-full" src={sliderpic2} alt="" />
        </div>
        <div className="w-full">
          <img className="w-full" src={sliderpic3} alt="" />
        </div>
      </ReactSwipe>
      <div className="flex justify-between absolute w-full left-0 top-[45%] ">
        <button onClick={() => reactSwipeEl.prev()}>
          <AiFillLeftCircle color="orange" size={"50px"} />
        </button>
        <button onClick={() => reactSwipeEl.next()}>
          <AiFillRightCircle color="orange" size={"50px"} />
        </button>
      </div>
    </div>
  );
};
export default Slider;
