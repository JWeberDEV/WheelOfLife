import { PolarArea } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import "./Content.css";

// Register the necessary chart elements
ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

const PolarAreaChart = (props) => {
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const isDesktop = useMediaQuery({ query: "(min-width: 1224px)" });
  
  let size;

  if (isMobile) {
    size = 9;
  } else {
    size = 14;
  }

  const data = {
    labels: [
      "Relação com a comida",
      "Alimentação",
      "Vida social",
      "Disposição",
      "Sono",
      "Relações pessoais",
      "Relação com o corpo",
      "Trabalho",
      "Lazer",
      "Autocuidado",
      "Autocontrole",
    ],
    datasets: [
      {
        label: "Minha nota",
        data: props.value.map((e) => e.value),
        backgroundColor: props.value.map((e) => e.color),
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            weight: "bold",
            color: "#fff",
            size: size
          },
        },
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      r: {
        pointLabels: {
          display: true,
          centerPointLabels: true,
          font: {
            weight: "bold",
            size: size,
          },
        },
        max: 10,
      },
    },
  };

  return <PolarArea data={data} options={options} />;
};

export default PolarAreaChart;
