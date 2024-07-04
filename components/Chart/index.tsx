"use client";

import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement,
  Filler,
} from "chart.js";
import annotationPlugin from "chartjs-plugin-annotation";
import Draggable from "react-draggable";
import {
  mainDataset,
  upperLinePoints,
  lowerLinePoints,
  averageSlopeLine,
} from "./mock-data";

// Register the Chart plugins
ChartJS.register(
  LinearScale,
  CategoryScale,
  annotationPlugin,
  PointElement,
  LineElement,
  Filler
);

const SimpleEKGChart = () => {
  const chartWidth = 780; // Width of the chart in pixels
  const xRange = 20; // Range of x-values (1 to 20)
  const scalingFactor = chartWidth / xRange; // Scaling factor in pixels per unit
  const predictiveMaxValue = (19).toFixed(2); // Example value
  const [minRange, setMinRange] = useState(5); // Initial x-value positin for minimum range
  const [maxRange, setMaxRange] = useState(15); // Initial x-value position for maximum range

  const [minRangeValue, setMinRangeValue] = useState(minRange); // Set the actual x graph value the handle is at
  const [maxRangeValue, setMaxRangeValue] = useState(maxRange); // Set the actual x graph value the handle is at

  const handleDragMin = (e: any, data: any) => {
    let newX = Math.round(data.x / scalingFactor) + 1;
    setMinRange(newX);
    setMinRangeValue(newX); // Update displayed value
  };

  const handleDragMax = (e: any, data: any) => {
    const newX = Math.round(data.x / scalingFactor) + 1;
    setMaxRange(newX);
    setMaxRangeValue(newX); // Update displayed value
  };

  const data = {
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

  const options = {
    scales: {
      y: {
        min: 0,
        max: 20,
        ticks: {
          stepSize: 1,
          callback: (value: number) => value.toFixed(2), // Force two decimal places
        },
      },
      x: {
        min: 0,
        max: 20,
      },
    },
    plugins: {
      filler: {
        propagate: false,
      },
      annotation: {
        annotations: {
          predictiveMaxLine: {
            type: "line",
            yMin: predictiveMaxValue,
            yMax: predictiveMaxValue,
            borderColor: "rgba(0, 0, 0, 0.5)",
            borderWidth: 2,
            borderDash: [10, 5],
            label: {
              display: true,
              content: "pred. max.",
              enabled: true,
              position: "start",
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              color: "rgba(255, 255, 255, 1)",
              xAdjust: 10,
              yAdjust: -10,
            },
          },
          label2: {
            type: "label",
            display: true,
            content: "Slope" + predictiveMaxValue,
            enabled: true,
            position: "end",
            xValue: data.labels.length - 1,
            yValue: predictiveMaxValue,
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            color: "rgba(255, 255, 255, 1)",
            xAdjust: -10,
            yAdjust: 30,
          },
        },
      },
    },
  };

  return (
    <div style={{ width: "800px", position: "relative" }}>
      <h2>Simple EKG Chart</h2>
      <Line data={data} options={options} />
      <div
        style={{
          width: "737px",
          position: "absolute",
          height: "88.5%",
          top: "20px",
          left: "46px",
          bottom: 0,
          right: 0,
        }}
      >
        <Draggable
          axis="x"
          bounds="parent"
          onDrag={handleDragMin}
          position={{
            x: (minRange - 1) * scalingFactor,
            y: 0,
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "40px",
              height: "100%",
              backgroundColor: "none",
              borderLeft: "2px solid red",
              cursor: "ew-resize",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "-25px",
                right: "11px",
                color: "white",
                padding: "2px 5px",
                background: "black",
                border: "1px solid black",
              }}
            >
              LL
            </div>
            <div
              style={{
                backgroundColor: "black",
              }}
            >
              {minRangeValue.toFixed(2)}
            </div>
          </div>
        </Draggable>
        <Draggable
          axis="x"
          bounds="parent"
          onDrag={handleDragMax}
          position={{
            x: (maxRange - 1) * scalingFactor,
            y: 0,
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "40px",
              height: "100%",
              backgroundColor: "none",
              borderLeft: "2px solid red",
              cursor: "ew-resize",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "-25px",
                right: "11px",
                color: "white",
                padding: "2px 5px",
                background: "black",
                border: "1px solid black",
              }}
            >
              UL
            </div>
            <div
              style={{
                backgroundColor: "black",
              }}
            >
              {maxRangeValue.toFixed(2)}
            </div>
          </div>
        </Draggable>
      </div>
    </div>
  );
};

export default SimpleEKGChart;
