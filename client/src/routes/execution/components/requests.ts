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
      const link_log = item.pid;
      if (status.toLowerCase() === "em execução") {
        link_file = `<a class="btn btn-sm btn-success disabled m-1" href="${link_file}" target="_blank" aria-disabled="true">Baixar Arquivo</a>
                    <a class="btn btn-sm btn-primary m-1" href="/logs/${link_log}" target="_blank">Ver Log</a>`;
      }

      if (status.toLowerCase() !== "em execução") {
        link_file = `<a class="btn btn-sm btn-success m-1" href="${link_file}" target="_blank">Baixar Arquivo</a>
                      <a class="btn btn-sm btn-primary m-1 disabled" href="/logs/${link_log}" target="_blank" aria-disabled="true">Ver Log</a>`;
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
