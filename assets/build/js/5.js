(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[5],{

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

/***/ "./assets/src/js/app/components/Note.js":
/*!**********************************************!*\
  !*** ./assets/src/js/app/components/Note.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Note = function (_Component) {
    _inherits(Note, _Component);

    function Note(props) {
        _classCallCheck(this, Note);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props));

        _this.lead = _react2.default.createRef();
        _this.note = _react2.default.createRef();
        return _this;
    }

    Note.prototype.componentDidMount = function componentDidMount() {
        var isArchive = this.props.isArchive;


        if (this.lead.clientHeight > 100 && !isArchive) {
            this.note.classList.add('is-read-more');
        }
    };

    Note.prototype.render = function render() {
        var _this2 = this;

        var _props = this.props,
            post = _props.post,
            categories = _props.categories,
            isArchive = _props.isArchive;
        var title = post.title,
            excerpt = post.excerpt,
            main_category_id = post.main_category_id;


        var category = main_category_id && categories[main_category_id].title;

        return _react2.default.createElement(
            'article',
            { className: 'note-item', ref: function ref(note) {
                    return _this2.note = note;
                } },
            _react2.default.createElement(
                'div',
                { className: 'text-container' },
                category && _react2.default.createElement(
                    'h5',
                    { className: 'category-label' },
                    category
                ),
                title && _react2.default.createElement(
                    'h3',
                    { className: 'title' },
                    title
                ),
                excerpt && _react2.default.createElement(
                    'p',
                    { className: 'lead', ref: function ref(lead) {
                            return _this2.lead = lead;
                        } },
                    excerpt
                )
            ),
            !isArchive && _react2.default.createElement(
                'span',
                { className: 'read-more', onClick: function onClick() {
                        return _this2.note.classList.remove('is-read-more');
                    } },
                'les mer'
            )
        );
    };

    return Note;
}(_react.Component);

exports.default = Note;

/***/ }),

/***/ "./assets/src/js/app/components/NotesList.js":
/*!***************************************************!*\
  !*** ./assets/src/js/app/components/NotesList.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _Note = __webpack_require__(/*! components/Note */ "./assets/src/js/app/components/Note.js");

var _Note2 = _interopRequireDefault(_Note);

var _LoadMore = __webpack_require__(/*! components/LoadMore */ "./assets/src/js/app/components/LoadMore.js");

var _LoadMore2 = _interopRequireDefault(_LoadMore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NotesList = function (_Component) {
    _inherits(NotesList, _Component);

    function NotesList(props) {
        _classCallCheck(this, NotesList);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props));

        _this.list = _react2.default.createRef();
        return _this;
    }

    NotesList.prototype.render = function render() {
        var _this2 = this;

        var _props = this.props,
            notes = _props.notes,
            categories = _props.categories,
            isArchive = _props.isArchive,
            loadMoreProps = _props.loadMoreProps;


        return _react2.default.createElement(
            'div',
            { className: 'notes-list' },
            _react2.default.createElement(
                'h2',
                { className: 'section-title' },
                'Sm\xE5nytt'
            ),
            _react2.default.createElement(
                'div',
                { className: 'list', ref: function ref(list) {
                        return _this2.list = list;
                    } },
                notes.map(function (note, i) {
                    return _react2.default.createElement(_Note2.default, { key: i, post: note, categories: categories, isArchive: isArchive });
                })
            ),
            isArchive && _react2.default.createElement(_LoadMore2.default, loadMoreProps)
        );
    };

    return NotesList;
}(_react.Component);

exports.default = NotesList;

/***/ }),

/***/ "./assets/src/js/app/containers/templates/DailyNotes.js":
/*!**************************************************************!*\
  !*** ./assets/src/js/app/containers/templates/DailyNotes.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");

var _config = __webpack_require__(/*! utils/config */ "./assets/src/js/app/utils/config.js");

var _config2 = _interopRequireDefault(_config);

var _main = __webpack_require__(/*! storage/actions/main */ "./assets/src/js/app/storage/actions/main.js");

var _posts = __webpack_require__(/*! storage/actions/posts */ "./assets/src/js/app/storage/actions/posts.js");

var _postsServices = __webpack_require__(/*! services/postsServices */ "./assets/src/js/app/services/postsServices.js");

var _Ads = __webpack_require__(/*! components/Ads */ "./assets/src/js/app/components/Ads.js");

var _Ads2 = _interopRequireDefault(_Ads);

var _NotesList = __webpack_require__(/*! components/NotesList */ "./assets/src/js/app/components/NotesList.js");

var _NotesList2 = _interopRequireDefault(_NotesList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DailyNotes = function (_Component) {
    _inherits(DailyNotes, _Component);

    function DailyNotes(props) {
        _classCallCheck(this, DailyNotes);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props));

        _this.notesList = _react2.default.createRef();

        _this.scrollHandler = _this.scrollHandler.bind(_this);
        return _this;
    }

    DailyNotes.prototype.scrollHandler = function scrollHandler() {
        var listDom = this.notesList.list;

        listDom.scrollTop = listDom.scrollHeight;
    };

    DailyNotes.prototype.render = function render() {
        var _this2 = this;

        var _props = this.props,
            posts_by_ids = _props.posts_by_ids,
            categories_by_ids = _props.categories_by_ids,
            main = _props.main;
        var _props2 = this.props,
            fetchPostsIdsByCat = _props2.fetchPostsIdsByCat,
            fetchPosts = _props2.fetchPosts;
        var _main$notes = main.notes,
            notes = _main$notes === undefined ? [] : _main$notes,
            _main$ads = main.ads,
            ads = _main$ads === undefined ? [] : _main$ads;


        var posts = posts_by_ids;
        var postsIds = Object.keys(posts);
        var categories = categories_by_ids;

        var loadMoreProps = {
            fetchIdsHandler: fetchPostsIdsByCat,
            fetchPostsHandler: fetchPosts,
            scrollHandler: this.scrollHandler,
            offset: 9,
            amount: 9,
            isCategory: true,
            postsType: 'note',
            slug: '',
            postsIds: postsIds
        };

        return _react2.default.createElement(
            'section',
            { className: 'daily-notes' },
            _react2.default.createElement(
                'div',
                { className: 'wrapper' },
                _react2.default.createElement(_Ads2.default, { ad: ads[0] }),
                _react2.default.createElement(
                    'div',
                    { className: 'grid-container' },
                    _react2.default.createElement(
                        'div',
                        { className: 'grid-3-6 notes' },
                        _react2.default.createElement(_NotesList2.default, { notes: (0, _postsServices.formPostsArray)(posts, notes),
                            ref: function ref(list) {
                                return _this2.notesList = list;
                            },
                            categories: categories,
                            loadMoreProps: loadMoreProps,
                            isArchive: true })
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'grid-3-6 widget' },
                        _react2.default.createElement(
                            'h2',
                            { className: 'section-title' },
                            'Travsporten i sosiale medier'
                        ),
                        _react2.default.createElement('iframe', { frameBorder: '0', src: _config2.default.widgets.superlocal })
                    )
                ),
                _react2.default.createElement(_Ads2.default, { ad: ads[1] })
            )
        );
    };

    return DailyNotes;
}(_react.Component);

var mapStateToProps = function mapStateToProps(_ref) {
    var posts_by_ids = _ref.posts_by_ids,
        categories_by_ids = _ref.categories_by_ids,
        main = _ref.main;
    return {
        posts_by_ids: posts_by_ids,
        categories_by_ids: categories_by_ids,
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

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(DailyNotes);

/***/ })

}]);
//# sourceMappingURL=5.js.map