import { NavbarLinks } from "../components/NavbarLinks";
import { faker } from "@faker-js/faker";
import { useAuthStore } from "../storage/globalStorage.js";
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Legend,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  ArcElement,
} from "chart.js";
import { Bar, Line, Pie } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  ArcElement,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler
);

//!Figura 1
export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
      color: "white",
    },
    title: {
      display: true,
      text: "Cotizaciones enviadas",
      color: "white",
    },
  },
};

const labels = [
  "Lunes",
  "Martes",
  "Miercoles",
  "Jueves",
  "Viernes",
  "Sabado",
  "Domingo",
];

//!Figura 2

export const optionsA = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
      color: "white",
    },
    title: {
      display: true,
      text: "Ventas mes",
      color: "white",
    },
  },
};

export const data = {
  labels,
  datasets: [
    {
      label: "Cotizaciones semana actual",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: "#1a44d2",
    },
    {
      label: "Cotizaciones semana pasada",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      backgroundColor: "WHITE",
      color: "white",
    },
  ],
};

const labelsA = [
  "Lunes",
  "Martes",
  "Miercoles",
  "Jueves",
  "Viernes",
  "Sabado",
  "Domingo",
];

export let dataA = {
  labels: labelsA,
  datasets: [
    {
      fill: true,
      label: "Semana Actual",
      data: labelsA.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
    {
      fill: true,
      label: "Semana pasada",
      data: labelsA.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      borderColor: "rgb(225, 225, 225)",
      backgroundColor: "rgba(225, 225, 225, 0.5)",
    },
  ],
};

//!Figura 3
export const dataC = {
  labels: ["Usuarios", "Clientes", "Cotizaciones", "Productos"],
  plugins: {
    legend: {
      position: "left",
      color: "white",
    },
    title: {
      display: true,
      text: "Estadisticas generales",
      color: "white",
    },
  },
  datasets: [
    {
      label: "# Cantidad",
      data: [12, 19, 3, 5],
      backgroundColor: [
        "rgba(255, 99, 132, 0.5)",
        "rgba(54, 162, 235, 0.5)",
        "rgba(255, 206, 86, 0.5)",
        "rgba(75, 192, 192, 0.5)",
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

export function DashBoard() {
  const profile = useAuthStore((state) => state.user);
  const profileStatus = profile.status;


  return (
    <>
      <NavbarLinks page="dashboard" typeUser={profileStatus} />

      <div id="contenedor-graficas">
        <div className="graficas-linea">
          <Line options={optionsA} data={dataA} />
        </div>

        <div className="graficas-torta">
          <Pie data={dataC} />
        </div>
      </div>

      <div id="estadisticas-card">
        <div class="card text-bg-dark mb-3" style={{ width: "300px",margin:"5px" }}>
          <div class="card-top">
          <img src="../src/img/greenarrowup.png" class="card-img-top" alt="..." style={{ width: "50px", height:"50px",margin:"19px"}} />
          <h1>17.200</h1>
          </div>

          <div class="card-body">
            <p class="card-text">
              Ganancias totales semana.
            </p>
          </div>
        </div>
        <div class="card text-bg-dark mb-3" style={{ width: "300px",margin:"5px" }}>
        <div class="card-top">
          <img src="../src/img/redarrowdown.png" class="card-img-top" alt="..." style={{ width: "50px", height:"50px",margin:"19px"}} />
          <h1>17.200</h1>
        </div>
          <div class="card-body">
            <p class="card-text">
              Perdidas totales semana.
            </p>
          </div>
        </div>
        <div class="card text-bg-dark mb-3" style={{ width: "300px",margin:"5px" }}>
          <div class="card-top">
          <img src="../src/img/logoB.png" class="card-img-top" alt="..." style={{ width: "50px", height:"50px",margin:"19px"}} />
          <h1>17.200</h1>
          </div>
          <div class="card-body">
            <p class="card-text">
              Presupuesto mensual.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
