import { StoreDefinition } from "pinia";

interface TStore extends StoreDefinition {
  clear(): void;
}

interface TstoreMap extends Record<string, TStore> {
  authStore: TStore;
  execStore: TStore;
  credsStore: TStore;
  botStore: TStore;
}

export type { TstoreMap };
