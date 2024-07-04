// Mock data for chart
export const mainDataset = [
  { x: 0, y: 3 },
  { x: 2, y: 6 },
  { x: 3, y: 5 },
  { x: 4, y: 8 },
  { x: 5, y: 10 },
  { x: 6, y: 7 },
  { x: 7, y: 9 },
  { x: 8, y: 12 },
  { x: 9, y: 11 },
  { x: 10, y: 12 },
  { x: 11, y: 12 },
  { x: 12, y: 13 },
  { x: 13, y: 14 },
  { x: 14, y: 15 },
  { x: 15, y: 15.5 },
  { x: 16, y: 17 },
  { x: 17, y: 18.55 },
  { x: 18, y: 18.99 },
  { x: 19, y: 19.25 },
  { x: 20, y: 19.5 },
];

export const upperLinePoints = [
  { x: 0, y: 5 },
  { x: 2, y: 8 },
  { x: 3, y: 10 },
  { x: 4, y: 11 },
  { x: 5, y: 12 },
  { x: 6, y: 12 },
  { x: 7, y: 13 },
  { x: 8, y: 14 },
  { x: 9, y: 14.5 },
  { x: 10, y: 14.8 },
  { x: 11, y: 15.5 },
  { x: 12, y: 15.8 },
  { x: 13, y: 15.9 },
  { x: 14, y: 16 },
  { x: 15, y: 17 },
  { x: 16, y: 18.5 },
  { x: 17, y: 18.6 },
  { x: 18, y: 18.8 },
  { x: 19, y: 19.5 },
  { x: 20, y: 20 },
];

export const lowerLinePoints = [
  { x: 0, y: 1 },
  { x: 2, y: 2 },
  { x: 3, y: 3 },
  { x: 4, y: 4 },
  { x: 5, y: 5 },
  { x: 6, y: 6 },
  { x: 7, y: 6 },
  { x: 8, y: 7 },
  { x: 9, y: 8 },
  { x: 10, y: 8 },
  { x: 11, y: 9 },
  { x: 12, y: 10 },
  { x: 13, y: 11 },
  { x: 14, y: 12 },
  { x: 15, y: 13 },
  { x: 16, y: 14 },
  { x: 17, y: 14 },
  { x: 18, y: 15 },
  { x: 19, y: 16 },
  { x: 20, y: 16 },
];

// Calculate the average slope of mainDataset
export const averageSlopeLine = [
  { x: 0, y: 3 },
  { x: 1, y: 3.85 },
  { x: 2, y: 4.7 },
  { x: 3, y: 5.55 },
  { x: 4, y: 6.4 },
  { x: 5, y: 7.25 },
  { x: 6, y: 8.1 },
  { x: 7, y: 8.95 },
  { x: 8, y: 9.8 },
  { x: 9, y: 10.65 },
  { x: 10, y: 11.5 },
  { x: 11, y: 12.35 },
  { x: 12, y: 13.2 },
  { x: 13, y: 14.05 },
  { x: 14, y: 14.9 },
  { x: 15, y: 15.75 },
  { x: 16, y: 16.6 },
  { x: 17, y: 17.45 },
  { x: 18, y: 18.3 },
  { x: 19, y: 19.15 },
  { x: 20, y: 20 },
];

export const chartData = {
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
