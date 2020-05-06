import React, { useEffect, useRef, useState } from "react";
import Chartjs from "chart.js";
import axios from "axios";
import { baseErrorMessage, getErrorMessage } from "./utils/getErrorMessage.js";

const randomInt = () => Math.floor(Math.random() * (10 - 1 + 1)) + 1;

const TopicsBarChart = () => {
  const [loading, setLoading] = useState(true);
  const [errorStatus, setErrorStatus] = useState({ error: false, message: "" });
  const chartContainer = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);
  const [chartData, setChartData] = useState(null);

  // create a barchart instance
  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      const myChartRef = chartContainer.current.getContext("2d");

      let gradient = myChartRef.createLinearGradient(0, 0, 0, 400);
      gradient.addColorStop(0, "#26c6da");
      gradient.addColorStop(1, "#00acc1");

      const chartConfig = {
        type: "bar",
        data: {
          labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
          datasets: [
            {
              label: "notícies",
              data: [12, 19, 3, 5, 2, 3],
              backgroundColor: gradient,
              borderColor: "#00acc1",
              borderWidth: 2,
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
                scaleLabel: {
                  display: true,
                  labelString: "Número de notícies",
                },
              },
            ],
          },
        },
      };

      const newChartInstance = new Chartjs(chartContainer.current, chartConfig);
      setChartInstance(newChartInstance);
    }
  }, [chartContainer]);

  // Get the bar chart data.
  useEffect(() => {
    let unmounted = false;

    const fetchData = () => {
      if (!unmounted) {
        setErrorStatus({ error: false, message: "" });
        setLoading(true);
      }

      try {
        axios
          // .get(`/rss-chart/topics/barchart/${selectedMonth}`)
          .get(`/rss-chart/topics/barchart/any`)
          .then((results) => {
            if (results.data.results.length > 0) {
              // OK
              // Beware with this:
              // https://overreacted.io/a-complete-guide-to-useeffect/#each-render-has-its-own-event-handlers
              setTimeout(() => {
                if (!unmounted) {
                  console.log("HI1");
                  setErrorStatus({ error: false, message: "" });
                  setLoading(false);
                  console.log(results.data.results);
                  setChartData(results.data.results);
                }
              }, 850);
            } else {
              // No data returned
              if (!unmounted) {
                console.log("HI2");
                setChartData([]);
                setLoading(false);
              }
            }
          })
          .catch((error) => {
            console.log("HI3");
            console.log(getErrorMessage(error));
            setErrorStatus({ error: true, message: baseErrorMessage });
            setLoading(false);
          });
      } catch (error) {
        if (!unmounted) {
          console.log(error);
          console.log(getErrorMessage(error));
          setErrorStatus({ error: true, message: baseErrorMessage });
          setLoading(false);
        }
      }
    };

    fetchData();

    // Cleanup function. useEffect uses the cleanup function to execute operations useful on component unmount.
    return () => (unmounted = true);
  }, []);

  const updateDataset = (datasetIndex, newData) => {
    chartInstance.data.datasets[datasetIndex].data = newData;
    chartInstance.update();
  };

  const onButtonClick = () => {
    const data = [
      randomInt(),
      randomInt(),
      randomInt(),
      randomInt(),
      randomInt(),
      randomInt(),
    ];
    updateDataset(0, data);
  };

  return (
    <div
      style={{
        height: "200px",
        width: "70%",
        position: "relative",
        marginTop: "20px",
        marginBottom: "70px",
      }}
    >
      <button onClick={onButtonClick}>Randomize!</button>
      <canvas ref={chartContainer} />
    </div>
  );
};

export default TopicsBarChart;
