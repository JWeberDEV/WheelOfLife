import { PolarArea } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, ArcElement, Tooltip, Legend } from 'chart.js';
import React, { useState } from 'react';
import './Content.css'

// Register the necessary chart elements
ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

const PolarAreaChart = () => {
  
  const data = {
    labels: ['Alimentação', 'Relação com a comida', 'Vida social', 'Disposição', 'Sono', 'Relações pessoais', 'Relação com o corpo', 'Trabalho', 'Lazer', 'Autocuidado', 'Autocontrole'],
    datasets: [
      {
        label: 'Minha nota',
        data: [5, 8, 7, 6, 10, 10, 3, 7, 8, 10, 5],
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
          'rgba(143, 12, 205, 0.5)',
          'rgba(143, 12, 25, 0.5)',
          'rgba(13, 120, 25, 0.5)',
          'rgba(253, 100, 85, 0.5)',
          'rgba(13, 120, 205, 0.5)',
          'rgba(113, 255, 125, 0.5)',
          'rgba(255, 120, 25, 0.5)',
        ],
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
