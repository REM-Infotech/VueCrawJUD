import { api } from "../../../main";

export async function getExecutions() {
  const response = await api.get("/executions", {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  });

  const data = response.data.data;
  const items = data.map((item) => {
    return {
      pid: item.pid,
      user: item.user,
      botname: item.botname,
      xlsx: item.xlsx,
      start_date: item.start_date,
      status: item.status,
      stop_date: item.stop_date,
      file_output: item.file_output,
    };
  });

  return items;
}
