"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var handler = function handler(cb) {
  return function (params) {
    return cb(params).then(function (resp) {
      return resp.data;
    });
  };
};

var _default = handler;
exports.default = _default;