/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(2);
module.exports = __webpack_require__(3);


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("babel-polyfill");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _express = __webpack_require__(4);

var _express2 = _interopRequireDefault(_express);

var _bodyParser = __webpack_require__(5);

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _mongoose = __webpack_require__(0);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _morgan = __webpack_require__(6);

var _morgan2 = _interopRequireDefault(_morgan);

var _config = __webpack_require__(7);

var _config2 = _interopRequireDefault(_config);

var _userRoute = __webpack_require__(8);

var _userRoute2 = _interopRequireDefault(_userRoute);

var _blockedSiteRoute = __webpack_require__(13);

var _blockedSiteRoute2 = _interopRequireDefault(_blockedSiteRoute);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = new _express2.default();
var cfg = (0, _config2.default)();

app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use(_bodyParser2.default.json());

if (process.env.NODE_ENV === 'development') {
    app.use((0, _morgan2.default)('dev'));
}

_mongoose2.default.Promise = __webpack_require__(16);
_mongoose2.default.connect(cfg.DATABASE, { useMongoClient: true });

app.get('/', function (req, res) {
    res.json({ 'message': 'Nothing to see here' });
});

(0, _userRoute2.default)(app);
(0, _blockedSiteRoute2.default)(app);

app.listen(cfg.PORT, function () {
    console.log('Listening to port ' + cfg.PORT);
});

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("morgan");

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var cfg = {
    dev: {
        DATABASE: 'mongodb://localhost:27017/mws-dev',
        JWT: {
            SECRET: 'super-secret',
            EXPIRATION: '1H'
        },
        PORT: 3000
    },
    prod: {
        DATABASE: 'mongodb://' + process.env.DB_USER + ':' + process.env.DB_PASSWORD + '@ds231715.mlab.com:31715/mws',
        JWT: {
            SECRET: '0682f007844a0266990df1b2912f95bc',
            EXPIRATION: '1h'
        },
        PORT: process.env.PORT || 8080
    }
};

exports.default = function () {
    switch (process.env.NODE_ENV) {
        case 'production':
            return cfg.prod;
        default:
            return cfg.dev;
    }
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _userController = __webpack_require__(9);

exports.default = function (app) {
    app.route('/users').get(_userController.getAll);
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.remove = exports.update = exports.create = exports.getOne = exports.getAll = undefined;

var _user = __webpack_require__(10);

var _user2 = _interopRequireDefault(_user);

var _responseUtil = __webpack_require__(12);

var _responseUtil2 = _interopRequireDefault(_responseUtil);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var serverErr = _responseUtil2.default.serverErr();
var notFound = _responseUtil2.default.notFound();

var getAll = exports.getAll = function getAll(req, res) {
    _user2.default.find().exec().then(function (users) {
        res.json({ users: users });
    }).catch(function (err) {
        res.status(serverErr.status).json(serverErr.text);
    });
};

var getOne = exports.getOne = function getOne(req, res) {};

var create = exports.create = function create(req, res) {};

var update = exports.update = function update(req, res) {};

var remove = exports.remove = function remove(req, res) {};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _bcryptjs = __webpack_require__(11);

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

var _mongoose = __webpack_require__(0);

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var schema = _mongoose2.default.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
});

schema.statics.generateHash = function (password) {
    return _bcryptjs2.default.hashSync(password, _bcryptjs2.default.genSaltSync());
};

schema.methods.validatePassword = function (password) {
    return _bcryptjs2.default.compareSync(password, this.password);
};

exports.default = _mongoose2.default.model('User', schema);

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("bcryptjs");

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    notFound: function notFound() {
        return {
            status: 404,
            text: { message: 'Not found' }
        };
    },
    serverErr: function serverErr() {
        return {
            status: 500,
            text: { message: 'Something went wrong' }
        };
    }
};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _blockedSiteController = __webpack_require__(14);

exports.default = function (app) {
    app.route('/blocked-sites').get(_blockedSiteController.getAll);
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.remove = exports.update = exports.create = exports.getOne = exports.getAll = undefined;

var _blockedSite = __webpack_require__(15);

var _blockedSite2 = _interopRequireDefault(_blockedSite);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getAll = exports.getAll = function getAll(req, res) {
    _blockedSite2.default.find().exec().then(function (blockSites) {
        res.json({ blockSites: blockSites });
    }).catch(function (err) {
        res.status(serverErr.status).json(serverErr.text);
    });
};

var getOne = exports.getOne = function getOne(req, res) {};

var create = exports.create = function create(req, res) {};

var update = exports.update = function update(req, res) {};

var remove = exports.remove = function remove(req, res) {};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = __webpack_require__(0);

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var schema = _mongoose2.default.Schema({
    url: {
        type: String,
        required: true,
        unique: true
    }
});

exports.default = _mongoose2.default.model('BlockedSite', schema);

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("bluebird");

/***/ })
/******/ ]);