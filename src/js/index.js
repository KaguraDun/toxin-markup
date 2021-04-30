import '../styles/index.scss';

function importAll(r) {
  r.keys().forEach(r);
}

importAll(require.context('../components/', true, /\.js|.scss$/));
importAll(require.context('../pug-mixins/', true, /\.js|.scss$/));
