"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _requestStatuses = require("../utils/requestStatuses");

var _user = _interopRequireDefault(require("./user"));

var _useAuthentication2 = _interopRequireDefault(require("./hooks/useAuthentication"));

var _AuthContext = _interopRequireDefault(require("./AuthContext"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var propTypes = {
  children: _propTypes.default.element.isRequired
};

var Auth = function Auth(_ref) {
  var children = _ref.children;

  var _useAuthentication = (0, _useAuthentication2.default)(),
      user = _useAuthentication.user,
      status = _useAuthentication.status,
      microsoftData = _useAuthentication.microsoftData;

  var contextValue = (0, _react.useMemo)(function () {
    return {
      user: user,
      status: status,
      microsoftData: microsoftData
    };
  }, [microsoftData, status, user]);
  _user.default.data = user;

  if (status === _requestStatuses.PRISTIN || status === _requestStatuses.PENDING) {
    return /*#__PURE__*/_react.default.createElement("div", null, "Loading...");
  }

  if (status === _requestStatuses.FAILURE) {
    return /*#__PURE__*/_react.default.createElement("div", null, "An Error happened during login");
  }

  return /*#__PURE__*/_react.default.createElement(_AuthContext.default.Provider, {
    value: contextValue
  }, children);
};

Auth.propTypes = propTypes;
var _default = Auth;
exports.default = _default;