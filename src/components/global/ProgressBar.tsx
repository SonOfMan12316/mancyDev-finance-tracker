interface ProgressBarProps {
  value: number;
  height?: string;
  innerHeight: string;
  backgroundColor?: string;
  progressColor?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  height = "",
  innerHeight = "",
  backgroundColor = "bg-ch-yellow",
  progressColor = "green",
}) => {
  return (
    <div
      className={`w-full ${height} ${backgroundColor} flex items-center rounded-lg overflow-hidden px-1`}
    >
      <div
        className={`bg-ch-${progressColor} ${innerHeight} rounded-lg transition-all duration-300`}
        style={{ width: `${Math.min(Math.max(value, 0), 100)}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
