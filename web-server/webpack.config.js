import { fileURLToPath } from "url"
import { dirname } from "path"
import webpack from "webpack"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const webpackConfig = {
    entry: {
        main: "./index.tsx",
        render: "./render.tsx",
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: "ts-loader",
                },
            },
        ],
    },
    output: {
        filename: "[name].js",
        path: `${__dirname}/public/dist`,
    },
    plugins: [
        new webpack.EnvironmentPlugin({
            HOST: "localhost",
            PORT: "3000",
        }),
    ],
}

export default webpackConfig
