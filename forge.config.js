import { FusesPlugin } from "@electron-forge/plugin-fuses";
import { FuseV1Options, FuseVersion } from "@electron/fuses";
import { join } from "path";
import process from "process";

/**
 * @type {packagerConfigType}
 *
 */
export const packagerConfig = {
  icon: join(process.cwd(), "src", "renderer", "assets", "img", "icon.ico"),
  out: join(process.cwd(), "build"),
  name: "CrawJUD",
  osxSign: {},
  asar: true,
  appCategoryType: "com.app.crawjud",
};

export const makers = [
  {
    name: "@electron-forge/maker-squirrel",
    platforms: ["win32"],
    config: {},
  },
  {
    name: "@electron-forge/maker-zip",
    platforms: ["darwin"],
  },
  {
    name: "@electron-forge/maker-deb",
    config: {},
  },
  {
    name: "@electron-forge/maker-rpm",
    config: {},
  },
];
export const plugins = [
  {
    name: "@electron-forge/plugin-vite",
    config: {
      build: [
        {
          entry: "src/main/main.ts",
          config: "vite.config.main.js",
        },
        {
          entry: "src/main/preload.js",
          config: "vite.config.preload.js",
        },
      ],
      renderer: [
        {
          entry: "src/renderer/main.ts",
          config: "vite.config.renderer.js",
        },
      ],
    },
  },
  {
    name: "@electron-forge/plugin-auto-unpack-natives",
    config: {},
  },

  // Fuses are used to enable/disable various Electron functionality
  // at package time, before code signing the application
  new FusesPlugin({
    version: FuseVersion.V1,
    [FuseV1Options.RunAsNode]: false,
    [FuseV1Options.EnableCookieEncryption]: true,
    [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
    [FuseV1Options.EnableNodeCliInspectArguments]: false,
    [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
    [FuseV1Options.OnlyLoadAppFromAsar]: true,
  }),
];
