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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/Snake.ts":
/*!**********************!*\
  !*** ./src/Snake.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar constants_1 = __webpack_require__(/*! ./constants */ \"./src/constants.ts\");\r\nvar Snake = /** @class */ (function () {\r\n    function Snake() {\r\n        this.body = [\r\n            { x: 580, y: 150 },\r\n            { x: 130, y: 150 },\r\n            { x: 110, y: 150 },\r\n            { x: 90, y: 150 },\r\n            { x: 70, y: 150 }\r\n        ];\r\n    }\r\n    Snake.prototype.moveForward = function () {\r\n        var head = {\r\n            x: this.body[0].x + constants_1.default.SNAKE_PIECE_WIDTH,\r\n            y: this.body[0].y\r\n        };\r\n        this.body.unshift(head);\r\n        this.body.pop();\r\n    };\r\n    Snake.prototype.getXPosition = function () {\r\n        return this.body[0].x + constants_1.default.SNAKE_PIECE_WIDTH;\r\n    };\r\n    Snake.prototype.getYPosition = function () {\r\n        return this.body[0].y + constants_1.default.SNAKE_PIECE_HEIGHT;\r\n    };\r\n    return Snake;\r\n}());\r\nexports.default = Snake;\r\n\n\n//# sourceURL=webpack:///./src/Snake.ts?");

/***/ }),

/***/ "./src/SnakeBoard.ts":
/*!***************************!*\
  !*** ./src/SnakeBoard.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar constants_1 = __webpack_require__(/*! ./constants */ \"./src/constants.ts\");\r\nvar SnakePiece_1 = __webpack_require__(/*! ./SnakePiece */ \"./src/SnakePiece.ts\");\r\nvar Snake_1 = __webpack_require__(/*! ./Snake */ \"./src/Snake.ts\");\r\nvar SnakeBoard = /** @class */ (function () {\r\n    function SnakeBoard() {\r\n        this.gameboard = document.getElementById('gameboard');\r\n    }\r\n    SnakeBoard.prototype.createSnakePiece = function (x, y) {\r\n        return new SnakePiece_1.default(x, y);\r\n    };\r\n    SnakeBoard.prototype.drawSnake = function () {\r\n        var _this = this;\r\n        this.clearCanvas();\r\n        this.snake.body.forEach(function (snake) {\r\n            _this.drawSnakePiece(_this.createSnakePiece(snake.x, snake.y));\r\n        });\r\n    };\r\n    SnakeBoard.prototype.drawSnakePiece = function (snake) {\r\n        this.context.fillStyle = constants_1.default.SNAKE_COLOR;\r\n        this.context.strokeStyle = constants_1.default.STROKE_COLOR;\r\n        this.context.fillRect(snake.x, snake.y, snake.width, snake.height);\r\n        this.context.strokeRect(snake.x, snake.y, snake.width, snake.height);\r\n    };\r\n    SnakeBoard.prototype.clearCanvas = function () {\r\n        this.context.clearRect(0, 0, this.gameboard.width, this.gameboard.height);\r\n    };\r\n    SnakeBoard.prototype.checkBoundaries = function () {\r\n        if (this.snake.getXPosition() >= this.board.XBoundary ||\r\n            this.snake.getYPosition() >= this.board.YBoundary) {\r\n            return true;\r\n        }\r\n        return false;\r\n    };\r\n    SnakeBoard.prototype.setGameContext = function () {\r\n        this.context = this.gameboard.getContext('2d');\r\n        this.board = {\r\n            XBoundary: this.gameboard.width - constants_1.default.SNAKE_PIECE_WIDTH,\r\n            YBoundary: this.gameboard.height - constants_1.default.SNAKE_PIECE_HEIGHT,\r\n        };\r\n    };\r\n    SnakeBoard.prototype.createSnake = function () {\r\n        var _this = this;\r\n        this.snake = new Snake_1.default();\r\n        setInterval(function () {\r\n            //this.snake.moveForward();\r\n            _this.drawSnake();\r\n        }, constants_1.default.SNAKE_SPEED);\r\n    };\r\n    SnakeBoard.prototype.init = function () {\r\n        this.setGameContext();\r\n        this.createSnake();\r\n    };\r\n    return SnakeBoard;\r\n}());\r\nexports.default = SnakeBoard;\r\n\n\n//# sourceURL=webpack:///./src/SnakeBoard.ts?");

/***/ }),

/***/ "./src/SnakeGame.ts":
/*!**************************!*\
  !*** ./src/SnakeGame.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar SnakeBoard_1 = __webpack_require__(/*! ./SnakeBoard */ \"./src/SnakeBoard.ts\");\r\n__webpack_require__(/*! ../src/scss/main.scss */ \"./src/scss/main.scss\");\r\nvar SnakeGame = /** @class */ (function () {\r\n    function SnakeGame() {\r\n        this.snakeBoard = new SnakeBoard_1.default();\r\n    }\r\n    SnakeGame.prototype.start = function () {\r\n        this.snakeBoard.init();\r\n    };\r\n    return SnakeGame;\r\n}());\r\nvar game = new SnakeGame();\r\ngame.start();\r\n\n\n//# sourceURL=webpack:///./src/SnakeGame.ts?");

/***/ }),

/***/ "./src/SnakePiece.ts":
/*!***************************!*\
  !*** ./src/SnakePiece.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar constants_1 = __webpack_require__(/*! ./constants */ \"./src/constants.ts\");\r\nvar SnakePiece = /** @class */ (function () {\r\n    function SnakePiece(x, y) {\r\n        this.width = constants_1.default.SNAKE_PIECE_WIDTH;\r\n        this.height = constants_1.default.SNAKE_PIECE_HEIGHT;\r\n        this.x = x;\r\n        this.y = y;\r\n    }\r\n    return SnakePiece;\r\n}());\r\nexports.default = SnakePiece;\r\n\n\n//# sourceURL=webpack:///./src/SnakePiece.ts?");

/***/ }),

/***/ "./src/constants.ts":
/*!**************************!*\
  !*** ./src/constants.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nexports.default = {\r\n    LEFT_KEY: 37,\r\n    RIGHT_KEY: 39,\r\n    UP_KEY: 38,\r\n    DOWN_KEY: 40,\r\n    SNAKE_PIECE_WIDTH: 20,\r\n    SNAKE_PIECE_HEIGHT: 20,\r\n    SNAKE_COLOR: 'red',\r\n    STROKE_COLOR: '#000',\r\n    SNAKE_SPEED: 1000,\r\n    CURRENT_DIRECTION: \"right\",\r\n};\r\n\n\n//# sourceURL=webpack:///./src/constants.ts?");

/***/ }),

/***/ "./src/scss/main.scss":
/*!****************************!*\
  !*** ./src/scss/main.scss ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./src/scss/main.scss?");

/***/ }),

/***/ 0:
/*!********************************!*\
  !*** multi ./src/SnakeGame.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./src/SnakeGame.ts */\"./src/SnakeGame.ts\");\n\n\n//# sourceURL=webpack:///multi_./src/SnakeGame.ts?");

/***/ })

/******/ });