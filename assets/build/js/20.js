(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[20],{

/***/ "./assets/src/js/app/components/CategoryFilter.js":
/*!********************************************************!*\
  !*** ./assets/src/js/app/components/CategoryFilter.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _queryString = __webpack_require__(/*! query-string */ "./node_modules/query-string/index.js");

var _queryString2 = _interopRequireDefault(_queryString);

var _remove2 = __webpack_require__(/*! lodash/remove */ "./node_modules/lodash/remove.js");

var _remove3 = _interopRequireDefault(_remove2);

var _CheckboxItem = __webpack_require__(/*! components/CheckboxItem */ "./assets/src/js/app/components/CheckboxItem.js");

var _CheckboxItem2 = _interopRequireDefault(_CheckboxItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CategoryFilter = function (_Component) {
    _inherits(CategoryFilter, _Component);

    function CategoryFilter(props) {
        _classCallCheck(this, CategoryFilter);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props));

        _this.filterHandler = _this.filterHandler.bind(_this);

        _this.state = {
            query: _queryString2.default.parse(location.search)
        };
        return _this;
    }

    CategoryFilter.prototype.filterHandler = function filterHandler(event) {
        var history = this.props.history;


        var query = _queryString2.default.parse(location.search);
        var checked = event.target.checked;

        var queryCats = query.cat_name ? query.cat_name.split(',') : [];

        if (event.target.name === 'tv') {
            query.post_type = checked ? event.target.name : '';
        } else {
            if (checked) {
                queryCats.push(event.target.name);
            } else {
                (0, _remove3.default)(queryCats, function (el) {
                    return el === event.target.name;
                });
            }

            query.cat_name = queryCats.join(',');
        }

        if (!query.cat_name) delete query.cat_name;

        if (!query.post_type) delete query.post_type;

        history.push('?' + _queryString2.default.stringify(query));
    };

    CategoryFilter.prototype.render = function render() {
        var _this2 = this;

        var _props$categories = this.props.categories,
            categories = _props$categories === undefined ? [] : _props$categories;

        var _queryString$parse = _queryString2.default.parse(location.search),
            _queryString$parse$ca = _queryString$parse.cat_name,
            cat_name = _queryString$parse$ca === undefined ? '' : _queryString$parse$ca,
            _queryString$parse$po = _queryString$parse.post_type,
            post_type = _queryString$parse$po === undefined ? '' : _queryString$parse$po;

        var catIDs = Object.keys(categories);
        var queryCats = cat_name.split(',');

        return _react2.default.createElement(
            'div',
            { className: 'category-filter' },
            _react2.default.createElement(
                'span',
                { className: 'title' },
                'Filter p\xE5 kategori'
            ),
            catIDs.map(function (id) {
                var checked = queryCats.includes(categories[id].slug);

                return _react2.default.createElement(_CheckboxItem2.default, { key: id, checked: checked, handler: _this2.filterHandler, item: categories[id] });
            }),
            _react2.default.createElement(_CheckboxItem2.default, { checked: post_type === 'tv', handler: this.filterHandler, item: { title: 'tgn tv', name: 'tv' } })
        );
    };

    return CategoryFilter;
}(_react.Component);

exports.default = CategoryFilter;

/***/ }),

/***/ "./assets/src/js/app/components/DateFilter.js":
/*!****************************************************!*\
  !*** ./assets/src/js/app/components/DateFilter.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _reactDatepicker = __webpack_require__(/*! react-datepicker */ "./node_modules/react-datepicker/es/index.js");

var _reactDatepicker2 = _interopRequireDefault(_reactDatepicker);

var _nb = __webpack_require__(/*! date-fns/locale/nb */ "./node_modules/date-fns/locale/nb/index.js");

var _nb2 = _interopRequireDefault(_nb);

var _moment = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");

var _moment2 = _interopRequireDefault(_moment);

var _queryString = __webpack_require__(/*! query-string */ "./node_modules/query-string/index.js");

var _queryString2 = _interopRequireDefault(_queryString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

(0, _reactDatepicker.registerLocale)('nb', _nb2.default);
(0, _reactDatepicker.setDefaultLocale)('nb');

var DateFilter = function (_Component) {
    _inherits(DateFilter, _Component);

    function DateFilter(props) {
        _classCallCheck(this, DateFilter);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props));

        _this.handleChangeStart = _this.handleChangeStart.bind(_this);
        _this.handleChangeEnd = _this.handleChangeEnd.bind(_this);
        _this.handleFilter = _this.handleFilter.bind(_this);
        _this.handleClear = _this.handleClear.bind(_this);

        var after = _queryString2.default.parse(location.search).after;
        var before = _queryString2.default.parse(location.search).before;

        var startDate = after ? new Date(after) : new Date();
        var endDate = before ? new Date(before) : new Date();

        _this.state = {
            startDate: startDate,
            endDate: endDate,
            query: _queryString2.default.parse(location.search)
        };
        return _this;
    }

    DateFilter.prototype.handleChangeStart = function handleChangeStart(date) {
        var endDate = this.state.endDate;


        if (date > endDate) {
            this.setState({
                startDate: date,
                endDate: date
            });
        } else {
            this.setState({ startDate: date });
        }
    };

    DateFilter.prototype.handleChangeEnd = function handleChangeEnd(date) {
        var startDate = this.state.startDate;


        if (date < startDate) {
            this.setState({
                startDate: date,
                endDate: date
            });
        } else {
            this.setState({ endDate: date });
        }
    };

    DateFilter.prototype.handleFilter = function handleFilter() {
        var _state = this.state,
            startDate = _state.startDate,
            endDate = _state.endDate;
        var history = this.props.history;


        var newQuery = _queryString2.default.parse(location.search);

        newQuery.before = (0, _moment2.default)(endDate).format('YYYY-MM-DD');
        newQuery.after = (0, _moment2.default)(startDate).format('YYYY-MM-DD');

        history.push('?' + _queryString2.default.stringify(newQuery));
    };

    DateFilter.prototype.handleClear = function handleClear() {
        var query = this.state.query;
        var history = this.props.history;


        this.setState({
            startDate: new Date(),
            endDate: new Date()
        });

        var newQuery = query;

        delete newQuery.after;
        delete newQuery.before;
        delete newQuery.cat_name;
        delete newQuery.post_type;

        history.push('?' + _queryString2.default.stringify(newQuery));
    };

    DateFilter.prototype.render = function render() {
        var _state2 = this.state,
            startDate = _state2.startDate,
            endDate = _state2.endDate;


        return _react2.default.createElement(
            'div',
            { className: 'date-filter' },
            _react2.default.createElement(
                'span',
                { className: 'title' },
                'filtrer etter periode'
            ),
            _react2.default.createElement(
                'div',
                { className: 'datepicker' },
                _react2.default.createElement(_reactDatepicker2.default, { dateFormat: 'dd/MM/yyyy',
                    selected: startDate,
                    startDate: startDate,
                    endDate: endDate,
                    selectsStart: true,
                    onChange: this.handleChangeStart }),
                _react2.default.createElement(_reactDatepicker2.default, { dateFormat: 'dd/MM/yyyy',
                    selected: endDate,
                    startDate: startDate,
                    endDate: endDate,
                    selectsEnd: true,
                    onChange: this.handleChangeEnd })
            ),
            _react2.default.createElement(
                'div',
                { className: 'buttons-container' },
                _react2.default.createElement(
                    'button',
                    { className: 'clear', onClick: this.handleClear },
                    'fjern alle filtre'
                ),
                _react2.default.createElement(
                    'button',
                    { className: 'submit', onClick: this.handleFilter },
                    'filter'
                )
            )
        );
    };

    return DateFilter;
}(_react.Component);

exports.default = DateFilter;

/***/ }),

/***/ "./assets/src/js/app/components/ResultItem.js":
/*!****************************************************!*\
  !*** ./assets/src/js/app/components/ResultItem.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _get2 = __webpack_require__(/*! lodash/get */ "./node_modules/lodash/get.js");

var _get3 = _interopRequireDefault(_get2);

var _dateServices = __webpack_require__(/*! services/dateServices */ "./assets/src/js/app/services/dateServices.js");

var _InternalLink = __webpack_require__(/*! components/InternalLink */ "./assets/src/js/app/components/InternalLink.js");

var _InternalLink2 = _interopRequireDefault(_InternalLink);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SearchResult = function SearchResult(_ref) {
    var item = _ref.item,
        category = _ref.category;
    var meta = item.meta,
        title = item.title,
        link = item.link,
        publish_date = item.publish_date,
        update_date = item.update_date;


    return _react2.default.createElement(
        'div',
        { className: 'result-item' },
        category && _react2.default.createElement(
            'div',
            { className: 'category-line' },
            _react2.default.createElement(
                'h4',
                { className: 'category-label' },
                _react2.default.createElement(
                    _InternalLink2.default,
                    { to: category.url },
                    category.title
                )
            ),
            (0, _get3.default)(meta, 'is_paid_content', false) && _react2.default.createElement(
                'span',
                { className: 'plus-label' },
                'pluss'
            )
        ),
        (0, _get3.default)(meta, 'subtitle', false) && _react2.default.createElement(
            'h3',
            { className: 'subtitle' },
            _react2.default.createElement(
                _InternalLink2.default,
                { to: link },
                meta.subtitle
            )
        ),
        _react2.default.createElement(
            'h2',
            { className: 'title' },
            _react2.default.createElement(
                _InternalLink2.default,
                { to: link },
                title
            )
        ),
        publish_date && _react2.default.createElement(
            'div',
            { className: 'dateline' },
            _react2.default.createElement(
                'time',
                { className: 'published', dateTime: (0, _dateServices.toISO)(publish_date) },
                (0, _dateServices.toHumanShortDate)(publish_date)
            ),
            update_date != publish_date && update_date && _react2.default.createElement(
                'time',
                { className: 'updated', dateTime: (0, _dateServices.toISO)(update_date) },
                'Oppdatert: ',
                (0, _dateServices.toHumanShortDate)(update_date)
            )
        )
    );
};

exports.default = SearchResult;

/***/ }),

/***/ "./assets/src/js/app/components/ResultsList.js":
/*!*****************************************************!*\
  !*** ./assets/src/js/app/components/ResultsList.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _ResultItem = __webpack_require__(/*! components/ResultItem */ "./assets/src/js/app/components/ResultItem.js");

var _ResultItem2 = _interopRequireDefault(_ResultItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ResultsList = function ResultsList(_ref) {
    var results = _ref.results,
        categories = _ref.categories;
    return _react2.default.createElement(
        'div',
        { className: 'results-list' },
        results.map(function (item, i) {
            return _react2.default.createElement(_ResultItem2.default, { key: i, item: item, category: categories[item.main_category_id] });
        })
    );
};

exports.default = ResultsList;

/***/ }),

/***/ "./assets/src/js/app/containers/templates/Search.js":
/*!**********************************************************!*\
  !*** ./assets/src/js/app/containers/templates/Search.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");

var _reactRedux = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");

var _queryString = __webpack_require__(/*! query-string */ "./node_modules/query-string/index.js");

var _queryString2 = _interopRequireDefault(_queryString);

var _search = __webpack_require__(/*! storage/actions/search */ "./assets/src/js/app/storage/actions/search.js");

var _posts = __webpack_require__(/*! storage/actions/posts */ "./assets/src/js/app/storage/actions/posts.js");

var _main = __webpack_require__(/*! storage/actions/main */ "./assets/src/js/app/storage/actions/main.js");

var _postsServices = __webpack_require__(/*! services/postsServices */ "./assets/src/js/app/services/postsServices.js");

var _ResultsList = __webpack_require__(/*! components/ResultsList */ "./assets/src/js/app/components/ResultsList.js");

var _ResultsList2 = _interopRequireDefault(_ResultsList);

var _CategoryFilter = __webpack_require__(/*! components/CategoryFilter */ "./assets/src/js/app/components/CategoryFilter.js");

var _CategoryFilter2 = _interopRequireDefault(_CategoryFilter);

var _DateFilter = __webpack_require__(/*! components/DateFilter */ "./assets/src/js/app/components/DateFilter.js");

var _DateFilter2 = _interopRequireDefault(_DateFilter);

var _LoadMore = __webpack_require__(/*! components/LoadMore */ "./assets/src/js/app/components/LoadMore.js");

var _LoadMore2 = _interopRequireDefault(_LoadMore);

var _crossIcon = __webpack_require__(/*! icons/cross-icon.svg */ "./assets/build/img/icons/cross-icon.svg");

var _crossIcon2 = _interopRequireDefault(_crossIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Search = function (_Component) {
    _inherits(Search, _Component);

    function Search(props) {
        _classCallCheck(this, Search);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props));

        _this.submitHandler = _this.submitHandler.bind(_this);
        _this.changeHandler = _this.changeHandler.bind(_this);
        _this.clearHandler = _this.clearHandler.bind(_this);

        _this.filterContainer = _react2.default.createRef();

        _this.state = {
            query: _queryString2.default.parse(location.search).s
        };
        return _this;
    }

    Search.prototype.submitHandler = function submitHandler(e) {
        e.preventDefault();
        var history = this.props.history;
        var query = this.state.query;


        var qr = _queryString2.default.parse(location.search);
        qr.s = query;

        history.push('?' + _queryString2.default.stringify(qr));
    };

    Search.prototype.changeHandler = function changeHandler(e) {
        this.setState({ query: e.target.value });
    };

    Search.prototype.clearHandler = function clearHandler() {
        var history = this.props.history;


        this.setState({ query: '' });
        history.push('?s=');
    };

    Search.prototype.componentDidMount = function componentDidMount() {
        this.filterContainer.style.height = document.querySelector('.category-filter').offsetHeight + document.querySelector('.date-filter').offsetHeight + 200 + 'px';
    };

    Search.prototype.render = function render() {
        var _this2 = this;

        var query = this.state.query;
        var _props = this.props,
            main = _props.main,
            posts_by_ids = _props.posts_by_ids,
            categories_by_ids = _props.categories_by_ids,
            history = _props.history;
        var _props2 = this.props,
            fetchPosts = _props2.fetchPosts,
            fetchSearchItemsIds = _props2.fetchSearchItemsIds;
        var _main$items = main.items,
            items = _main$items === undefined ? [] : _main$items;


        var resultItems = (0, _postsServices.formPostsArray)(posts_by_ids, items);
        var postsIds = Object.keys(posts_by_ids);

        var _queryString$parse = _queryString2.default.parse(location.search),
            after = _queryString$parse.after,
            before = _queryString$parse.before,
            cat_name = _queryString$parse.cat_name;

        var searchSettings = {
            offset: 8,
            amount: 8
        };

        var loadMoreProps = _extends({
            fetchIdsHandler: fetchSearchItemsIds,
            fetchPostsHandler: fetchPosts,
            isSearch: true
        }, searchSettings, {
            category: cat_name,
            after: after,
            before: before,
            postsIds: postsIds
        });

        var searchLoadMoreRender = !(resultItems.length % searchSettings.amount) && _react2.default.createElement(_LoadMore2.default, loadMoreProps);

        return _react2.default.createElement(
            'section',
            { className: 'results-page' },
            _react2.default.createElement(
                'div',
                { className: 'wrapper' },
                _react2.default.createElement(
                    'div',
                    { className: 'grid-container' },
                    _react2.default.createElement(
                        'div',
                        { className: 'grid-4-6' },
                        _react2.default.createElement(
                            'div',
                            { className: 'search-title' },
                            _react2.default.createElement(
                                'label',
                                { htmlFor: 'results-search' },
                                'S\xF8keresultater for:'
                            ),
                            _react2.default.createElement(
                                'form',
                                { onSubmit: this.submitHandler },
                                _react2.default.createElement('input', { type: 'search',
                                    id: 'results-search',
                                    value: query,
                                    onChange: this.changeHandler })
                            ),
                            _react2.default.createElement(
                                'span',
                                { className: 'clear',
                                    onClick: this.clearHandler },
                                _react2.default.createElement(_crossIcon2.default, null)
                            )
                        ),
                        _react2.default.createElement(_ResultsList2.default, { results: resultItems,
                            categories: categories_by_ids }),
                        searchLoadMoreRender
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'grid-2-6', ref: function ref(container) {
                                return _this2.filterContainer = container;
                            } },
                        _react2.default.createElement(_CategoryFilter2.default, { categories: categories_by_ids,
                            history: history }),
                        _react2.default.createElement(_DateFilter2.default, { history: history })
                    )
                )
            )
        );
    };

    return Search;
}(_react.Component);

var mapStateToProps = function mapStateToProps(_ref) {
    var main = _ref.main,
        posts_by_ids = _ref.posts_by_ids,
        categories_by_ids = _ref.categories_by_ids;
    return {
        main: main,
        posts_by_ids: posts_by_ids,
        categories_by_ids: categories_by_ids
    };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
        updateSearch: function updateSearch(search) {
            return dispatch((0, _search.updateSearch)(search));
        },
        fetchPosts: function fetchPosts(ids) {
            return dispatch((0, _posts.fetchPosts)(ids));
        },
        fetchSearchItemsIds: function fetchSearchItemsIds(offset, amount) {
            return dispatch((0, _main.fetchSearchItemsIds)(offset, amount));
        }
    };
};

exports.default = (0, _reactRouterDom.withRouter)((0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Search));

/***/ })

}]);
//# sourceMappingURL=20.js.map