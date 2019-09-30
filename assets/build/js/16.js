(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[16],{

/***/ "./assets/src/img/icons/exclamation-icon.svg":
/*!***************************************************!*\
  !*** ./assets/src/img/icons/exclamation-icon.svg ***!
  \***************************************************/
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
  d: "M115.41 108H8.78a6.656 6.656 0 01-5.75-10.221c2.32-4.072 49.2-85.442 53.21-92.387a6.612 6.612 0 0111.55 0c2.94 5 50.06 86.68 53.33 92.6A6.617 6.617 0 01115.41 108z",
  fill: "none",
  stroke: "#de302f",
  strokeWidth: 4
});

var _ref2 =
/*#__PURE__*/
react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("path", {
  "data-name": "Rounded Rectangle 8",
  d: "M62 29a6 6 0 016 6v38a6 6 0 01-12 0V35a6 6 0 016-6zm0 55a6 6 0 11-6 6 6 6 0 016-6z",
  fill: "#de302f",
  fillRule: "evenodd"
});

var SvgExclamationIcon = function SvgExclamationIcon(props) {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("svg", _extends({
    width: 124,
    height: 110
  }, props), _ref, _ref2);
};

/* harmony default export */ __webpack_exports__["default"] = (SvgExclamationIcon);

/***/ }),

/***/ "./assets/src/img/icons/ok-icon.svg":
/*!******************************************!*\
  !*** ./assets/src/img/icons/ok-icon.svg ***!
  \******************************************/
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
  fill: "currentColor",
  "data-name": "ok-icon",
  className: "ok-icon_svg__cls-1",
  d: "M68.06 10.931L30 48.09a6.764 6.764 0 01-9.36 0L1.94 29.98a6.237 6.237 0 010-9.046 6.75 6.75 0 019.35 0l14.03 13.58L58.7 1.874a6.78 6.78 0 019.36 0 6.267 6.267 0 010 9.057z"
});

var SvgOkIcon = function SvgOkIcon(props) {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("svg", _extends({
    width: 70.03,
    height: 49.969
  }, props), _ref);
};

/* harmony default export */ __webpack_exports__["default"] = (SvgOkIcon);

/***/ }),

/***/ "./assets/src/js/app/components/NotFound.js":
/*!**************************************************!*\
  !*** ./assets/src/js/app/components/NotFound.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NotFound = function NotFound() {
    return _react2.default.createElement(
        "div",
        { className: "not-found" },
        _react2.default.createElement(
            "div",
            { className: "wrapper-thin" },
            _react2.default.createElement(
                "header",
                null,
                _react2.default.createElement(
                    "h1",
                    null,
                    "404"
                ),
                _react2.default.createElement(
                    "h5",
                    null,
                    "Finner ikke siden!"
                )
            ),
            _react2.default.createElement(
                "footer",
                null,
                _react2.default.createElement(
                    "p",
                    null,
                    "Siden du leter etter er enten flyttet eller eksisterer ikke lenger."
                ),
                _react2.default.createElement(
                    _reactRouterDom.Link,
                    { to: "/", className: "button" },
                    "G\xE5 til forsiden"
                )
            )
        )
    );
};

exports.default = NotFound;

/***/ }),

/***/ "./assets/src/js/app/components/PaymentResponse.js":
/*!*********************************************************!*\
  !*** ./assets/src/js/app/components/PaymentResponse.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _config = __webpack_require__(/*! utils/config */ "./assets/src/js/app/utils/config.js");

var _Breadcrumbs = __webpack_require__(/*! components/partials/Breadcrumbs */ "./assets/src/js/app/components/partials/Breadcrumbs.js");

var _Breadcrumbs2 = _interopRequireDefault(_Breadcrumbs);

var _PageTitle = __webpack_require__(/*! components/partials/PageTitle */ "./assets/src/js/app/components/partials/PageTitle.js");

var _PageTitle2 = _interopRequireDefault(_PageTitle);

var _PaymentSuccess = __webpack_require__(/*! components/partials/PaymentSuccess */ "./assets/src/js/app/components/partials/PaymentSuccess.js");

var _PaymentSuccess2 = _interopRequireDefault(_PaymentSuccess);

var _PaymentFailed = __webpack_require__(/*! components/partials/PaymentFailed */ "./assets/src/js/app/components/partials/PaymentFailed.js");

var _PaymentFailed2 = _interopRequireDefault(_PaymentFailed);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PaymentResponse = function PaymentResponse(_ref) {
    var main = _ref.main;
    var fulfillment_status = main.fulfillment_status,
        unique_slug = main.unique_slug;


    var breadcrumbsProps = {
        parentId: 0,
        currentPage: { title: 'TGN pluss' }
    };

    var product = _config.products.find(function (product) {
        return product.unique_slug === unique_slug;
    });
    var renderResponse = fulfillment_status === 'success' ? _react2.default.createElement(_PaymentSuccess2.default, { product: product }) : _react2.default.createElement(_PaymentFailed2.default, null);

    return _react2.default.createElement(
        'section',
        { className: 'payment-response' },
        _react2.default.createElement(
            'div',
            { className: 'wrapper-thin' },
            _react2.default.createElement(
                'div',
                { className: 'page-heading' },
                _react2.default.createElement(_Breadcrumbs2.default, breadcrumbsProps),
                _react2.default.createElement(_PageTitle2.default, { title: 'Abonnement' })
            ),
            renderResponse
        )
    );
};

exports.default = PaymentResponse;

/***/ }),

/***/ "./assets/src/js/app/components/partials/Breadcrumbs.js":
/*!**************************************************************!*\
  !*** ./assets/src/js/app/components/partials/Breadcrumbs.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _InternalLink = __webpack_require__(/*! components/InternalLink */ "./assets/src/js/app/components/InternalLink.js");

var _InternalLink2 = _interopRequireDefault(_InternalLink);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Breadcrumbs = function Breadcrumbs(_ref) {
    var parentId = _ref.parentId,
        parentPage = _ref.parentPage,
        currentPage = _ref.currentPage;


    return _react2.default.createElement(
        'nav',
        { className: 'breadcrumbs' },
        _react2.default.createElement(
            _InternalLink2.default,
            { to: '/' },
            'forsiden'
        ),
        parentId ? _react2.default.createElement(
            _InternalLink2.default,
            { to: parentPage.link },
            parentPage.title
        ) : '',
        _react2.default.createElement(
            'span',
            null,
            currentPage.title
        )
    );
};

exports.default = Breadcrumbs;

/***/ }),

/***/ "./assets/src/js/app/components/partials/PageTitle.js":
/*!************************************************************!*\
  !*** ./assets/src/js/app/components/partials/PageTitle.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PageTitle = function PageTitle(_ref) {
  var title = _ref.title;
  return _react2.default.createElement(
    "h1",
    { className: "page-title" },
    title
  );
};

exports.default = PageTitle;

/***/ }),

/***/ "./assets/src/js/app/components/partials/PaymentFailed.js":
/*!****************************************************************!*\
  !*** ./assets/src/js/app/components/partials/PaymentFailed.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");

var _exclamationIcon = __webpack_require__(/*! images/icons/exclamation-icon.svg */ "./assets/src/img/icons/exclamation-icon.svg");

var _exclamationIcon2 = _interopRequireDefault(_exclamationIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PaymentFailed = function PaymentFailed() {
    return _react2.default.createElement(
        'div',
        { className: 'subscription-form payment-failed' },
        _react2.default.createElement(
            'div',
            { className: 'row with-icon' },
            _react2.default.createElement(
                'div',
                { className: 'col-2-3' },
                _react2.default.createElement(
                    'h2',
                    { className: 'subtitle' },
                    'Registreringen mislyktes'
                ),
                _react2.default.createElement(
                    'p',
                    null,
                    'Din brukerkonto har blitt opprettet og en aktiviseringslenke er sendt til e-postadressen du har oppgitt. Husk at du m\xE5 aktivere kontoen ved \xE5 klikke p\xE5 lenken i e-posten du mottar, f\xF8r du kan logge inn.'
                )
            ),
            _react2.default.createElement(
                'div',
                { className: 'col-1-3' },
                _react2.default.createElement(
                    'span',
                    { className: 'exclamation-icon' },
                    _react2.default.createElement(_exclamationIcon2.default, null)
                )
            )
        ),
        _react2.default.createElement(
            'div',
            { className: 'row' },
            _react2.default.createElement(
                'div',
                { className: 'response-links' },
                _react2.default.createElement(
                    _reactRouterDom.Link,
                    { to: '/', className: 'button' },
                    'g\xE5 tilbake'
                )
            )
        )
    );
};

exports.default = PaymentFailed;

/***/ }),

/***/ "./assets/src/js/app/components/partials/PaymentSuccess.js":
/*!*****************************************************************!*\
  !*** ./assets/src/js/app/components/partials/PaymentSuccess.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");

var _reactHtmlParser = __webpack_require__(/*! react-html-parser */ "./node_modules/react-html-parser/lib/index.js");

var _reactHtmlParser2 = _interopRequireDefault(_reactHtmlParser);

var _UniversalLink = __webpack_require__(/*! components/UniversalLink */ "./assets/src/js/app/components/UniversalLink.js");

var _UniversalLink2 = _interopRequireDefault(_UniversalLink);

var _okIcon = __webpack_require__(/*! images/icons/ok-icon.svg */ "./assets/src/img/icons/ok-icon.svg");

var _okIcon2 = _interopRequireDefault(_okIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PaymentSuccess = function PaymentSuccess(_ref) {
    var product = _ref.product;
    var title = product.title,
        text = product.text;


    return _react2.default.createElement(
        'div',
        { className: 'subscription-form payment-success' },
        _react2.default.createElement(
            'div',
            { className: 'row with-icon' },
            _react2.default.createElement(
                'div',
                { className: 'col-2-3' },
                _react2.default.createElement(
                    'h2',
                    { className: 'subtitle' },
                    'Takk for du valgte oss!'
                ),
                _react2.default.createElement(
                    'p',
                    null,
                    'Du er n\xE5 abonnent p\xE5 TGN Pluss \u2013 ',
                    title
                )
            ),
            _react2.default.createElement(
                'div',
                { className: 'col-1-3' },
                _react2.default.createElement(
                    'span',
                    { className: 'ok-icon' },
                    _react2.default.createElement(_okIcon2.default, { width: '70.03', height: '49.969', viewBox: '0 0 70.03 49.969' })
                )
            )
        ),
        _react2.default.createElement(
            'div',
            { className: 'row' },
            _react2.default.createElement(
                'div',
                { className: 'col-1-3' },
                _react2.default.createElement(
                    'h3',
                    null,
                    'Inkludert i pakken:'
                )
            ),
            _react2.default.createElement(
                'div',
                { className: 'col-2-3 product-description' },
                (0, _reactHtmlParser2.default)(text)
            )
        ),
        _react2.default.createElement(
            'div',
            { className: 'row' },
            _react2.default.createElement(
                'div',
                { className: 'response-links' },
                _react2.default.createElement(
                    _reactRouterDom.Link,
                    { to: '/', className: 'button' },
                    'G\xE5 til forsiden'
                ),
                _react2.default.createElement(
                    _UniversalLink2.default,
                    { target: '_blank', to: 'https://selfservice.mediaconnect.no/' },
                    'ConnectID - Min Side'
                )
            )
        )
    );
};

exports.default = PaymentSuccess;

/***/ }),

/***/ "./assets/src/js/app/containers/templates/BookSubscription.js":
/*!********************************************************************!*\
  !*** ./assets/src/js/app/containers/templates/BookSubscription.js ***!
  \********************************************************************/
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

var _config = __webpack_require__(/*! utils/config */ "./assets/src/js/app/utils/config.js");

var _NotFound = __webpack_require__(/*! components/NotFound */ "./assets/src/js/app/components/NotFound.js");

var _NotFound2 = _interopRequireDefault(_NotFound);

var _PaymentResponse = __webpack_require__(/*! components/PaymentResponse */ "./assets/src/js/app/components/PaymentResponse.js");

var _PaymentResponse2 = _interopRequireDefault(_PaymentResponse);

var _Breadcrumbs = __webpack_require__(/*! components/partials/Breadcrumbs */ "./assets/src/js/app/components/partials/Breadcrumbs.js");

var _Breadcrumbs2 = _interopRequireDefault(_Breadcrumbs);

var _PageTitle = __webpack_require__(/*! components/partials/PageTitle */ "./assets/src/js/app/components/partials/PageTitle.js");

var _PageTitle2 = _interopRequireDefault(_PageTitle);

var _Paywall = __webpack_require__(/*! components/Paywall */ "./assets/src/js/app/components/Paywall.js");

var _Paywall2 = _interopRequireDefault(_Paywall);

var _PlusLabel = __webpack_require__(/*! components/partials/PlusLabel */ "./assets/src/js/app/components/partials/PlusLabel.js");

var _PlusLabel2 = _interopRequireDefault(_PlusLabel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Subscription = (0, _react.lazy)(function () {
    return Promise.all(/*! import() */[__webpack_require__.e(6), __webpack_require__.e(22), __webpack_require__.e(17)]).then(__webpack_require__.t.bind(null, /*! containers/templates/Subscription */ "./assets/src/js/app/containers/templates/Subscription.js", 7));
});

var BookSubscription = function (_Component) {
    _inherits(BookSubscription, _Component);

    function BookSubscription() {
        _classCallCheck(this, BookSubscription);

        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    BookSubscription.prototype.render = function render() {
        var _props = this.props,
            location = _props.location,
            main = _props.main;


        var breadcrumbsProps = {
            parentId: 0,
            currentPage: { title: 'TGN pluss' }
        };

        if (_config.isInApp) {
            return _react2.default.createElement(_NotFound2.default, null);
        }

        if (_queryString2.default.parse(location.search).subscription) {
            return _react2.default.createElement(Subscription, { unique_slug: _queryString2.default.parse(location.search).subscription });
        }

        if (main.fulfillment_status) {
            return _react2.default.createElement(_PaymentResponse2.default, { main: main });
        }

        return _react2.default.createElement(
            'section',
            { className: 'book-subscription' },
            _react2.default.createElement(
                'div',
                { className: 'wrapper-thin' },
                _react2.default.createElement(
                    'div',
                    { className: 'page-heading' },
                    _react2.default.createElement(_Breadcrumbs2.default, breadcrumbsProps),
                    _react2.default.createElement(_PageTitle2.default, { title: 'Bestill abonnement' })
                ),
                _react2.default.createElement(
                    'p',
                    { className: 'description' },
                    'Med TGN Pluss f\xE5r du blant annet eksklusive artikler, tips og r\xE5d fra v\xE5re eksperter.'
                ),
                _react2.default.createElement(_PlusLabel2.default, { withLogo: true }),
                _react2.default.createElement(_Paywall2.default, null)
            )
        );
    };

    return BookSubscription;
}(_react.Component);

var mapStateToProps = function mapStateToProps(_ref) {
    var main = _ref.main;
    return { main: main };
};

exports.default = (0, _reactRouterDom.withRouter)((0, _reactRedux.connect)(mapStateToProps)(BookSubscription));

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
//# sourceMappingURL=16.js.map