(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ "./assets/build/img/icons/mini-logo-icon-grey.svg":
/*!********************************************************!*\
  !*** ./assets/build/img/icons/mini-logo-icon-grey.svg ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }



var _ref =
/*#__PURE__*/
react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", {
  d: "M7.562 10.779l-.34.109a3.919 3.919 0 01-1.065.222.383.383 0 01-.391-.168 1.553 1.553 0 01-.078-.669V7.141h2.05V3.856h-2.05V0L1.372 2.2v1.661H0v3.285h1.373v3.107a6.461 6.461 0 00.341 2.453 2.455 2.455 0 001.1 1.215 4.731 4.731 0 002.189.388A12.58 12.58 0 007.647 14l.255-.055zm7.968-2a2.036 2.036 0 01-.4 1.385 1.3 1.3 0 01-1.914.02 2.029 2.029 0 01-.377-1.359 2.446 2.446 0 01.36-1.521 1.119 1.119 0 01.916-.41 1.263 1.263 0 01.99.462 2.107 2.107 0 01.422 1.423m4.306 4.482V3.855h-4.065v.919a3.825 3.825 0 00-.953-.724 4.374 4.374 0 00-2.006-.413 4.031 4.031 0 00-3.087 1.275 5.157 5.157 0 00-1.176 3.631 5.678 5.678 0 00.9 3.339 3.983 3.983 0 003.385 1.812 4.238 4.238 0 002-.487 3.447 3.447 0 00.671-.478v.75a1.974 1.974 0 01-.321 1.295 1.305 1.305 0 01-.991.334 1.519 1.519 0 01-.871-.232.9.9 0 01-.3-.528l-.051-.188-4.116-.466-.018.3c-.012.21-.019.38-.019.507a3.122 3.122 0 001.2 2.561c.79.63 2.165.936 4.205.936a10.642 10.642 0 002.339-.234 4.372 4.372 0 001.754-.793 3.943 3.943 0 001.116-1.434 4.3 4.3 0 00.417-1.86zM30.778 4.64a3.486 3.486 0 00-2.632-1 4.477 4.477 0 00-2.075.446 4.687 4.687 0 00-1.15.874v-1.1h-4.05v10.231h4.306V9.167a2.622 2.622 0 01.355-1.645 1.074 1.074 0 01.875-.4.932.932 0 01.735.28 1.714 1.714 0 01.265 1.1v5.6h4.325V7.678a4.242 4.242 0 00-.954-3.021m1.984 9.445h4.563V9.8h-4.56v4.286zm15.5-9.564a3.489 3.489 0 00-2.632-1 4.478 4.478 0 00-2.075.446 4.775 4.775 0 00-1.149.874v-1.1h-4.05v10.231h4.307V9.065a2.635 2.635 0 01.354-1.645 1.074 1.074 0 01.875-.4.932.932 0 01.735.28 1.713 1.713 0 01.265 1.1V14h4.324V7.576a4.241 4.241 0 00-.954-3.022m8.959 6.2a1.442 1.442 0 01-2.2-.01 2.65 2.65 0 01-.457-1.724 2.615 2.615 0 01.462-1.708 1.4 1.4 0 011.124-.521 1.342 1.342 0 011.069.512 2.585 2.585 0 01.453 1.682 2.749 2.749 0 01-.449 1.769m3.5-5.3a6.829 6.829 0 00-8.885-.267A5.108 5.108 0 0050.249 9a5.028 5.028 0 001.881 4.058A6.107 6.107 0 0056.1 14.3a6.015 6.015 0 004.316-1.5 5.518 5.518 0 00.3-7.384",
  fill: "#565656",
  fillRule: "evenodd"
});

var SvgMiniLogoIconGrey = function SvgMiniLogoIconGrey(props) {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("svg", _extends({
    width: 62,
    height: 18
  }, props), _ref);
};

/* harmony default export */ __webpack_exports__["default"] = (SvgMiniLogoIconGrey);

/***/ }),

/***/ "./assets/src/js/app/components/LoadMore.js":
/*!**************************************************!*\
  !*** ./assets/src/js/app/components/LoadMore.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _postsServices = __webpack_require__(/*! services/postsServices */ "./assets/src/js/app/services/postsServices.js");

var _DotsLoader = __webpack_require__(/*! components/partials/DotsLoader */ "./assets/src/js/app/components/partials/DotsLoader.js");

var _DotsLoader2 = _interopRequireDefault(_DotsLoader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LoadMore = function (_Component) {
    _inherits(LoadMore, _Component);

    function LoadMore(props) {
        _classCallCheck(this, LoadMore);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props));

        _this.loadMoreHandler = _this.loadMoreHandler.bind(_this);

        _this.state = {
            isLoading: false,
            offset: _this.props.offset,
            available: true
        };
        return _this;
    }

    LoadMore.prototype.loadMoreHandler = function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
            var _props, fetchIdsHandler, fetchPostsHandler, postsIds, postsType, slug, offset, amount, category, after, before, isCategory, isSearch, newIds, missingPostsIds;

            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _props = this.props, fetchIdsHandler = _props.fetchIdsHandler, fetchPostsHandler = _props.fetchPostsHandler, postsIds = _props.postsIds, postsType = _props.postsType, slug = _props.slug, offset = _props.offset, amount = _props.amount, category = _props.category, after = _props.after, before = _props.before, isCategory = _props.isCategory, isSearch = _props.isSearch;


                            this.setState({ isLoading: true });

                            newIds = void 0;

                            if (!isCategory) {
                                _context.next = 9;
                                break;
                            }

                            _context.next = 6;
                            return fetchIdsHandler(postsType, slug, amount, this.state.offset);

                        case 6:
                            newIds = _context.sent;
                            _context.next = 18;
                            break;

                        case 9:
                            if (!isSearch) {
                                _context.next = 15;
                                break;
                            }

                            _context.next = 12;
                            return fetchIdsHandler(amount, this.state.offset, category, after, before);

                        case 12:
                            newIds = _context.sent;
                            _context.next = 18;
                            break;

                        case 15:
                            _context.next = 17;
                            return fetchIdsHandler(this.state.offset);

                        case 17:
                            newIds = _context.sent;

                        case 18:
                            if (newIds) {
                                _context.next = 22;
                                break;
                            }

                            this.setState({ available: false });
                            _context.next = 25;
                            break;

                        case 22:
                            missingPostsIds = (0, _postsServices.getMissingArrayElements)(newIds, postsIds);
                            _context.next = 25;
                            return fetchPostsHandler(missingPostsIds);

                        case 25:

                            if (this.props.scrollHandler) {
                                this.props.scrollHandler();
                            }

                            this.setState({ isLoading: false });
                            this.setState({ offset: this.state.offset + offset });

                        case 28:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, this);
        }));

        function loadMoreHandler() {
            return _ref.apply(this, arguments);
        }

        return loadMoreHandler;
    }();

    LoadMore.prototype.render = function render() {
        var _state = this.state,
            isLoading = _state.isLoading,
            available = _state.available;


        return _react2.default.createElement(
            'div',
            { className: 'load-more ' + (isLoading ? 'loading' : '') + ' ' + (available ? '' : 'disabled') },
            _react2.default.createElement(
                'button',
                { onClick: this.loadMoreHandler },
                isLoading ? _react2.default.createElement(_DotsLoader2.default, null) : 'last mer'
            )
        );
    };

    return LoadMore;
}(_react.Component);

exports.default = LoadMore;

/***/ }),

/***/ "./assets/src/js/app/components/Thumbnail.js":
/*!***************************************************!*\
  !*** ./assets/src/js/app/components/Thumbnail.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _miniLogoIconGrey = __webpack_require__(/*! icons/mini-logo-icon-grey.svg */ "./assets/build/img/icons/mini-logo-icon-grey.svg");

var _miniLogoIconGrey2 = _interopRequireDefault(_miniLogoIconGrey);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var thumbAttrs = function thumbAttrs(_ref) {
    var thumbnails = _ref.thumbnails,
        size = _ref.size;

    var props = void 0;

    switch (size) {
        case 'l':
            props = thumbnails.sizes['grid-big'];
            break;
        case 'm':
            props = thumbnails.sizes['grid-half'];
            break;
        case 'wide-ad':
            props = thumbnails.sizes['wide-ad'];
            break;
        case 'tall-ad':
            props = thumbnails.sizes['tall-ad'];
            break;
        case 'wide-ad-mob':
            props = thumbnails.sizes['wide-ad-mob'];
            break;
        case 'half-ad':
            props = thumbnails.sizes['half-ad'];
            break;
        case 's':
            props = thumbnails.sizes['grid-small'];
            break;
        case 'xs':
            props = thumbnails.sizes['tiny'];
            break;
        case 'article-thumb':
            props = thumbnails.sizes['content-wrap'];
            break;
        case 'article-vert':
            props = thumbnails.sizes['vertical'];
            break;
        case 'grid-small-tv':
            props = thumbnails.sizes['grid-small-tv'];
            break;
        default:
            props = thumbnails.sizes['original'];
            break;
    }

    if (!props) props = thumbnails.sizes['original'];

    return {
        width: props.width,
        height: props.height,
        src: props.url,
        srcSet: props.srcset,
        sizes: props.sizes,
        key: thumbnails.id,
        alt: thumbnails.alt
    };
};

var Thumbnail = function (_Component) {
    _inherits(Thumbnail, _Component);

    function Thumbnail(props) {
        _classCallCheck(this, Thumbnail);

        return _possibleConstructorReturn(this, _Component.call(this, props));
    }

    Thumbnail.prototype.render = function render() {
        var _props = this.props,
            thumbnails = _props.thumbnails,
            size = _props.size;

        var attrs = thumbnails ? thumbAttrs({ thumbnails: thumbnails, size: size }) : undefined;

        return thumbnails ? _react2.default.createElement('img', attrs) : _react2.default.createElement(_miniLogoIconGrey2.default, { className: 'placeholder-icon' });
    };

    return Thumbnail;
}(_react.Component);

exports.default = Thumbnail;

/***/ }),

/***/ "./assets/src/js/app/components/partials/DotsLoader.js":
/*!*************************************************************!*\
  !*** ./assets/src/js/app/components/partials/DotsLoader.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DotsLoader = function DotsLoader() {
    return _react2.default.createElement(
        "div",
        { className: "dots-loader" },
        _react2.default.createElement("span", null),
        _react2.default.createElement("span", null),
        _react2.default.createElement("span", null)
    );
};

exports.default = DotsLoader;

/***/ })

}]);
//# sourceMappingURL=0.js.map