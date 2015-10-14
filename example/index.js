export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging();

  //Uncomment the line below to enable animation.
  aurelia.use.plugin('aurelia-animator-css');
  aurelia.use.plugin('aurelia-snackbar');

  aurelia.start().then(a => a.setRoot('src/app'));
}