const Path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const DEFAULT_OPTIONS = {
  // css output path
  cssOutputDir: 'style',
  // add hash fingerprint to extract css files
  cssUseHash: true,
  // if extract css files or not
  extractCss: true,
  // enable postcss
  enablePostCss: false,
  // enable lint to js&vue files
  enableLint: false
};

module.exports = function (opts) {
  const Options = Object.assign({}, DEFAULT_OPTIONS, opts);

  // extract css files 
  const ExtractPlugin = new ExtractTextPlugin({
    filename: `${Path.basename(Options.cssOutputDir)}/${Options.cssUseHash?'[name]_components.[contenthash:8].css':'[name]_components.css'}`
  });

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
        fallback: 'vue-style-loader'
      }) : [{
        loader: 'vue-style-loader'
      }].concat(BaseLoaders),
      less: Options.extractCss ? ExtractTextPlugin.extract({
        use: BaseLoaders.concat(['less-loader']),
        fallback: 'vue-style-loader'
      }) : [{
        loader: 'vue-style-loader'
      }].concat(BaseLoaders, ['less-loader']),
      scss: Options.extractCss ? ExtractTextPlugin.extract({
        use: BaseLoaders.concat(['sass-loader']),
        fallback: 'vue-style-loader'
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
      test: /\.(js|vue)$/,
      enforce: 'pre',
      use: [{
        loader: 'eslint-loader',
        options: {
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
      plugins: Options.extractCss ? [ExtractPlugin] : [],
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