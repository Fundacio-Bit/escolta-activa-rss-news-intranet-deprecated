import React, { useRef, useEffect } from "react";
// import { Line } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
// import { makeStyles } from "@material-ui/core/styles";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     fontFamily: "Roboto",
//   },
//   // chartContainer: {
//   //   // width: "100%",
//   //   // maxHeight: "200px",
//   //   position: "relative",
//   //   height: "100%",
//   //   width: "100%",
//   // },
// }));

const TopicsTimeSeries = ({}) => {
  const chartRef = useRef();
  const myChartRef = chartRef.current.getContext("2d");

  let gradient = myChartRef.createLinearGradient(0, 0, 0, 400);
  gradient.addColorStop(0, "rgba(250,174,50,1)");
  gradient.addColorStop(1, "rgba(250,174,50,0)");

  const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "My First dataset",
        fill: false,
        lineTension: 0.1,
        backgroundColor: gradient,
        borderColor: "rgba(75,192,192,1)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [65, 59, 80, 81, 56, 55, 40],
      },
    ],
  };

  return (
    <div>
      <Bar
        data={data}
        width={"70%"}
        height={"15px"}
        options={{
          responsive: true,
          title: { display: true, text: "notícies per mes" },
          legend: { display: false },
          scales: {
            xAxes: [
              {
                gridLines: { display: false },
                ticks: { source: "labels", autoSkip: false },
                scaleLabel: { display: true, labelString: "Data" },
              },
            ],
            yAxes: [
              {
                gridLines: { display: false },
                scaleLabel: { display: true, labelString: "Freqüència" },
              },
            ],
          },
          // tooltips: {
          //   mode: "x",
          //   intersect: true,
          //   hover: { mode: "nearest", intersect: true },
          //   scaleShowValues: true,
          // },
        }}
      />
    </div>
  );
};

export default TopicsTimeSeries;

{
  /* <div id="chartContainer">
<canvas id="seriesChart" width="70%" height="20px"></canvas>
</div>   */
}

//   options:
