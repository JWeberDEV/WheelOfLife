import { PolarArea } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, ArcElement, Tooltip, Legend } from 'chart.js';
import React, { useState } from 'react';
import './Content.css'

// Register the necessary chart elements
ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

const PolarAreaChart = (props) => {
  console.log(props);
  
  const data = {
    labels: ['Alimentação', 'Relação com a comida', 'Vida social', 'Disposição', 'Sono', 'Relações pessoais', 'Relação com o corpo', 'Trabalho', 'Lazer', 'Autocuidado', 'Autocontrole'],
    datasets: [
      {
        label: 'Minha nota',
        data: props.value.map(e=>e.value),
        backgroundColor: props.value.map(e=>e.color),
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            weight: 'bold',
            color: '#fff'
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
            weight: 'bold',
            size: 14
          }
        }
      }
    },
  };

  return(
    <PolarArea data={data} options={options} />
  )
};

export default PolarAreaChart;
