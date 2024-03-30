import { FC } from "react";
import { IconStates } from "../interfaces/types";

interface SvgComponentProps {
    icon: IconStates;
  }
  
  const SvgComponent: FC<SvgComponentProps> = ({
    icon,
  }) => {  return (
    <div>
         {icon === "caret-down" && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="9"
          height="5"
          viewBox="0 0 9 5"
          fill="none"
        >
          <path
            d="M1 0.75L4.5 4.25L8 0.75"
            stroke={"#333333"}
          />
        </svg>
      )}
    </div>
  )
}

export default SvgComponent
