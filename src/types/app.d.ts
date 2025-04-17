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
    };
  }
  interface FileObject {
    filename: string
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
  }

}

declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean
    requiresAdmin?: boolean
  }
}
