/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';

	var getSkeltonJSON = new Promise(function (resolve, reject) {
	  $.ajax({
	    url: './data/skelton.json',
	    dataType: 'json',
	    success: function success(json) {
	      resolve(json);
	    },
	    error: function error() {
	      reject();
	    }
	  });
	});

	var getSpriteJSON = new Promise(function (resolve, reject) {
	  $.ajax({
	    url: './data/parts.json',
	    dataType: 'json',
	    success: function success(json) {
	      resolve(json);
	    },
	    error: function error() {
	      reject();
	    }
	  });
	});

	var getSpriteImage = new Promise(function (resolve, reject) {
	  var image = new Image();
	  image.onload = function () {
	    resolve(image);
	  };
	  image.src = './images/parts.png';
	});

	Promise.all([getSkeltonJSON, getSpriteJSON, getSpriteImage]).then(function (data) {
	  var skeltonJSON = data[0];
	  var spriteJSON = data[1];
	  var sprite = data[2];
	  var renderer = new spine.SkeletonRenderer(sprite, spriteJSON);
	  renderer.scale = 0.6;
	  renderer.load(skeltonJSON);
	  renderer.state.data.defaultMix = 0.4;
	  renderer.state.setAnimationByName(0, "walk", true);
	  renderer.state.addAnimationByName(0, "jump", false, 3);
	  renderer.state.addAnimationByName(0, "run", true, 0);
	  renderer.skeleton.x = 320;
	  renderer.skeleton.y = 450;
	  renderer.animate(document.querySelector('canvas'));
	  Object.keys(spriteJSON).forEach(function (name) {
	    var $button = $('<button data-part="' + name + '">' + name + '</button>').click(function () {
	      renderer.changePart(name);
	    });
	    $('body').append($button);
	  });
	});

/***/ }
/******/ ]);