import { useState, useEffect } from "react";
import { Navbar, IconButton, Collapse } from "@material-tailwind/react";
import { LOCAL_STORAGE_TOKEN } from "../../constants";
import { isLoggedInVar, isSidebarOpenVar } from "../../apollo";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useReactiveVar } from "@apollo/client";
import Menu from "./menu";
import { useMeQuery } from "../../hook/query/useMeQuery";

export default function NavBar() {
  const { data, loading, refetch } = useMeQuery();
  const navigate = useNavigate();
  const isSidebarOpen = useReactiveVar(isSidebarOpenVar);
  const [open, setOpen] = useState(false);
  const toggleOpen = () => setOpen((cur) => !cur);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth <= 960 && setOpen(false)
    );
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 50000);
    return () => clearInterval(interval);
  }, [refetch, loading]);

  const onClickHandlerLogout = () => {
    localStorage.removeItem(LOCAL_STORAGE_TOKEN);
    isLoggedInVar(false);
    isSidebarOpenVar(false);
    navigate("/login");
    window.location.reload();
  };

  return (
    <Navbar className=" sticky top-0 z-50 mx-auto xl:max-w-screen-xl py-2 px-4 lg:px-8 lg:py-4">
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
        <div className="flex">
          {!isSidebarOpen && (
            <FontAwesomeIcon
              onClick={() => isSidebarOpenVar(true)}
              size="lg"
              icon={solid("arrow-right")}
              className="mr-4 hidden lg:block py-1.5"
            />
          )}
          <Link className="mr-4 cursor-pointer py-1.5 font-normal" to={"/"}>
            INTRANET
          </Link>
        </div>

        <div className="hidden lg:flex lg:gap-5">
          <Link to={"/me"}>
            <FontAwesomeIcon
              color="black"
              className="col-span-1 text-end cursor-pointer"
              size="xl"
              icon={solid("circle-user")}
              title={data?.me?.name}
            />
          </Link>
          <FontAwesomeIcon
            onClick={onClickHandlerLogout}
            color="red"
            className="col-span-1 cursor-pointer"
            size="xl"
            icon={solid("arrow-right-from-bracket")}
          />
        </div>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={toggleOpen}
        >
          {open ? (
            <FontAwesomeIcon size="2xl" icon={solid("xmark")} />
          ) : (
            <FontAwesomeIcon size="2xl" icon={solid("bars")} />
          )}
        </IconButton>
      </div>
      <Collapse open={open}>
        <div className="container mx-auto flex flex-col gap-2">
          <Menu />
          <div className="flex items-center justify-between">
            <Link to={"/me"}>
              <FontAwesomeIcon
                color="black"
                className="col-span-1 text-end cursor-pointer"
                size="xl"
                icon={solid("circle-user")}
                title={data?.me?.name}
              />
            </Link>
            <FontAwesomeIcon
              onClick={onClickHandlerLogout}
              color="red"
              className="col-span-1 text-end cursor-pointer"
              size="xl"
              icon={solid("arrow-right-from-bracket")}
            />
          </div>
        </div>
      </Collapse>
    </Navbar>
  );
}
