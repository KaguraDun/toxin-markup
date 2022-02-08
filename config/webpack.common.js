/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable import/no-extraneous-dependencies */
const fs = require('fs');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');

const paths = require('./paths');

const PAGES_DIR = `${paths.src}/pages/`;
const PAGE_FOLDERS = fs.readdirSync(PAGES_DIR);

const entryPoints = PAGE_FOLDERS.map((page) => ({
  [page]: `${PAGES_DIR}${page}/${page}.js`,
}));

module.exports = {
  target: 'web',
  // Where webpack looks to start building the bundle
  entry: Object.assign({}, ...entryPoints),
  // Where webpack outputs the assets and bundles
  output: {
    path: paths.build,
    filename: 'assets/js/[name].[fullhash].js',
    publicPath: '',
  },
  cache: {
    // 1. Set cache type to filesystem
    type: 'filesystem',
    allowCollectingMemory: true,
    buildDependencies: {
      // 2. Add your config as buildDependency to get cache invalidation on config change
      config: [__filename],

      // 3. If you have other things the build depends on you can add them here
      // Note that webpack, loaders and all modules referenced from your config are automatically added
    },
  },

  // Customize the webpack build process
  plugins: [
    // Removes/cleans build folders and unused assets when rebuilding
    new CleanWebpackPlugin(),

    // ESLint configuration
    new ESLintPlugin({
      files: ['.', 'src', 'config'],
      extensions: ['pug', 'js'],
      cache: true,
      cacheLocation: 'node_modules/.cache/eslint/.eslintcache',
    }),

    new StylelintPlugin({ fix: true }),

    // Generates an HTML file from a pug template
    // Page folders and files inside have the same name
    ...PAGE_FOLDERS.map(
      (page) =>
        new HtmlWebpackPlugin({
          favicon: `${paths.assets}/images/favicon-32x32.png`,
          chunks: [page],
          template: `${PAGES_DIR}/${page}/${page}`,
          filename: `${page}.html`,
        }),
    ),
  ],

  // Determine how modules within the project are treated
  module: {
    rules: [
      // JavaScript: Use Babel to transpile JavaScript files
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: { cacheDirectory: true },
        },
      },

      // Styles: Inject CSS into the head with source maps
      {
        test: /\.(scss|css)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { sourceMap: true, importLoaders: 1 },
          },
          { loader: 'postcss-loader', options: { sourceMap: true } },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-resources-loader',
            options: {
              resources: `${paths.src}/styles/_resources.scss`,
            },
          },
        ],
      },

      // Images: Copy image files to build folder
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[name].[contenthash][ext]',
        },
      },

      // Fonts: Inline files
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[name].[contenthash][ext]',
        },
        include: /fonts/,
      },
      {
        test: /\.(svg)$/,
        exclude: /fonts/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/icons/[name].[contenthash][ext]',
        },
      },
      {
        test: /\.(ogg|mp3|wav|mpe?g)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/audio/[name].[contenthash][ext]',
        },
      },
      {
        test: /\.pug$/,
        use: [
          {
            loader: 'pug-loader',
            options: {
              root: paths.src,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    modules: [paths.src, 'node_modules'],
    extensions: ['.pug', '.js', '.json'],
    alias: {
      '@/assets': paths.assets,
      '@/components': `${paths.src}/components`,
      '@/helpers': `${paths.src}/helpers`,
      '@/layouts': `${paths.src}/layouts`,
      '@/libs': `${paths.src}/libs`,
      '@/pages': `${paths.src}/pages`,
      '@/styles': `${paths.src}/styles`,
    },
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: 'vendors',
          test: /node_modules/,
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },
};
