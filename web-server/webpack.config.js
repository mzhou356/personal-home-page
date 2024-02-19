import { fileURLToPath } from "url"
import { dirname } from "path"
import webpack from "webpack"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const module = {
    entry: "./index.tsx",
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
        filename: "main.js",
        path: `${__dirname}/public/dist`,
    },
    plugins: [
        new webpack.EnvironmentPlugin({
            HOST: "0.0.0.0",
            PORT: "3000",
        }),
    ],
}

export default module
