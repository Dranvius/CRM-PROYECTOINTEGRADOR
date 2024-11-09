import { NavbarLinks } from "../components/NavbarLinks";
import { Bar, Line, Pie, Radar, PolarArea, Bubble } from "react-chartjs-2";
import { faker } from "@faker-js/faker";
import { useAuthStore } from "../storage/globalStorage.js";
import React from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  RadialLinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  RadialLinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend
);

const labelsA = [
  "01-2024", "02-2024", "03-2024", "04-2024",
  "05-2024", "06-2024", "07-2024", "08-2024",
  "09-2024", "10-2024", "11-2024", "12-2024"
];

const optionsA = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: "top", color: "white" },
    title: { display: true, text: "Ventas Semana (Ganancias)", color: "white" },
  },
};

const dataA = {
  labels: labelsA,
  datasets: [
    {
      label: "Semana Actual",
      data: labelsA.map(() => faker.datatype.number({ min: 0, max: 10000000 })),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.2)",
    },
  ],
};

const barData = {
  labels: labelsA,
  datasets: [
    {
      label: "Semana Actual",
      data: labelsA.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: "rgba(75, 192, 192, 0.6)",
      borderColor: "rgba(75, 192, 192, 1)",
    },
  ],
};

const pieData = {
  labels: ["Producto A", "Producto B", "Producto C", "Producto D"],
  datasets: [
    {
      data: [faker.datatype.number(), faker.datatype.number(), faker.datatype.number(), faker.datatype.number()],
      backgroundColor: [
        "rgba(255, 99, 132, 0.6)",
        "rgba(54, 162, 235, 0.6)",
        "rgba(255, 206, 86, 0.6)",
        "rgba(75, 192, 192, 0.6)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

const radarData = {
  labels: ["Velocidad", "Precisión", "Durabilidad", "Costo", "Eficiencia"],
  datasets: [
    {
      label: "Producto X",
      data: [80, 90, 60, 70, 85],
      backgroundColor: "rgba(255, 99, 132, 0.2)",
      borderColor: "rgba(255, 99, 132, 1)",
    },
  ],
};

const polarData = {
  labels: ["Norte", "Sur", "Este", "Oeste"],
  datasets: [
    {
      data: [11, 16, 7, 14],
      backgroundColor: [
        "rgba(255, 99, 132, 0.6)",
        "rgba(54, 162, 235, 0.6)",
        "rgba(255, 206, 86, 0.6)",
        "rgba(75, 192, 192, 0.6)",
      ],
    },
  ],
};

const bubbleData = {
  datasets: [
    {
      label: "Ventas por tamaño",
      data: Array.from({ length: 10 }, () => ({
        x: faker.datatype.number({ min: 0, max: 100 }),
        y: faker.datatype.number({ min: 0, max: 100 }),
        r: faker.datatype.number({ min: 5, max: 15 }),
      })),
      backgroundColor: "rgba(255, 99, 132, 0.6)",
      borderColor: "rgba(255, 99, 132, 1)",
    },
    {
      label: "Ventas por tamaño",
      data: Array.from({ length: 10 }, () => ({
        x: faker.datatype.number({ min: 0, max: 100 }),
        y: faker.datatype.number({ min: 0, max: 100 }),
        r: faker.datatype.number({ min: 5, max: 15 }),
      })),
      backgroundColor: "rgba(255, 0, 0, 0.6)",
      borderColor: "rgba(255,0, 0, 1)",
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: { position: "top", color: "white" },
    title: { display: true, text: "Clientes únicos registrados", color: "white" },
  },
};

export function DashBoard() {
  const profile = useAuthStore((state) => state.user);
  const profileStatus = profile.status;

  return (
    <>
      <NavbarLinks page="dashboard" typeUser={profileStatus} />

      <div id="contenedor-graficas">
        <div className="graficas">
          <Line key="line-chart" options={optionsA} data={dataA} />
        </div>

        <div className="graficas">
          <Bar key="bar-chart" data={barData} options={options} />
        </div>

        <div className="graficas">
          <Pie key="pie-chart" data={pieData} options={options} />
        </div>

        <div className="graficas">
          <Radar key="radar-chart" data={radarData} options={options} />
        </div>

        <div className="graficas">
          <PolarArea key="polar-chart" data={polarData} options={options} />
        </div>

        <div className="graficas">
          <Bubble key="bubble-chart" data={bubbleData} options={options} />
        </div>
      </div>
    </>
  );
}
