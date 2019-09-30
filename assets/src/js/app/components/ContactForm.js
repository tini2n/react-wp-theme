import React, { Component, Fragment } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

import config, { apiEndpoints, apiUrl } from 'utils/config'
import http from 'services/httpService'

import CheckboxItem from 'components/CheckboxItem';
import Link from 'components/InternalLink';

class ContactForm extends Component {
    constructor(props) {
        super(props);

        this.capthcaSiteKey = config.recaptcha_key ? config.recaptcha_key : '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI';

        this.submitHandler = this.submitHandler.bind(this);
        this.inputChangeHandler = this.inputChangeHandler.bind(this);
        this.recaptchaChangeHandler = this.recaptchaChangeHandler.bind(this);

        this.captcha = React.createRef();

        this.state = {
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
        }
    }

    inputChangeHandler(e) {
        const name = e.target.name;
        const value = e.target.value;
        const errors = this.state.errors;

        let error;

        switch (name) {
            case 'privacy':
                error = e.target.checked ? '' : 'Please check...';
                break;
            default:
                error = value ? '' : 'Please fill field...';
                break;
        }

        this.setState({
            [name]: value,
            errors: { ...errors, [name]: error }
        })
    }

    validateForm() {
        const { errors } = this.state;

        let newErrors = errors;

        const validateInputFields = Object.keys(errors);

        validateInputFields.map(name => {
            if (!this.state[name]) {
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

        if (this.state.captcha)
            newErrors.captcha = '';

        this.setState({ errors: newErrors });
    }

    recaptchaChangeHandler(securityKey) {
        this.setState({ captcha: securityKey });
    }

    sendHandler() {
        const {
            name,
            lastname,
            email,
            phone,
            message,
            captcha
        } = this.state;

        this.setState({ isLoading: true });

        const formType = this.props.template === 'contact' ? 'default' : 'tips_oss';

        http.post(`${apiUrl}${apiEndpoints.contactForm}`, {
            f_name: name,
            l_name: lastname,
            email: email,
            tel: phone,
            message: message,
            ['g-recaptcha-response']: captcha,
            form_type: formType,
        })
            .then(() => {
                this.captcha.props.grecaptcha.reset();

                this.setState({
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
            })
            .catch(err => {
                this.captcha.props.grecaptcha.reset();
                this.setState({ isLoading: false });
                console.log(err);
            })
    }

    submitHandler(e) {
        e.preventDefault();

        const { errors } = this.state;

        this.validateForm();
        const notValidFields = Object.keys(errors).filter(name => errors[name] && name);

        if (!notValidFields.length) {
            this.sendHandler();
        }
    }

    render() {
        const {
            errors,
            isLoading,
            isSuccess
        } = this.state;

        const checkboxLabel = (
            <Fragment>
                Jeg godtar <Link to="/personvernerklaering/" target="_blank">personvernbetingelsene</Link>
            </Fragment>
        );

        return (
            <div className="contact-form">
                <div className="heading">
                    <h3>Kontaktskjema</h3>
                    <p>Vi har som mål å behandle din e-posthenvendelse innen 24 timer (mandag-fredag).</p>
                </div>
                <form onSubmit={this.submitHandler} className={isLoading ? 'loading' : ''}>
                    <div className="form-grid">
                        <div className="grid-2-4">
                            <div className={`input-item ${errors.name ? 'is-error' : ''}`}>
                                <input type="text"
                                       name="name"
                                       placeholder="fornavn"
                                       onChange={this.inputChangeHandler}
                                       value={this.state.name} />
                                {errors.name && <p className="error-msg">{errors.name}</p>}
                            </div>
                        </div>
                        <div className="grid-2-4">
                            <div className={`input-item ${errors.lastname ? 'is-error' : ''}`}>
                                <input type="text"
                                       name="lastname"
                                       placeholder="etternavn"
                                       onChange={this.inputChangeHandler}
                                       value={this.state.lastname} />
                                {errors.lastname && <p className="error-msg">{errors.lastname}</p>}
                            </div>
                        </div>
                        <div className="grid-2-4">
                            <div className={`input-item ${errors.email ? 'is-error' : ''}`}>
                                <input type="email"
                                       name="email"
                                       placeholder="e-post"
                                       onChange={this.inputChangeHandler}
                                       value={this.state.email} />
                                {errors.email && <p className="error-msg">{errors.email}</p>}
                            </div>
                        </div>
                        <div className="grid-2-4">
                            <div className="input-item">
                                <input type="number"
                                       name="phone"
                                       placeholder="telefon"
                                       onChange={this.inputChangeHandler}
                                       value={this.state.phone} />
                            </div>
                        </div>
                        <div className="grid-4-4">
                            <div className={`textarea-item ${errors.message ? 'is-error' : ''}`}>
                                <textarea placeholder="beskjed"
                                          name="message"
                                          onChange={this.inputChangeHandler}
                                          value={this.state.message} ></textarea>
                                {errors.message && <p className="error-msg">{errors.message}</p>}
                            </div>
                        </div>
                        <div className="grid-4-4">
                            <ReCAPTCHA sitekey={this.capthcaSiteKey}
                                       className="captcha"
                                       ref={e => this.captcha = e}
                                       onChange={this.recaptchaChangeHandler}/>
                            {errors.captcha && <p className="error-msg">{errors.captcha}</p>}
                        </div>
                        <div className={`grid-2-4 ${errors.privacy ? 'is-error' : ''}`}>
                            <CheckboxItem item={{ title: checkboxLabel, name: 'privacy' }}
                                          handler={this.inputChangeHandler}/>
                            {errors.privacy && <p className="error-msg">{errors.privacy}</p>}
                        </div>
                        <div className="grid-2-4">
                            <button className="submit">send</button>
                        </div>
                    </div>
                    {isSuccess && <p className="success-msg">Vi bekrefter å ha mottatt meldingen</p>}
                </form>
            </div>
        )
    }
}

export default ContactForm