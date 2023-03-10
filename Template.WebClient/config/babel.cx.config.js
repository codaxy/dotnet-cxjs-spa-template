module.exports = {
   presets: ['@babel/preset-typescript'],
   plugins: [
      ['@babel/plugin-syntax-decorators', { decoratorsBeforeExport: true }],
      ['babel-plugin-transform-cx-jsx', { trimWhitespace: true, autoImportHtmlElement: true }],
      ['babel-plugin-transform-cx-imports', { useSrc: true }],
   ],
};
