import { type Api } from "datatables.net";

interface TDataTables extends Api {
  dt: Api<DataTable>;
}

export type { TDataTables };
