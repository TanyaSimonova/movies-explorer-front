import { useState, useEffect } from "react";
import {
  breakpointS,
  breakpointM,
  breakpointL,
  breakpointXL,
} from "../utils/constants";

export const useResize = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    let timeout;
    const handleResize = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setWidth(window.innerWidth);
      }, 1000);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return {
    width,
    isScreenS: width >= breakpointS,
    isScreenM: width >= breakpointM,
    isScreenL: width >= breakpointL,
    isScreenXl: width >= breakpointXL,
  };
};
