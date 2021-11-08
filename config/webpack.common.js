const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LiveReloadPlugin = require('webpack-livereload-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');

const fs = require('fs');
const paths = require('./paths');

const PAGES_DIR = `${paths.src}/pages/`;
const PAGES = [...new Set(fs.readdirSync(PAGES_DIR))];

const entryPoints = PAGES.map((page) => ({
  [page]: {
    import: [`${paths.src}/helpers/importAllComponents.js`, `${PAGES_DIR}${page}/${page}.js`],
  },
}));

module.exports = {
  // Where webpack looks to start building the bundle
  entry: Object.assign({}, ...entryPoints),

  // Where webpack outputs the assets and bundles
  output: {
    path: paths.build,
    filename: '[name].bundle.js',
    publicPath: '/',
    assetModuleFilename: 'assets/resource/[name][ext]',
  },

  // Customize the webpack build process
  plugins: [
    new LiveReloadPlugin({
      appendScriptTag: true,
    }),
    // Removes/cleans build folders and unused assets when rebuilding
    new CleanWebpackPlugin(),

    // Copies files from target to destination folder
    new CopyWebpackPlugin({
      patterns: [
        {
          from: paths.public,
          to: 'assets/',
          globOptions: {
            ignore: ['*.DS_Store'],
          },
        },
      ],
    }),
    // ESLint configuration
    new ESLintPlugin({
      files: ['.', 'src', 'config'],
      extensions: ['pug', 'js'],
      cache: true,
      cacheLocation: 'node_modules/.cache/eslint/.eslintcache',
    }),

    new StylelintPlugin({ fix: true }),

    // Generates an HTML file from a pug template
    ...PAGES.map(
      (page) =>
        new HtmlWebpackPlugin({
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
        use: ['babel-loader', 'eslint-loader'],
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
              additionalData:
                '@import "@/styles/_constants.scss";\n@import "@/styles/_mixins.scss";',
            },
          },
        ],
      },

      // Images: Copy image files to build folder
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[name][ext]',
        },
      },

      // Fonts and SVGs: Inline files
      {
        test: /\.(woff(2)?|eot|ttf|otf)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[name][ext]',
        },
      },

      {
        test: /\.(svg)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/icons/[name][ext]',
        },
      },
      {
        test: /\.(ogg|mp3|wav|mpe?g)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/audio/[name][ext]',
        },
      },
      {
        test: /\.pug$/,
        use: [
          {
            loader: 'html-loader',
          },
          {
            loader: 'pug-html-loader',
            options: {
              basedir: paths.src,
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
      '@': paths.src,
      '@/components': `${paths.src}/components`,
      '@/features': `${paths.src}/features`,
      '@/icons': `${paths.src}/icons`,
      '@/images': `${paths.src}/images`,
      '@/models': `${paths.src}/models`,
      '@/layouts': `${paths.src}/layouts`,
      '@/pages': `${paths.src}/pages`,
      '@/services': `${paths.src}/services`,
      '@/styles': `${paths.src}/styles`,
    },
  },
};
