const BoiPluginVue = require('../index.js');

describe('Extract', () => {
  it('It should has ExtractTextPlugin if set extractCss as true', (done) => {
    const Result = BoiPluginVue({
      extractCss: true
    });
    if (Result.webpackConf.plugins.length === 1) {
      done();
    }
  });

  it('It should not has ExtractTextPlugin if set extractCss as false', (done) => {
    const Result = BoiPluginVue({
      extractCss: false
    });
    if (Result.webpackConf.plugins.length === 0) {
      done();
    }
  });
});

describe('Usehash', () => {
  it('It should has hash in filename if set cssUseHash as true', (done) => {
    const Result = BoiPluginVue({
      extractCss: true,
      cssUseHash: true
    });

    if (/\[contenthash\:8\]/.test(Result.webpackConf.plugins[0].filename)) {
      done();
    }
  });

  it('It should has no hash in filename if set cssUseHash as false', (done) => {
    const Result = BoiPluginVue({
      extractCss: true,
      cssUseHash: false
    });
    if (!/\[contenthash\:8\]/.test(Result.webpackConf.plugins[0].filename)) {
      done();
    }
  });
});

describe('Lint', () => {
  it('It should has eslint-loader if set enableLint as true', (done) => {
    const Result = BoiPluginVue({
      enableLint: true
    });
    if (Result.webpackConf.module.rules.length === 2) {
      done();
    }
  });

  it('It should has no eslint-loader if set enableLint as false', (done) => {
    const Result = BoiPluginVue({
      enableLint: false
    });
    if (Result.webpackConf.module.rules.length === 1) {
      done();
    }
  });
});