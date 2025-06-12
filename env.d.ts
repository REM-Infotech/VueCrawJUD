/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_API_URL: string;
  VITE_DEVMODE: boolean;
}

interface ImportMeta {
  url: string;

  readonly hot?: import("./hot").ViteHotContext;

  readonly env: ImportMetaEnv;

  glob: import("./importGlob").ImportGlobFunction;
}

declare module "*.js";
type CSSModuleClasses = { readonly [key: string]: string };

declare module "*.css" {
  const classes: CSSModuleClasses;
  export default classes;
}

declare module "*.png" {
  const src: string;
  export default src;
}
