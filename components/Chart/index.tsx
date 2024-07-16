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
import styles from "@/components/Chart/style.module.css";
import { chartData } from "@/components/Chart/utils/generate-data";

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
  const predictiveMaxValue = (17).toFixed(2); // Example value
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

  const data = chartData(
    mainDataset,
    averageSlopeLine,
    upperLinePoints,
    lowerLinePoints
  );

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
              content: "max",
              enabled: true,
              position: "start",
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              color: "rgba(255, 255, 255, 1)",
              xAdjust: 10,
              yAdjust: 20,
            },
          },
          label2: {
            type: "label",
            display: true,
            content: predictiveMaxValue,
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
    <div className={styles.chart}>
      <h2>Complex Chart</h2>
      <Line data={data} options={options} />
      <div className={styles.handles}>
        <Draggable
          axis="x"
          bounds="parent"
          onDrag={handleDragMin}
          position={{
            x: (minRange - 1) * scalingFactor,
            y: 0,
          }}
        >
          <div className={styles.handleWrap}>
            <div className={styles.handle}>A</div>
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
          <div className={styles.handleWrap}>
            <div className={styles.handle}>B</div>
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
