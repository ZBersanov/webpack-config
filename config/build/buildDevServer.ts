import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
import { BuildOptions } from "./types/types";

export function buildDevServer({
  port,
  paths,
}: BuildOptions): DevServerConfiguration {
  return {
    static: {
      directory: paths.output,
    },
    port: port ?? 8080,
    hot: true,
    compress: true,
    historyApiFallback: true,
  };
}
