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
    {
      label: "Semana Pasada",
      data: labelsA.map(() => faker.datatype.number({ min: 0, max: 10000000 })),
      borderColor: "rgb(162, 162, 162)",
      backgroundColor: "rgba(162, 162, 162, 0.2)",
    },
    {
      label: "KPI",
      data: labelsA.map(() => faker.datatype.number({ min: 0, max: 10000000 })),
      borderColor: "rgb(255, 255, 0)",
      backgroundColor: "rgba(255, 255, 0, 0.2)",
    },
  ],
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

      </div>
    </>
  );
}
