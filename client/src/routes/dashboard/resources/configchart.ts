import { AxiosResponse } from "axios";
import { api } from "../../../main";

export default async function () {
  const response: AxiosResponse = await api.get("/linechart");

  const config = {
    type: "line",
    data: response.data.dataset,
    options: {
      responsive: true,
      interaction: {
        mode: "index",
        intersect: false,
      },
      stacked: false,
      plugins: {
        title: {
          display: true,
          text: "Grafico de Execuções",
        },
      },
      scales: {
        y: {
          type: "linear",
          display: true,
          position: "left",
        },
        y1: {
          type: "linear",
          display: true,
          position: "right",

          // grid line settings
          grid: {
            drawOnChartArea: false, // only want the grid lines for one axis to show up
          },
        },
      },
    },
  };

  return config;
}
