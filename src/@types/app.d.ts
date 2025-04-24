import type { CreateOptions as AsarOptions } from "@electron/asar";

declare global {
  interface RouteMeta {
    requiresAuth: boolean;
  }

  interface formType {
    id: string | number;
    login: string;
    nome_usuario: string;
    username: string;
    password: string;
    xlsx: FileObject;
    api_key: string;
    pastas: string;
    email: string;
    bot: string;
  }
  interface Window {
    electronAPI: {
      maximize: () => void;
      minimize: () => void;
      close: () => void;
      perform: (form: formType) => void;
      file_save: (file: string, csrf_token: string, api_key: string) => Promise<void>;
      SaveCredentials: (key: string, password: string) => Promise<void>;
      RemoveCredentials: (key: string) => Promise<void>;
      getAllCredentials: () => Promise<Array<{ account: string; password: string }>>;
      getCredentials: () => Promise<Array<{ account: string; password: string }>>;
      AlertError: () => Promise<void>;
    };
  }
  interface FileObject {
    filename: string;
    arrayFile: ArrayBuffer;
  }
  type packagerConfigType = {
    icon: string;
    out: string;
    name: string;
    osxSign: {
      identity?: string;
      entitlements?: string;
      "entitlements-inherit"?: string;
      "hardened-runtime"?: boolean;
    };
    asar: boolean | AsarOptions;
    appCategoryType: string;
    extraResource?: string | string[];
  };
}

declare module "vue-router" {
  interface RouteMeta {
    requiresAuth?: boolean;
    requiresAdmin?: boolean;
  }
}
