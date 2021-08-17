"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

var _keycloak = _interopRequireDefault(require("../../keycloak"));

var _createReducer2 = _interopRequireDefault(require("../../utils/createReducer"));

var _getMicrosftToken = _interopRequireWildcard(require("../getMicrosftToken"));

var _requestStatuses = require("../../utils/requestStatuses");

var _generateAsyncActions = _interopRequireDefault(require("../../utils/generateAsyncActions"));

var _getRoles = _interopRequireDefault(require("../getRoles"));

var _createReducer;

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var INIT_SESSION = (0, _generateAsyncActions.default)('INIT_SESSION');
var UPDATE_SESSION = (0, _generateAsyncActions.default)('UPDATE_SESSION');
var SESSION_TIME = 1000 * 60 * 3;
var sessionTimeOutId;
var initState = {
  status: _requestStatuses.PRISTIN,
  user: null
};
var reducer = (0, _createReducer2.default)((_createReducer = {}, _defineProperty(_createReducer, _getMicrosftToken.GET_MICROSOFT_TOKEN, function (state, _ref) {
  var microsoftData = _ref.payload.microsoftData;
  return _objectSpread(_objectSpread({}, state), {}, {
    microsoftData: microsoftData
  });
}), _defineProperty(_createReducer, INIT_SESSION.pending, function (state) {
  return _objectSpread(_objectSpread({}, state), {}, {
    status: _requestStatuses.PENDING
  });
}), _defineProperty(_createReducer, INIT_SESSION.failure, function (state) {
  return _objectSpread(_objectSpread({}, state), {}, {
    status: _requestStatuses.FAILURE
  });
}), _defineProperty(_createReducer, INIT_SESSION.success, function (state, _ref2) {
  var user = _ref2.payload.user;
  return _objectSpread(_objectSpread({}, state), {}, {
    user: user,
    status: _requestStatuses.SUCCESS
  });
}), _defineProperty(_createReducer, UPDATE_SESSION.failure, function (state) {
  return _objectSpread(_objectSpread({}, state), {}, {
    status: _requestStatuses.FAILURE
  });
}), _defineProperty(_createReducer, UPDATE_SESSION.success, function (state) {
  return _objectSpread(_objectSpread({}, state), {}, {
    status: _requestStatuses.SUCCESS
  });
}), _defineProperty(_createReducer, UPDATE_SESSION.pending, function (state) {
  return _objectSpread(_objectSpread({}, state), {}, {
    status: _requestStatuses.PENDING
  });
}), _createReducer), initState);

var useAuthentication = function useAuthentication() {
  var _useReducer = (0, _react.useReducer)(reducer, initState),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      _useReducer2$ = _useReducer2[0],
      user = _useReducer2$.user,
      status = _useReducer2$.status,
      microsoftData = _useReducer2$.microsoftData,
      dispatch = _useReducer2[1];

  (0, _react.useEffect)(function () {
    dispatch({
      type: INIT_SESSION.pending
    });

    _keycloak.default.init({
      promiseType: 'native',
      onLoad: 'login-required'
    }).then(function () {
      return _keycloak.default.loadUserProfile();
    }).then(function (userData) {
      if (sessionTimeOutId) {
        clearTimeout(sessionTimeOutId);
      }

      sessionTimeOutId = setTimeout(function () {
        dispatch({
          type: UPDATE_SESSION.pending
        });

        _keycloak.default.updateToken(SESSION_TIME).then(function () {
          dispatch({
            type: UPDATE_SESSION.success
          });
        }).catch(function (err) {
          dispatch({
            type: UPDATE_SESSION.failure,
            err: err
          });
        });
      }, _keycloak.default.idTokenParsed.exp * 1000 - new Date().getTime() - 4000);
      return (0, _getRoles.default)({
        userId: _keycloak.default.idTokenParsed.sub,
        token: _keycloak.default.token,
        user: userData
      });
    }).then(function (resp) {
      dispatch({
        type: INIT_SESSION.success,
        payload: {
          user: _objectSpread(_objectSpread({}, resp.user), {}, {
            role: resp.roles,
            token: _keycloak.default.token
          })
        }
      });
      (0, _getMicrosftToken.default)(dispatch);
    }).catch(function (err) {
      dispatch({
        type: INIT_SESSION.failure,
        err: err
      });
    });
  }, []);
  return {
    user: user,
    status: status,
    microsoftData: microsoftData
  };
};

var _default = useAuthentication;
exports.default = _default;