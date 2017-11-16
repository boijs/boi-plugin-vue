const Path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const DEFAULT_OPTIONS = {
  // css output path
  cssOutputDir: 'style',
  // add hash fingerprint to extract css files
  cssUseHash: true,
  // if extract css files or not
  extractCss: true,
  // extracted css' file name
  extractFilename: 'components',
  // enable postcss
  enablePostCss: false,
  // enable lint to js&vue files
  enableLint: false
};

module.exports = function (opts) {
  const Options = Object.assign({}, DEFAULT_OPTIONS, opts);
  const Plugins = [];

  const PublicPath = Options.extractCss && Options.cssOutputDir ? '../' : '';
  const Filename = `[name]${Options.extractFilename?'-'+Options.extractFilename:''}`;
  // extract css files 
  const ExtractPlugin = new ExtractTextPlugin({
    filename: `${Path.basename(Options.cssOutputDir)}/${Filename}${Options.cssUseHash?'.[contenthash:8].css':'.css'}`,
    allChunks: true,
    ignoreOrder: true
  });

  if(Options.extractCss){
    Plugins.push(ExtractPlugin);
  }

  function GetLoaders() {
    const BaseLoaders = [];

    BaseLoaders.push({
      loader: 'css-loader',
      options: {
        url: process.env.BOI_ENV === 'dev' ? false : true,
        minimize: process.env.BOI_ENV === 'dev' ? false : true
      }
    });

    if (Options.enablePostCss) {
      BaseLoaders.push({
        loader: 'postcss-loader'
      });
    }
    
    return {
      css: Options.extractCss ? ExtractTextPlugin.extract({
        use: BaseLoaders,
        fallback: 'vue-style-loader',
        publicPath: PublicPath
      }) : [{
        loader: 'vue-style-loader'
      }].concat(BaseLoaders),
      less: Options.extractCss ? ExtractTextPlugin.extract({
        use: BaseLoaders.concat(['less-loader']),
        fallback: 'vue-style-loader',
        publicPath: PublicPath
      }) : [{
        loader: 'vue-style-loader'
      }].concat(BaseLoaders, ['less-loader']),
      scss: Options.extractCss ? ExtractTextPlugin.extract({
        use: BaseLoaders.concat(['sass-loader']),
        fallback: 'vue-style-loader',
        publicPath: PublicPath
      }) : [{
        loader: 'vue-style-loader'
      }].concat(BaseLoaders, ['sass-loader'])
    };
  }

  const Rules = [{
    test: /\.vue$/,
    use: [{
      loader: 'vue-loader',
      options: {
        loaders: GetLoaders()
      }
    }]
  }];

  if(Options.enableLint){
    Rules.unshift({
      test: /\.vue$/,
      enforce: 'pre',
      exclude: '/node_modules/',
      use: [{
        loader: 'eslint-loader',
        options: {
          emitError: true,
          emitWarning: true,
          failOnError: true,
          formatter: require('eslint-friendly-formatter')
        }
      }]
    });
  } 

  return {
    webpackConf: {
      module: {
        rules: Rules
      },
      plugins: Plugins,
      resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
          'vue$': 'vue/dist/vue.esm.js'
        }
      }
    },
    dependencies: [
      'eslint',
      'vue-loader',  
      'less-loader', 
      'sass-loader',
      'eslint-loader', 
      'postcss-loader',
      'vue-style-loader'
    ]
  };
};