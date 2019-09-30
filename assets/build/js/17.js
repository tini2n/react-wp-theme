(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[17],{

/***/ "./assets/build/img/icons/calendar-icon.svg":
/*!**************************************************!*\
  !*** ./assets/build/img/icons/calendar-icon.svg ***!
  \**************************************************/
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
  fillRule: "evenodd",
  d: "M2 8V4h2v2h2V4h3v2h2V4h3v2h2V4h2v4H2zm0 10h16v-8H2v8zM16 2V0h-2v2h-3V0H9v2H6V0H4v2H0v18h20V2h-4z"
});

var SvgCalendarIcon = function SvgCalendarIcon(props) {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("svg", _extends({
    width: 20,
    height: 20
  }, props), _ref);
};

/* harmony default export */ __webpack_exports__["default"] = (SvgCalendarIcon);

/***/ }),

/***/ "./assets/src/js/app/components/SubscriptionForm.js":
/*!**********************************************************!*\
  !*** ./assets/src/js/app/components/SubscriptionForm.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _reactTextMask = __webpack_require__(/*! react-text-mask */ "./node_modules/react-text-mask/dist/reactTextMask.js");

var _reactTextMask2 = _interopRequireDefault(_reactTextMask);

var _reactGoogleRecaptcha = __webpack_require__(/*! react-google-recaptcha */ "./node_modules/react-google-recaptcha/lib/esm/index.js");

var _reactGoogleRecaptcha2 = _interopRequireDefault(_reactGoogleRecaptcha);

var _reactHtmlParser = __webpack_require__(/*! react-html-parser */ "./node_modules/react-html-parser/lib/index.js");

var _reactHtmlParser2 = _interopRequireDefault(_reactHtmlParser);

var _config = __webpack_require__(/*! utils/config */ "./assets/src/js/app/utils/config.js");

var _config2 = _interopRequireDefault(_config);

var _httpService = __webpack_require__(/*! services/httpService */ "./assets/src/js/app/services/httpService.js");

var _httpService2 = _interopRequireDefault(_httpService);

var _InternalLink = __webpack_require__(/*! components/InternalLink */ "./assets/src/js/app/components/InternalLink.js");

var _InternalLink2 = _interopRequireDefault(_InternalLink);

var _PlusLabel = __webpack_require__(/*! components/partials/PlusLabel */ "./assets/src/js/app/components/partials/PlusLabel.js");

var _PlusLabel2 = _interopRequireDefault(_PlusLabel);

var _PlanItem = __webpack_require__(/*! components/partials/PlanItem */ "./assets/src/js/app/components/partials/PlanItem.js");

var _PlanItem2 = _interopRequireDefault(_PlanItem);

var _DeliveryDayItem = __webpack_require__(/*! components/partials/DeliveryDayItem */ "./assets/src/js/app/components/partials/DeliveryDayItem.js");

var _DeliveryDayItem2 = _interopRequireDefault(_DeliveryDayItem);

var _InputContainer = __webpack_require__(/*! components/subscription-form-fields/InputContainer */ "./assets/src/js/app/components/subscription-form-fields/InputContainer.js");

var _InputContainer2 = _interopRequireDefault(_InputContainer);

var _InputField = __webpack_require__(/*! components/subscription-form-fields/InputField */ "./assets/src/js/app/components/subscription-form-fields/InputField.js");

var _InputField2 = _interopRequireDefault(_InputField);

var _SelectField = __webpack_require__(/*! components/subscription-form-fields/SelectField */ "./assets/src/js/app/components/subscription-form-fields/SelectField.js");

var _SelectField2 = _interopRequireDefault(_SelectField);

var _InputCheckbox = __webpack_require__(/*! components/subscription-form-fields/InputCheckbox */ "./assets/src/js/app/components/subscription-form-fields/InputCheckbox.js");

var _InputCheckbox2 = _interopRequireDefault(_InputCheckbox);

var _calendarIcon = __webpack_require__(/*! icons/calendar-icon.svg */ "./assets/build/img/icons/calendar-icon.svg");

var _calendarIcon2 = _interopRequireDefault(_calendarIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SubscriptionForm = function (_Component) {
  _inherits(SubscriptionForm, _Component);

  function SubscriptionForm(props) {
    _classCallCheck(this, SubscriptionForm);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    var _this$props = _this.props,
        month_price = _this$props.month_price,
        enable_day_options = _this$props.enable_day_options;


    _this.capthcaSiteKey = _config2.default.recaptcha_key || '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI';

    // Creating options object for country_code Select
    _this.countries = _config2.default.countries;
    _this.countriesSelectValues = [{ value: '', label: 'Land *', isDisabled: true }].concat(Object.keys(_this.countries).map(function (countryCode) {
      return { value: countryCode, label: _this.countries[countryCode] };
    }));

    _this.captcha = _react2.default.createRef();

    _this.errorsStrings = {
      name: 'Navnet du har oppgitt er ikke gyldig',
      surname: 'Navnet du har oppgitt er ikke gyldig',
      address: 'ADRESSEN DU HAR OPPGITT ER IKKE GYLDIG',
      postcode: 'POSTNUMMERET DU HAR OPPGITT ER IKKE GYLDIG',
      city: 'POSTSTEDET DU HAR OPPGITT ER IKKE GYLDIG',
      country: 'LANDET DU HAR OPPGITT ER IKKE GYLDIG',
      email: 'E-post adressen er ikke gyldig',
      // phone: 'Telefon nummeret er ikke gyldig',
      type: 'Velg ønsket abonnement',
      customer_service: 'Vennligst godta abonnementsvilkårene for å fortsette',
      recaptcha: 'Captcha mislyktes, vennligst prøv igjen'
    };

    if (enable_day_options) {
      _this.errorsStrings.deliveryDay = 'Vennligst velg hvilken dag du ønsker å motta papirutgaven';
    }

    _this.placeholders = {
      datePicker: 'Fødselsdato *'
    };

    _this.initialState = {
      isLoading: false,
      errors: {
        name: '',
        surname: '',
        address: '',
        postcode: '',
        city: '',
        country_code: '',
        email: '',
        phone: '',
        type: '',
        customer_service: '',
        birthday: '',
        recaptcha: '',
        deliveryDay: ''
      },
      data: {
        name: '',
        surname: '',
        address: '',
        postcode: '',
        city: '',
        country_code: 'NO',
        email: '',
        phone: '',
        birthday: '',
        type: null,
        deliveryDay: null,
        customer_service: false,
        may_contact: false,
        recaptcha: null
      },
      product_id: _this.props.product_id || '',
      product_code: _this.props.product_code || '',
      deliveryDays: [{
        value: 'tuesday',
        title: 'Tirsdag',
        checked: false
      }, {
        value: 'thursday',
        title: 'Torsdag',
        checked: false
      }],
      subscriptions: [{
        value: 'month-sub',
        checked: false,
        title: 'Månedlig pris:',
        price: month_price,
        label: 'Ingen bindingstid'
      }]
    };

    _this.state = JSON.parse(JSON.stringify(_this.initialState));

    _this.handleSubscriptionChange = _this.handleSubscriptionChange.bind(_this);
    _this.handleDeliveryDayChange = _this.handleDeliveryDayChange.bind(_this);
    _this.recaptchaChangeHandler = _this.recaptchaChangeHandler.bind(_this);
    _this.handleInputChange = _this.handleInputChange.bind(_this);
    _this.handleSelectChange = _this.handleSelectChange.bind(_this);
    _this.handleDateChange = _this.handleDateChange.bind(_this);
    _this.sendHandler = _this.sendHandler.bind(_this);
    _this.handleSubmit = _this.handleSubmit.bind(_this);
    _this.handleDateBlur = _this.handleDateBlur.bind(_this);
    return _this;
  }

  SubscriptionForm.prototype.handleDeliveryDayChange = function handleDeliveryDayChange(e) {
    var data = _extends({}, this.state.data);
    var deliveryDays = [].concat(this.state.deliveryDays);
    var errors = _extends({}, this.state.errors);

    var targetRadio = e.target.querySelector('[type="radio"]');
    var currentValue = targetRadio.value;

    deliveryDays.forEach(function (item) {
      item.checked = false;

      if (currentValue === item.value) {
        item.checked = true;
        data.deliveryDay = currentValue;
      }
    });

    var prodId = targetRadio.dataset.product_option_id || this.state.product_option_id;
    var prodCode = targetRadio.dataset.product_option_code || this.state.product_option_code;

    errors.deliveryDay = '';

    this.setState({ deliveryDays: deliveryDays, data: data, product_id: prodId, product_code: prodCode, errors: errors });
  };

  SubscriptionForm.prototype.handleSubscriptionChange = function handleSubscriptionChange(e) {
    var data = _extends({}, this.state.data);
    var subscriptions = [].concat(this.state.subscriptions);
    var errors = _extends({}, this.state.errors);

    var currentValue = e.target.querySelector('[type="radio"]').value;

    subscriptions.forEach(function (item) {
      item.checked = false;

      if (currentValue === item.value) {
        item.checked = true;
        data.type = currentValue;
      }
    });

    errors.type = '';

    this.setState({ subscriptions: subscriptions, data: data, errors: errors });
  };

  SubscriptionForm.prototype.recaptchaChangeHandler = function recaptchaChangeHandler(securityKey) {
    this.setState(_extends({}, this.state, {
      data: _extends({}, this.state.data, {
        recaptcha: securityKey
      }),
      errors: _extends({}, this.state.errors, {
        recaptcha: ''
      })
    }));
  };

  SubscriptionForm.prototype.handleInputChange = function handleInputChange(e) {
    var data = _extends({}, this.state.data);
    var errors = _extends({}, this.state.errors);

    var _e$target = e.target,
        type = _e$target.type,
        name = _e$target.name;

    var value = type === 'checkbox' ? e.target.checked : e.target.value;

    data[name] = value;
    errors[name] = !value ? this.errorsStrings[name] : '';

    this.setState({ data: data, errors: errors });
  };

  SubscriptionForm.prototype.handleSelectChange = function handleSelectChange(e, inputName) {
    var data = _extends({}, this.state.data);
    var errors = _extends({}, this.state.errors);

    var value = e.value;


    data[inputName] = value;
    errors[inputName] = !value ? this.errorsStrings[inputName] : '';

    this.setState({ data: data, errors: errors });
  };

  SubscriptionForm.prototype.validationHandle = function validationHandle() {
    var _this2 = this;

    var state = JSON.parse(JSON.stringify(this.state));

    var fields = Object.keys(state.data);

    var emailRegExp = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;

    var errs = fields.map(function (field) {
      if (field === 'email') {
        state.errors[field] = !emailRegExp.test(state.data[field]) ? _this2.errorsStrings[field] : '';
      } else if (field === 'deliveryDay') {
        state.errors[field] = _this2.props.enable_day_options && !state.data[field] ? _this2.errorsStrings[field] : '';
      } else {
        state.errors[field] = !state.data[field] ? _this2.errorsStrings[field] : '';
      }

      return state.errors[field];
    });

    this.setState(state);

    return errs.filter(function (error) {
      return error;
    });
  };

  SubscriptionForm.prototype.handleDateBlur = function handleDateBlur(ev) {
    if (ev) {
      ev.target.placeholder = this.placeholders.datePicker;
    }
  };

  SubscriptionForm.prototype.handleDateChange = function handleDateChange(date) {
    var data = _extends({}, this.state.data);
    var errors = _extends({}, this.state.errors);

    data.birthday = date;
    errors.birthday = '';

    this.setState({ data: data, errors: errors });
  };

  SubscriptionForm.prototype.sendHandler = function sendHandler() {
    var _this3 = this;

    var data = this.state.data;
    var _state = this.state,
        product_id = _state.product_id,
        product_code = _state.product_code;
    var _props = this.props,
        month_price = _props.month_price,
        yearly_month_price = _props.yearly_month_price,
        uniqSlug = _props.uniqSlug;


    var price = data.type === 'month-sub' ? month_price : yearly_month_price;

    var dt = {
      'g-recaptcha-response': data.recaptcha,
      name: data.name,
      surname: data.surname,
      street: data.address,
      postal_code: data.postcode,
      postal_place: data.city,
      country_code: data.country_code,
      email: data.email,
      phone: data.phone,
      birthday: data.birthday,
      unique_slug: uniqSlug,
      product_id: product_id,
      product_code: product_code,
      price: price,
      type: data.type,
      delivery_day: data.deliveryDay
    };

    this.setState(_extends({}, this.initialState, { isLoading: true }));

    _httpService2.default.post('' + _config.apiUrl + _config.apiEndpoints.subscriptionForm, dt).then(function (res) {
      _this3.setState(_extends({}, _this3.initialState));
      _this3.captcha.reset();
      location.href = res.data;
    }).catch(function (err) {
      _this3.setState(_extends({}, _this3.initialState));
      _this3.captcha.reset();
      console.log(err);
    });
  };

  SubscriptionForm.prototype.handleSubmit = function handleSubmit(e) {
    e.preventDefault();

    var errs = this.validationHandle();

    if (!errs.length) {
      this.sendHandler();
    }
  };

  SubscriptionForm.prototype.render = function render() {
    var _this4 = this;

    var _state2 = this.state,
        subscriptions = _state2.subscriptions,
        deliveryDays = _state2.deliveryDays,
        data = _state2.data,
        errors = _state2.errors,
        isLoading = _state2.isLoading;
    var _props2 = this.props,
        enable_day_options = _props2.enable_day_options,
        product_id_options = _props2.product_id_options,
        full_text = _props2.full_text;

    var tryRenderDayOptions = function tryRenderDayOptions() {
      return !!enable_day_options && _react2.default.createElement(
        'div',
        { className: 'row' },
        _react2.default.createElement(
          'div',
          { className: 'col-1-3' },
          _react2.default.createElement(
            'h4',
            null,
            'Jeg \xF8nsker \xE5 motta papirutgaven'
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'col-2-3' },
          _react2.default.createElement(
            _InputContainer2.default,
            { error: errors.deliveryDay },
            deliveryDays.map(function (delivery, ind) {
              return _react2.default.createElement(_DeliveryDayItem2.default, _extends({}, delivery, product_id_options[ind], {
                key: delivery.value,
                handleDeliveryDayChange: _this4.handleDeliveryDayChange
              }));
            })
          )
        )
      );
    };

    return _react2.default.createElement(
      'div',
      { className: 'subscription-form' },
      _react2.default.createElement(
        'form',
        { onSubmit: this.handleSubmit },
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            'div',
            { className: 'col-1-3' },
            _react2.default.createElement(
              'h4',
              null,
              'For deg p\xE5 farten'
            ),
            _react2.default.createElement(_PlusLabel2.default, { withLogo: true })
          ),
          _react2.default.createElement(
            'div',
            { className: 'col-2-3' },
            _react2.default.createElement(
              _InputContainer2.default,
              { error: errors.type },
              subscriptions.map(function (subscription, i) {
                return _react2.default.createElement(_PlanItem2.default, _extends({ key: i }, subscription, { handleSubscriptionChange: _this4.handleSubscriptionChange }));
              })
            )
          )
        ),
        tryRenderDayOptions(),
        !!full_text && _react2.default.createElement(
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
            (0, _reactHtmlParser2.default)(full_text)
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
              'dine opplysninger:'
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'col-2-3 ' + (isLoading ? 'loading' : '') },
            _react2.default.createElement(
              _InputContainer2.default,
              { error: errors.name },
              _react2.default.createElement(_InputField2.default, {
                value: data.name,
                inputType: 'text',
                inputName: 'name',
                placeholder: 'fornavn *',
                changeHandler: this.handleInputChange
              })
            ),
            _react2.default.createElement(
              _InputContainer2.default,
              { error: errors.surname },
              _react2.default.createElement(_InputField2.default, {
                value: data.surname,
                inputType: 'text',
                inputName: 'surname',
                placeholder: 'Etternavn *',
                changeHandler: this.handleInputChange
              })
            ),
            _react2.default.createElement(
              _InputContainer2.default,
              { error: errors.address },
              _react2.default.createElement(_InputField2.default, {
                value: data.address,
                inputType: 'text',
                inputName: 'address',
                placeholder: 'Adresse *',
                changeHandler: this.handleInputChange
              })
            ),
            _react2.default.createElement(
              'div',
              { className: 'row' },
              _react2.default.createElement(
                'div',
                { className: 'col-inner' },
                _react2.default.createElement(
                  _InputContainer2.default,
                  { error: errors.postcode },
                  _react2.default.createElement(_InputField2.default, {
                    value: data.postcode,
                    inputType: 'number',
                    inputName: 'postcode',
                    placeholder: 'Postnummer *',
                    changeHandler: this.handleInputChange
                  })
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'col-inner' },
                _react2.default.createElement(
                  _InputContainer2.default,
                  { error: errors.city },
                  _react2.default.createElement(_InputField2.default, {
                    value: data.city,
                    inputType: 'text',
                    inputName: 'city',
                    placeholder: 'Poststed *',
                    changeHandler: this.handleInputChange
                  })
                )
              )
            ),
            _react2.default.createElement(
              _InputContainer2.default,
              { error: errors.country_code },
              _react2.default.createElement(_SelectField2.default, {
                values: this.countriesSelectValues,
                defaultValue: data.country_code,
                inputType: 'text',
                inputName: 'country_code',
                placeholder: 'Land *',
                changeHandler: this.handleSelectChange
              })
            ),
            _react2.default.createElement(
              _InputContainer2.default,
              { error: errors.email },
              _react2.default.createElement(_InputField2.default, {
                value: data.email,
                inputType: 'email',
                inputName: 'email',
                placeholder: 'e-post *',
                changeHandler: this.handleInputChange
              })
            ),
            _react2.default.createElement(
              'div',
              { className: 'row' },
              _react2.default.createElement(
                'div',
                { className: 'col-inner' },
                _react2.default.createElement(
                  _InputContainer2.default,
                  { error: errors.phone },
                  _react2.default.createElement(_InputField2.default, {
                    value: data.phone,
                    inputType: 'number',
                    inputName: 'phone',
                    placeholder: 'telefon',
                    changeHandler: this.handleInputChange
                  })
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'col-inner' },
                _react2.default.createElement(
                  _InputContainer2.default,
                  null,
                  _react2.default.createElement(_reactTextMask2.default, { value: data.birthday,
                    mask: [/[0-9]/, /[0-9]/, '/', /[0-9]/, /[0-9]/, '/', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/],
                    name: 'birthday',
                    type: 'text',
                    placeholder: 'F\xF8dselsdato *', onChange: this.handleInputChange }),
                  _react2.default.createElement(_calendarIcon2.default, { className: 'calendar-icon' })
                )
              )
            ),
            _react2.default.createElement(
              _InputContainer2.default,
              { error: errors.customer_service, isCheckboxContainer: true },
              _react2.default.createElement(
                _InputCheckbox2.default,
                {
                  checked: data.customer_service,
                  checkboxName: 'customer_service',
                  changeHandler: this.handleInputChange
                },
                'Jeg godtar',
                ' ',
                _react2.default.createElement(
                  _InternalLink2.default,
                  { to: '/abonnementsvilkar/', target: '_blank' },
                  'abonnementsvilk\xE5rene'
                )
              )
            ),
            _react2.default.createElement(
              _InputContainer2.default,
              { error: errors.may_contact, isCheckboxContainer: true },
              _react2.default.createElement(
                _InputCheckbox2.default,
                {
                  checked: data.may_contact,
                  checkboxName: 'may_contact',
                  changeHandler: this.handleInputChange
                },
                'Jeg godtar at TGN kontakter meg med relevante tilbud'
              )
            ),
            _react2.default.createElement(
              _InputContainer2.default,
              { error: errors.recaptcha },
              _react2.default.createElement(_reactGoogleRecaptcha2.default, {
                sitekey: this.capthcaSiteKey,
                ref: function ref(e) {
                  return _this4.captcha = e;
                },
                onChange: this.recaptchaChangeHandler
              })
            ),
            _react2.default.createElement(
              'button',
              { type: 'submit', className: 'submit' },
              'Fullf\xF8r kj\xF8p med betalingskort'
            )
          )
        )
      )
    );
  };

  return SubscriptionForm;
}(_react.Component);

exports.default = SubscriptionForm;

/***/ }),

/***/ "./assets/src/js/app/components/partials/DeliveryDayItem.js":
/*!******************************************************************!*\
  !*** ./assets/src/js/app/components/partials/DeliveryDayItem.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DeliveryDayItem = function DeliveryDayItem(_ref) {
  var title = _ref.title,
      value = _ref.value,
      checked = _ref.checked,
      product_option_id = _ref.product_option_id,
      product_option_code = _ref.product_option_code,
      handleDeliveryDayChange = _ref.handleDeliveryDayChange;

  return _react2.default.createElement(
    'div',
    { className: 'subscription-item delivery ' + (checked ? 'active' : ''), onClick: handleDeliveryDayChange },
    _react2.default.createElement(
      'div',
      { className: 'text-container' },
      _react2.default.createElement(
        'p',
        null,
        title
      )
    ),
    _react2.default.createElement(
      'div',
      { className: 'radio' },
      _react2.default.createElement('input', {
        type: 'radio',
        'data-product_option_id': product_option_id,
        'data-product_option_code': product_option_code,
        value: value,
        checked: checked,
        readOnly: true,
        name: 'delivery-day'
      }),
      _react2.default.createElement('span', null)
    )
  );
};

exports.default = DeliveryDayItem;

/***/ }),

/***/ "./assets/src/js/app/components/partials/PlanItem.js":
/*!***********************************************************!*\
  !*** ./assets/src/js/app/components/partials/PlanItem.js ***!
  \***********************************************************/
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

var SubscriptionItem = function (_Component) {
    _inherits(SubscriptionItem, _Component);

    function SubscriptionItem(props) {
        _classCallCheck(this, SubscriptionItem);

        return _possibleConstructorReturn(this, _Component.call(this, props));
    }

    SubscriptionItem.prototype.render = function render() {
        var _props = this.props,
            title = _props.title,
            price = _props.price,
            label = _props.label,
            checked = _props.checked,
            value = _props.value,
            handleSubscriptionChange = _props.handleSubscriptionChange;


        return _react2.default.createElement(
            'div',
            { className: 'subscription-item ' + (checked ? 'active' : ''), onClick: handleSubscriptionChange },
            _react2.default.createElement(
                'div',
                { className: 'text-container' },
                _react2.default.createElement(
                    'p',
                    null,
                    title
                ),
                _react2.default.createElement(
                    'span',
                    { className: 'price' },
                    'Kr ',
                    _react2.default.createElement(
                        'strong',
                        null,
                        price
                    ),
                    ' / mnd'
                ),
                _react2.default.createElement(
                    'i',
                    null,
                    label
                )
            ),
            _react2.default.createElement(
                'div',
                { className: 'radio' },
                _react2.default.createElement('input', { type: 'radio',
                    value: value,
                    checked: checked,
                    readOnly: true,
                    name: 'subscriptions' }),
                _react2.default.createElement('span', null)
            )
        );
    };

    return SubscriptionItem;
}(_react.Component);

exports.default = SubscriptionItem;

/***/ }),

/***/ "./assets/src/js/app/components/subscription-form-fields/InputCheckbox.js":
/*!********************************************************************************!*\
  !*** ./assets/src/js/app/components/subscription-form-fields/InputCheckbox.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var InputCheckbox = function InputCheckbox(_ref) {
    var children = _ref.children,
        checked = _ref.checked,
        checkboxName = _ref.checkboxName,
        changeHandler = _ref.changeHandler;
    return _react2.default.createElement(
        "label",
        null,
        children,
        _react2.default.createElement("input", { type: "checkbox",
            name: checkboxName,
            checked: checked,
            onChange: changeHandler }),
        _react2.default.createElement("span", null)
    );
};

exports.default = InputCheckbox;

/***/ }),

/***/ "./assets/src/js/app/components/subscription-form-fields/InputContainer.js":
/*!*********************************************************************************!*\
  !*** ./assets/src/js/app/components/subscription-form-fields/InputContainer.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var InputContainer = function InputContainer(_ref) {
    var error = _ref.error,
        isCheckboxContainer = _ref.isCheckboxContainer,
        children = _ref.children;
    return _react2.default.createElement(
        'div',
        { className: (isCheckboxContainer ? 'checkbox-item' : 'input-item') + ' ' + (error ? 'error' : '') },
        children,
        error && _react2.default.createElement(
            'p',
            { className: 'error-msg' },
            error
        )
    );
};

exports.default = InputContainer;

/***/ }),

/***/ "./assets/src/js/app/components/subscription-form-fields/InputField.js":
/*!*****************************************************************************!*\
  !*** ./assets/src/js/app/components/subscription-form-fields/InputField.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var InputField = function InputField(_ref) {
    var value = _ref.value,
        inputType = _ref.inputType,
        inputName = _ref.inputName,
        changeHandler = _ref.changeHandler,
        placeholder = _ref.placeholder;
    return _react2.default.createElement('input', { type: inputType,
        name: inputName,
        value: value,
        placeholder: placeholder,
        onChange: changeHandler });
};

exports.default = InputField;

/***/ }),

/***/ "./assets/src/js/app/components/subscription-form-fields/SelectField.js":
/*!******************************************************************************!*\
  !*** ./assets/src/js/app/components/subscription-form-fields/SelectField.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _withSelect = __webpack_require__(/*! ../../hoc/withSelect */ "./assets/src/js/app/hoc/withSelect.js");

var _withSelect2 = _interopRequireDefault(_withSelect);

var _reactContentLoader = __webpack_require__(/*! react-content-loader */ "./node_modules/react-content-loader/dist/react-content-loader.es.js");

var _reactContentLoader2 = _interopRequireDefault(_reactContentLoader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SelectField = function SelectField(_ref) {
  var _ref$values = _ref.values,
      values = _ref$values === undefined ? {} : _ref$values,
      _ref$defaultValue = _ref.defaultValue,
      defaultValue = _ref$defaultValue === undefined ? '' : _ref$defaultValue,
      inputType = _ref.inputType,
      inputName = _ref.inputName,
      changeHandler = _ref.changeHandler,
      selectLib = _ref.selectLib;

  // selectLib comes from HOC and loads async
  var Select = selectLib && selectLib.default;

  var handleChange = function handleChange(e) {
    changeHandler(e, inputName);
  };

  return Select ? _react2.default.createElement(Select, {
    className: 'react-select-container',
    classNamePrefix: 'react-select',
    options: values,
    onChange: handleChange,
    type: inputType,
    defaultValue: values[values.findIndex(function (el) {
      return el.value === defaultValue;
    })]
  }) : _react2.default.createElement(
    _reactContentLoader2.default,
    { height: 40 },
    _react2.default.createElement('rect', { x: '0', y: '0', rx: '0', ry: '0', width: '520', height: '50' })
  );
};

exports.default = (0, _withSelect2.default)(SelectField);

/***/ }),

/***/ "./assets/src/js/app/containers/templates/Subscription.js":
/*!****************************************************************!*\
  !*** ./assets/src/js/app/containers/templates/Subscription.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

var _config = __webpack_require__(/*! utils/config */ "./assets/src/js/app/utils/config.js");

var _config2 = _interopRequireDefault(_config);

var _Breadcrumbs = __webpack_require__(/*! components/partials/Breadcrumbs */ "./assets/src/js/app/components/partials/Breadcrumbs.js");

var _Breadcrumbs2 = _interopRequireDefault(_Breadcrumbs);

var _PageTitle = __webpack_require__(/*! components/partials/PageTitle */ "./assets/src/js/app/components/partials/PageTitle.js");

var _PageTitle2 = _interopRequireDefault(_PageTitle);

var _SubscriptionForm = __webpack_require__(/*! components/SubscriptionForm */ "./assets/src/js/app/components/SubscriptionForm.js");

var _SubscriptionForm2 = _interopRequireDefault(_SubscriptionForm);

var _InternalLink = __webpack_require__(/*! components/InternalLink */ "./assets/src/js/app/components/InternalLink.js");

var _InternalLink2 = _interopRequireDefault(_InternalLink);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Subscription = function (_Component) {
    _inherits(Subscription, _Component);

    function Subscription() {
        _classCallCheck(this, Subscription);

        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    Subscription.prototype.render = function render() {
        var unique_slug = this.props.unique_slug;
        var products = _config2.default.products;


        var product = products.find(function (el) {
            return el.unique_slug === unique_slug;
        });

        var breadcrumbsProps = {
            parentId: 1,
            parentPage: { title: 'TGN Pluss', link: _config2.default.routes.subscription },
            currentPage: { title: product.title }
        };

        return _react2.default.createElement(
            'section',
            { className: 'subscription' },
            _react2.default.createElement(
                'div',
                { className: 'wrapper-thin' },
                _react2.default.createElement(
                    'div',
                    { className: 'page-heading' },
                    _react2.default.createElement(_Breadcrumbs2.default, breadcrumbsProps),
                    _react2.default.createElement(_PageTitle2.default, { title: 'Abonnement' })
                ),
                _react2.default.createElement(
                    'h2',
                    { className: 'subtitle' },
                    product.title,
                    _react2.default.createElement(
                        _InternalLink2.default,
                        { to: _config2.default.routes.subscription },
                        'skift pakke'
                    )
                ),
                _react2.default.createElement(_SubscriptionForm2.default, _extends({}, product, { uniqSlug: unique_slug }))
            )
        );
    };

    return Subscription;
}(_react.Component);

exports.default = Subscription;

/***/ }),

/***/ "./assets/src/js/app/hoc/withSelect.js":
/*!*********************************************!*\
  !*** ./assets/src/js/app/hoc/withSelect.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(/*! react */ "./node_modules/react/index.js");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

exports.default = function (WrappedComponent) {
  return function (_Component) {
    _inherits(WithSelect, _Component);

    function WithSelect(props) {
      _classCallCheck(this, WithSelect);

      var _this = _possibleConstructorReturn(this, _Component.call(this, props));

      _this.state = {
        selectLib: null
      };
      return _this;
    }

    WithSelect.prototype.componentDidMount = function componentDidMount() {
      var _this2 = this;

      __webpack_require__.e(/*! import() */ 14).then(__webpack_require__.bind(null, /*! react-select */ "./node_modules/react-select/dist/react-select.browser.esm.js")).then(function (module) {
        _this2.setState({
          selectLib: module
        });
      });
    };

    WithSelect.prototype.render = function render() {
      return _react2.default.createElement(WrappedComponent, _extends({ selectLib: this.state.selectLib }, this.props));
    };

    return WithSelect;
  }(_react.Component);
};

/***/ })

}]);
//# sourceMappingURL=17.js.map