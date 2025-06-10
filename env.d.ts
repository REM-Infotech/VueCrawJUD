/// <reference types="vite/client" />

declare module "*.js";
declare module "*.css" {
  interface Styles {
    readonly "active-purple": string;
    readonly app: string;
  }
  const content: Styles;
  export default content;
}
