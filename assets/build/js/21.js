(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[21],{

/***/ "./assets/src/js/app/components/Ads.js":
/*!*********************************************!*\
  !*** ./assets/src/js/app/components/Ads.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _reactOnScreen = __webpack_require__(/*! react-on-screen */ "./node_modules/react-on-screen/lib/index.js");

var _reactOnScreen2 = _interopRequireDefault(_reactOnScreen);

var _reactDeviceDetect = __webpack_require__(/*! react-device-detect */ "./node_modules/react-device-detect/dist/index.js");

var _UniversalLink = __webpack_require__(/*! components/UniversalLink */ "./assets/src/js/app/components/UniversalLink.js");

var _UniversalLink2 = _interopRequireDefault(_UniversalLink);

var _Thumbnail = __webpack_require__(/*! components/Thumbnail */ "./assets/src/js/app/components/Thumbnail.js");

var _Thumbnail2 = _interopRequireDefault(_Thumbnail);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Ad = function Ad(_ref) {
    var isVisible = _ref.isVisible,
        ad = _ref.ad,
        size = _ref.size,
        isMobile = _ref.isMobile,
        handleClick = _ref.handleClick;
    var _window = window,
        dataLayer = _window.dataLayer;

    var imgSize = size === 'wide' ? 'wide-ad' + (isMobile ? '-mob' : '') : 'tall-ad';

    var attrs = {
        class: isMobile ? 'ad-mobile' : 'ad-desktop',
        imgSize: imgSize
    };

    if (isVisible) {
        dataLayer.push({
            event: 'AdBannerView',
            Ad_banner: 'site_banner_' + ad.id
        });
    }

    return _react2.default.createElement(
        _react.Fragment,
        null,
        _react2.default.createElement(
            'div',
            { className: attrs.class, onClick: function onClick() {
                    return handleClick(ad.id);
                } },
            _react2.default.createElement(
                _UniversalLink2.default,
                { to: ad.url, target: '_blank' },
                _react2.default.createElement(_Thumbnail2.default, { size: attrs.imgSize, thumbnails: ad.image })
            )
        )
    );
};

var Ads = function (_Component) {
    _inherits(Ads, _Component);

    function Ads(props) {
        _classCallCheck(this, Ads);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props));

        _this.handleClick = _this.handleClick.bind(_this);
        return _this;
    }

    Ads.prototype.handleClick = function handleClick(id) {
        var _window2 = window,
            dataLayer = _window2.dataLayer;


        dataLayer.push({
            event: 'AdBannerClick',
            Ad_banner: 'site_banner_' + id
        });
    };

    Ads.prototype.render = function render() {
        var _props = this.props,
            _props$ad = _props.ad,
            ad = _props$ad === undefined ? {} : _props$ad,
            size = _props.size;


        return _react2.default.createElement(
            'section',
            { className: 'ads-container' },
            ad.desk && !Array.isArray(ad.desk) && !_reactDeviceDetect.isMobile && _react2.default.createElement(
                _reactOnScreen2.default,
                { once: true },
                _react2.default.createElement(Ad, { ad: ad.desk, size: size, isMobile: false, handleClick: this.handleClick })
            ),
            ad.desk && !Array.isArray(ad.desk) && _reactDeviceDetect.isMobile && _react2.default.createElement(
                _reactOnScreen2.default,
                { once: true },
                _react2.default.createElement(Ad, { ad: ad.mob, size: size, isMobile: true, handleClick: this.handleClick })
            )
        );
    };

    return Ads;
}(_react.Component);

exports.default = Ads;

/***/ }),

/***/ "./assets/src/js/app/components/partials/TemplateTitle.js":
/*!****************************************************************!*\
  !*** ./assets/src/js/app/components/partials/TemplateTitle.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _InternalLink = __webpack_require__(/*! components/InternalLink */ "./assets/src/js/app/components/InternalLink.js");

var _InternalLink2 = _interopRequireDefault(_InternalLink);

var _arrowIcon = __webpack_require__(/*! icons/arrow-icon.svg */ "./assets/build/img/icons/arrow-icon.svg");

var _arrowIcon2 = _interopRequireDefault(_arrowIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TemplateTitle = function TemplateTitle(_ref) {
    var title = _ref.title;
    return _react2.default.createElement(
        'div',
        { className: 'template-title' },
        _react2.default.createElement(
            'h1',
            null,
            title
        ),
        _react2.default.createElement(
            _InternalLink2.default,
            { to: '/' },
            _react2.default.createElement(_arrowIcon2.default, null),
            'tilbake til forsiden'
        )
    );
};

exports.default = TemplateTitle;

/***/ }),

/***/ "./assets/src/js/app/containers/templates/Category.js":
/*!************************************************************!*\
  !*** ./assets/src/js/app/containers/templates/Category.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");

var _main = __webpack_require__(/*! storage/actions/main */ "./assets/src/js/app/storage/actions/main.js");

var _posts = __webpack_require__(/*! storage/actions/posts */ "./assets/src/js/app/storage/actions/posts.js");

var _postsServices = __webpack_require__(/*! services/postsServices */ "./assets/src/js/app/services/postsServices.js");

var _Ads = __webpack_require__(/*! components/Ads */ "./assets/src/js/app/components/Ads.js");

var _Ads2 = _interopRequireDefault(_Ads);

var _TemplateTitle = __webpack_require__(/*! components/partials/TemplateTitle */ "./assets/src/js/app/components/partials/TemplateTitle.js");

var _TemplateTitle2 = _interopRequireDefault(_TemplateTitle);

var _PostListingWide = __webpack_require__(/*! components/post-listing/PostListingWide */ "./assets/src/js/app/components/post-listing/PostListingWide.js");

var _PostListingWide2 = _interopRequireDefault(_PostListingWide);

var _PostListing = __webpack_require__(/*! components/post-listing/PostListing */ "./assets/src/js/app/components/post-listing/PostListing.js");

var _PostListing2 = _interopRequireDefault(_PostListing);

var _PostsList = __webpack_require__(/*! components/post-listing/PostsList */ "./assets/src/js/app/components/post-listing/PostsList.js");

var _PostsList2 = _interopRequireDefault(_PostsList);

var _LoadMore = __webpack_require__(/*! components/LoadMore */ "./assets/src/js/app/components/LoadMore.js");

var _LoadMore2 = _interopRequireDefault(_LoadMore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Category = function (_Component) {
    _inherits(Category, _Component);

    function Category() {
        _classCallCheck(this, Category);

        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    Category.prototype.render = function render() {
        var _props = this.props,
            categories_by_ids = _props.categories_by_ids,
            posts_by_ids = _props.posts_by_ids,
            main = _props.main,
            fetchPostsIdsByCat = _props.fetchPostsIdsByCat,
            fetchPosts = _props.fetchPosts;
        var _main$articles = main.articles,
            articles = _main$articles === undefined ? [] : _main$articles,
            _main$ads = main.ads,
            ads = _main$ads === undefined ? [] : _main$ads,
            current_object = main.current_object;
        var title = current_object.title,
            slug = current_object.slug;


        var posts = posts_by_ids;
        var categories = categories_by_ids;
        var postsIds = Object.keys(posts);

        var loadMoreProps = {
            fetchIdsHandler: fetchPostsIdsByCat,
            fetchPostsHandler: fetchPosts,
            offset: 21,
            amount: 10,
            postsType: 'article',
            isCategory: true,
            postsIds: postsIds,
            slug: slug
        };

        var articlesPosts = (0, _postsServices.formPostsArray)(posts, articles);

        return _react2.default.createElement(
            'section',
            { className: 'category' },
            _react2.default.createElement(
                'div',
                { className: 'wrapper' },
                _react2.default.createElement(_Ads2.default, { ad: ads[0] }),
                _react2.default.createElement(_TemplateTitle2.default, { title: title }),
                (0, _postsServices.checkPostsIdsLength)(articles, 0, 3) && _react2.default.createElement(_PostListingWide2.default, { posts: articlesPosts.slice(0, 3),
                    categories: categories }),
                (0, _postsServices.checkPostsIdsLength)(articles, 3, 5) && _react2.default.createElement(_PostListing2.default, { posts: articlesPosts.slice(3, 5),
                    categories: categories,
                    size: 'm' }),
                (0, _postsServices.checkPostsIdsLength)(articles, 5, 8) && _react2.default.createElement(_PostListing2.default, { posts: articlesPosts.slice(5, 8),
                    categories: categories,
                    size: 's' }),
                _react2.default.createElement(_Ads2.default, { ad: ads[1] }),
                (0, _postsServices.checkPostsIdsLength)(articles, 8, 11) && _react2.default.createElement(_PostListingWide2.default, { posts: articlesPosts.slice(8, 11),
                    reversed: true,
                    categories: categories }),
                (0, _postsServices.checkPostsIdsLength)(articles, 11, 13) && _react2.default.createElement(_PostListing2.default, { posts: articlesPosts.slice(11, 13),
                    categories: categories,
                    size: 'm' }),
                (0, _postsServices.checkPostsIdsLength)(articles, 13, 16) && _react2.default.createElement(_PostListing2.default, { posts: articlesPosts.slice(13, 16),
                    categories: categories,
                    size: 's' }),
                (0, _postsServices.checkPostsIdsLength)(articles, 16) && _react2.default.createElement(_PostsList2.default, { posts: articlesPosts.slice(16),
                    categories: categories }),
                (0, _postsServices.checkPostsIdsLength)(articles, 20) && _react2.default.createElement(_LoadMore2.default, loadMoreProps),
                _react2.default.createElement(_Ads2.default, { ad: ads[2] })
            )
        );
    };

    return Category;
}(_react.Component);

var mapStateToProps = function mapStateToProps(_ref) {
    var categories_by_ids = _ref.categories_by_ids,
        posts_by_ids = _ref.posts_by_ids,
        main = _ref.main;
    return {
        categories_by_ids: categories_by_ids,
        posts_by_ids: posts_by_ids,
        main: main
    };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
        fetchPostsIdsByCat: function fetchPostsIdsByCat(postsType, slug, amount, offset) {
            return dispatch((0, _main.fetchPostsIdsByCat)(postsType, slug, amount, offset));
        },
        fetchPosts: function fetchPosts(ids) {
            return dispatch((0, _posts.fetchPosts)(ids));
        }
    };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Category);

/***/ })

}]);
//# sourceMappingURL=21.js.map