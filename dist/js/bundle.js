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
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar constants_1 = __webpack_require__(/*! ./constants */ \"./src/constants.ts\");\r\nvar Snake = /** @class */ (function () {\r\n    function Snake() {\r\n        this.body = [\r\n            { x: 20, y: 160 },\r\n            { x: 0, y: 160 }\r\n        ];\r\n        this.currentDirection = constants_1.default.CURRENT_DIRECTION;\r\n        this.collided = false;\r\n        this.changingDirection = false;\r\n        this.speed = 80;\r\n    }\r\n    Snake.prototype.start = function () {\r\n        var _this = this;\r\n        this.moveInterval = setInterval(function () {\r\n            _this.moveForward();\r\n        }, this.speed);\r\n    };\r\n    Snake.prototype.setMoveInterval = function (moveFunction) {\r\n        this.moveInterval = setInterval(function () {\r\n            moveFunction();\r\n        }, this.speed);\r\n    };\r\n    Snake.prototype.checkCollision = function () {\r\n        var _this = this;\r\n        var collision = this.body.slice(1, this.body.length).some(function (snakePiece) {\r\n            return _this.body[0].x === snakePiece.x && _this.body[0].y === snakePiece.y;\r\n        });\r\n        if (collision) {\r\n            this.collided = true;\r\n        }\r\n    };\r\n    Snake.prototype.appendFood = function (food) {\r\n        var foodPiece = {\r\n            x: food.x,\r\n            y: food.y\r\n        };\r\n        this.body.unshift(foodPiece);\r\n    };\r\n    Snake.prototype.updateDirection = function (direction) {\r\n        if (this.changingDirection)\r\n            return;\r\n        this.changingDirection = true;\r\n        clearInterval(this.moveInterval);\r\n        this.currentDirection = direction;\r\n        switch (direction) {\r\n            case \"RIGHT\":\r\n                this.setMoveInterval(this.moveForward.bind(this));\r\n                break;\r\n            case \"LEFT\":\r\n                this.setMoveInterval(this.moveBackward.bind(this));\r\n                break;\r\n            case \"DOWN\":\r\n                this.setMoveInterval(this.moveForwardY.bind(this));\r\n                break;\r\n            case \"UP\":\r\n                this.setMoveInterval(this.moveBackwardY.bind(this));\r\n                break;\r\n        }\r\n    };\r\n    Snake.prototype.moveForward = function () {\r\n        var head = {\r\n            x: this.body[0].x + constants_1.default.SNAKE_PIECE_WIDTH,\r\n            y: this.body[0].y\r\n        };\r\n        this.body.unshift(head);\r\n        this.body.pop();\r\n        this.checkCollision();\r\n    };\r\n    Snake.prototype.moveBackward = function () {\r\n        if (this.currentDirection !== \"LEFT\") {\r\n            this.currentDirection = \"LEFT\";\r\n            this.body.reverse();\r\n        }\r\n        var head = {\r\n            x: this.body[0].x - constants_1.default.SNAKE_PIECE_WIDTH,\r\n            y: this.body[0].y\r\n        };\r\n        this.body.unshift(head);\r\n        this.body.pop();\r\n        this.checkCollision();\r\n    };\r\n    Snake.prototype.moveForwardY = function () {\r\n        var head = {\r\n            x: this.body[0].x,\r\n            y: this.body[0].y + constants_1.default.SNAKE_PIECE_WIDTH\r\n        };\r\n        this.body.unshift(head);\r\n        this.body.pop();\r\n        this.checkCollision();\r\n    };\r\n    Snake.prototype.moveBackwardY = function () {\r\n        if (this.currentDirection !== \"UP\") {\r\n            this.currentDirection = \"UP\";\r\n            this.body.reverse();\r\n        }\r\n        var head = {\r\n            x: this.body[0].x,\r\n            y: this.body[0].y - constants_1.default.SNAKE_PIECE_WIDTH\r\n        };\r\n        this.body.unshift(head);\r\n        this.body.pop();\r\n        this.checkCollision();\r\n    };\r\n    Snake.prototype.clearX = function () {\r\n        if (this.currentDirection === \"RIGHT\") {\r\n            // this.body.forEach((snake) => snake.x = 0);\r\n            for (var i = 0; i < this.body.length; i++) {\r\n                this.body[0].x = 0 - (constants_1.default.SNAKE_SIZE * i);\r\n            }\r\n        }\r\n        if (this.currentDirection === \"LEFT\") {\r\n            // this.body.forEach(snake => snake.x = 600);\r\n            for (var i = 0; i < this.body.length; i++) {\r\n                this.body[0].x = 600 + (constants_1.default.SNAKE_SIZE * i);\r\n            }\r\n        }\r\n    };\r\n    Snake.prototype.clearY = function () {\r\n        if (this.currentDirection === \"DOWN\") {\r\n            // this.body.forEach((snake) => snake.y = 0);\r\n            for (var i = 0; i < this.body.length; i++) {\r\n                this.body[0].y = 0 - (constants_1.default.SNAKE_SIZE * i);\r\n            }\r\n        }\r\n        if (this.currentDirection === \"UP\") {\r\n            // this.body.forEach(snake => snake.y = 600);\r\n            for (var i = 0; i < this.body.length; i++) {\r\n                this.body[0].y = 600 + (constants_1.default.SNAKE_SIZE * i);\r\n            }\r\n        }\r\n    };\r\n    Snake.prototype.getXPosition = function () {\r\n        return (this.body[0].x + constants_1.default.SNAKE_PIECE_WIDTH);\r\n    };\r\n    Snake.prototype.getYPosition = function () {\r\n        return (this.body[0].y + constants_1.default.SNAKE_PIECE_HEIGHT);\r\n    };\r\n    return Snake;\r\n}());\r\nexports.default = Snake;\r\n\n\n//# sourceURL=webpack:///./src/Snake.ts?");

/***/ }),

/***/ "./src/SnakeBoard.ts":
/*!***************************!*\
  !*** ./src/SnakeBoard.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar constants_1 = __webpack_require__(/*! ./constants */ \"./src/constants.ts\");\r\nvar util_1 = __webpack_require__(/*! ./util */ \"./src/util.ts\");\r\nvar SnakePiece_1 = __webpack_require__(/*! ./SnakePiece */ \"./src/SnakePiece.ts\");\r\nvar Snake_1 = __webpack_require__(/*! ./Snake */ \"./src/Snake.ts\");\r\nvar SnakeBoard = /** @class */ (function () {\r\n    function SnakeBoard() {\r\n        this.scoreElement = document.getElementById(\"score\"),\r\n            this.gameboard = document.getElementById('gameboard');\r\n        this.food = [];\r\n        this.previousScore = 0;\r\n        this.score = 0;\r\n    }\r\n    SnakeBoard.prototype.updateScore = function () {\r\n        util_1.count(this.scoreElement, this.previousScore, this.score, 10, false);\r\n    };\r\n    SnakeBoard.prototype.createSnakePiece = function (x, y) {\r\n        return new SnakePiece_1.default(x, y);\r\n    };\r\n    SnakeBoard.prototype.drawSnake = function () {\r\n        var _this = this;\r\n        this.clearCanvas();\r\n        this.snake.body.forEach(function (snake) {\r\n            _this.drawSnakePiece(_this.createSnakePiece(snake.x, snake.y));\r\n        });\r\n    };\r\n    SnakeBoard.prototype.drawFoodPiece = function () {\r\n        var _this = this;\r\n        this.food.forEach(function (food) {\r\n            _this.drawSnakeFoodPiece(food);\r\n        });\r\n    };\r\n    SnakeBoard.prototype.drawSnakeFoodPiece = function (food) {\r\n        this.context.fillStyle = constants_1.default.SNAKE_FOOD_COLOR;\r\n        this.context.strokeStyle = constants_1.default.STROKE_COLOR;\r\n        this.context.fillRect(food.x, food.y, food.width, food.height);\r\n        // this.context.strokeRect(snake.x, snake.y, snake.width, snake.height);\r\n    };\r\n    SnakeBoard.prototype.drawSnakePiece = function (snake) {\r\n        this.context.fillStyle = constants_1.default.SNAKE_COLOR;\r\n        this.context.strokeStyle = constants_1.default.STROKE_COLOR;\r\n        this.context.fillRect(snake.x, snake.y, snake.width, snake.height);\r\n        // this.context.strokeRect(snake.x, snake.y, snake.width, snake.height);\r\n    };\r\n    SnakeBoard.prototype.clearCanvas = function () {\r\n        this.context.clearRect(0, 0, this.gameboard.width, this.gameboard.height);\r\n    };\r\n    SnakeBoard.prototype.outOfBoardX = function () {\r\n        if (this.isOutBoardLeft() || this.isOutBoardRight()) {\r\n            return true;\r\n        }\r\n        return false;\r\n    };\r\n    SnakeBoard.prototype.checkBoundaries = function () {\r\n        if (this.snake.getXPosition() >= this.board.XBoundary + constants_1.default.SNAKE_SIZE || this.snake.getXPosition() <= 0) {\r\n            return true;\r\n        }\r\n        if (this.snake.getYPosition() >= this.board.YBoundary + constants_1.default.SNAKE_SIZE || this.snake.getYPosition() <= 0) {\r\n            return true;\r\n        }\r\n        return false;\r\n    };\r\n    SnakeBoard.prototype.isOutBoardRight = function () {\r\n        return (this.snake.getXPosition() > this.board.XBoundary && this.snake.getXPosition() >= this.board.XBoundary + (constants_1.default.SNAKE_PIECE_WIDTH * this.snake.body.length)) ? true : false;\r\n    };\r\n    SnakeBoard.prototype.isOutBoardLeft = function () {\r\n        return (this.snake.getXPosition() < 0 && this.snake.getXPosition() <= (0 - constants_1.default.SNAKE_PIECE_WIDTH * this.snake.body.length)) ? true : false;\r\n    };\r\n    SnakeBoard.prototype.outOfBoardY = function () {\r\n        if (this.isOutBoardDown() || this.isOutBoardUp()) {\r\n            return true;\r\n        }\r\n        return false;\r\n    };\r\n    SnakeBoard.prototype.isOutBoardDown = function () {\r\n        return (this.snake.getYPosition() > this.board.YBoundary && this.snake.getYPosition() >= this.board.YBoundary + constants_1.default.SNAKE_PIECE_HEIGHT * this.snake.body.length) ? true : false;\r\n    };\r\n    SnakeBoard.prototype.isOutBoardUp = function () {\r\n        return (this.snake.getYPosition() < 0 && this.snake.getYPosition() <= (0 - constants_1.default.SNAKE_PIECE_HEIGHT * this.snake.body.length)) ? true : false;\r\n    };\r\n    SnakeBoard.prototype.setGameContext = function () {\r\n        this.scoreElement.textContent = \"0\";\r\n        this.context = this.gameboard.getContext('2d');\r\n        this.board = {\r\n            XBoundary: this.gameboard.width,\r\n            YBoundary: this.gameboard.height,\r\n        };\r\n    };\r\n    SnakeBoard.prototype.checkFoodCollision = function () {\r\n        return (this.snake.body[0].x === this.food[0].x && this.snake.body[0].y === this.food[0].y) ? true : false;\r\n    };\r\n    SnakeBoard.prototype.setBoardInterval = function () {\r\n        var _this = this;\r\n        this.boardInterval = setInterval(function () {\r\n            if (_this.checkFoodCollision()) {\r\n                _this.context.clearRect(_this.food[0].x, _this.food[0].y, constants_1.default.SNAKE_PIECE_WIDTH, constants_1.default.SNAKE_PIECE_WIDTH);\r\n                _this.snake.appendFood(_this.food[0]);\r\n                _this.food = [];\r\n                _this.food.unshift(_this.createSnakePiece(util_1.random(_this.gameboard.width - constants_1.default.SNAKE_PIECE_WIDTH), util_1.random(_this.gameboard.width - constants_1.default.SNAKE_PIECE_WIDTH)));\r\n                clearInterval(_this.boardInterval);\r\n                _this.snake.speed -= constants_1.default.SPEED_DECREMENT;\r\n                _this.previousScore = _this.score;\r\n                _this.score += constants_1.default.SCORE_DECREMENT;\r\n                _this.updateScore();\r\n                _this.setBoardInterval();\r\n            }\r\n            if (_this.outOfBoardX()) {\r\n                _this.snake.clearX();\r\n                _this.clearCanvas();\r\n            }\r\n            if (_this.outOfBoardY()) {\r\n                _this.snake.clearY();\r\n                _this.clearCanvas();\r\n            }\r\n            _this.drawSnake();\r\n            _this.drawFoodPiece();\r\n        }, this.snake.speed);\r\n    };\r\n    SnakeBoard.prototype.createSnake = function () {\r\n        this.snake = new Snake_1.default();\r\n        this.snake.start();\r\n        this.createSnakeFood();\r\n        this.setBoardInterval();\r\n    };\r\n    SnakeBoard.prototype.createSnakeFood = function () {\r\n        this.food.unshift(this.createSnakePiece(util_1.random(this.gameboard.width - constants_1.default.SNAKE_PIECE_WIDTH), util_1.random(this.gameboard.width - constants_1.default.SNAKE_PIECE_WIDTH)));\r\n        this.drawFoodPiece();\r\n    };\r\n    SnakeBoard.prototype.init = function () {\r\n        this.setGameContext();\r\n        this.createSnake();\r\n    };\r\n    return SnakeBoard;\r\n}());\r\nexports.default = SnakeBoard;\r\n\n\n//# sourceURL=webpack:///./src/SnakeBoard.ts?");

/***/ }),

/***/ "./src/SnakeGame.ts":
/*!**************************!*\
  !*** ./src/SnakeGame.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar constants_1 = __webpack_require__(/*! ./constants */ \"./src/constants.ts\");\r\nvar SnakeBoard_1 = __webpack_require__(/*! ./SnakeBoard */ \"./src/SnakeBoard.ts\");\r\n__webpack_require__(/*! ../src/scss/main.scss */ \"./src/scss/main.scss\");\r\nvar SnakeGame = /** @class */ (function () {\r\n    function SnakeGame() {\r\n        this.snakeBoard = new SnakeBoard_1.default();\r\n        this.gameOver = false;\r\n        this.gameTracker = null;\r\n        this.keyPressed = false;\r\n    }\r\n    SnakeGame.prototype.addListeners = function () {\r\n        var _this = this;\r\n        window.addEventListener(\"keydown\", function (e) {\r\n            if (_this.keyPressed)\r\n                return;\r\n            _this.keyPressed = true;\r\n            if (!_this.snakeBoard.checkBoundaries()) {\r\n                setTimeout(function () {\r\n                    _this.snakeBoard.snake.changingDirection = false;\r\n                }, 80);\r\n                switch (e.keyCode) {\r\n                    case constants_1.default.RIGHT_KEY:\r\n                        if (_this.snakeBoard.snake.currentDirection !== constants_1.default.LEFT) {\r\n                            _this.snakeBoard.snake.updateDirection(constants_1.default.RIGHT);\r\n                        }\r\n                        break;\r\n                    case constants_1.default.LEFT_KEY:\r\n                        if (_this.snakeBoard.snake.currentDirection !== constants_1.default.RIGHT) {\r\n                            _this.snakeBoard.snake.updateDirection(constants_1.default.LEFT);\r\n                        }\r\n                        break;\r\n                    case constants_1.default.DOWN_KEY:\r\n                        if (_this.snakeBoard.snake.currentDirection !== constants_1.default.UP) {\r\n                            _this.snakeBoard.snake.updateDirection(constants_1.default.DOWN);\r\n                        }\r\n                        break;\r\n                    case constants_1.default.UP_KEY:\r\n                        if (_this.snakeBoard.snake.currentDirection !== constants_1.default.DOWN) {\r\n                            _this.snakeBoard.snake.updateDirection(constants_1.default.UP);\r\n                        }\r\n                        break;\r\n                }\r\n            }\r\n        });\r\n        window.addEventListener('keyup', function () {\r\n            _this.keyPressed = false;\r\n        });\r\n    };\r\n    SnakeGame.prototype.gameFinish = function () {\r\n        clearInterval(this.snakeBoard.boardInterval);\r\n        clearInterval(this.snakeBoard.snake.moveInterval);\r\n        clearInterval(this.gameTracker);\r\n    };\r\n    SnakeGame.prototype.init = function () {\r\n        var _this = this;\r\n        this.gameTracker = setInterval(function () {\r\n            if (!_this.snakeBoard.checkBoundaries()) {\r\n                if (_this.snakeBoard.snake.collided) {\r\n                    _this.gameOver = true;\r\n                    _this.gameFinish();\r\n                }\r\n            }\r\n        }, this.snakeBoard.snake.speed);\r\n    };\r\n    SnakeGame.prototype.start = function () {\r\n        this.snakeBoard.init();\r\n        this.init();\r\n        this.addListeners();\r\n    };\r\n    return SnakeGame;\r\n}());\r\nvar game = new SnakeGame();\r\ngame.start();\r\n\n\n//# sourceURL=webpack:///./src/SnakeGame.ts?");

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
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nexports.default = {\r\n    LEFT_KEY: 37,\r\n    RIGHT_KEY: 39,\r\n    UP_KEY: 38,\r\n    DOWN_KEY: 40,\r\n    SCORE_DECREMENT: 50,\r\n    SPEED_DECREMENT: 2,\r\n    SNAKE_PIECE_WIDTH: 20,\r\n    SNAKE_PIECE_HEIGHT: 20,\r\n    SNAKE_SIZE: 20,\r\n    SNAKE_COLOR: 'green',\r\n    SNAKE_FOOD_COLOR: 'red',\r\n    STROKE_COLOR: '#000',\r\n    RIGHT: \"RIGHT\",\r\n    LEFT: \"LEFT\",\r\n    UP: \"UP\",\r\n    DOWN: \"DOWN\",\r\n    CURRENT_DIRECTION: \"RIGHT\",\r\n};\r\n\n\n//# sourceURL=webpack:///./src/constants.ts?");

/***/ }),

/***/ "./src/scss/main.scss":
/*!****************************!*\
  !*** ./src/scss/main.scss ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./src/scss/main.scss?");

/***/ }),

/***/ "./src/util.ts":
/*!*********************!*\
  !*** ./src/util.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar constants_1 = __webpack_require__(/*! ./constants */ \"./src/constants.ts\");\r\nvar random = function (max) {\r\n    return Math.ceil((Math.random() * Math.floor(max)) / constants_1.default.SNAKE_SIZE) * constants_1.default.SNAKE_SIZE;\r\n};\r\nexports.random = random;\r\nvar count = function (elem, start, end, duration, easing) {\r\n    var counter = setInterval(function () {\r\n        if (start === end) {\r\n            clearInterval(counter);\r\n        }\r\n        else {\r\n            if (start < end) {\r\n                if (start > Math.floor(end / 1.05) && easing === false) {\r\n                    clearInterval(counter);\r\n                    count(elem, start, end, easeOut(duration), true);\r\n                }\r\n                start++;\r\n                elem.textContent = \"\" + start;\r\n            }\r\n            if (start > end) {\r\n                if (start < Math.floor(end * 1.3) && easing === false) {\r\n                    clearInterval(counter);\r\n                    count(elem, start, end, easeOut(duration), true);\r\n                }\r\n                start--;\r\n                elem.textContent = \"\" + start;\r\n            }\r\n        }\r\n    }, duration);\r\n};\r\nexports.count = count;\r\nvar easeOut = function (duration) {\r\n    return duration + 50;\r\n};\r\nexports.easeOut = easeOut;\r\n\n\n//# sourceURL=webpack:///./src/util.ts?");

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