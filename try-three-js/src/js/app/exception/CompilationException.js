(function (global) {

  'use strict';

  global.CompilationException = function (message) {
    this.message = message;
    this.name = 'CompilationException';
  };

}) (window);
