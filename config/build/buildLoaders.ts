import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { ModuleOptions } from "webpack";
import { BuildOptions } from "./types/types";
import ReactRefreshTypeScript from "react-refresh-typescript";

export function buildLoaders({ mode }: BuildOptions): ModuleOptions["rules"] {
  const isDev = mode === "development";

  const svgLoader = {
    test: /\.svg$/,
    use: [
      {
        loader: "@svgr/webpack",
        options: {
          icon: true,
          svgoCongif: {
            plugins: [
              {
                name: "convertColors",
                params: {
                  currentColor: true,
                },
              },
            ],
          },
        },
      },
    ],
  };

  const assetLoader = {
    test: /\.(png|jpg|jpeg|gif)$/i,
    type: "asset/resource",
  };
  // Loader для обычных CSS
  const cssLoader = {
    test: /\.css$/,
    use: [isDev ? "style-loader" : MiniCssExtractPlugin.loader, "css-loader"],
    exclude: /\.module\.css$/, // Исключаем модульные CSS
  };

  // Loader для CSS модулей
  const cssModulesLoader = {
    test: /\.module\.css$/,
    use: [
      isDev ? "style-loader" : MiniCssExtractPlugin.loader,
      {
        loader: "css-loader",
        options: {
          modules: {
            namedExport: false,
            localIdentName: isDev
              ? "[name]__[local]--[hash:base64:5]"
              : "[hash:base64:8]", // Уникальные имена классов
          },
        },
      },
    ],
  };

  // Loader для обычных SCSS
  const sassLoader = {
    test: /\.scss$/,
    use: [
      isDev ? "style-loader" : MiniCssExtractPlugin.loader,
      "css-loader",
      "sass-loader",
    ],
    exclude: /\.module\.scss$/, // Исключаем модульные SCSS
  };

  // Loader для SCSS модулей
  const sassModulesLoader = {
    test: /\.module\.scss$/,
    use: [
      isDev ? "style-loader" : MiniCssExtractPlugin.loader,
      {
        loader: "css-loader",
        options: {
          modules: {
            namedExport: false,
            localIdentName: isDev
              ? "[name]__[local]--[hash:base64:5]"
              : "[hash:base64:8]",
          },
        },
      },
      "sass-loader",
    ],
  };

  const babelLoader = {
    test: /\.[jt]sx?$/,
    exclude: /node_modules/,
    use: {
      loader: "babel-loader",
      options: {
        presets: [
          "@babel/preset-env",
          "@babel/preset-typescript",
          ["@babel/preset-react", { runtime: isDev ? "automatic" : "classic" }],
        ],
      },
    },
  };

  // TypeScript Loader
  const tsLoader = {
    test: /\.[jt]sx?$/,
    use: {
      loader: require.resolve("ts-loader"),
      options: {
        transpileOnly: true,
        getCustomTransformers: () => ({
          before: [isDev && ReactRefreshTypeScript()].filter(Boolean),
        }),
      },
    },
    exclude: /node_modules/,
  };

  return [
    // tsLoader,
    babelLoader,
    cssLoader,
    cssModulesLoader,
    sassLoader,
    sassModulesLoader,
    assetLoader,
    svgLoader,
  ];
}
