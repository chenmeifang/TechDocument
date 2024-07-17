# 1. src\webresource\framework\webpack.config.js

```js
/* eslint-disable @typescript-eslint/no-var-requires */
console.log('这个webpack config文件是什么时候被执行的？')
const path = require('path');
const { publicPath } = require('../build/publicPath');
const fs = require('fs');
const webpack = require('webpack');
const ExternalTemplateRemotesPlugin = require('external-remotes-plugin');
const { mergeWithRules, mergeWithCustomize, customizeObject, unique } = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
// const webpackObfuscator = require('webpack-obfuscator');
// const JavaScriptObfuscator = require('javascript-obfuscator');

const baseConfig = require('../build/webpack.base.conf');
const {
  fwk,
  fwk: { bProd, bEsModule, bEs5 },
  infra,
  sheet,
  text,
  pres,
  sample,
  pdf,
  img,
  archive,
  cad,
  sharedDep,
  messages,
  player
} = require('../build/federation.config');
const {
  devServerConfig,
  readdir_re,
  makeExpose,
  mergePkgCfg_re,
  es5BaseConfig,
  esBuildLoader,
  optimization_minimize,
  optimization_cacheGroups,
  buildCache,
  terserPluginConfig,
} = require('../build/common');

// ModuleFederation config
const { ModuleFederationPlugin } = webpack.container;
const deps = mergePkgCfg_re();

// 构造expose路径
const exposePaths = makeExpose(readdir_re('./'));
// 构造远程请求的项目路径
const code1 = `// This part depends on how you plan on hosting and versioning your federated modules
script = document.createElement('script')
script.src = remoteUrl
script.onload = () => {
    // the injected script has loaded and is available on window
    // we can now resolve this Promise
    const proxy = {
        get: (request) => window.`
const code2 = `.get(request),
init: (...arg) => {
  try {
    return window.`
const code3 = `.init(...arg)
} catch(e) {
  console.log('remote container already initialized')
}
  }
}
resolve(proxy)
}
// inject this script with the src set to the versioned remoteEntry.js
document.head.appendChild(script);
break`
const remoteUrl = () => {
  return `promise new Promise(resolve => {
    let docType = g_DocInfo.docType;
    if (g_mode === 'view' || g_mode === 'sview') {
      // switch pres mode to pdf if needed
      if (docType === 'pres' && g_viewType.current === 'aspdf') {
        docType = 'pdf';
      }
      if (docType === 'ofd' || docType === 'visio' ||  docType === 'project') {
        docType = 'pdf';
      }
    }
    if (docType === 'audio' || docType === 'video') {
        docType = 'player';
    }
    let remoteUrl;
    let script = document.createElement('script')
    switch(docType) {
      case 'sample':
        remoteUrl = ${!sample.bProd ? `"${sample.getPromiseUrl()}"` :
      sample.getProdContextPath() + "+" + `"${publicPath.replace(/^\/docs/, "")}"` + "+" + `"${sample.filename}"`
    }
        ${code1}${sample.name}${code2}${sample.name}${code3}
    case 'text':
        remoteUrl = ${!text.bProd ? `"${text.getPromiseUrl()}"` :
      text.getProdContextPath() + "+" + `"${publicPath.replace(/^\/docs/, "")}"` + "+" + `"${text.filename}"`
    }
        ${code1}${text.name}${code2}${text.name}${code3}
    case 'pres':
        remoteUrl = ${!pres.bProd ? `"${pres.getPromiseUrl()}"` :
      pres.getProdContextPath() + "+" + `"${publicPath.replace(/^\/docs/, "")}"` + "+" + `"${pres.filename}"`
    }
        ${code1}${pres.name}${code2}${pres.name}${code3}
    case 'sheet':
        remoteUrl = ${!sheet.bProd ? `"${sheet.getPromiseUrl()}"` :
      sheet.getProdContextPath() + "+" + `"${publicPath.replace(/^\/docs/, "")}"` + "+" + `"${sheet.filename}"`
    }
        ${code1}${sheet.name}${code2}${sheet.name}${code3}
    case 'pdf':
        remoteUrl = ${!pdf.bProd ? `"${pdf.getPromiseUrl()}"` :
      pdf.getProdContextPath() + "+" + `"${publicPath.replace(/^\/docs/, "")}"` + "+" + `"${pdf.filename}"`
    }
        ${code1}${pdf.name}${code2}${pdf.name}${code3}
      case 'pdf':
        remoteUrl = ${!pdf.bProd ? `"${pdf.getPromiseUrl()}"` :
      pdf.getProdContextPath() + "+" + `"${publicPath.replace(/^\/docs/, "")}"` + "+" + `"${pdf.filename}"`
    }
        ${code1}${pdf.name}${code2}${pdf.name}${code3}
    case 'img':
      remoteUrl = ${!img.bProd ? `"${img.getPromiseUrl()}"` :
      img.getProdContextPath() + "+" + `"${publicPath.replace(/^\/docs/, "")}"` + "+" + `"${img.filename}"`
    }
      ${code1}${img.name}${code2}${img.name}${code3}
    case 'cad':
      remoteUrl = ${!cad.bProd ? `"${cad.getPromiseUrl()}"` :
      cad.getProdContextPath() + "+" + `"${publicPath.replace(/^\/docs/, "")}"` + "+" + `"${cad.filename}"`
    }
      ${code1}${cad.name}${code2}${cad.name}${code3}
    case 'archive':
      remoteUrl = ${!archive.bProd ? `"${archive.getPromiseUrl()}"` :
      archive.getProdContextPath() + "+" + `"${publicPath.replace(/^\/docs/, "")}"` + "+" + `"${archive.filename}"`
    }
      ${code1}${archive.name}${code2}${archive.name}${code3}
    case 'player':
      remoteUrl = ${!player.bProd ? `"${player.getPromiseUrl()}"` :
      player.getProdContextPath() + "+" + `"${publicPath.replace(/^\/docs/, "")}"` + "+" + `"${player.filename}"`
    }
      ${code1}${player.name}${code2}${player.name}${code3}
    }
  })`
}
// 最终执行的config
let resConfig = {};
resConfig = mergeWithCustomize({
  customizeObject: customizeObject({
    entry: 'replace',
  }),
})(baseConfig, {
  mode: process.env.NODE_ENV,
  devtool: fwk.getDevtool(),
  entry: {},
  output: {
    chunkFilename: '[name].fwk_bundle.js',
    /**
     * webpack在请求share时，是谁用谁先发起网络请求，
     * 后面的再次请求时就从之前的那里拿，不再发起网络请求，
     * 还会同时比较名字字符串大小，所有前缀都是ls-，这里加了一个z
     * 这个是为了让fwk一次将share依赖收集完，并且打包在一起，
     * 只发起一次所有share的请求，后面的infra，sc等就不用单独请求了，
    */
    uniqueName: 'ls-zfwk',
  },
  context: __dirname,
  plugins: [
    new ModuleFederationPlugin({
      name: fwk.name,
      filename: fwk.filename,
      exposes: exposePaths,
      remotes: {
        [infra.name]: infra.getRemoteUrl(),
        [sheet.name]: remoteUrl(),
        [text.name]: remoteUrl(),
        [pres.name]: remoteUrl(),
        [sample.name]: remoteUrl(),
        [pdf.name]: remoteUrl(),
        [img.name]: remoteUrl(),
        [archive.name]: remoteUrl(),
        [cad.name]: remoteUrl(),
        [messages.name]: messages.getRemoteUrl(),
        [player.name]: remoteUrl()
      },
      shared: sharedDep(deps),
    }),
  ],
});

/**
 * Development Es6
 * */
!bProd &&
  (resConfig = mergeWithRules({
    module: {
      rules: {
        test: 'match', // util内部使用RegExp.toString()进行match比较
        use: 'replace',
      },
    },
  })(resConfig, {
    output: {
      publicPath: fwk.getDevPublicPath(),
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)?$/,
          exclude: /node_modules/,
          use: [esBuildLoader({ bEsModule })],
        },
      ],
    },
    devServer: devServerConfig({
      host: fwk.host,
      port: fwk.port,
    }),
  }));

bProd &&
  (function () {
    const infraNameCachePath = path.resolve(__dirname, '../build/terserNameCache/infraNameCache.json');
    const fwkNameCachePath = path.resolve(__dirname, '../build/terserNameCache/fwkNameCache.json');
    if (!fs.existsSync(fwkNameCachePath)) {
      fs.writeFileSync(fwkNameCachePath, '{}');
    }

    resConfig = mergeWithCustomize({
      customizeArray: unique(
        'plugins',
        ['LimitChunkCountPlugin'],
        (plugin) => plugin.constructor && plugin.constructor.name
      ),
    })(resConfig, {
      resolve: {
        alias: {
          infra: false, // 重要的，在这里取消remote container的解析，由federation接管解析
        },
      },
      optimization: {
        minimize: optimization_minimize,
        minimizer: [new TerserPlugin(terserPluginConfig({
          minify: async (input, sourceMap, minimizerOptions, extractComments) => {
            minimizerOptions.nameCache = JSON.parse(fs.readFileSync(infraNameCachePath, "utf8"));

            const res = await TerserPlugin.terserMinify(input, sourceMap, minimizerOptions, extractComments);

            fs.writeFileSync(fwkNameCachePath, JSON.stringify(minimizerOptions.nameCache), "utf8");
            return res;
          }
        }))],
        splitChunks: {
          minSize: 250 * 1024,
          cacheGroups: {
            ...optimization_cacheGroups,
            src: {
              test: /[\\/]framework[\\/]/,
              name: 'src',
              chunks: 'async',
            },
            vendor_common: {
              test: /[\\/]node_modules[\\/](react|react-dom|office-ui-fabric-react|lodash|react-intl|hammerjs|react-device-detect|react-beautiful-dnd|util|@uifabric|@fluentui)/,
              priority: 10,
              name: 'vendor_common',
              chunks: 'all',
            },
            vendor_runtime: {
              priority: 9,
              test: /[\\/]node_modules[\\/](style-loader|css-loader|svg-sprite-loader|svg-baker-runtime)/,
              name: 'vendor_runtime',
              chunks: 'all',
            },
            vendor_other: {
              priority: 8,
              test: /[\\/]node_modules[\\/]/,
              name: 'vendor_other',
              chunks: 'all',
            }
          },
        },
      },
      plugins: [new ExternalTemplateRemotesPlugin()],
      cache: buildCache(),
    });
  })();
// console.log('config', resConfig)

module.exports = resConfig;
```

这段代码是一个用于构建 Web 应用程序的 Webpack 配置文件。它使用了 Webpack 的 Module Federation 功能，允许不同的 Web 应用程序共享代码模块。以下是对这部分代码的分析：

### 主要依赖和插件

- **path**: Node.js 的路径模块，用于处理和转换文件路径。
- **fs**: Node.js 的文件系统模块，用于与文件系统进行交互。
- **webpack**: Webpack 是一个用于打包 JavaScript 应用程序的模块捆绑工具。
- **ExternalTemplateRemotesPlugin**: 用于处理外部模板远程模块的插件。
- **webpack-merge**: 用于合并多个 Webpack 配置对象的工具。
- **terser-webpack-plugin**: 用于压缩和混淆 JavaScript 的插件。

### 配置模块联邦（Module Federation）

使用 ModuleFederationPlugin 来配置模块联邦。模块联邦允许在多个独立构建之间共享代码。

```javascript
const { ModuleFederationPlugin } = webpack.container;

const remoteUrl = () => {
  // 返回远程模块的 URL
  return `promise new Promise(resolve => {
    // 根据不同的文档类型选择不同的远程模块 URL
    // ...
  })`;
}

const exposePaths = makeExpose(readdir_re('./'));

resConfig = mergeWithCustomize({
  customizeObject: customizeObject({
    entry: 'replace',
  }),
})(baseConfig, {
  // 主要配置项
  mode: process.env.NODE_ENV,
  devtool: fwk.getDevtool(),
  output: {
    chunkFilename: '[name].fwk_bundle.js',
    uniqueName: 'ls-zfwk',
  },
  context: __dirname,
  plugins: [
    new ModuleFederationPlugin({
      name: fwk.name,
      filename: fwk.filename,
      exposes: exposePaths,
      remotes: {
        [infra.name]: infra.getRemoteUrl(),
        [sheet.name]: remoteUrl(),
        [text.name]: remoteUrl(),
        [pres.name]: remoteUrl(),
        [sample.name]: remoteUrl(),
        [pdf.name]: remoteUrl(),
        [img.name]: remoteUrl(),
        [archive.name]: remoteUrl(),
        [cad.name]: remoteUrl(),
        [messages.name]: messages.getRemoteUrl(),
        [player.name]: remoteUrl()
      },
      shared: sharedDep(deps),
    }),
  ],
});
```

### 根据环境定制配置

#### 开发环境配置

在开发环境下，配置了开发服务器、公共路径、以及 TypeScript 和 ES6 模块的加载规则。

```javascript
if (!bProd) {
  resConfig = mergeWithRules({
    module: {
      rules: {
        test: 'match',
        use: 'replace',
      },
    },
  })(resConfig, {
    output: {
      publicPath: fwk.getDevPublicPath(),
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)?$/,
          exclude: /node_modules/,
          use: [esBuildLoader({ bEsModule })],
        },
      ],
    },
    devServer: devServerConfig({
      host: fwk.host,
      port: fwk.port,
    }),
  });
}
```

#### 生产环境配置

在生产环境下，配置了代码压缩和分割、缓存、以及禁用部分模块的解析以优化打包速度。

```javascript
if (bProd) {
  const infraNameCachePath = path.resolve(__dirname, '../build/terserNameCache/infraNameCache.json');
  const fwkNameCachePath = path.resolve(__dirname, '../build/terserNameCache/fwkNameCache.json');
  if (!fs.existsSync(fwkNameCachePath)) {
    fs.writeFileSync(fwkNameCachePath, '{}');
  }

  resConfig = mergeWithCustomize({
    customizeArray: unique('plugins', ['LimitChunkCountPlugin'], (plugin) => plugin.constructor && plugin.constructor.name),
  })(resConfig, {
    resolve: {
      alias: {
        infra: false,
      },
    },
    optimization: {
      minimize: optimization_minimize,
      minimizer: [new TerserPlugin(terserPluginConfig({
        minify: async(input, sourceMap, minimizerOptions, extractComments) => {
          minimizerOptions.nameCache = JSON.parse(fs.readFileSync(infraNameCachePath, "utf8"));

          const res = await TerserPlugin.terserMinify(input, sourceMap, minimizerOptions, extractComments);

          fs.writeFileSync(fwkNameCachePath, JSON.stringify(minimizerOptions.nameCache), "utf8");
          return res;
        }
      }))],
      splitChunks: {
        minSize: 250 * 1024,
        cacheGroups: {
          ...optimization_cacheGroups,
          src: {
            test: /[\\/]framework[\\/]/,
            name: 'src',
            chunks: 'async',
          },
          vendor_common: {
            test: /[\\/]node_modules[\\/](react|react-dom|office-ui-fabric-react|lodash|react-intl|hammerjs|react-device-detect|react-beautiful-dnd|util|@uifabric|@fluentui)/,
            priority: 10,
            name: 'vendor_common',
            chunks: 'all',
          },
          vendor_runtime:{
            priority: 9,
            test: /[\\/]node_modules[\\/](style-loader|css-loader|svg-sprite-loader|svg-baker-runtime)/,
            name: 'vendor_runtime',
            chunks: 'all',
          },
          vendor_other: {
            priority: 8,
            test: /[\\/]node_modules[\\/]/,
            name: 'vendor_other',
            chunks: 'all',
          }
        },
      },
    },
    plugins: [new ExternalTemplateRemotesPlugin()],
    cache: buildCache(),
  });
}
```

### 总结

这段 Webpack 配置文件展示了如何使用 Module Federation 来构建一个可以共享模块的复杂 Web 应用程序。通过根据不同的环境（开发或生产）定制配置，可以实现不同的构建优化和加载策略。这种配置方式使得应用程序更具有扩展性和维护性。