import React, { Component } from "react";
import Chart from "chart.js";
// import classes from "./LineGraph.module.css";

export default class TopicsBarChart extends Component {
  chartRef = React.createRef();
  // classes = useStyles();

  componentDidMount() {
    const myChartRef = this.chartRef.current.getContext("2d");

    let gradient = myChartRef.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, "rgba(250,174,50,1)");
    gradient.addColorStop(1, "rgba(250,174,50,0)");

    new Chart(myChartRef, {
      type: "bar",
      data: {
        //Bring in data
        labels: ["Jan", "Feb", "March"],
        datasets: [
          {
            label: "Sales",
            backgroundColor: gradient,
            data: [86, 67, 91],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        title: { display: true, text: "notícies per mes" },
        legend: { display: false },
        scales: {
          xAxes: [
            {
              gridLines: { display: false },
              ticks: { source: "labels", autoSkip: false },
              // scaleLabel: { display: true, labelString: "Data" },
            },
          ],
          yAxes: [
            {
              gridLines: { display: false },
              scaleLabel: { display: true, labelString: "Notícies" },
            },
          ],
        },
      },
    });
  }
  render() {
    return (
      <div style={{ height: "200px", width: "70%", position: "relative" }}>
        <canvas id="myChart" ref={this.chartRef} />
      </div>
    );
  }
}
