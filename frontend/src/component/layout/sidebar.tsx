import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Typography } from "@material-tailwind/react";
import { FC } from "react";
import Menu from "./menu";
import useRealtimeClock from "../../hook/useRealTimeClock";
import WorkCard from "../work/workCard";

interface SidebarProps {
  isOpen: boolean;
  toggle: () => void;
}

const Sidebar: FC<SidebarProps> = ({ isOpen, toggle }) => {
  const time = useRealtimeClock();

  return (
    <div
      className={`${
        isOpen ? "translate-x-0 ease-out" : "-translate-x-full ease-in"
      }  fixed  z-30 top-0 left-0 w-64 h-screen rounded-3xl bg-white overflow-y-auto shadow-lg transform transition-all duration-300`}
    >
      <div className="flex justify-between  p-2 m-2 mt-4">
        <Typography variant="h5">{time.slice(0, 9)}</Typography>
        <button className="rounded-md " onClick={toggle}>
          <FontAwesomeIcon size="xl" icon={solid("xmark")} />
        </button>
      </div>
      <nav>
        <ul className="cursor-pointer mb-4 flex mt-0 flex-col items-start p-2 gap-6">
          <Menu />
        </ul>
        <div className="absolute bottom-0 right-0 w-full">
          <WorkCard />
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
