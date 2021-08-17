"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _checkIfScriptAlreadyLoaded = _interopRequireDefault(require("./checkIfScriptAlreadyLoaded"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cache = new Map();

function loadScript(url) {
  if (cache.has(url)) {
    return cache.get(url);
  }

  cache.set(url, new Promise(function (resolve) {
    var loaded = (0, _checkIfScriptAlreadyLoaded.default)(url);

    if (loaded) {
      resolve();
    } else {
      var script = document.createElement('script');
      script.type = 'text/javascript';

      if (script.readyState) {
        script.onreadystatechange = function () {
          if (script.readyState === 'loaded' || script.readyState === 'complete') {
            script.onreadystatechange = null;
            resolve(script);
          }
        };
      } else {
        script.onload = function () {
          resolve(script);
        };
      }

      script.src = url;
      document.getElementsByTagName('head')[0].appendChild(script);
    }
  }));
  return cache.get(url);
}

var _default = loadScript;
exports.default = _default;