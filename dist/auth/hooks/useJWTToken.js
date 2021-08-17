"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _get = _interopRequireDefault(require("lodash/get"));

var _useAuth2 = _interopRequireDefault(require("./useAuth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var useJWTToken = function useJWTToken() {
  var _useAuth = (0, _useAuth2.default)(),
      user = _useAuth.user;

  return (0, _get.default)(user, 'token');
};

var _default = useJWTToken;
exports.default = _default;