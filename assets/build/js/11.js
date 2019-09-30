(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[11],{

/***/ "./assets/src/js/app/components/CheckboxItem.js":
/*!******************************************************!*\
  !*** ./assets/src/js/app/components/CheckboxItem.js ***!
  \******************************************************/
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

var CheckboxItem = function (_Component) {
    _inherits(CheckboxItem, _Component);

    function CheckboxItem(props) {
        _classCallCheck(this, CheckboxItem);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props));

        var item = _this.props.item;


        _this.handleChange = _this.handleChange.bind(_this);

        _this.state = {
            checked: _this.props.checked,
            name: item.name ? item.name : item.slug
        };
        return _this;
    }

    CheckboxItem.prototype.componentDidUpdate = function componentDidUpdate(prevProps) {
        if (this.props.checked !== prevProps.checked) this.setState({ checked: this.props.checked });
    };

    CheckboxItem.prototype.handleChange = function handleChange(e) {
        var checked = this.state.checked;
        var handler = this.props.handler;


        this.setState({ checked: !checked });

        if (handler) handler(e);
    };

    CheckboxItem.prototype.render = function render() {
        var _props = this.props,
            item = _props.item,
            disabled = _props.disabled;
        var _state = this.state,
            checked = _state.checked,
            name = _state.name;


        return _react2.default.createElement(
            "div",
            { className: "checkbox-item" },
            _react2.default.createElement(
                "label",
                null,
                item.title,
                _react2.default.createElement("input", { type: "checkbox",
                    disabled: disabled,
                    checked: !!checked,
                    name: name,
                    onChange: this.handleChange }),
                _react2.default.createElement("span", null)
            )
        );
    };

    return CheckboxItem;
}(_react.Component);

exports.default = CheckboxItem;

/***/ }),

/***/ "./assets/src/js/app/components/ContactForm.js":
/*!*****************************************************!*\
  !*** ./assets/src/js/app/components/ContactForm.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _reactGoogleRecaptcha = __webpack_require__(/*! react-google-recaptcha */ "./node_modules/react-google-recaptcha/lib/esm/index.js");

var _reactGoogleRecaptcha2 = _interopRequireDefault(_reactGoogleRecaptcha);

var _config = __webpack_require__(/*! utils/config */ "./assets/src/js/app/utils/config.js");

var _config2 = _interopRequireDefault(_config);

var _httpService = __webpack_require__(/*! services/httpService */ "./assets/src/js/app/services/httpService.js");

var _httpService2 = _interopRequireDefault(_httpService);

var _CheckboxItem = __webpack_require__(/*! components/CheckboxItem */ "./assets/src/js/app/components/CheckboxItem.js");

var _CheckboxItem2 = _interopRequireDefault(_CheckboxItem);

var _InternalLink = __webpack_require__(/*! components/InternalLink */ "./assets/src/js/app/components/InternalLink.js");

var _InternalLink2 = _interopRequireDefault(_InternalLink);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ContactForm = function (_Component) {
    _inherits(ContactForm, _Component);

    function ContactForm(props) {
        _classCallCheck(this, ContactForm);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props));

        _this.capthcaSiteKey = _config2.default.recaptcha_key ? _config2.default.recaptcha_key : '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI';

        _this.submitHandler = _this.submitHandler.bind(_this);
        _this.inputChangeHandler = _this.inputChangeHandler.bind(_this);
        _this.recaptchaChangeHandler = _this.recaptchaChangeHandler.bind(_this);

        _this.captcha = _react2.default.createRef();

        _this.state = {
            name: '',
            lastname: '',
            email: '',
            phone: '',
            message: '',
            captcha: null,
            privacy: false,
            errors: { name: '', lastname: '', email: '', message: '', privacy: '', captcha: '' },
            isLoading: false,
            isSuccess: false,
            validForm: true
        };
        return _this;
    }

    ContactForm.prototype.inputChangeHandler = function inputChangeHandler(e) {
        var _extends2, _setState;

        var name = e.target.name;
        var value = e.target.value;
        var errors = this.state.errors;

        var error = void 0;

        switch (name) {
            case 'privacy':
                error = e.target.checked ? '' : 'Please check...';
                break;
            default:
                error = value ? '' : 'Please fill field...';
                break;
        }

        this.setState((_setState = {}, _setState[name] = value, _setState.errors = _extends({}, errors, (_extends2 = {}, _extends2[name] = error, _extends2)), _setState));
    };

    ContactForm.prototype.validateForm = function validateForm() {
        var _this2 = this;

        var errors = this.state.errors;


        var newErrors = errors;

        var validateInputFields = Object.keys(errors);

        validateInputFields.map(function (name) {
            if (!_this2.state[name]) {
                switch (name) {
                    case 'privacy':
                        newErrors[name] = 'Vennligst godta personvernbetingelsene';
                        break;
                    case 'name':
                        newErrors[name] = 'Vennligst fyll inn fornavn';
                        break;
                    case 'lastname':
                        newErrors[name] = 'Vennligst fyll inn etternavn';
                        break;
                    case 'email':
                        newErrors[name] = 'E-post ikke gyldig';
                        break;
                    case 'message':
                        newErrors[name] = 'Vennligst skriv inn din beskjed';
                        break;
                    case 'captcha':
                        newErrors[name] = 'Captcha mislyktes, vennligst prøv igjen';
                        break;
                    default:
                        newErrors[name] = 'Please fill field...';
                        break;
                }
            }
        });

        if (this.state.captcha) newErrors.captcha = '';

        this.setState({ errors: newErrors });
    };

    ContactForm.prototype.recaptchaChangeHandler = function recaptchaChangeHandler(securityKey) {
        this.setState({ captcha: securityKey });
    };

    ContactForm.prototype.sendHandler = function sendHandler() {
        var _http$post,
            _this3 = this;

        var _state = this.state,
            name = _state.name,
            lastname = _state.lastname,
            email = _state.email,
            phone = _state.phone,
            message = _state.message,
            captcha = _state.captcha;


        this.setState({ isLoading: true });

        var formType = this.props.template === 'contact' ? 'default' : 'tips_oss';

        _httpService2.default.post('' + _config.apiUrl + _config.apiEndpoints.contactForm, (_http$post = {
            f_name: name,
            l_name: lastname,
            email: email,
            tel: phone,
            message: message
        }, _http$post['g-recaptcha-response'] = captcha, _http$post.form_type = formType, _http$post)).then(function () {
            _this3.captcha.props.grecaptcha.reset();

            _this3.setState({
                name: '',
                lastname: '',
                email: '',
                phone: '',
                message: '',
                captcha: null,
                isLoading: false,
                isSuccess: true
            });

            window.focus(); // EDGE focus fix
        }).catch(function (err) {
            _this3.captcha.props.grecaptcha.reset();
            _this3.setState({ isLoading: false });
            console.log(err);
        });
    };

    ContactForm.prototype.submitHandler = function submitHandler(e) {
        e.preventDefault();

        var errors = this.state.errors;


        this.validateForm();
        var notValidFields = Object.keys(errors).filter(function (name) {
            return errors[name] && name;
        });

        if (!notValidFields.length) {
            this.sendHandler();
        }
    };

    ContactForm.prototype.render = function render() {
        var _this4 = this;

        var _state2 = this.state,
            errors = _state2.errors,
            isLoading = _state2.isLoading,
            isSuccess = _state2.isSuccess;


        var checkboxLabel = _react2.default.createElement(
            _react.Fragment,
            null,
            'Jeg godtar ',
            _react2.default.createElement(
                _InternalLink2.default,
                { to: '/personvernerklaering/', target: '_blank' },
                'personvernbetingelsene'
            )
        );

        return _react2.default.createElement(
            'div',
            { className: 'contact-form' },
            _react2.default.createElement(
                'div',
                { className: 'heading' },
                _react2.default.createElement(
                    'h3',
                    null,
                    'Kontaktskjema'
                ),
                _react2.default.createElement(
                    'p',
                    null,
                    'Vi har som m\xE5l \xE5 behandle din e-posthenvendelse innen 24 timer (mandag-fredag).'
                )
            ),
            _react2.default.createElement(
                'form',
                { onSubmit: this.submitHandler, className: isLoading ? 'loading' : '' },
                _react2.default.createElement(
                    'div',
                    { className: 'form-grid' },
                    _react2.default.createElement(
                        'div',
                        { className: 'grid-2-4' },
                        _react2.default.createElement(
                            'div',
                            { className: 'input-item ' + (errors.name ? 'is-error' : '') },
                            _react2.default.createElement('input', { type: 'text',
                                name: 'name',
                                placeholder: 'fornavn',
                                onChange: this.inputChangeHandler,
                                value: this.state.name }),
                            errors.name && _react2.default.createElement(
                                'p',
                                { className: 'error-msg' },
                                errors.name
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'grid-2-4' },
                        _react2.default.createElement(
                            'div',
                            { className: 'input-item ' + (errors.lastname ? 'is-error' : '') },
                            _react2.default.createElement('input', { type: 'text',
                                name: 'lastname',
                                placeholder: 'etternavn',
                                onChange: this.inputChangeHandler,
                                value: this.state.lastname }),
                            errors.lastname && _react2.default.createElement(
                                'p',
                                { className: 'error-msg' },
                                errors.lastname
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'grid-2-4' },
                        _react2.default.createElement(
                            'div',
                            { className: 'input-item ' + (errors.email ? 'is-error' : '') },
                            _react2.default.createElement('input', { type: 'email',
                                name: 'email',
                                placeholder: 'e-post',
                                onChange: this.inputChangeHandler,
                                value: this.state.email }),
                            errors.email && _react2.default.createElement(
                                'p',
                                { className: 'error-msg' },
                                errors.email
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'grid-2-4' },
                        _react2.default.createElement(
                            'div',
                            { className: 'input-item' },
                            _react2.default.createElement('input', { type: 'number',
                                name: 'phone',
                                placeholder: 'telefon',
                                onChange: this.inputChangeHandler,
                                value: this.state.phone })
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'grid-4-4' },
                        _react2.default.createElement(
                            'div',
                            { className: 'textarea-item ' + (errors.message ? 'is-error' : '') },
                            _react2.default.createElement('textarea', { placeholder: 'beskjed',
                                name: 'message',
                                onChange: this.inputChangeHandler,
                                value: this.state.message }),
                            errors.message && _react2.default.createElement(
                                'p',
                                { className: 'error-msg' },
                                errors.message
                            )
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'grid-4-4' },
                        _react2.default.createElement(_reactGoogleRecaptcha2.default, { sitekey: this.capthcaSiteKey,
                            className: 'captcha',
                            ref: function ref(e) {
                                return _this4.captcha = e;
                            },
                            onChange: this.recaptchaChangeHandler }),
                        errors.captcha && _react2.default.createElement(
                            'p',
                            { className: 'error-msg' },
                            errors.captcha
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'grid-2-4 ' + (errors.privacy ? 'is-error' : '') },
                        _react2.default.createElement(_CheckboxItem2.default, { item: { title: checkboxLabel, name: 'privacy' },
                            handler: this.inputChangeHandler }),
                        errors.privacy && _react2.default.createElement(
                            'p',
                            { className: 'error-msg' },
                            errors.privacy
                        )
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'grid-2-4' },
                        _react2.default.createElement(
                            'button',
                            { className: 'submit' },
                            'send'
                        )
                    )
                ),
                isSuccess && _react2.default.createElement(
                    'p',
                    { className: 'success-msg' },
                    'Vi bekrefter \xE5 ha mottatt meldingen'
                )
            )
        );
    };

    return ContactForm;
}(_react.Component);

exports.default = ContactForm;

/***/ }),

/***/ "./assets/src/js/app/components/ContactMap.js":
/*!****************************************************!*\
  !*** ./assets/src/js/app/components/ContactMap.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

__webpack_require__(/*! leaflet */ "./node_modules/leaflet/dist/leaflet-src.js");

var _reactLeaflet = __webpack_require__(/*! react-leaflet */ "./node_modules/react-leaflet/es/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ContactMap = function ContactMap(_ref) {
    var zoom = _ref.zoom,
        position = _ref.position;
    return _react2.default.createElement(
        _reactLeaflet.Map,
        { zoom: zoom, center: position, style: { height: '480px' },
            attributionControl: true,
            zoomControl: true,
            doubleClickZoom: true,
            scrollWheelZoom: false,
            dragging: true,
            animate: true,
            easeLinearity: 0.35 },
        _react2.default.createElement(_reactLeaflet.TileLayer, {
            url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
            attribution: '\xA9 <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }),
        _react2.default.createElement(_reactLeaflet.Marker, { position: position })
    );
};

exports.default = ContactMap;

/***/ }),

/***/ "./assets/src/js/app/components/ContactUs.js":
/*!***************************************************!*\
  !*** ./assets/src/js/app/components/ContactUs.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _reactHtmlParser = __webpack_require__(/*! react-html-parser */ "./node_modules/react-html-parser/lib/index.js");

var _reactHtmlParser2 = _interopRequireDefault(_reactHtmlParser);

var _Breadcrumbs = __webpack_require__(/*! components/partials/Breadcrumbs */ "./assets/src/js/app/components/partials/Breadcrumbs.js");

var _Breadcrumbs2 = _interopRequireDefault(_Breadcrumbs);

var _ContactForm = __webpack_require__(/*! components/ContactForm */ "./assets/src/js/app/components/ContactForm.js");

var _ContactForm2 = _interopRequireDefault(_ContactForm);

var _ContactMap = __webpack_require__(/*! components/ContactMap */ "./assets/src/js/app/components/ContactMap.js");

var _ContactMap2 = _interopRequireDefault(_ContactMap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ContactUs = function (_Component) {
    _inherits(ContactUs, _Component);

    function ContactUs() {
        _classCallCheck(this, ContactUs);

        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    ContactUs.prototype.render = function render() {
        var _props$page = this.props.page,
            title = _props$page.title,
            parent = _props$page.parent,
            content = _props$page.content,
            map = _props$page.map,
            template = _props$page.template,
            hide_map = _props$page.hide_map;


        var isHided = parseInt(hide_map);

        var breadcrumbsProps = {
            parentId: parent,
            currentPage: { title: title }
        };

        var mapAttrs = {
            position: [map.latitude ? parseFloat(map.latitude) : 0, map.longitude ? parseFloat(map.longitude) : 0],
            zoom: [map.zoom ? parseInt(map.zoom) : 0]
        };

        return _react2.default.createElement(
            'section',
            { className: 'contact-us' },
            _react2.default.createElement(
                'div',
                { className: 'wrapper-thin' },
                _react2.default.createElement(
                    'div',
                    { className: 'page-heading' },
                    _react2.default.createElement(_Breadcrumbs2.default, breadcrumbsProps),
                    _react2.default.createElement(
                        'h1',
                        { className: 'page-title' },
                        title
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'content' },
                    (0, _reactHtmlParser2.default)(content)
                ),
                map.latitude && map.longitude && !isHided && _react2.default.createElement(
                    'div',
                    { className: 'map-container' },
                    _react2.default.createElement(_ContactMap2.default, mapAttrs)
                ),
                _react2.default.createElement(_ContactForm2.default, { template: template })
            )
        );
    };

    return ContactUs;
}(_react.Component);

exports.default = ContactUs;

/***/ }),

/***/ "./assets/src/js/app/components/EMagazine.js":
/*!***************************************************!*\
  !*** ./assets/src/js/app/components/EMagazine.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _Breadcrumbs = __webpack_require__(/*! components/partials/Breadcrumbs */ "./assets/src/js/app/components/partials/Breadcrumbs.js");

var _Breadcrumbs2 = _interopRequireDefault(_Breadcrumbs);

var _PageTitle = __webpack_require__(/*! components/partials/PageTitle */ "./assets/src/js/app/components/partials/PageTitle.js");

var _PageTitle2 = _interopRequireDefault(_PageTitle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EMagazine = function (_Component) {
    _inherits(EMagazine, _Component);

    function EMagazine(props) {
        _classCallCheck(this, EMagazine);

        return _possibleConstructorReturn(this, _Component.call(this, props));
    }

    EMagazine.prototype.removeScripts = function removeScripts() {
        var jqueryScript = document.getElementById('jquery-script');
        var iframeResizerScript = document.getElementById('iframe-resizer-script');
        var apiScript = document.getElementById('buyandread-api-script');

        jqueryScript.remove();
        iframeResizerScript.remove();
        apiScript.remove();
    };

    EMagazine.prototype.buyAndReadInit = function buyAndReadInit() {
        if (window.$barapi) {
            var $barapi = window.$barapi;
            var $ = jQuery;

            if ($barapi) {
                $barapi.mainPage({
                    wluid: "travoggaloppnytt",
                    apiKey: "14e48169990d0df5312357acc21f9fa9",
                    target: $("#barApiWrapper"),
                    page: "selectEdition", // Default page
                    iframeResize: true,
                    size: { width: "100%", height: "800px" },
                    options: { loginRequired: true, hideRegister: true }
                });
            }

            return true;
        } else {
            throw new ReferenceError('$barapi didn\'t loaded');
        }
    };

    EMagazine.prototype.loadJQuery = function loadJQuery() {
        return new Promise(function (resolve) {
            var head = document.getElementsByTagName('head')[0];
            var script = document.createElement('script');

            script.src = 'https://code.jquery.com/jquery-3.4.1.min.js';
            script.type = 'text/javascript';
            script.id = 'jquery-script';

            head.appendChild(script);

            script.onload = function () {
                resolve();
            };
        });
    };

    EMagazine.prototype.loadScripts = function loadScripts() {
        return new Promise(function (resolve) {
            var head = document.getElementsByTagName('head')[0];
            var iframeResizerScript = document.createElement('script');
            var apiScript = document.createElement('script');

            iframeResizerScript.type = 'text/javascript';
            iframeResizerScript.id = 'iframe-resizer-script';
            iframeResizerScript.src = 'https://www.buyandread.com/static/js/libs/iframeResizer.min.js';

            apiScript.src = 'https://www.buyandread.com/static/js/dist/api.min.js';
            apiScript.type = 'text/javascript';
            apiScript.id = 'buyandread-api-script';

            head.appendChild(iframeResizerScript);
            head.appendChild(apiScript);

            apiScript.onload = function () {
                resolve();
            };
        });
    };

    EMagazine.prototype.componentDidMount = function componentDidMount() {
        var _this2 = this;

        this.loadJQuery().then(function () {
            return _this2.loadScripts();
        }).then(function () {
            return _this2.buyAndReadInit();
        });
    };

    EMagazine.prototype.componentWillUnmount = function componentWillUnmount() {
        this.removeScripts();
    };

    EMagazine.prototype.render = function render() {
        var page = this.props.page;


        var breadcrumbsProps = {
            parentId: page.parent,
            parentPage: {
                title: 'forside',
                link: '/'
            },
            currentPage: page
        };

        return _react2.default.createElement(
            'section',
            { className: 'page e-magazine' },
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
                            { className: 'page-heading' },
                            _react2.default.createElement(_Breadcrumbs2.default, breadcrumbsProps),
                            _react2.default.createElement(_PageTitle2.default, { title: page.title })
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'content' },
                            _react2.default.createElement('div', { id: 'barApiWrapper' })
                        )
                    )
                )
            )
        );
    };

    return EMagazine;
}(_react.Component);

exports.default = EMagazine;

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

/***/ "./assets/src/js/app/components/partials/PageNavigation.js":
/*!*****************************************************************!*\
  !*** ./assets/src/js/app/components/partials/PageNavigation.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");

var _reactDeviceDetect = __webpack_require__(/*! react-device-detect */ "./node_modules/react-device-detect/dist/index.js");

var _arrowIcon = __webpack_require__(/*! icons/arrow-icon.svg */ "./assets/build/img/icons/arrow-icon.svg");

var _arrowIcon2 = _interopRequireDefault(_arrowIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PageNavigation = function (_Component) {
    _inherits(PageNavigation, _Component);

    function PageNavigation(props) {
        _classCallCheck(this, PageNavigation);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props));

        _this.navigation = _react2.default.createRef();

        _this.togglerHandler = _this.togglerHandler.bind(_this);
        return _this;
    }

    PageNavigation.prototype.togglerHandler = function togglerHandler() {
        if (_reactDeviceDetect.isMobile) this.navigation.classList.toggle('is-opened');
    };

    PageNavigation.prototype.render = function render() {
        var _this2 = this;

        var _props = this.props,
            title = _props.title,
            links = _props.links;


        return _react2.default.createElement(
            'div',
            { className: 'page-navigation', ref: function ref(navigation) {
                    return _this2.navigation = navigation;
                } },
            _react2.default.createElement(
                'h3',
                { className: 'title', onClick: this.togglerHandler },
                title
            ),
            _react2.default.createElement(
                'span',
                { className: 'mobile-toggler' },
                _react2.default.createElement(_arrowIcon2.default, null)
            ),
            _react2.default.createElement(
                'nav',
                null,
                links.map(function (_ref) {
                    var id = _ref.id,
                        link = _ref.link,
                        title = _ref.title;

                    var lnk = link.split(window.location.origin)[1].replace(/\/$/, "");

                    return _react2.default.createElement(
                        _reactRouterDom.NavLink,
                        { key: id, to: lnk },
                        title
                    );
                })
            )
        );
    };

    return PageNavigation;
}(_react.Component);

exports.default = PageNavigation;

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

/***/ "./assets/src/js/app/containers/templates/Page.js":
/*!********************************************************!*\
  !*** ./assets/src/js/app/containers/templates/Page.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");

var _reactHtmlParser = __webpack_require__(/*! react-html-parser */ "./node_modules/react-html-parser/lib/index.js");

var _reactHtmlParser2 = _interopRequireDefault(_reactHtmlParser);

var _postsServices = __webpack_require__(/*! services/postsServices */ "./assets/src/js/app/services/postsServices.js");

var _Breadcrumbs = __webpack_require__(/*! components/partials/Breadcrumbs */ "./assets/src/js/app/components/partials/Breadcrumbs.js");

var _Breadcrumbs2 = _interopRequireDefault(_Breadcrumbs);

var _PageTitle = __webpack_require__(/*! components/partials/PageTitle */ "./assets/src/js/app/components/partials/PageTitle.js");

var _PageTitle2 = _interopRequireDefault(_PageTitle);

var _PageNavigation = __webpack_require__(/*! components/partials/PageNavigation */ "./assets/src/js/app/components/partials/PageNavigation.js");

var _PageNavigation2 = _interopRequireDefault(_PageNavigation);

var _NotFound = __webpack_require__(/*! components/NotFound */ "./assets/src/js/app/components/NotFound.js");

var _NotFound2 = _interopRequireDefault(_NotFound);

var _DailyNotes = __webpack_require__(/*! containers/templates/DailyNotes */ "./assets/src/js/app/containers/templates/DailyNotes.js");

var _DailyNotes2 = _interopRequireDefault(_DailyNotes);

var _ContactUs = __webpack_require__(/*! components/ContactUs */ "./assets/src/js/app/components/ContactUs.js");

var _ContactUs2 = _interopRequireDefault(_ContactUs);

var _EMagazine = __webpack_require__(/*! components/EMagazine */ "./assets/src/js/app/components/EMagazine.js");

var _EMagazine2 = _interopRequireDefault(_EMagazine);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Page = function (_Component) {
    _inherits(Page, _Component);

    function Page() {
        _classCallCheck(this, Page);

        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    Page.prototype.render = function render() {
        var _props = this.props,
            main = _props.main,
            posts_by_ids = _props.posts_by_ids;
        var _main$current_object = main.current_object,
            current_object = _main$current_object === undefined ? {} : _main$current_object,
            _main$children = main.children,
            children = _main$children === undefined ? [] : _main$children;


        var page = current_object;
        var posts = posts_by_ids;

        var parentPage = page.parent ? posts_by_ids[page.parent] : {};
        var navTitle = parentPage.title ? parentPage.title : page.title;

        var breadcrumbsProps = {
            parentId: page.parent,
            parentPage: parentPage,
            currentPage: page
        };

        var navigationProps = {
            links: (0, _postsServices.formPostsArray)(posts, children),
            title: navTitle
        };

        if (page.type === 'note_archive') {
            return _react2.default.createElement(_DailyNotes2.default, null);
        }

        if (page.type !== 'page') {
            return _react2.default.createElement(_NotFound2.default, null);
        }

        if (page.template === 'contact' || page.template === 'tips-oss') {
            return _react2.default.createElement(_ContactUs2.default, { page: current_object });
        }

        if (page.template === 'eblad') {
            return _react2.default.createElement(_EMagazine2.default, { page: current_object });
        }

        return _react2.default.createElement(
            'section',
            { className: 'page' },
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
                            { className: 'page-heading' },
                            _react2.default.createElement(_Breadcrumbs2.default, breadcrumbsProps),
                            _react2.default.createElement(_PageTitle2.default, { title: page.title }),
                            children.length ? _react2.default.createElement(_PageNavigation2.default, navigationProps) : ''
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'content' },
                            (0, _reactHtmlParser2.default)(page.content)
                        )
                    )
                )
            )
        );
    };

    return Page;
}(_react.Component);

var mapStateToProps = function mapStateToProps(_ref) {
    var main = _ref.main,
        posts_by_ids = _ref.posts_by_ids;
    return {
        main: main,
        posts_by_ids: posts_by_ids
    };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(Page);

/***/ })

}]);
//# sourceMappingURL=11.js.map