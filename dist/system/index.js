System.register([], function (_export) {
  'use strict';

  _export('configure', configure);

  function configure(config) {
    config.globalResources('./snackbar');
  }

  return {
    setters: [],
    execute: function () {}
  };
});