(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[12],{

/***/ "./assets/build/img/icons/play-icon.svg":
/*!**********************************************!*\
  !*** ./assets/build/img/icons/play-icon.svg ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }



var _ref =
/*#__PURE__*/
react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("circle", {
  cx: 22,
  cy: 22,
  r: 22,
  opacity: 0.2
});

var _ref2 =
/*#__PURE__*/
react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("circle", {
  cx: 22,
  cy: 22,
  r: 20,
  fill: "#de302f"
});

var _ref3 =
/*#__PURE__*/
react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", {
  d: "M17 30.006V14.015a1.083 1.083 0 011.661-.862c.662.348 10.652 7.378 11.781 7.979a.957.957 0 010 1.733c-.813.441-10.853 7.506-11.815 8A1.078 1.078 0 0117 30.006z",
  fill: "#fff",
  fillRule: "evenodd"
});

var SvgPlayIcon = function SvgPlayIcon(props) {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("svg", _extends({
    viewBox: "0 0 44 44"
  }, props), _ref, _ref2, _ref3);
};

/* harmony default export */ __webpack_exports__["default"] = (SvgPlayIcon);

/***/ }),

/***/ "./assets/src/js/app/components/Post.js":
/*!**********************************************!*\
  !*** ./assets/src/js/app/components/Post.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _get2 = __webpack_require__(/*! lodash/get */ "./node_modules/lodash/get.js");

var _get3 = _interopRequireDefault(_get2);

var _InternalLink = __webpack_require__(/*! components/InternalLink */ "./assets/src/js/app/components/InternalLink.js");

var _InternalLink2 = _interopRequireDefault(_InternalLink);

var _Thumbnail = __webpack_require__(/*! components/Thumbnail */ "./assets/src/js/app/components/Thumbnail.js");

var _Thumbnail2 = _interopRequireDefault(_Thumbnail);

var _playIcon = __webpack_require__(/*! icons/play-icon.svg */ "./assets/build/img/icons/play-icon.svg");

var _playIcon2 = _interopRequireDefault(_playIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Post = function (_Component) {
    _inherits(Post, _Component);

    function Post() {
        _classCallCheck(this, Post);

        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    Post.prototype.getWrapperClass = function getWrapperClass(size) {
        switch (size) {
            case 'l':
                return 'grid-4-6';
            case 'm':
                return 'grid-3-6';
            case 's':
                return 'grid-2-6';
            case 'xs':
                return 'list-item';
            default:
                return 'post-wrapper';
        }
    };

    Post.prototype.render = function render() {
        var _props = this.props,
            post = _props.post,
            size = _props.size,
            _props$categories = _props.categories,
            categories = _props$categories === undefined ? {} : _props$categories;
        var meta = post.meta,
            _post$main_category_i = post.main_category_id,
            main_category_id = _post$main_category_i === undefined ? '' : _post$main_category_i;


        var category = categories ? categories[main_category_id] : '';

        return _react2.default.createElement(
            'div',
            { className: this.getWrapperClass(size) },
            _react2.default.createElement(
                'article',
                { className: 'post-item ' + (meta ? meta.single : '') },
                _react2.default.createElement(
                    _InternalLink2.default,
                    { to: post.link, className: 'thumbnail-container' },
                    (0, _get3.default)(meta, 'is_paid_content', false) && _react2.default.createElement(
                        'span',
                        { className: 'plus-label' },
                        'pluss'
                    ),
                    (0, _get3.default)(meta, 'has_video', false) && _react2.default.createElement(_playIcon2.default, { className: 'video-icon' }),
                    _react2.default.createElement(_Thumbnail2.default, { size: size, thumbnails: post.thumbnails })
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'text-container' },
                    _react2.default.createElement(
                        'div',
                        { className: 'category-wrapper' },
                        category && _react2.default.createElement(
                            'h5',
                            { className: 'category-label' },
                            _react2.default.createElement(
                                _InternalLink2.default,
                                { to: category.url },
                                category.title
                            )
                        ),
                        size === 'xs' && (0, _get3.default)(meta, 'is_paid_content', false) && _react2.default.createElement(
                            'span',
                            { className: 'plus-label' },
                            'pluss'
                        )
                    ),
                    _react2.default.createElement(
                        _InternalLink2.default,
                        { to: post.link },
                        meta.subtitle && _react2.default.createElement(
                            'h4',
                            { className: 'subtitle' },
                            meta.subtitle
                        ),
                        _react2.default.createElement(
                            'h3',
                            { className: 'title' },
                            post.title
                        ),
                        post.excerpt && meta.show_excerpt_on_archives && _react2.default.createElement(
                            'p',
                            { className: 'excerpt' },
                            post.excerpt
                        )
                    )
                )
            )
        );
    };

    return Post;
}(_react.Component);

exports.default = Post;

/***/ }),

/***/ "./assets/src/js/app/components/post-listing/PostListing.js":
/*!******************************************************************!*\
  !*** ./assets/src/js/app/components/post-listing/PostListing.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _Post = __webpack_require__(/*! components/Post */ "./assets/src/js/app/components/Post.js");

var _Post2 = _interopRequireDefault(_Post);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PostListing = function (_Component) {
    _inherits(PostListing, _Component);

    function PostListing() {
        _classCallCheck(this, PostListing);

        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    PostListing.prototype.render = function render() {
        var _props = this.props,
            posts = _props.posts,
            size = _props.size,
            categories = _props.categories;


        return _react2.default.createElement(
            'section',
            { className: 'post-listing' },
            _react2.default.createElement(
                'div',
                { className: 'grid-container' },
                posts.map(function (post) {
                    return _react2.default.createElement(_Post2.default, { key: post.id, post: post, categories: categories, size: size });
                })
            )
        );
    };

    return PostListing;
}(_react.Component);

exports.default = PostListing;

/***/ }),

/***/ "./assets/src/js/app/components/post-listing/PostListingWide.js":
/*!**********************************************************************!*\
  !*** ./assets/src/js/app/components/post-listing/PostListingWide.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _Post = __webpack_require__(/*! components/Post */ "./assets/src/js/app/components/Post.js");

var _Post2 = _interopRequireDefault(_Post);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PostListingWide = function PostListingWide(_ref) {
    var posts = _ref.posts,
        categories = _ref.categories,
        reversed = _ref.reversed;


    return _react2.default.createElement(
        'section',
        { className: 'post-listing-wide' },
        _react2.default.createElement(
            'div',
            { className: 'grid-container' },
            !reversed && posts[0] && _react2.default.createElement(_Post2.default, { post: posts[0], categories: categories, size: 'l' }),
            _react2.default.createElement(
                'div',
                { className: 'grid-2-6' },
                posts[!reversed ? 1 : 0] && _react2.default.createElement(_Post2.default, { post: posts[!reversed ? 1 : 0], categories: categories, size: 's' }),
                posts[!reversed ? 2 : 1] && _react2.default.createElement(_Post2.default, { post: posts[!reversed ? 2 : 1], categories: categories, size: 's' })
            ),
            reversed && posts[2] && _react2.default.createElement(_Post2.default, { post: posts[2], categories: categories, size: 'l' })
        )
    );
};

exports.default = PostListingWide;

/***/ }),

/***/ "./assets/src/js/app/components/post-listing/PostsList.js":
/*!****************************************************************!*\
  !*** ./assets/src/js/app/components/post-listing/PostsList.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _Post = __webpack_require__(/*! components/Post */ "./assets/src/js/app/components/Post.js");

var _Post2 = _interopRequireDefault(_Post);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PostsList = function PostsList(_ref) {
    var posts = _ref.posts,
        categories = _ref.categories;
    return _react2.default.createElement(
        'div',
        { className: 'posts-list' },
        posts.map(function (post, i) {
            return _react2.default.createElement(_Post2.default, { key: i, post: post, categories: categories, size: 'xs' });
        })
    );
};

exports.default = PostsList;

/***/ })

}]);
//# sourceMappingURL=12.js.map