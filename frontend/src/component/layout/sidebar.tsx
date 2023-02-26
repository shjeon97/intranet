import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@material-tailwind/react";
import { FC } from "react";
import Menu from "./menu";

interface SidebarProps {
  isOpen: boolean;
  toggle: () => void;
}

const Sidebar: FC<SidebarProps> = ({ isOpen, toggle }) => {
  return (
    <div
      className={`${
        isOpen ? "translate-x-0 ease-out" : "-translate-x-full ease-in"
      }  fixed  z-30 top-0 left-0 w-64 h-screen rounded-3xl bg-white overflow-y-auto shadow-lg transform transition-all duration-300`}
    >
      <div className="flex items-end justify-end p-2">
        <button className="p-2 rounded-md " onClick={toggle}>
          <FontAwesomeIcon size="xl" icon={solid("xmark")} />
        </button>
      </div>
      <nav>
        <ul className=" cursor-pointer mb-4 flex mt-0 flex-col items-start p-2 gap-6">
          <Menu />
        </ul>
        <div className="absolute bottom-0 right-0 w-full p-2 pm-3">
          <Button className=" text-center w-full">출근하기</Button>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
