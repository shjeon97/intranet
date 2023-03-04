import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Typography } from "@material-tailwind/react";
import { Role } from "../../gql/graphql";
import { useMeQuery } from "../../hook/useMeQuery";
import Loading from "../loading";

const Menu = () => {
  const { data, loading } = useMeQuery();

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <FontAwesomeIcon size="xl" icon={solid("bullhorn")} className="mr-2" />
        공지사항
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <FontAwesomeIcon
          size="xl"
          icon={solid("clock-rotate-left")}
          className="mr-2"
        />
        출퇴근기록
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <FontAwesomeIcon
          size="xl"
          icon={solid("calendar-days")}
          className="mr-2"
        />
        근무일정
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <FontAwesomeIcon
          size="xl"
          icon={solid("person-booth")}
          className="mr-2"
        />
        회의실
      </Typography>
      {data?.me?.roles.find((role: Role) => role.name === "Admin") && (
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className="p-1 font-normal"
        >
          <FontAwesomeIcon
            size="xl"
            icon={solid("user-gear")}
            className="mr-2"
          />
          관리자 페이지
        </Typography>
      )}
    </>
  );
};

export default Menu;
