import React, { FC, useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut as DoughnutChart } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { useGetProducts } from "../../../redux/product/productSlice";

const LegendItem = ({ color, name, detail }) => {
  return (
    <div className="dashboard_totalorder_legend">
      {/* name and detail */}
      <div className="flex w-full justify-between items-center flex-wrap gap-2 text-center">
        {/* bullet with name */}
        <div className=" flex gap-2 items-center">
          <div className="flex items-center justify-center">
            <div
              className="w-[8px] h-[8px] rounded-[16px] flex-none flex-grow "
              style={{ backgroundColor: color }}
            />
          </div>
          <h3 className="flex text-[12px] leading-[18px] font-normal text-[#1C1C1C] font-Inter ">
            {name}
          </h3>
        </div>

        {/* detail */}
        <h3 className=" flex  text-[9px] leading-[14px] font-normal text-[#1C1C1C] font-Inter ">
          {detail}%
        </h3>
      </div>
    </div>
  );
};

const PieChart = () => {
  const products = useGetProducts();
  const [filteredWigs, setFilteredWigs] = useState({});
  const [filteredExtensions, setFilteredExtensions] = useState({});
  const [filtereAccessories, setFilteredAccessories] = useState({});

  // Filter for wigs
  useEffect(() => {
    const filteredWigs = products.filter(
      (product) =>
        product?.collections &&
        product?.collections.toLowerCase().includes("Wigs".toLowerCase())
    );
    setFilteredWigs(filteredWigs);
  }, [products]);

  // Filter for extensions
  useEffect(() => {
    const filteredExtensions = products.filter(
      (product) =>
        product?.collections &&
        product?.collections.toLowerCase().includes("Extensions".toLowerCase())
    );
    setFilteredExtensions(filteredExtensions);
  }, [products]);

  // Filter for accessories
  useEffect(() => {
    const filteredAccessories = products.filter(
      (product) =>
        product?.collections &&
        product?.collections.toLowerCase().includes("Accessories".toLowerCase())
    );
    setFilteredAccessories(filteredAccessories);
  }, [products]);

  const wigsLength = filteredWigs.length;
  const accessoriesLength = filtereAccessories.length;
  const extensionsLength = filteredExtensions.length;

  const wigsPercent = wigsLength / 100;
  const extensionsPercent = extensionsLength / 100;
  const accessoriesPercent = accessoriesLength / 100;

  const data = [
    { tagName: "Wigs", percentage: wigsPercent, color: "#E8E9F6" },
    { tagName: "Extensions", percentage: extensionsPercent, color: "#D9DAF5" },
    {
      tagName: "Accessories",
      percentage: accessoriesPercent,
      color: "#BCBDF5",
    },
  ];

  ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);
  const chartData = {
    labels: data && data.map((item) => item.tagName),
    datasets: [
      {
        labels: ["sdsd", "sdsd"],
        data: data && data.map((item) => item.percentage || 0),
        backgroundColor: data && data.map((item) => item.color),
        borderColor: data && data.map((item) => item.color),
        borderWidth: 1,
        datalabels: {
          color: "white",
        },
        hoverOffset: 10,
        hoverBorderWidth: 10,
        hoverBorderJoinStyle: "miter",
      },
    ],
  };

  const options = {
    plugins: {
      datalabels: {
        display: false,
      },
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "black",
        bodyColor: "white",
        bodySpacing: 5,
        padding: 15,
        boxWidth: 8,
        boxHeight: 8,
        boxPadding: 5,
        usePointStyle: true,
        callbacks: {
          label: function (context) {
            const label = `${context.label} ${context.parsed}%`;
            return label;
          },
        },
      },
    },
    layout: {
      padding: 20,
    },
    // onClick: (evt, item) => {
  };

  return (
    <>
      {products && (
        <div className="flex flex-col  gap-3  ">
          <DoughnutChart data={chartData} options={options} />
          {data &&
            data.map((data, i) => (
              <div key={i}>
                <LegendItem
                  color={data.color}
                  name={data.tagName}
                  detail={data.percentage}
                />
              </div>
            ))}
        </div>
      )}
    </>
  );
};

export default PieChart;
