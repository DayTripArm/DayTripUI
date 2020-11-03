import React from "react";
import { Bar } from "react-chartjs-2";

class BarChart extends React.Component {
  render() {
    const { prices_list, highlight, domain } = this.props;

    // calculate frequency of data
    var counts = {};
    for (var i = 0; i < prices_list.length; i++)
      if (prices_list[i].price) counts[prices_list[i].price] = prices_list[i].price_count || 0;

    // generate data
    const barDataValues = [];
    for (let i = 10; i < domain[1]; i++) {
      barDataValues.push(counts[i] || 0);
    }
    const barData = {
      labels: barDataValues.map((val, i) => i),
      datasets: [
        {
          backgroundColor: barDataValues.map((val, i) =>
            i >= highlight[0] && i <= highlight[1]
              ? "rgba(0, 0, 0, 1)"
              : "rgba(75, 75, 75, 0.5)"
          ),
          hoverBackgroundColor: "rgba(75,75,75,0.6)",
          data: barDataValues
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
            display: false
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
