import { api } from "../../../main";

export async function getExecutions() {
  try {
    const response = await api.get("/executions", {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });

    const data = response.data.data;
    const items = data.map((item) => {
      const status: string = item.status;
      let link_file = item.file_output;

      if (status.toLowerCase() !== "em execução") {
        link_file = `<a class="btn btn-sm btn-success" href="${link_file}" target="_blank">Baixar Arquivo</a>`;
      }

      return [
        item.pid,
        item.user,
        item.botname,
        item.xlsx,
        item.start_date,
        item.status,
        item.stop_date,
        link_file,
      ];
    });

    return items;
  } catch (error) {
    return error;
  }
}
