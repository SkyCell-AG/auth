"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _loadScript = _interopRequireDefault(require("./utils/loadScript"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _process$env = process.env,
    url = _process$env.REACT_APP_AUTH_SERVER_URL,
    realm = _process$env.REACT_APP_REALM,
    clientId = _process$env.REACT_APP_RESOURCE;
var keyCloakadapter;
var keycloak = new Proxy({
  init: function init() {
    for (var _len = arguments.length, rest = new Array(_len), _key = 0; _key < _len; _key++) {
      rest[_key] = arguments[_key];
    }

    return (0, _loadScript.default)("".concat(url, "/js/keycloak.js")).then(function () {
      keyCloakadapter = new window.Keycloak({
        url: url,
        realm: realm,
        clientId: clientId
      });
    }).then(function () {
      var _keyCloakadapter;

      return (_keyCloakadapter = keyCloakadapter).init.apply(_keyCloakadapter, rest);
    });
  },
  getActiveDirectory: function getActiveDirectory() {
    return _axios.default.get("".concat(keyCloakadapter.authServerUrl, "/realms/skycell/broker/microsoft/token"), {
      headers: {
        Authorization: "Bearer ".concat(keyCloakadapter.token)
      }
    }).then(function (resp) {
      return resp.data;
    });
  }
}, {
  get: function get(target, prop) {
    if (target[prop]) {
      return target[prop];
    }

    if (!keyCloakadapter) {
      return undefined;
    }

    return keyCloakadapter[prop];
  }
});
var _default = keycloak;
exports.default = _default;