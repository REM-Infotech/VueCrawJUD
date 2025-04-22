import { tokenStore } from "@store/tokenAuthStore";
import type { TCurrentBot, TSelectInput } from "FormBot";
import type { TResponseInfoBot } from "ResponsesAPI";
import { api } from "./axios";

export async function loadStateClient(
  item: TCurrentBot,
): Promise<{ state_client: TSelectInput[]; isStateOrClient: string }> {
  try {
    const resp: TResponseInfoBot = await api.post(
      `/acquire_systemclient`,
      {
        system: item.system,
        state: item.state,
        client: item.client,
        form_cfg: item.form_cfg,
        type: item.type,
      },
      {
        headers: {
          "X-CSRF-TOKEN": tokenStore()["x-csrf-token"],
        },
      },
    );

    return {
      state_client: resp.data?.info as TSelectInput[],
      isStateOrClient: resp.data?.type as string,
    };
  } catch {
    return {
      state_client: [],
      isStateOrClient: "",
    };
  }
}

export async function loadCredentials(item: TCurrentBot): Promise<TSelectInput[]> {
  try {
    const resp: TResponseInfoBot = await api.post(
      `/acquire_credentials`,
      {
        system: item.system,
        state: item.state,
        client: item.client,
        form_cfg: item.form_cfg,
      },
      {
        headers: {
          "X-CSRF-TOKEN": tokenStore()["x-csrf-token"],
        },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        withXSRFToken(config) {
          return true;
        },
      },
    );

    return resp.data?.info as TSelectInput[];
  } catch {
    return [];
  }
}
