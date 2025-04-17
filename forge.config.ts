import { MakerDeb } from '@electron-forge/maker-deb';
import MakerRpm from '@electron-forge/maker-rpm';
import { MakerSquirrel } from '@electron-forge/maker-squirrel';
import { MakerZIP } from '@electron-forge/maker-zip';
import { AutoUnpackNativesPlugin } from '@electron-forge/plugin-auto-unpack-natives';
import { FusesPlugin } from "@electron-forge/plugin-fuses";
import { VitePlugin } from '@electron-forge/plugin-vite';
import { ForgeConfig } from '@electron-forge/shared-types';
import { FuseV1Options, FuseVersion } from "@electron/fuses";
import { join } from 'path';

const config: ForgeConfig = {
  outDir: './build/forge',
  makers: [
    new MakerSquirrel({
      authors: 'Electron contributors',
      exe: "crawjud",
    }, ['win32']),
    new MakerZIP({}, ['darwin']),
    new MakerDeb({}, ['linux']),
    new MakerRpm({}, ['linux']),
  ],
  plugins:
    [
      new VitePlugin({
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
            name: "crawjud_renderer",
            config: "vite.config.renderer.js",
          },
        ],

      }),
      new AutoUnpackNativesPlugin({}),
      new FusesPlugin({
        version: FuseVersion.V1,
        [FuseV1Options.RunAsNode]: false,
        [FuseV1Options.EnableCookieEncryption]: true,
        [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
        [FuseV1Options.EnableNodeCliInspectArguments]: false,
        [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
        [FuseV1Options.OnlyLoadAppFromAsar]: true,
      }),
    ],

  packagerConfig: {
    icon: join(process.cwd(), "client ", "src", "assets", "img", "icon.ico"),
    name: "CrawJUD_Desktop",
    osxSign: {},
    asar: true,
    windowsSign: {
      certificateFile: "C:\\Users\\nicholas.silva\\Desktop\\assinarcodigo.pfx",
      certificatePassword: "$4mus4ran",
      description: "CrawJUD Automatização de Processos Judiciais",
      website: "https://reminfotech.net.br",
      debug: true,
      signJavaScript: true
    },
    appCategoryType: "com.app.crawjud",
  }
};

export default config;
