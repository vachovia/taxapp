const tsc = require("typescript");
const webpackConfig = require("fs").readFileSync("./webpack.ts", "utf8");

const options = {
  compilerOptions: {
    target: "es5",
    module: "commonjs",
    esModuleInterop: true,
    allowSyntheticDefaultImports: true,
  },
};

eval(tsc.transpileModule(webpackConfig, options).outputText);
