import React from "react";
import { Bar } from "react-chartjs-2";

class BarChart extends React.Component {
  render() {
    const { data, prices_list, highlight, domain, step } = this.props;
    // calculate frequency of data
    var counts = {};
    for (var i = 0; i < data.length; i++) {
        counts[data[i]] = prices_list[data[i]] || 0.01;
    }

    // generate data
    const barDataValues = [];
    for (let i = domain[0]; i < domain[1]; i=i+step) {
      barDataValues.push(counts[i]);
    }
    const barData = {
      labels: barDataValues.map((val, i) => data[i]),
      datasets: [
        {
          backgroundColor: barDataValues.map((val, i) =>
            i >= highlight[0] && i <= highlight[1]
              ? "#D7D8D8"
              : "#EEEEEE"
          ),
          data: barDataValues,
          barPercentage: 1.5,
          barThickness: 10,
          minBarLength: 10
        }
      ]
    };

    const options = {
      responsive: true,
      legend: {
        display: false
      },
      scales: {
        xAxes: [
          {
            display: false,
            barPercentage: 1.5
          }
        ],
        yAxes: [
          {
            display: false,
            ticks: {
              min: 0
            }
          }
        ]
      }
    };
    return <Bar data={barData} options={options} />;
  }
}

export default BarChart;
