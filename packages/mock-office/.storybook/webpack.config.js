// you can use this file to add your custom webpack plugins, loaders and anything you like.
// This is just the basic way to addAction addional webpack configurations.
// For more information refer the docs: https://getstorybook.io/docs/configurations/custom-webpack-config

// IMPORTANT
// When you add this file, we won't add the default configurations which is similar
// to "React Create App". This only has babel loader to load JavaScript.

module.exports = {
  plugins: [
    // your custom plugins
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass']
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg|jpg|png|ico)(\?.+)?$/,
        loader: 'file-loader'
      }
    ]
  },
};
