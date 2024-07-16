type ChartConfig = {
  labels: number[];
  datasets: {
    label: string;
    data: {
      x: number;
      y: number;
    }[];
    borderColor: string;
    backgroundColor: string;
    borderWidth: number;
    fill: boolean | number;
    pointStyle?: string;
    pointRadius?: number;
    borderDash?: number[];
  }[];
};

type dataPointArray = { x: number; y: number }[];

export const chartData = (
    mainDataset: dataPointArray,
    averageSlopeLine: dataPointArray,
    upperLinePoints: dataPointArray,
    lowerLinePoints: dataPointArray
  ): ChartConfig => {
    return {
      labels: Array.from({ length: 20 }, (_, i) => i + 1),
      datasets: [
        {
          label: "Test Result",
          data: mainDataset,
          borderColor: "blue",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderWidth: 2,
          fill: false,
        },
        {
          label: "Average Test Result",
          data: averageSlopeLine,
          borderColor: "black",
          backgroundColor: "rgba(255, 0, 0, 0.2)",
          borderWidth: 2,
          fill: false,
          pointStyle: "none", // Hide the points,
          pointRadius: 0,
        },
        {
          label: "Upper Line",
          data: upperLinePoints,
          borderColor: "rgba(0, 255, 0, 0.5)",
          borderWidth: 4,
          borderDash: [10, 5],
          fill: 3, // Fill between upper line and lower line
          backgroundColor: "rgba(255, 0, 0, 0.2)",
        },
        {
          label: "Lower Line",
          data: lowerLinePoints,
          borderColor: "rgba(255, 0, 0, 0.5)",
          borderWidth: 2,
          borderDash: [10, 5],
          fill: false, // Fill between lower line and upper line
          backgroundColor: "rgba(122, 0, 0, 0.5)",
        },
      ],
    };
  };