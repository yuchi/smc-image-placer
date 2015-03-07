(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/pier/Development/smc-image-placer/src/scripts/detect.js":[function(require,module,exports){
"use strict";

if (!(window.File && window.FileReader && window.FileList && window.Blob)) {
  throw new Error("Browser not supported");
}

},{}],"/Users/pier/Development/smc-image-placer/src/scripts/filedrop.js":[function(require,module,exports){
"use strict";

exports["default"] = filedrop;
exports.readAsImage = readAsImage;

function filedrop(dropzone, callback) {

  dropzone.addEventListener("dragover", function (event) {
    event.stopPropagation();
    event.preventDefault();
    event.dataTransfer.dropEffect = "copy";
    dropzone.classList.add("dropping");
  }, false);

  dropzone.addEventListener("dragleave", function (event) {
    event.stopPropagation();
    event.preventDefault();
    dropzone.classList.remove("dropping");
  }, false);

  dropzone.addEventListener("drop", function (event) {
    event.stopPropagation();
    event.preventDefault();
    dropzone.classList.remove("dropping");

    callback(event.dataTransfer.files, event);
  }, false);
}

function readAsImage(file, cb) {
  var img = new Image();
  var reader = new FileReader();

  reader.readAsDataURL(file);

  reader.onload = function (_ref) {
    var result = _ref.target.result;

    img.src = result;
    img.onload = function () {
      return cb(img);
    };
  };
}

Object.defineProperty(exports, "__esModule", {
  value: true
});

},{}],"/Users/pier/Development/smc-image-placer/src/scripts/main.js":[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

require("./detect");

var _filedrop = require("./filedrop");

var filedrop = _interopRequire(_filedrop);

var readAsImage = _filedrop.readAsImage;

var dropzone = document.getElementById("dropzone");

var fontName = "Lato";

var canvas = document.createElement("canvas");
var context = canvas.getContext("2d");
var title = document.getElementById("title");
var titleSize = document.getElementById("title-size");
var subtitle = document.getElementById("subtitle");

title.value = window.localStorage.title || "";
titleSize.value = window.localStorage.titleSize || "";
subtitle.value = window.localStorage.subtitle || "";

var logo = new Image();

logo.src = "images/logo_w.png";

var image = undefined;

dropzone.appendChild(canvas);

var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
  for (var _iterator = [title, titleSize, subtitle][Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
    var n = _step.value;
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = ["change", "keyup"][Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var e = _step2.value;

        n.addEventListener(e, update);
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2["return"]) {
          _iterator2["return"]();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }
  }
} catch (err) {
  _didIteratorError = true;
  _iteratorError = err;
} finally {
  try {
    if (!_iteratorNormalCompletion && _iterator["return"]) {
      _iterator["return"]();
    }
  } finally {
    if (_didIteratorError) {
      throw _iteratorError;
    }
  }
}

filedrop(dropzone, function (files) {
  var file = files.item(0);

  if (file) readAsImage(file, setImage);
});

function setImage(img) {
  var width = Math.min(1200, Math.max(800, img.width));
  var height = Math.round(width / img.width * img.height);

  canvas.width = width;
  canvas.height = height;

  canvas.style.marginRight = -(width / 2) + "px";
  canvas.style.marginBottom = -(height / 2) + "px";

  dropzone.classList.add("done");

  image = img;

  update();
}

function update() {
  clear();

  context.imageSmoothingEnabled = true;
  context.drawImage(image, 0, 0, canvas.width, canvas.height);

  var gradient = context.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0.5, "rgba(0, 0, 0, 0.0)");
  gradient.addColorStop(1, "rgba(0, 0, 0, 0.8)");
  context.fillStyle = gradient;
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.drawImage(logo, canvas.width - 150, canvas.height - 125, 100, 75);

  var titleText = title.value.trim();
  var titleSizeValue = titleSize.value.trim();
  var subtitleText = subtitle.value.trim();

  window.localStorage.title = titleText;
  window.localStorage.titleSize = titleSizeValue;
  window.localStorage.subtitle = subtitleText;

  var titleShift = subtitleText ? 50 : 0;

  context.font = "100 " + titleSizeValue + " " + fontName;
  context.fillStyle = "white";
  context.fillText(title.value, 50, canvas.height - (50 + titleShift));

  if (subtitleText) {
    context.font = "100 40px " + fontName;
    context.fillStyle = "rgba(255,255,255,0.6)";
    context.fillText(subtitle.value, 53, canvas.height - 50);
  }
}

function clear() {
  context.clearRect(0, 0, canvas.width, canvas.height);
}

},{"./detect":"/Users/pier/Development/smc-image-placer/src/scripts/detect.js","./filedrop":"/Users/pier/Development/smc-image-placer/src/scripts/filedrop.js"}]},{},["/Users/pier/Development/smc-image-placer/src/scripts/main.js"]);
