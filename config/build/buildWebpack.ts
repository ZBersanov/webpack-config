import webpack from "webpack";
import { buildLoaders } from "./buildLoaders";
import { buildPlugins } from "./buildPlugins";
import { buildResolvers } from "./buildResolvers";
import { buildDevServer } from "./buildDevServer";
import { BuildOptions } from "./types/types";

export function buildWebpack(options: BuildOptions): webpack.Configuration {
  const { mode, paths } = options;
  const isDev = mode === "development";
  return {
    mode: mode ?? "development",
    entry: paths.entry,
    devtool: isDev ? "eval-cheap-module-source-map" : "source-map",
    module: {
      rules: buildLoaders(options),
    },
    resolve: buildResolvers(options),
    plugins: buildPlugins(options),
    devServer: isDev ? buildDevServer(options) : undefined,
    output: {
      path: paths.output,
      filename: "[name].[contenthash].js",
      clean: true,
    },
  };
}
