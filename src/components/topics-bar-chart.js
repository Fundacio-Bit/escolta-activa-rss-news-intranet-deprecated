import React, { useEffect, useRef, useState } from "react";
import Chartjs from "chart.js";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";

import ErrorIcon from "@material-ui/icons/Error";
import { baseErrorMessage, getErrorMessage } from "./utils/getErrorMessage.js";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  error: {
    marginTop: theme.spacing(1),
    color: "#e91e63",
  },
  loading: {
    flexGrow: 1,
    marginTop: theme.spacing(4),
    textAlign: "center",
  },
}));

const TopicsBarChart = (props) => {
  const classes = useStyles();

  const [loading, setLoading] = useState(true);
  const [errorStatus, setErrorStatus] = useState({ error: false, message: "" });
  const [chartData, setChartData] = useState({ months: [], counts: [] });
  const [chartInstance, setChartInstance] = useState(null);
  const chartContainer = useRef(null);

  // create a barchart instance
  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      const myChartRef = chartContainer.current.getContext("2d");

      // create an array of bar colors with the selected Month highlighted
      let gradient = myChartRef.createLinearGradient(0, 0, 0, 400);
      gradient.addColorStop(0, "#26c6da");
      gradient.addColorStop(1, "#00acc1");

      let highlightedGradient = myChartRef.createLinearGradient(0, 0, 0, 400);
      highlightedGradient.addColorStop(0, "#e3a7b2");
      highlightedGradient.addColorStop(1, "#da2647");

      let gradientsArray = Array(chartData.months.length).fill(gradient);
      let highlightedGradientsArray = gradientsArray;
      if (chartData.selectedMonthIndex !== -1) {
        gradientsArray[chartData.selectedMonthIndex] = highlightedGradient;
      }

      // create an array of bar border colors with the selected Month highlighted
      let bordersArray = Array(chartData.months.length).fill("#00acc1");
      let highlightedbordersArray = bordersArray;
      if (chartData.selectedMonthIndex !== -1) {
        bordersArray[chartData.selectedMonthIndex] = "#da2647";
      }

      let monthsCatalan = {
        1: "gener",
        2: "febrer",
        3: "març",
        4: "abril",
        5: "maig",
        6: "juny",
        7: "juliol",
        8: "agost",
        9: "setembre",
        10: "octubre",
        11: "novembre",
        12: "desembre",
      };

      // create catalan version of months
      let formattedMonths = chartData.months.map((month) => {
        let monthName = monthsCatalan[month.split("-")[1]];
        let year = month.split("-")[0];
        return monthName + "-" + year;
      });

      const chartConfig = {
        type: "bar",
        data: {
          labels: formattedMonths,
          datasets: [
            {
              label: "notícies",
              data: chartData.counts,
              backgroundColor: highlightedGradientsArray,
              borderColor: highlightedbordersArray,
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
                ticks: { source: "labels", autoSkip: true, maxTicksLimit: 30 },
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
  }, [chartData]);

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
          .get(
            `/rss-chart/topics/barchart/month/${props.selectedMonth}/topic/${props.selectedTopic}`
          )
          .then((results) => {
            if (
              Object.keys(results.data.results).length > 0 &&
              results.data.results.constructor === Object
            ) {
              // OK
              // Beware with this:
              // https://overreacted.io/a-complete-guide-to-useeffect/#each-render-has-its-own-event-handlers
              setTimeout(() => {
                if (!unmounted) {
                  setErrorStatus({ error: false, message: "" });
                  setLoading(false);
                  setChartData(results.data.results);
                }
              }, 850);
            } else {
              // No data returned
              if (!unmounted) {
                setChartData([]);
                setLoading(false);
              }
            }
          })
          .catch((error) => {
            console.log(getErrorMessage(error));
            setErrorStatus({ error: true, message: baseErrorMessage });
            setLoading(false);
          });
      } catch (error) {
        if (!unmounted) {
          console.log(getErrorMessage(error));
          setErrorStatus({ error: true, message: baseErrorMessage });
          setLoading(false);
        }
      }
    };

    fetchData();

    // Cleanup function. useEffect uses the cleanup function to execute operations useful on component unmount.
    return () => (unmounted = true);
  }, [props.selectedTopic, props.selectedMonth]);

  return (
    <div>
      {errorStatus.error && (
        <div className={classes.error}>
          &nbsp;
          <ErrorIcon style={{ verticalAlign: "middle" }} />
          &nbsp;{errorStatus.message}
        </div>
      )}

      {loading && (
        <div className={classes.loading}>
          <CircularProgress size={24} thickness={4} />
        </div>
      )}

      {!loading && !errorStatus.error && (
        <div
          style={{
            height: "250px",
            width: "100%",
            position: "relative",
            marginTop: "20px",
            marginBottom: "70px",
          }}
        >
          <canvas ref={chartContainer} />
        </div>
      )}
    </div>
  );
};

export default TopicsBarChart;
