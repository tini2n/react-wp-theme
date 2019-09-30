(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[15],{

/***/ "./assets/src/js/app/components/HestemarkedWidget.js":
/*!***********************************************************!*\
  !*** ./assets/src/js/app/components/HestemarkedWidget.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _config = __webpack_require__(/*! utils/config */ "./assets/src/js/app/utils/config.js");

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HestemarkedWidget = function HestemarkedWidget() {
    return _react2.default.createElement(
        'section',
        { className: 'hestemarked-widget' },
        _react2.default.createElement('iframe', { src: _config2.default.widgets.horsemarket })
    );
};

exports.default = HestemarkedWidget;

/***/ }),

/***/ "./assets/src/js/app/components/InstagramFeed.js":
/*!*******************************************************!*\
  !*** ./assets/src/js/app/components/InstagramFeed.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _PostsSlider = __webpack_require__(/*! components/PostsSlider */ "./assets/src/js/app/components/PostsSlider.js");

var _PostsSlider2 = _interopRequireDefault(_PostsSlider);

var _InstagramItem = __webpack_require__(/*! components/InstagramItem */ "./assets/src/js/app/components/InstagramItem.js");

var _InstagramItem2 = _interopRequireDefault(_InstagramItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InstagramFeed = function (_Component) {
    _inherits(InstagramFeed, _Component);

    function InstagramFeed() {
        _classCallCheck(this, InstagramFeed);

        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    InstagramFeed.prototype.render = function render() {
        var feed = this.props.feed;


        var archiveLink = feed.length > 0 ? 'https://www.instagram.com/' + feed[0].user.username : '';

        return _react2.default.createElement(
            'section',
            { className: 'instagram-feed' },
            _react2.default.createElement(
                'div',
                { className: 'wrapper' },
                _react2.default.createElement(_PostsSlider2.default, { posts: feed,
                    count: 5,
                    title: 'instagram',
                    linkText: 'instagram',
                    archiveLink: archiveLink,
                    isOpenBlank: true,
                    PostItem: _InstagramItem2.default })
            )
        );
    };

    return InstagramFeed;
}(_react.Component);

exports.default = InstagramFeed;

/***/ }),

/***/ "./assets/src/js/app/components/InstagramItem.js":
/*!*******************************************************!*\
  !*** ./assets/src/js/app/components/InstagramItem.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _UniversalLink = __webpack_require__(/*! components/UniversalLink */ "./assets/src/js/app/components/UniversalLink.js");

var _UniversalLink2 = _interopRequireDefault(_UniversalLink);

var _playIcon = __webpack_require__(/*! icons/play-icon.svg */ "./assets/build/img/icons/play-icon.svg");

var _playIcon2 = _interopRequireDefault(_playIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InstagramItem = function (_Component) {
    _inherits(InstagramItem, _Component);

    function InstagramItem(props) {
        _classCallCheck(this, InstagramItem);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props));

        _this.instagram = _react2.default.createRef();
        _this.caption = _react2.default.createRef();
        return _this;
    }

    InstagramItem.prototype.componentDidMount = function componentDidMount() {
        if (this.caption.clientHeight > 65) {
            this.instagram.classList.add('is-read-more');
        }
    };

    InstagramItem.prototype.render = function render() {
        var _this2 = this;

        var _props$post = this.props.post,
            caption = _props$post.caption,
            images = _props$post.images,
            type = _props$post.type,
            link = _props$post.link;


        return _react2.default.createElement(
            'article',
            { className: 'instagram-item', ref: function ref(instagram) {
                    return _this2.instagram = instagram;
                } },
            images && _react2.default.createElement(
                _UniversalLink2.default,
                { target: '_blank', to: link, className: 'thumbnail-container' },
                _react2.default.createElement('img', { src: images.low_resolution.url, alt: caption && caption.text }),
                type === 'video' && _react2.default.createElement(_playIcon2.default, { className: 'play-icon' })
            ),
            caption && _react2.default.createElement(
                'div',
                { className: 'text-container' },
                _react2.default.createElement(
                    'p',
                    { ref: function ref(caption) {
                            return _this2.caption = caption;
                        } },
                    caption.text
                )
            ),
            _react2.default.createElement(
                'span',
                { className: 'read-more', onClick: function onClick() {
                        return _this2.instagram.classList.remove('is-read-more');
                    } },
                'les mer'
            )
        );
    };

    return InstagramItem;
}(_react.Component);

exports.default = InstagramItem;

/***/ }),

/***/ "./assets/src/js/app/components/LastTips.js":
/*!**************************************************!*\
  !*** ./assets/src/js/app/components/LastTips.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _PostsSlider = __webpack_require__(/*! components/PostsSlider */ "./assets/src/js/app/components/PostsSlider.js");

var _PostsSlider2 = _interopRequireDefault(_PostsSlider);

var _Tip = __webpack_require__(/*! components/Tip */ "./assets/src/js/app/components/Tip.js");

var _Tip2 = _interopRequireDefault(_Tip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LastTips = function (_Component) {
    _inherits(LastTips, _Component);

    function LastTips() {
        _classCallCheck(this, LastTips);

        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    LastTips.prototype.render = function render() {
        var _props = this.props,
            tips = _props.tips,
            title = _props.title;


        return _react2.default.createElement(
            'section',
            { className: 'last-tips' },
            _react2.default.createElement(
                'div',
                { className: 'wrapper' },
                tips && _react2.default.createElement(_PostsSlider2.default, { posts: tips,
                    title: title,
                    linkText: 'vis mer tips og spill',
                    PostItem: _Tip2.default })
            )
        );
    };

    return LastTips;
}(_react.Component);

exports.default = LastTips;

/***/ }),

/***/ "./assets/src/js/app/components/LastVideos.js":
/*!****************************************************!*\
  !*** ./assets/src/js/app/components/LastVideos.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _PostsSlider = __webpack_require__(/*! components/PostsSlider */ "./assets/src/js/app/components/PostsSlider.js");

var _PostsSlider2 = _interopRequireDefault(_PostsSlider);

var _Video = __webpack_require__(/*! components/Video */ "./assets/src/js/app/components/Video.js");

var _Video2 = _interopRequireDefault(_Video);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LastVideos = function LastVideos(_ref) {
    var videos = _ref.videos,
        title = _ref.title,
        linkToTV = _ref.linkToTV;

    return _react2.default.createElement(
        'section',
        { className: 'last-videos' },
        _react2.default.createElement(
            'div',
            { className: 'wrapper' },
            _react2.default.createElement(_PostsSlider2.default, { posts: videos,
                title: title,
                linkText: 'vis mer fra tgn tv',
                archiveLink: linkToTV,
                PostItem: _Video2.default })
        )
    );
};

exports.default = LastVideos;

/***/ }),

/***/ "./assets/src/js/app/components/PostsSlider.js":
/*!*****************************************************!*\
  !*** ./assets/src/js/app/components/PostsSlider.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _reactSlick = __webpack_require__(/*! react-slick */ "./node_modules/react-slick/lib/index.js");

var _reactSlick2 = _interopRequireDefault(_reactSlick);

var _config = __webpack_require__(/*! utils/config */ "./assets/src/js/app/utils/config.js");

var _config2 = _interopRequireDefault(_config);

var _UniversalLink = __webpack_require__(/*! components/UniversalLink */ "./assets/src/js/app/components/UniversalLink.js");

var _UniversalLink2 = _interopRequireDefault(_UniversalLink);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PostsSlider = function (_Component) {
    _inherits(PostsSlider, _Component);

    function PostsSlider(props) {
        _classCallCheck(this, PostsSlider);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props));

        _this.unCollapseNotes = _this.unCollapseNotes.bind(_this);

        _this.slider = _react2.default.createRef();
        return _this;
    }

    PostsSlider.prototype.unCollapseNotes = function unCollapseNotes() {
        var list = this.slider.innerSlider.list;
        var nodesList = list.querySelectorAll('article');
        var listArray = Array.from(nodesList);

        listArray.map(function (item) {
            if (!item.classList.contains('is-read-more')) {
                item.classList.add('is-read-more');
            }
        });
    };

    PostsSlider.prototype.render = function render() {
        var _this2 = this;

        var _props = this.props,
            posts = _props.posts,
            categories = _props.categories,
            title = _props.title,
            PostItem = _props.PostItem,
            archiveLink = _props.archiveLink,
            isOpenBlank = _props.isOpenBlank,
            linkText = _props.linkText,
            _props$count = _props.count,
            count = _props$count === undefined ? 3 : _props$count;


        var settings = {
            arrows: false,
            infinite: false,
            className: 'slide-item',
            dots: true,
            dotsClass: 'slider-nav',
            useTransform: false,
            slidesToShow: count,
            slidesToScroll: count,
            afterChange: function afterChange() {
                if (archiveLink === _config2.default.routes.notice_archive || title === 'instagram') _this2.unCollapseNotes();
            },
            responsive: [{
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }]
        };

        return _react2.default.createElement(
            'section',
            { className: 'posts-slider' },
            _react2.default.createElement(
                'h2',
                { className: 'section-title' },
                title
            ),
            _react2.default.createElement(
                _reactSlick2.default,
                _extends({}, settings, { ref: function ref(slider) {
                        return _this2.slider = slider;
                    } }),
                posts.map(function (post, i) {
                    return _react2.default.createElement(PostItem, { key: i, post: post, categories: categories });
                })
            ),
            archiveLink && _react2.default.createElement(
                _UniversalLink2.default,
                { to: archiveLink, target: '' + (isOpenBlank ? '_blank' : ''), className: 'button' },
                linkText
            )
        );
    };

    return PostsSlider;
}(_react.Component);

exports.default = PostsSlider;

/***/ }),

/***/ "./assets/src/js/app/components/Tip.js":
/*!*********************************************!*\
  !*** ./assets/src/js/app/components/Tip.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _dateServices = __webpack_require__(/*! services/dateServices */ "./assets/src/js/app/services/dateServices.js");

var _UniversalLink = __webpack_require__(/*! components/UniversalLink */ "./assets/src/js/app/components/UniversalLink.js");

var _UniversalLink2 = _interopRequireDefault(_UniversalLink);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Tip = function (_Component) {
    _inherits(Tip, _Component);

    function Tip() {
        _classCallCheck(this, Tip);

        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    Tip.prototype.render = function render() {
        var post = this.props.post;
        var thumbnails = post.thumbnails,
            meta = post.meta,
            publish_date = post.publish_date,
            title = post.title,
            excerpt = post.excerpt;


        var url = meta.external_link;

        return _react2.default.createElement(
            'article',
            { className: 'tip-item' },
            _react2.default.createElement(
                'div',
                { className: 'thumbnail-container' },
                url ? _react2.default.createElement(
                    _UniversalLink2.default,
                    { to: url, target: '_blank' },
                    _react2.default.createElement('img', { src: thumbnails.url, alt: thumbnails.alt })
                ) : _react2.default.createElement('img', { src: thumbnails.url, alt: thumbnails.alt }),
                meta.label.length ? _react2.default.createElement(
                    'div',
                    { className: 'labels' },
                    meta.label.map(function (label, i) {
                        var labelStyle = {
                            backgroundColor: label.label_color
                        };

                        return _react2.default.createElement(
                            'span',
                            { key: i, style: _extends({}, labelStyle) },
                            label.label_text
                        );
                    })
                ) : ''
            ),
            _react2.default.createElement(
                'div',
                { className: 'text-container' },
                _react2.default.createElement(
                    'time',
                    { dateTime: (0, _dateServices.fromUtcToISO)(publish_date.date) },
                    (0, _dateServices.fromUtcToHuman)(publish_date.date)
                ),
                _react2.default.createElement(
                    'h3',
                    { className: 'title' },
                    url ? _react2.default.createElement(
                        _UniversalLink2.default,
                        { to: url, target: '_blank' },
                        title
                    ) : title
                ),
                _react2.default.createElement(
                    'p',
                    { className: 'excerpt' },
                    excerpt
                )
            )
        );
    };

    return Tip;
}(_react.Component);

exports.default = Tip;

/***/ }),

/***/ "./assets/src/js/app/components/Video.js":
/*!***********************************************!*\
  !*** ./assets/src/js/app/components/Video.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _dateServices = __webpack_require__(/*! services/dateServices */ "./assets/src/js/app/services/dateServices.js");

var _InternalLink = __webpack_require__(/*! components/InternalLink */ "./assets/src/js/app/components/InternalLink.js");

var _InternalLink2 = _interopRequireDefault(_InternalLink);

var _Thumbnail = __webpack_require__(/*! components/Thumbnail */ "./assets/src/js/app/components/Thumbnail.js");

var _Thumbnail2 = _interopRequireDefault(_Thumbnail);

var _playIcon = __webpack_require__(/*! icons/play-icon.svg */ "./assets/build/img/icons/play-icon.svg");

var _playIcon2 = _interopRequireDefault(_playIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Video = function Video(_ref) {
    var post = _ref.post,
        size = _ref.size;
    var publish_date = post.publish_date,
        thumbnails = post.thumbnails,
        link = post.link,
        title = post.title,
        excerpt = post.excerpt;


    return _react2.default.createElement(
        'article',
        { className: 'video-item' },
        _react2.default.createElement(
            'div',
            { className: 'container' },
            _react2.default.createElement(
                _InternalLink2.default,
                { className: 'thumbnail-container', to: link },
                _react2.default.createElement(_Thumbnail2.default, { size: size, thumbnails: thumbnails }),
                _react2.default.createElement(_playIcon2.default, null)
            ),
            _react2.default.createElement(
                'div',
                { className: 'text-container' },
                _react2.default.createElement(
                    'time',
                    { dateTime: (0, _dateServices.toISO)(publish_date) },
                    (0, _dateServices.toHumanFullDate)(publish_date)
                ),
                _react2.default.createElement(
                    _InternalLink2.default,
                    { to: link },
                    _react2.default.createElement(
                        'h3',
                        { className: 'title' },
                        title
                    ),
                    excerpt && _react2.default.createElement(
                        'p',
                        { className: 'excerpt' },
                        excerpt
                    )
                )
            )
        )
    );
};

exports.default = Video;

/***/ }),

/***/ "./assets/src/js/app/components/post-listing/PostWithList.js":
/*!*******************************************************************!*\
  !*** ./assets/src/js/app/components/post-listing/PostWithList.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _Post = __webpack_require__(/*! components/Post */ "./assets/src/js/app/components/Post.js");

var _Post2 = _interopRequireDefault(_Post);

var _PostsList = __webpack_require__(/*! components/post-listing/PostsList */ "./assets/src/js/app/components/post-listing/PostsList.js");

var _PostsList2 = _interopRequireDefault(_PostsList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PostWithList = function PostWithList(_ref) {
    var posts = _ref.posts,
        categories = _ref.categories;
    return _react2.default.createElement(
        'section',
        { className: 'post-with-list' },
        _react2.default.createElement(
            'div',
            { className: 'grid-container' },
            posts[0] && _react2.default.createElement(_Post2.default, { post: posts[0], categories: categories, size: 'm' }),
            _react2.default.createElement(_PostsList2.default, { posts: posts.filter(function (post, i) {
                    return i > 0 && post;
                }), categories: categories })
        )
    );
};

exports.default = PostWithList;

/***/ }),

/***/ "./assets/src/js/app/components/post-listing/PostsWithWidget.js":
/*!**********************************************************************!*\
  !*** ./assets/src/js/app/components/post-listing/PostsWithWidget.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _UniversalLink = __webpack_require__(/*! components/UniversalLink */ "./assets/src/js/app/components/UniversalLink.js");

var _UniversalLink2 = _interopRequireDefault(_UniversalLink);

var _Post = __webpack_require__(/*! components/Post */ "./assets/src/js/app/components/Post.js");

var _Post2 = _interopRequireDefault(_Post);

var _config = __webpack_require__(/*! utils/config */ "./assets/src/js/app/utils/config.js");

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PostsWithWidget = function PostsWithWidget(_ref) {
    var posts = _ref.posts,
        title = _ref.title,
        categories = _ref.categories,
        btnLink = _ref.btnLink,
        btnTitle = _ref.btnTitle;
    return _react2.default.createElement(
        'section',
        { className: 'posts-with-widget' },
        _react2.default.createElement(
            'div',
            { className: 'grid-container' },
            _react2.default.createElement(
                'div',
                { className: 'grid-3-6' },
                posts.map(function (post, i) {
                    return _react2.default.createElement(_Post2.default, { key: i, post: posts[i], categories: categories, size: 'm' });
                })
            ),
            _react2.default.createElement(
                'div',
                { className: 'grid-3-6' },
                _react2.default.createElement(
                    'h2',
                    { className: 'section-title' },
                    title
                ),
                _react2.default.createElement('iframe', { frameBorder: '0', src: _config2.default.widgets.superlocal }),
                _react2.default.createElement(
                    _UniversalLink2.default,
                    { to: btnLink, target: '_blank', className: 'button' },
                    btnTitle
                )
            )
        )
    );
};

exports.default = PostsWithWidget;

/***/ }),

/***/ "./assets/src/js/app/containers/templates/FrontPage.js":
/*!*************************************************************!*\
  !*** ./assets/src/js/app/containers/templates/FrontPage.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");

var _reactRouterDom = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");

var _queryString = __webpack_require__(/*! query-string */ "./node_modules/query-string/index.js");

var _queryString2 = _interopRequireDefault(_queryString);

var _main = __webpack_require__(/*! storage/actions/main */ "./assets/src/js/app/storage/actions/main.js");

var _posts = __webpack_require__(/*! storage/actions/posts */ "./assets/src/js/app/storage/actions/posts.js");

var _postsServices = __webpack_require__(/*! services/postsServices */ "./assets/src/js/app/services/postsServices.js");

var _config = __webpack_require__(/*! utils/config */ "./assets/src/js/app/utils/config.js");

var _config2 = _interopRequireDefault(_config);

var _Page = __webpack_require__(/*! containers/templates/Page */ "./assets/src/js/app/containers/templates/Page.js");

var _Page2 = _interopRequireDefault(_Page);

var _PostListingWide = __webpack_require__(/*! components/post-listing/PostListingWide */ "./assets/src/js/app/components/post-listing/PostListingWide.js");

var _PostListingWide2 = _interopRequireDefault(_PostListingWide);

var _PostListing = __webpack_require__(/*! components/post-listing/PostListing */ "./assets/src/js/app/components/post-listing/PostListing.js");

var _PostListing2 = _interopRequireDefault(_PostListing);

var _PostWithList = __webpack_require__(/*! components/post-listing/PostWithList */ "./assets/src/js/app/components/post-listing/PostWithList.js");

var _PostWithList2 = _interopRequireDefault(_PostWithList);

var _PostsWithWidget = __webpack_require__(/*! components/post-listing/PostsWithWidget */ "./assets/src/js/app/components/post-listing/PostsWithWidget.js");

var _PostsWithWidget2 = _interopRequireDefault(_PostsWithWidget);

var _HestemarkedWidget = __webpack_require__(/*! components/HestemarkedWidget.js */ "./assets/src/js/app/components/HestemarkedWidget.js");

var _HestemarkedWidget2 = _interopRequireDefault(_HestemarkedWidget);

var _PostsSlider = __webpack_require__(/*! components/PostsSlider */ "./assets/src/js/app/components/PostsSlider.js");

var _PostsSlider2 = _interopRequireDefault(_PostsSlider);

var _LastVideos = __webpack_require__(/*! components/LastVideos */ "./assets/src/js/app/components/LastVideos.js");

var _LastVideos2 = _interopRequireDefault(_LastVideos);

var _LastTips = __webpack_require__(/*! components/LastTips */ "./assets/src/js/app/components/LastTips.js");

var _LastTips2 = _interopRequireDefault(_LastTips);

var _InstagramFeed = __webpack_require__(/*! components/InstagramFeed */ "./assets/src/js/app/components/InstagramFeed.js");

var _InstagramFeed2 = _interopRequireDefault(_InstagramFeed);

var _Ads = __webpack_require__(/*! components/Ads */ "./assets/src/js/app/components/Ads.js");

var _Ads2 = _interopRequireDefault(_Ads);

var _Note = __webpack_require__(/*! components/Note */ "./assets/src/js/app/components/Note.js");

var _Note2 = _interopRequireDefault(_Note);

var _LoadMore = __webpack_require__(/*! components/LoadMore */ "./assets/src/js/app/components/LoadMore.js");

var _LoadMore2 = _interopRequireDefault(_LoadMore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Search = (0, _react.lazy)(function () {
    return Promise.all(/*! import() */[__webpack_require__.e(1), __webpack_require__.e(13), __webpack_require__.e(20)]).then(__webpack_require__.t.bind(null, /*! containers/templates/Search */ "./assets/src/js/app/containers/templates/Search.js", 7));
});
var SinglePost = (0, _react.lazy)(function () {
    return Promise.all(/*! import() */[__webpack_require__.e(4), __webpack_require__.e(1), __webpack_require__.e(7), __webpack_require__.e(3), __webpack_require__.e(9)]).then(__webpack_require__.t.bind(null, /*! containers/templates/SinglePost */ "./assets/src/js/app/containers/templates/SinglePost.js", 7));
});

var FrontPage = function (_Component) {
    _inherits(FrontPage, _Component);

    function FrontPage() {
        _classCallCheck(this, FrontPage);

        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    FrontPage.prototype.render = function render() {
        var _props = this.props,
            posts_by_ids = _props.posts_by_ids,
            categories_by_ids = _props.categories_by_ids,
            main = _props.main,
            location = _props.location;
        var _props2 = this.props,
            fetchArticlesIds = _props2.fetchArticlesIds,
            fetchPosts = _props2.fetchPosts;
        var _main$articles = main.articles,
            articles = _main$articles === undefined ? [] : _main$articles,
            _main$notes = main.notes,
            notes = _main$notes === undefined ? [] : _main$notes,
            _main$tvs = main.tvs,
            tvs = _main$tvs === undefined ? [] : _main$tvs,
            _main$tips = main.tips,
            tips = _main$tips === undefined ? [] : _main$tips,
            _main$instagram_feed = main.instagram_feed,
            instagram_feed = _main$instagram_feed === undefined ? [] : _main$instagram_feed,
            _main$ads = main.ads,
            ads = _main$ads === undefined ? [] : _main$ads;


        if ('s' in _queryString2.default.parse(location.search)) {
            return _react2.default.createElement(Search, null);
        }

        if (_queryString2.default.parse(location.search).post_type === 'article' || _queryString2.default.parse(location.search).post_type === 'tv') {
            return _react2.default.createElement(SinglePost, null);
        }

        if (_queryString2.default.parse(location.search).page_id) {
            return _react2.default.createElement(_Page2.default, null);
        }

        var posts = posts_by_ids;
        var postsIds = Object.keys(posts);
        var categories = categories_by_ids;

        var loadMoreProps = {
            fetchIdsHandler: fetchArticlesIds,
            fetchPostsHandler: fetchPosts,
            offset: 26,
            postsIds: postsIds
        };

        var articlesPosts = (0, _postsServices.formPostsArray)(posts, articles);
        var tvsPosts = (0, _postsServices.formPostsArray)(posts, tvs);
        var notesPosts = (0, _postsServices.formPostsArray)(posts, notes);

        return _react2.default.createElement(
            'section',
            { className: 'front-page' },
            _react2.default.createElement(
                'div',
                { className: 'wrapper' },
                _react2.default.createElement(_Ads2.default, { ad: ads[0], size: 'wide' }),
                (0, _postsServices.checkPostsIdsLength)(articles, 0, 3) && _react2.default.createElement(_PostListingWide2.default, { posts: articlesPosts.slice(0, 3),
                    categories: categories }),
                (0, _postsServices.checkPostsIdsLength)(notes, 0, 9) && _react2.default.createElement(_PostsSlider2.default, { posts: notesPosts.slice(0, 9),
                    categories: categories,
                    PostItem: _Note2.default,
                    archiveLink: _config2.default.routes.notice_archive,
                    linkText: 'Vis alle',
                    title: 'Sm\xE5nytt' }),
                (0, _postsServices.checkPostsIdsLength)(articles, 3, 6) && _react2.default.createElement(_PostListing2.default, { posts: articlesPosts.slice(3, 6),
                    categories: categories,
                    size: 's' }),
                (0, _postsServices.checkPostsIdsLength)(articles, 6, 8) && _react2.default.createElement(_PostsWithWidget2.default, { posts: articlesPosts.slice(6, 8),
                    categories: categories,
                    btnLink: 'https://www.facebook.com/travoggaloppnytt/',
                    btnTitle: 'Trav og Galopp-nytt p\xE5 Facebook',
                    title: 'Travsporten i sosiale medier' }),
                (0, _postsServices.checkPostsIdsLength)(articles, 8, 12) && _react2.default.createElement(_PostWithList2.default, { posts: articlesPosts.slice(8, 12),
                    categories: categories }),
                _react2.default.createElement(_HestemarkedWidget2.default, null),
                (0, _postsServices.checkPostsIdsLength)(articles, 12, 14) && _react2.default.createElement(_PostListing2.default, { posts: articlesPosts.slice(12, 14),
                    categories: categories,
                    size: 'm' }),
                !!tips.length && _react2.default.createElement(_LastTips2.default, { tips: tips,
                    title: 'SISTE FRA tips og spill' }),
                (0, _postsServices.checkPostsIdsLength)(articles, 14, 17) && _react2.default.createElement(_PostListing2.default, { posts: articlesPosts.slice(14, 17),
                    categories: categories,
                    size: 's' }),
                _react2.default.createElement(_Ads2.default, { ad: ads[1], size: 'wide' }),
                (0, _postsServices.checkPostsIdsLength)(articles, 17, 20) && _react2.default.createElement(_PostListingWide2.default, { posts: articlesPosts.slice(17, 20),
                    categories: categories }),
                (0, _postsServices.checkPostsIdsLength)(tvs, 0, 9) && _react2.default.createElement(_LastVideos2.default, { videos: tvsPosts.slice(0, 9),
                    linkToTV: _config2.default.routes.tv_archive,
                    title: 'Siste fra TGN TV' }),
                (0, _postsServices.checkPostsIdsLength)(articles, 20, 22) && _react2.default.createElement(_PostListing2.default, { posts: articlesPosts.slice(20, 22),
                    categories: categories,
                    size: 'm' }),
                _react2.default.createElement(_Ads2.default, { ad: ads[2], size: 'wide' }),
                (0, _postsServices.checkPostsIdsLength)(articles, 22) && _react2.default.createElement(_PostListing2.default, { posts: articlesPosts.slice(22),
                    categories: categories,
                    size: 's' }),
                _react2.default.createElement(_LoadMore2.default, loadMoreProps),
                !!instagram_feed.length && _react2.default.createElement(_InstagramFeed2.default, { feed: instagram_feed })
            )
        );
    };

    return FrontPage;
}(_react.Component);

var mapStateToProps = function mapStateToProps(_ref) {
    var posts_by_ids = _ref.posts_by_ids,
        categories_by_ids = _ref.categories_by_ids,
        main = _ref.main,
        header = _ref.header;
    return {
        posts_by_ids: posts_by_ids,
        categories_by_ids: categories_by_ids,
        main: main,
        header: header
    };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
        fetchArticlesIds: function fetchArticlesIds(offset) {
            return dispatch((0, _main.fetchArticlesIds)(offset));
        },
        fetchPosts: function fetchPosts(ids) {
            return dispatch((0, _posts.fetchPosts)(ids));
        }
    };
};

exports.default = (0, _reactRouterDom.withRouter)((0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(FrontPage));

/***/ }),

/***/ "./assets/src/js/app/services/dateServices.js":
/*!****************************************************!*\
  !*** ./assets/src/js/app/services/dateServices.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.fromUtcToISO = exports.fromUtcToHuman = exports.toISO = exports.toHumanTime = exports.toHumanShortDate = exports.toHumanFullDate = undefined;

var _moment = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var toHumanFullDate = exports.toHumanFullDate = function toHumanFullDate(timestamp) {
  return (0, _moment2.default)(timestamp * 1000).utcOffset('+0000').format('dddd, D MMMM YYYY');
};
var toHumanShortDate = exports.toHumanShortDate = function toHumanShortDate(timestamp) {
  return (0, _moment2.default)(timestamp * 1000).utcOffset('+0000').format('DD.MM.YY – HH:mm');
};
var toHumanTime = exports.toHumanTime = function toHumanTime(timestamp) {
  return (0, _moment2.default)(timestamp * 1000).utcOffset('+0000').format('HH:mm');
};
var toISO = exports.toISO = function toISO(timestamp) {
  return (0, _moment2.default)(timestamp * 1000).utcOffset('+0000').format();
};
var fromUtcToHuman = exports.fromUtcToHuman = function fromUtcToHuman(timestamp) {
  return _moment2.default.utc(timestamp).utcOffset('+0000').format('dddd, D MMMM YYYY');
};
var fromUtcToISO = exports.fromUtcToISO = function fromUtcToISO(timestamp) {
  return _moment2.default.utc(timestamp).utcOffset('+0000').format();
};

/***/ }),

/***/ "./node_modules/decode-uri-component/index.js":
/*!****************************************************!*\
  !*** ./node_modules/decode-uri-component/index.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var token = '%[a-f0-9]{2}';
var singleMatcher = new RegExp(token, 'gi');
var multiMatcher = new RegExp('(' + token + ')+', 'gi');

function decodeComponents(components, split) {
	try {
		// Try to decode the entire string first
		return decodeURIComponent(components.join(''));
	} catch (err) {
		// Do nothing
	}

	if (components.length === 1) {
		return components;
	}

	split = split || 1;

	// Split the array in 2 parts
	var left = components.slice(0, split);
	var right = components.slice(split);

	return Array.prototype.concat.call([], decodeComponents(left), decodeComponents(right));
}

function decode(input) {
	try {
		return decodeURIComponent(input);
	} catch (err) {
		var tokens = input.match(singleMatcher);

		for (var i = 1; i < tokens.length; i++) {
			input = decodeComponents(tokens, i).join('');

			tokens = input.match(singleMatcher);
		}

		return input;
	}
}

function customDecodeURIComponent(input) {
	// Keep track of all the replacements and prefill the map with the `BOM`
	var replaceMap = {
		'%FE%FF': '\uFFFD\uFFFD',
		'%FF%FE': '\uFFFD\uFFFD'
	};

	var match = multiMatcher.exec(input);
	while (match) {
		try {
			// Decode as big chunks as possible
			replaceMap[match[0]] = decodeURIComponent(match[0]);
		} catch (err) {
			var result = decode(match[0]);

			if (result !== match[0]) {
				replaceMap[match[0]] = result;
			}
		}

		match = multiMatcher.exec(input);
	}

	// Add `%C2` at the end of the map to make sure it does not replace the combinator before everything else
	replaceMap['%C2'] = '\uFFFD';

	var entries = Object.keys(replaceMap);

	for (var i = 0; i < entries.length; i++) {
		// Replace all decoded components
		var key = entries[i];
		input = input.replace(new RegExp(key, 'g'), replaceMap[key]);
	}

	return input;
}

module.exports = function (encodedURI) {
	if (typeof encodedURI !== 'string') {
		throw new TypeError('Expected `encodedURI` to be of type `string`, got `' + typeof encodedURI + '`');
	}

	try {
		encodedURI = encodedURI.replace(/\+/g, ' ');

		// Try the built in decoder first
		return decodeURIComponent(encodedURI);
	} catch (err) {
		// Fallback to a more advanced decoder
		return customDecodeURIComponent(encodedURI);
	}
};


/***/ }),

/***/ "./node_modules/query-string/index.js":
/*!********************************************!*\
  !*** ./node_modules/query-string/index.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strictUriEncode = __webpack_require__(/*! strict-uri-encode */ "./node_modules/strict-uri-encode/index.js");
var objectAssign = __webpack_require__(/*! object-assign */ "./node_modules/object-assign/index.js");
var decodeComponent = __webpack_require__(/*! decode-uri-component */ "./node_modules/decode-uri-component/index.js");

function encoderForArrayFormat(opts) {
	switch (opts.arrayFormat) {
		case 'index':
			return function (key, value, index) {
				return value === null ? [
					encode(key, opts),
					'[',
					index,
					']'
				].join('') : [
					encode(key, opts),
					'[',
					encode(index, opts),
					']=',
					encode(value, opts)
				].join('');
			};

		case 'bracket':
			return function (key, value) {
				return value === null ? encode(key, opts) : [
					encode(key, opts),
					'[]=',
					encode(value, opts)
				].join('');
			};

		default:
			return function (key, value) {
				return value === null ? encode(key, opts) : [
					encode(key, opts),
					'=',
					encode(value, opts)
				].join('');
			};
	}
}

function parserForArrayFormat(opts) {
	var result;

	switch (opts.arrayFormat) {
		case 'index':
			return function (key, value, accumulator) {
				result = /\[(\d*)\]$/.exec(key);

				key = key.replace(/\[\d*\]$/, '');

				if (!result) {
					accumulator[key] = value;
					return;
				}

				if (accumulator[key] === undefined) {
					accumulator[key] = {};
				}

				accumulator[key][result[1]] = value;
			};

		case 'bracket':
			return function (key, value, accumulator) {
				result = /(\[\])$/.exec(key);
				key = key.replace(/\[\]$/, '');

				if (!result) {
					accumulator[key] = value;
					return;
				} else if (accumulator[key] === undefined) {
					accumulator[key] = [value];
					return;
				}

				accumulator[key] = [].concat(accumulator[key], value);
			};

		default:
			return function (key, value, accumulator) {
				if (accumulator[key] === undefined) {
					accumulator[key] = value;
					return;
				}

				accumulator[key] = [].concat(accumulator[key], value);
			};
	}
}

function encode(value, opts) {
	if (opts.encode) {
		return opts.strict ? strictUriEncode(value) : encodeURIComponent(value);
	}

	return value;
}

function keysSorter(input) {
	if (Array.isArray(input)) {
		return input.sort();
	} else if (typeof input === 'object') {
		return keysSorter(Object.keys(input)).sort(function (a, b) {
			return Number(a) - Number(b);
		}).map(function (key) {
			return input[key];
		});
	}

	return input;
}

function extract(str) {
	var queryStart = str.indexOf('?');
	if (queryStart === -1) {
		return '';
	}
	return str.slice(queryStart + 1);
}

function parse(str, opts) {
	opts = objectAssign({arrayFormat: 'none'}, opts);

	var formatter = parserForArrayFormat(opts);

	// Create an object with no prototype
	// https://github.com/sindresorhus/query-string/issues/47
	var ret = Object.create(null);

	if (typeof str !== 'string') {
		return ret;
	}

	str = str.trim().replace(/^[?#&]/, '');

	if (!str) {
		return ret;
	}

	str.split('&').forEach(function (param) {
		var parts = param.replace(/\+/g, ' ').split('=');
		// Firefox (pre 40) decodes `%3D` to `=`
		// https://github.com/sindresorhus/query-string/pull/37
		var key = parts.shift();
		var val = parts.length > 0 ? parts.join('=') : undefined;

		// missing `=` should be `null`:
		// http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
		val = val === undefined ? null : decodeComponent(val);

		formatter(decodeComponent(key), val, ret);
	});

	return Object.keys(ret).sort().reduce(function (result, key) {
		var val = ret[key];
		if (Boolean(val) && typeof val === 'object' && !Array.isArray(val)) {
			// Sort object keys, not values
			result[key] = keysSorter(val);
		} else {
			result[key] = val;
		}

		return result;
	}, Object.create(null));
}

exports.extract = extract;
exports.parse = parse;

exports.stringify = function (obj, opts) {
	var defaults = {
		encode: true,
		strict: true,
		arrayFormat: 'none'
	};

	opts = objectAssign(defaults, opts);

	if (opts.sort === false) {
		opts.sort = function () {};
	}

	var formatter = encoderForArrayFormat(opts);

	return obj ? Object.keys(obj).sort(opts.sort).map(function (key) {
		var val = obj[key];

		if (val === undefined) {
			return '';
		}

		if (val === null) {
			return encode(key, opts);
		}

		if (Array.isArray(val)) {
			var result = [];

			val.slice().forEach(function (val2) {
				if (val2 === undefined) {
					return;
				}

				result.push(formatter(key, val2, result.length));
			});

			return result.join('&');
		}

		return encode(key, opts) + '=' + encode(val, opts);
	}).filter(function (x) {
		return x.length > 0;
	}).join('&') : '';
};

exports.parseUrl = function (str, opts) {
	return {
		url: str.split('?')[0] || '',
		query: parse(extract(str), opts)
	};
};


/***/ }),

/***/ "./node_modules/strict-uri-encode/index.js":
/*!*************************************************!*\
  !*** ./node_modules/strict-uri-encode/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = function (str) {
	return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
		return '%' + c.charCodeAt(0).toString(16).toUpperCase();
	});
};


/***/ })

}]);
//# sourceMappingURL=15.js.map