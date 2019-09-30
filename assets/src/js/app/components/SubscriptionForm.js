import React, { Component } from 'react';
import MaskedInput from 'react-text-mask';
import ReCAPTCHA from 'react-google-recaptcha';

import htmlParser from 'react-html-parser';

import config, { apiEndpoints, apiUrl } from 'utils/config';
import http from 'services/httpService';

import Link from 'components/InternalLink';
import PlusLabel from 'components/partials/PlusLabel';
import PlanItem from 'components/partials/PlanItem';
import DeliveryDayItem from 'components/partials/DeliveryDayItem';

import InputContainer from 'components/subscription-form-fields/InputContainer';
import InputField from 'components/subscription-form-fields/InputField';
import SelectField from 'components/subscription-form-fields/SelectField';
import InputCheckbox from 'components/subscription-form-fields/InputCheckbox';

import CalendarIcon from 'icons/calendar-icon.svg';

class SubscriptionForm extends Component {
  constructor(props) {
    super(props);

    const { month_price, enable_day_options } = this.props;

    this.capthcaSiteKey = config.recaptcha_key || '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI';

    // Creating options object for country_code Select
    this.countries = config.countries;
    this.countriesSelectValues = [
      { value: '', label: 'Land *', isDisabled: true },
      ...Object.keys(this.countries).map(countryCode => ({ value: countryCode, label: this.countries[countryCode] }))
    ];

    this.captcha = React.createRef();

    this.errorsStrings = {
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
      this.errorsStrings.deliveryDay = 'Vennligst velg hvilken dag du ønsker å motta papirutgaven';
    }

    this.placeholders = {
      datePicker: 'Fødselsdato *'
    };

    this.initialState = {
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
      product_id: this.props.product_id || '',
      product_code: this.props.product_code || '',
      deliveryDays: [
        {
          value: 'tuesday',
          title: 'Tirsdag',
          checked: false
        },
        {
          value: 'thursday',
          title: 'Torsdag',
          checked: false
        }
      ],
      subscriptions: [
        {
          value: 'month-sub',
          checked: false,
          title: 'Månedlig pris:',
          price: month_price,
          label: 'Ingen bindingstid'
        }
      ]
    };

    this.state = JSON.parse(JSON.stringify(this.initialState));

    this.handleSubscriptionChange = this.handleSubscriptionChange.bind(this);
    this.handleDeliveryDayChange = this.handleDeliveryDayChange.bind(this);
    this.recaptchaChangeHandler = this.recaptchaChangeHandler.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.sendHandler = this.sendHandler.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDateBlur = this.handleDateBlur.bind(this);
  }

  handleDeliveryDayChange(e) {
    const data = { ...this.state.data };
    const deliveryDays = [...this.state.deliveryDays];
    const errors = { ...this.state.errors };

    const targetRadio = e.target.querySelector('[type="radio"]');
    const currentValue = targetRadio.value;

    deliveryDays.forEach(item => {
      item.checked = false;

      if (currentValue === item.value) {
        item.checked = true;
        data.deliveryDay = currentValue;
      }
    });

    const prodId = targetRadio.dataset.product_option_id || this.state.product_option_id;
    const prodCode = targetRadio.dataset.product_option_code || this.state.product_option_code;

    errors.deliveryDay = '';

    this.setState({ deliveryDays, data, product_id: prodId, product_code: prodCode, errors });
  }

  handleSubscriptionChange(e) {
    const data = { ...this.state.data };
    const subscriptions = [...this.state.subscriptions];
    const errors = { ...this.state.errors };

    const currentValue = e.target.querySelector('[type="radio"]').value;

    subscriptions.forEach(item => {
      item.checked = false;

      if (currentValue === item.value) {
        item.checked = true;
        data.type = currentValue;
      }
    });

    errors.type = '';

    this.setState({ subscriptions, data, errors });
  }

  recaptchaChangeHandler(securityKey) {
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        recaptcha: securityKey
      },
      errors: {
        ...this.state.errors,
        recaptcha: ''
      }
    });
  }

  handleInputChange(e) {
    let data = { ...this.state.data };
    let errors = { ...this.state.errors };

    const { type, name } = e.target;
    const value = type === 'checkbox' ? e.target.checked : e.target.value;

    data[name] = value;
    errors[name] = !value ? this.errorsStrings[name] : '';

    this.setState({ data, errors });
  }
  handleSelectChange(e, inputName) {
    let data = { ...this.state.data };
    let errors = { ...this.state.errors };

    const { value } = e;

    data[inputName] = value;
    errors[inputName] = !value ? this.errorsStrings[inputName] : '';

    this.setState({ data, errors });
  }

  validationHandle() {
    let state = JSON.parse(JSON.stringify(this.state));

    const fields = Object.keys(state.data);

    const emailRegExp = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;

    const errs = fields.map(field => {
      if (field === 'email') {
        state.errors[field] = !emailRegExp.test(state.data[field]) ? this.errorsStrings[field] : '';
      } else if (field === 'deliveryDay') {
        state.errors[field] = this.props.enable_day_options && !state.data[field] ? this.errorsStrings[field] : '';
      } else {
        state.errors[field] = !state.data[field] ? this.errorsStrings[field] : '';
      }

      return state.errors[field];
    });

    this.setState(state);

    return errs.filter(error => error);
  }

  handleDateBlur(ev) {
    if (ev) {
      ev.target.placeholder = this.placeholders.datePicker;
    }
  }

  handleDateChange(date) {
    let data = { ...this.state.data };
    let errors = { ...this.state.errors };

    data.birthday = date;
    errors.birthday = '';

    this.setState({ data, errors });
  }

  sendHandler() {
    const { data } = this.state;
    const { product_id, product_code } = this.state;
    const { month_price, yearly_month_price, uniqSlug } = this.props;

    const price = data.type === 'month-sub' ? month_price : yearly_month_price;

    const dt = {
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
      product_id,
      product_code,
      price,
      type: data.type,
      delivery_day: data.deliveryDay
    };

    this.setState({ ...this.initialState, isLoading: true });

    http
      .post(`${apiUrl}${apiEndpoints.subscriptionForm}`, dt)
      .then(res => {
        this.setState({ ...this.initialState });
        this.captcha.reset();
        location.href = res.data;
      })
      .catch(err => {
        this.setState({ ...this.initialState });
        this.captcha.reset();
        console.log(err);
      });
  }

  handleSubmit(e) {
    e.preventDefault();

    const errs = this.validationHandle();

    if (!errs.length) {
      this.sendHandler();
    }
  }

  render() {
    const { subscriptions, deliveryDays, data, errors, isLoading } = this.state;
    const { enable_day_options, product_id_options, full_text } = this.props;
    const tryRenderDayOptions = () =>
      !!enable_day_options && (
        <div className="row">
          <div className="col-1-3">
            <h4>Jeg ønsker å motta papirutgaven</h4>
          </div>
          <div className="col-2-3">
            <InputContainer error={errors.deliveryDay}>
              {deliveryDays.map((delivery, ind) => (
                <DeliveryDayItem
                  {...delivery}
                  {...product_id_options[ind]}
                  key={delivery.value}
                  handleDeliveryDayChange={this.handleDeliveryDayChange}
                />
              ))}
            </InputContainer>
          </div>
        </div>
      );

    return (
      <div className="subscription-form">
        <form onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="col-1-3">
              <h4>For deg på farten</h4>
              <PlusLabel withLogo />
            </div>
            <div className="col-2-3">
              <InputContainer error={errors.type}>
                {subscriptions.map((subscription, i) => (
                  <PlanItem key={i} {...subscription} handleSubscriptionChange={this.handleSubscriptionChange} />
                ))}
              </InputContainer>
            </div>
          </div>
          {tryRenderDayOptions()}
          {!!full_text && (
            <div className="row">
              <div className="col-1-3">
                <h3>Inkludert i pakken:</h3>
              </div>
              <div className="col-2-3 product-description">{htmlParser(full_text)}</div>
            </div>
          )}
          <div className="row">
            <div className="col-1-3">
              <h3>dine opplysninger:</h3>
            </div>
            <div className={`col-2-3 ${isLoading ? 'loading' : ''}`}>
              <InputContainer error={errors.name}>
                <InputField
                  value={data.name}
                  inputType="text"
                  inputName="name"
                  placeholder="fornavn *"
                  changeHandler={this.handleInputChange}
                />
              </InputContainer>
              <InputContainer error={errors.surname}>
                <InputField
                  value={data.surname}
                  inputType="text"
                  inputName="surname"
                  placeholder="Etternavn *"
                  changeHandler={this.handleInputChange}
                />
              </InputContainer>

              <InputContainer error={errors.address}>
                <InputField
                  value={data.address}
                  inputType="text"
                  inputName="address"
                  placeholder="Adresse *"
                  changeHandler={this.handleInputChange}
                />
              </InputContainer>
              <div className="row">
                <div className="col-inner">
                  <InputContainer error={errors.postcode}>
                    <InputField
                      value={data.postcode}
                      inputType="number"
                      inputName="postcode"
                      placeholder="Postnummer *"
                      changeHandler={this.handleInputChange}
                    />
                  </InputContainer>
                </div>
                <div className="col-inner">
                  <InputContainer error={errors.city}>
                    <InputField
                      value={data.city}
                      inputType="text"
                      inputName="city"
                      placeholder="Poststed *"
                      changeHandler={this.handleInputChange}
                    />
                  </InputContainer>
                </div>
              </div>
              <InputContainer error={errors.country_code}>
                <SelectField
                  values={this.countriesSelectValues}
                  defaultValue={data.country_code}
                  inputType="text"
                  inputName="country_code"
                  placeholder="Land *"
                  changeHandler={this.handleSelectChange}
                />
              </InputContainer>

              <InputContainer error={errors.email}>
                <InputField
                  value={data.email}
                  inputType="email"
                  inputName="email"
                  placeholder="e-post *"
                  changeHandler={this.handleInputChange}
                />
              </InputContainer>
              <div className="row">
                <div className="col-inner">
                  <InputContainer error={errors.phone}>
                    <InputField
                      value={data.phone}
                      inputType="number"
                      inputName="phone"
                      placeholder="telefon"
                      changeHandler={this.handleInputChange}
                    />
                  </InputContainer>
                </div>
                <div className="col-inner">
                  <InputContainer>
                    <MaskedInput value={data.birthday}
                                 mask={[/[0-9]/, /[0-9]/, '/', /[0-9]/, /[0-9]/, '/', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/]}
                                 name="birthday"
                                 type="text"
                                 placeholder="Fødselsdato *" onChange={this.handleInputChange}/>
                    <CalendarIcon className="calendar-icon" />
                  </InputContainer>
                </div>
              </div>
              <InputContainer error={errors.customer_service} isCheckboxContainer>
                <InputCheckbox
                  checked={data.customer_service}
                  checkboxName="customer_service"
                  changeHandler={this.handleInputChange}
                >
                  Jeg godtar{' '}
                  <Link to="/abonnementsvilkar/" target="_blank">
                    abonnementsvilkårene
                  </Link>
                </InputCheckbox>
              </InputContainer>
              <InputContainer error={errors.may_contact} isCheckboxContainer>
                <InputCheckbox
                  checked={data.may_contact}
                  checkboxName="may_contact"
                  changeHandler={this.handleInputChange}
                >
                  Jeg godtar at TGN kontakter meg med relevante tilbud
                </InputCheckbox>
              </InputContainer>
              <InputContainer error={errors.recaptcha}>
                <ReCAPTCHA
                  sitekey={this.capthcaSiteKey}
                  ref={e => (this.captcha = e)}
                  onChange={this.recaptchaChangeHandler}
                />
              </InputContainer>
              <button type="submit" className="submit">
                Fullfør kjøp med betalingskort
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default SubscriptionForm;
