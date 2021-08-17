"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _keycloakService = _interopRequireDefault(require("../utils/keycloakService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getRoles = function getRoles(_ref) {
  var userId = _ref.userId,
      token = _ref.token,
      user = _ref.user;
  return (0, _keycloakService.default)({
    method: 'GET',
    url: "user/".concat(userId, "/roles"),
    token: token
  }).then(function (data) {
    return {
      user: user,
      roles: data.map(function (_ref2) {
        var name = _ref2.name;
        return name;
      })
    };
  });
};

var _default = getRoles;
exports.default = _default;