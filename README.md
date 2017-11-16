# boi-plugin-vue
[![license](https://img.shields.io/github/license/boijs/boi.svg?style=plastic)](https://github.com/boijs/boi/blob/master/LICENSE)
[![npm](https://img.shields.io/npm/v/boi-plugin-vue.svg?style=plastic)](https://www.npmjs.com/package/boi-plugin-vue)

plugin for boi to build vue project

## Usage
Insert content into `boi-conf.js`:
```javascript
boi.use('boi-plugin-vue',{
  // if extract css files or not
  extractCss: false,
  // extracted css' file name
  extractFilename: 'components',
  // css output path
  cssOutputDir: 'style',
  // add hash fingerprint to extract css files
  cssUseHash: true,
  // enable postcss
  enablePostCss: false,
  // enable lint to js&vue files
  enableLint: false
});
```

## Options
#### `extractCss`
> Boi would extract single css file if set `extractCss` as `true`.
* Type: `Boolean`
* Default: `false`

#### `cssUseHash`
> Whether inject hash content into extracted css file.Works only when set `extractCss` as `true`.
* Type: `Boolean`
* Default: `true`

#### `cssOutputDir`
> Specific extracted file's output directory.Works only when set `extractCss` as `true`.
* Type: `String`,
* Default: `'style'`

#### `extractFilename`
> Specific suffix of extracted file's name.Works only when set `extractCss` as `true`.
* Type: `String`,
* Default: `'components'`

#### `enablePostCss`
> Enable/Disable postcss.Use the same rule with Boi.
* Type: `Boolean`,
* Default: `false`

#### `enableLint`
> Enable/Disable eslint.Use the same rule with Boi.
* Type: `Boolean`,
* Default: `false`
