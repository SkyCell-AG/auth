"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _keycloak = _interopRequireDefault(require("../keycloak"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var logout = function logout() {
  return _keycloak.default.logout();
};

var _default = logout;
exports.default = _default;