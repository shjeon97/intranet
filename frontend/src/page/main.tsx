import React from "react";
import WorkCard from "../component/work/workCard";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!

export const Main = () => {
  return (
    <div className="mx-auto xl:max-w-screen-xl overflow-auto py-2 px-4 lg:px-8 lg:py-4">
      <div className="flex flex-wrap lg:block mt-5">
        <div className="w-10/12 mx-auto md:w-96 lg:hidden ">
          <WorkCard />
        </div>
        {/* <div className=" w-96">
          <FullCalendar plugins={[dayGridPlugin]} initialView="dayGridMonth" />
        </div> */}
      </div>
    </div>
  );
};
