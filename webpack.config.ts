import webpack from "webpack";
import path from "path";
import { buildWebpack } from "./config/build/buildWebpack";
import { BuildMode, BuildPlatform } from "./config/build/types/types";

interface EnvVariables {
  mode: BuildMode;
  port: number;
  bundleAnalyzer: boolean;
  platform: BuildPlatform;
}

export default (env: EnvVariables) => {
  const paths = {
    entry: "./src/index.tsx",
    html: path.resolve(__dirname, "./public/index.html"),
    output: path.resolve(__dirname, "dist"),
    src: path.resolve(__dirname, "src"),
    public: path.resolve(__dirname, "public"),
  };

  const config: webpack.Configuration = buildWebpack({
    port: env.port ?? 8080,
    mode: env.mode ?? "development",
    paths,
    bundleAnalyzer: env.bundleAnalyzer ?? false,
    platform: env.platform ?? "desktop",
  });
  return config;
};
