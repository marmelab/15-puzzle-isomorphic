(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("core", [], factory);
	else if(typeof exports === 'object')
		exports["core"] = factory();
	else
		root["core"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.dirFromMove = exports.moveTile = exports.move = exports.isTileInMovableTiles = exports.listMovableTiles = exports.isCoordsTileInMovableTiles = exports.listCoordsMovableTiles = exports.findEmptyTile = exports.findTileByValue = exports.areCoordsEquals = exports.areGridsEquals = exports.deepCopyGrid = exports.initGame = exports.buildGrid = exports.DEFAULT_SIZE = exports.EMPTY_VALUE = undefined;

var _shuffler = __webpack_require__(1);

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var EMPTY_VALUE = exports.EMPTY_VALUE = 0;
var DEFAULT_SIZE = exports.DEFAULT_SIZE = 4;

var buildGrid = exports.buildGrid = function buildGrid() {
    var size = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_SIZE;

    return Array(size).fill(1).map(function (val, y) {
        return Array(size).fill(1).map(function (val, x) {
            var value = y * size + x + 1;

            return value === size * size ? EMPTY_VALUE : value;
        });
    });
};

var initGame = exports.initGame = async function initGame() {
    var size = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_SIZE;

    var resolvedGrid = buildGrid(size);
    var currentGrid = await (0, _shuffler.shuffle)(resolvedGrid);

    return {
        currentGrid: currentGrid,
        isVictory: false,
        resolvedGrid: resolvedGrid,
        turn: 0
    };
};

var deepCopyGrid = exports.deepCopyGrid = function deepCopyGrid(grid) {
    return grid.map(function (row) {
        return [].concat(_toConsumableArray(row));
    });
};

var areGridsEquals = exports.areGridsEquals = function areGridsEquals(grid1, grid2) {
    if (!grid1 || !grid2) {
        return false;
    }

    if (grid1.length != grid2.length) {
        return false;
    }

    var sizeY = grid1.length;

    for (var y = 0; y < sizeY; y++) {
        if (grid1[y].length !== grid2[y].length) {
            return false;
        }
        var sizeX = grid1[y].length;

        for (var x = 0; x < sizeX; x++) {
            if (grid1[y][x] !== grid2[y][x]) {
                return false;
            }
        }
    }
    return true;
};

var areCoordsEquals = exports.areCoordsEquals = function areCoordsEquals(coords1, coords2) {
    return coords1 && coords2 && coords1.y === coords2.y && coords1.x === coords2.x;
};

var findTileByValue = exports.findTileByValue = function findTileByValue(grid, valueToSearch) {
    for (var y = 0; y < grid.length; y++) {
        var x = grid[y].findIndex(function (value) {
            return value === valueToSearch;
        });

        if (x !== -1) {
            return { y: y, x: x };
        }
    }
    throw 'The tile with value ' + valueToSearch + ' doesn\'t exist.';
};

var findEmptyTile = exports.findEmptyTile = function findEmptyTile(grid) {
    return findTileByValue(grid, EMPTY_VALUE);
};

var listCoordsMovableTiles = exports.listCoordsMovableTiles = function listCoordsMovableTiles(grid) {
    var _findEmptyTile = findEmptyTile(grid),
        y = _findEmptyTile.y,
        x = _findEmptyTile.x;

    return [y > 0 && { y: y - 1, x: x }, x + 1 < grid.length && { y: y, x: x + 1 }, y + 1 < grid.length && { y: y + 1, x: x }, x > 0 && { y: y, x: x - 1 }].filter(function (x) {
        return x;
    });
};

var isCoordsTileInMovableTiles = exports.isCoordsTileInMovableTiles = function isCoordsTileInMovableTiles(grid, coordsTileToMove) {
    return listCoordsMovableTiles(grid).some(function (coords) {
        return areCoordsEquals(coords, coordsTileToMove);
    });
};

var listMovableTiles = exports.listMovableTiles = function listMovableTiles(grid) {
    return listCoordsMovableTiles(grid).map(function (coords) {
        return grid[coords.y][coords.x];
    });
};

var isTileInMovableTiles = exports.isTileInMovableTiles = function isTileInMovableTiles(grid, tileToMove) {
    return listMovableTiles(grid).some(function (tile) {
        return tile === tileToMove;
    });
};

var move = exports.move = function move(grid, coordsTileToMove) {
    if (!isCoordsTileInMovableTiles(grid, coordsTileToMove)) {
        throw 'The tile at coords (' + coordsTileToMove.y + ', ' + coordsTileToMove.x + ') is not movable.';
    }

    var emptyTileCoords = findEmptyTile(grid);
    var newCoords = findTileByValue(grid, grid[coordsTileToMove.y][coordsTileToMove.x]);

    var newGrid = deepCopyGrid(grid);

    newGrid[emptyTileCoords.y][emptyTileCoords.x] = grid[newCoords.y][newCoords.x];
    newGrid[newCoords.y][newCoords.x] = grid[emptyTileCoords.y][emptyTileCoords.x];
    return newGrid;
};

var moveTile = exports.moveTile = function moveTile(_ref, tile) {
    var currentGrid = _ref.currentGrid,
        resolvedGrid = _ref.resolvedGrid,
        turn = _ref.turn;

    var coordsTileToMove = findTileByValue(currentGrid, tile);
    var newCurrentGrid = move(currentGrid, coordsTileToMove);
    var isVictory = areGridsEquals(newCurrentGrid, resolvedGrid);

    return {
        currentGrid: newCurrentGrid,
        resolvedGrid: resolvedGrid,
        isVictory: isVictory,
        turn: turn + 1
    };
};

var dirFromMove = exports.dirFromMove = function dirFromMove(grid, tile) {
    var coords = findTileByValue(grid, tile);
    var coordsEmptyTile = findEmptyTile(grid);

    return {
        y: coordsEmptyTile.y - coords.y,
        x: coordsEmptyTile.x - coords.x
    };
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.shuffle = exports.chooseCoords = exports.SLEEP_DURATION = exports.SHUFFLE_DURATION = undefined;

var _game = __webpack_require__(0);

var SHUFFLE_DURATION = exports.SHUFFLE_DURATION = 2000;
var SLEEP_DURATION = exports.SLEEP_DURATION = 1;

var chooseCoords = exports.chooseCoords = function chooseCoords(coordsList) {
    return coordsList[Math.floor(Math.random() * coordsList.length)];
};

var sleep = function sleep(duration) {
    return new Promise(function (resolve) {
        return setTimeout(resolve, duration);
    });
};

var shuffle = exports.shuffle = async function shuffle(grid) {
    var shuffleDuration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : SHUFFLE_DURATION;

    var stopShuffling = false;
    var shuffledGrid = (0, _game.deepCopyGrid)(grid);

    var startShuffling = async function startShuffling() {
        while (!stopShuffling) {
            var coords = (0, _game.listCoordsMovableTiles)(shuffledGrid);

            shuffledGrid = (0, _game.move)(shuffledGrid, chooseCoords(coords));
            await sleep(SLEEP_DURATION);
        }
    };

    return await Promise.race([sleep(shuffleDuration).then(function () {
        stopShuffling = true;
        return shuffledGrid;
    }), new Promise(function () {
        return startShuffling();
    })]);
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _game = __webpack_require__(0);

Object.keys(_game).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _game[key];
    }
  });
});

var _helper = __webpack_require__(3);

Object.keys(_helper).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _helper[key];
    }
  });
});

var _shuffler = __webpack_require__(1);

Object.keys(_shuffler).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _shuffler[key];
    }
  });
});

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var associateTileToBackground = exports.associateTileToBackground = function associateTileToBackground(grid) {
    var tileSize = grid.length > 0 ? 100 / grid.length : 0; // 100%

    var tileToBg = {};

    grid.forEach(function (row, rowKey) {
        row.forEach(function (value, colKey) {
            tileToBg[value] = tileSize * colKey + '% ' + tileSize * rowKey + '%';
        });
    });
    return tileToBg;
};

var choiceInArray = exports.choiceInArray = function choiceInArray(list) {
    var rand = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Math.random();

    if (!Array.isArray(list)) {
        throw Error('The list should be an array');
    }
    if (rand < 0 || rand >= 1) {
        throw Error('The value random number should be a number (0 <= rand < 1)');
    }

    return list[Math.floor(rand * list.length)];
};

/***/ })
/******/ ]);
});
//# sourceMappingURL=core.js.map