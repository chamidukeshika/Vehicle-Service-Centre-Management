import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useViewRecordsQuery } from "../../slices/recordApiSlice";
import Chart from "chart.js/auto";
import "chartjs-adapter-date-fns";

const RecordsChart = () => {
  const dispatch = useDispatch();
  const { data: recordsData, isLoading, isError } = useViewRecordsQuery();

  useEffect(() => {
    // Fetch records data
    // dispatch(fetchRecordsData());
  }, [dispatch]);

  useEffect(() => {
    if (recordsData) {
      renderChart(recordsData);
    }
  }, [recordsData]);

  const renderChart = (recordsData) => {
    const sectionData = {};
    recordsData.forEach((record) => {
      const { section, lcost, tcost } = record;
      if (!sectionData[section]) {
        sectionData[section] = { lcost: 0, tcost: 0 };
      }
      sectionData[section].lcost += lcost;
      sectionData[section].tcost += tcost;
    });

    const labels = Object.keys(sectionData);
    const lcostData = labels.map((section) => sectionData[section].lcost);
    const tcostData = labels.map((section) => sectionData[section].tcost);

    const ctx = document.getElementById("RecordsChart");
    if (!ctx) return;

    new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Labor Cost",
            data: lcostData,
            backgroundColor: "#FF6384", // Red
            borderColor: "#FF6384",
            borderWidth: 1,
                borderRadius: 15,
                barThickness: 100,    // Rounded corners
          },
          {
            label: "Total Cost",
            data: tcostData,
            backgroundColor: "#36A2EB", // Blue
            borderColor: "#36A2EB",
            borderWidth: 1,
              borderRadius: 15,
              barThickness: 100,  // Rounded corners
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            stacked: true,
            grid: {
              display: false,
            },
          },
          y: {
            beginAtZero: true,
            grid: {
              color: "rgba(0, 0, 0, 0.1)",
            },
          },
        },
        plugins: {
          title: {
            display: true,
            text: "Service Record Analyze",
            font: {
              size: 24, // Larger title font size
            },
          },
          legend: {
            display: true,
            position: "top",
            labels: {
              boxWidth: 20,
              padding: 15,
              font: {
                size: 14, // Larger legend font size
              },
            },
          },
          tooltip: {
            displayColors: false,
            mode: "index",
          },
        },
        animation: {
          duration: 2000, // Longer animation duration
          easing: "easeInOutQuart", // Smooth animation
        },
      },
    });
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "500px" }}>
      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>Error fetching records data.</p>
      ) : (
        <div style={{ width: "80%", maxWidth: "800px", height: "80%", maxHeight: "600px" }}>
          <canvas id="RecordsChart" style={{ width: "100%", height: "100%" }}></canvas>
        </div>
      )}
    </div>
  );
};

export default RecordsChart;
