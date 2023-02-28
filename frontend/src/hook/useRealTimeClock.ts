import { useState, useEffect } from "react";
import { format } from "date-fns";
import ko from "date-fns/locale/ko";

const useRealtimeClock = () => {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const interval = setInterval(() => {
      const formattedDate = format(new Date(), "MM/dd (E) HH시 mm분", {
        locale: ko,
      });
      setTime(formattedDate);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return time;
};

export default useRealtimeClock;
