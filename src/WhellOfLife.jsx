import React, { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import {Chart, ArcElement} from 'chart.js'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
Chart.register(ArcElement);

const WheelOfLife = () => {
  const [data, setData] = useState({
    labels: ['Career', 'Health', 'Family', 'Finances', 'Personal Growth', 'Fun & Leisure', 'Environment', 'Significant Other'],
    datasets: [{
      data: [0, 0, 0, 0, 0, 0, 0, 0],  // Initial values for each category
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#FFCD56', '#36A2A1']
    }]
  });

  const handleChange = (index, value) => {
    let newData = [...data.datasets[0].data];
    newData[index] = value;
    setData({
      ...data,
      datasets: [{
        ...data.datasets[0],
        data: newData
      }]
    });
  };

  const exportPDF = () => {
    html2canvas(document.querySelector("#chart")).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 0, 0);
      pdf.save("wheel-of-life.pdf");
    });
  };

  return (
    <div>
      <div>
        {data.labels.map((label, index) => (
          <div key={index}>
            <label>{label}</label>
            <input
              type="range"
              min="0"
              max="10"
              value={data.datasets[0].data[index]}
              onChange={(e) => handleChange(index, e.target.value)}
            />
          </div>
        ))}
      </div>
      
      <div id="chart">
        <Pie data={data} />
      </div>

      <button onClick={exportPDF}>Export as PDF</button>
    </div>
  );
};

export default WheelOfLife;
