import React, { useState, useEffect, FC } from "react";

interface PieProps {
  data: number[];
  radius: number;
  hole: number;
  colors: string[];
  strokeWidth: number;
  stroke?: string;
  amount: number;
  limit: number;
}

interface SliceProps {
  key: number;
  value: number;
  startAngle: number;
  angle: number;
  radius: number;
  hole: number;
  trueHole: number;
  fill: string;
  stroke: string | undefined;
  strokeWidth: number;
  amount: number;
  limit: number;
}

interface PieChartProps {
  amount: number;
  limit: number;
}

const PieChart: FC<PieChartProps> = ({ amount, limit }) => {
  const [data] = useState([61.4, 16.5, 16, 6.1]);
  const colors = ["#82C9D7", "#F2CDAC", "#626070", "#277C78"];

  return (
    <div>
      <Pie
        amount={amount}
        limit={limit}
        data={data}
        radius={125}
        hole={60}
        colors={colors}
        strokeWidth={1}
      />
    </div>
  );
};

const Pie: React.FC<PieProps> = ({
  data,
  radius,
  hole,
  colors,
  strokeWidth,
  stroke,
  amount,
  limit,
}) => {
  const diameter = radius * 2;
  const sum = data.reduce((carry, current) => carry + current, 0);
  let startAngle = -65;

  return (
    <svg
      className={``}
      width={diameter}
      height={diameter}
      viewBox={`0 0 ${diameter} ${diameter}`}
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
    >
      {data.map((slice, sliceIndex) => {
        const angle = (slice / sum) * 360;
        const nextAngle = startAngle;
        startAngle += angle;

        return (
          <Slice
            key={sliceIndex}
            value={slice}
            startAngle={nextAngle}
            angle={angle}
            radius={radius}
            hole={radius - hole}
            trueHole={hole}
            fill={colors[sliceIndex % colors.length]}
            stroke={stroke}
            strokeWidth={strokeWidth}
            amount={amount}
            limit={limit}
          />
        );
      })}
    </svg>
  );
};

const Slice: React.FC<SliceProps> = ({
  value,
  startAngle,
  angle,
  radius,
  hole,
  trueHole,
  fill,
  stroke,
  strokeWidth,
  amount,
  limit,
}) => {
  const [path, setPath] = useState("");

  useEffect(() => {
    animate();
  }, [
    value,
    startAngle,
    angle,
    radius,
    hole,
    trueHole,
    fill,
    stroke,
    strokeWidth,
  ]);

  const animate = () => {
    draw(0);
  };

  const draw = (s: number) => {
    const step = angle / (37.5 / 2);
    if (angle) {
      if (s + step > angle) {
        s = angle;
      }
    }

    const a = getAnglePoint(startAngle, startAngle + s, radius, radius, radius);
    const b = getAnglePoint(
      startAngle,
      startAngle + s,
      radius - hole,
      radius,
      radius
    );

    const newPath = [
      `M${a.x1},${a.y1}`,
      `A${radius},${radius} 0 ${s > 180 ? 1 : 0},1 ${a.x2},${a.y2}`,
      `L${b.x2},${b.y2}`,
      `A${radius - hole},${radius - hole} 0 ${s > 180 ? 1 : 0},0 ${b.x1},${
        b.y1
      }`,
      "Z",
    ].join(" ");

    setPath(newPath);

    if (s < angle) {
      if (step) {
        setTimeout(() => draw(s + step), 20);
      }
    }
  };

  return (
    <g overflow="hidden">
      <path
        d={path}
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth || 3}
      />
      <circle
        cx={radius}
        cy={radius}
        r={radius * 0.75}
        fill="#f3ebeb"
        opacity="0.15"
      />
      <circle cx={radius} cy={radius} r={radius * 0.65} fill="white" />
      <text
        x={radius}
        y={radius - 10}
        style={{
          fontFamily: "'Public Sans', sans-serif",
          fontWeight: 700,
          fontSize: "32px",
          fill: "#201F24",
        }}
        textAnchor="middle"
        alignmentBaseline="middle"
        dominantBaseline="middle"
      >
        {"$" + amount}
      </text>
      <text
        x={radius}
        y={radius + 25}
        style={{
          fontFamily: "'Public Sans', sans-serif",
          fontWeight: 400,
          fontSize: "12px",
          fill: "#696868",
        }}
        textAnchor="middle"
        alignmentBaseline="middle"
      >
        of {"$" + limit} limit
      </text>
    </g>
  );
};

const getAnglePoint = (
  startAngle: number,
  endAngle: number,
  radius: number,
  x: number,
  y: number
) => {
  const x1 = x + radius * Math.cos((Math.PI * startAngle) / 180);
  const y1 = y + radius * Math.sin((Math.PI * startAngle) / 180);
  const x2 = x + radius * Math.cos((Math.PI * endAngle) / 180);
  const y2 = y + radius * Math.sin((Math.PI * endAngle) / 180);

  return { x1, y1, x2, y2 };
};

export default PieChart;
