import React from "react";
import WorkCard from "../component/work/workCard";

export const Main = () => {
  return (
    <div className="flex lg:block mt-5">
      <div className="w-10/12 mx-auto md:w-96 lg:hidden ">
        <WorkCard />
      </div>
      <h3>안녕하세요. 메인페이지 입니다.</h3>
    </div>
  );
};
