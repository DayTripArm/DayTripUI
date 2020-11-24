import React from "react";
import { Bar } from "react-chartjs-2";

class BarChart extends React.Component {
  render() {
    const { data, prices_list, highlight, domain } = this.props;
    // calculate frequency of data
    var counts = {};
    for (var i = 0; i < data.length; i++) {
        counts[data[i]] = prices_list[data[i]] || 0.03;
    }

    // generate data
    const barDataValues = [];
    for (let i = 0; i < domain[1]; i++) {
      barDataValues.push(counts[i] || 0);
    }
    const barData = {
      labels: barDataValues.map((val, i) => i),
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
            barPercentage: 10
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
