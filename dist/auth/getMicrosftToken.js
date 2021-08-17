"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.GET_MICROSOFT_TOKEN = void 0;

var _keycloak = _interopRequireDefault(require("../keycloak"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GET_MICROSOFT_TOKEN = 'GET_MICROSOFT_TOKEN';
exports.GET_MICROSOFT_TOKEN = GET_MICROSOFT_TOKEN;

var getMicrosoftToken = function getMicrosoftToken(dispatch) {
  return _keycloak.default.getActiveDirectory().then(function (microsoftData) {
    dispatch({
      type: GET_MICROSOFT_TOKEN,
      payload: {
        microsoftData: microsoftData
      }
    });
  });
};

var _default = getMicrosoftToken;
exports.default = _default;