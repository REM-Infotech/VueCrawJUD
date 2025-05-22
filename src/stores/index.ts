import { botStore } from "./botsStore";
import { execStore } from "./executionStore";
import { credsStore } from "./FormCredentialsStore";
import { tokenStore } from "./tokenAuthStore";

export const storeMap = {
  authStore: tokenStore,
  execStore: execStore,
  credsStore: credsStore,
  botStore: botStore,
};
