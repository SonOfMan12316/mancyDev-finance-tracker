import { FC } from "react";
import classnames from "classnames";

import s from "./LoadingDots.module.css";

interface LoadingDotsProps {
  size?: "default" | "sm";
}

const LoadingDots: FC<LoadingDotsProps> = ({ size = "default" }) => {
  return (
    <span className={s.root}>
      {[...Array(3)].map((index: number) => (
        <span
          className={classnames(s.dot, { [s.smallDot]: size === "sm" })}
          key={`dot_${index + 1}`}
        />
      ))}
    </span>
  );
};

export default LoadingDots;
