interface ProgressBarProps {
  value: number;
  secondValue: number;
  height?: string;
  innerHeight: string;
  backgroundColor?: string;
  progressColor?: string;
  calculatedProgressColor?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  secondValue,
  height = "",
  innerHeight = "",
  backgroundColor = "bg-ch-yellow",
  progressColor = "green",
  calculatedProgressColor,
}) => {
  return (
    <div
      className={`w-full ${height} ${backgroundColor} flex gap-x-0.5 items-center rounded-lg overflow-hidden`}
    >
      <div
        className={`bg-ch-${progressColor} ${innerHeight} rounded-l transition-all duration-300`}
        style={{ width: `${Math.min(Math.max(value, 0), 100)}%` }}
      ></div>
      {calculatedProgressColor && (
        <div
          className={`bg-ch-${calculatedProgressColor} ${innerHeight} rounded-r transition-all duration-300`}
          style={{ width: `${Math.min(Math.max(secondValue, 0), 100)}%` }}
        ></div>
      )}
    </div>
  );
};

export default ProgressBar;
