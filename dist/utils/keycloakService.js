"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _flow = _interopRequireDefault(require("lodash/flow"));

var _axios = _interopRequireDefault(require("axios"));

var _bearerToken = _interopRequireDefault(require("./bearerToken"));

var _addHostUrl = _interopRequireDefault(require("./addHostUrl"));

var _defaultRequest = _interopRequireDefault(require("./defaultRequest"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var apiUrl = process.env.REACT_APP_SKYMIND_API;

var keycloakService = function keycloakService(params) {
  var modifiedQuery = (0, _flow.default)([_defaultRequest.default, _bearerToken.default, (0, _addHostUrl.default)("".concat(apiUrl, "/keycloak/v1"))])(_axios.default);
  return modifiedQuery(params);
};

var _default = keycloakService;
exports.default = _default;