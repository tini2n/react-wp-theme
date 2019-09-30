import React from 'react';
import { Link } from 'react-router-dom';

import ExclamationIcon from 'images/icons/exclamation-icon.svg';

const PaymentFailed = () => {
    return (
        <div className="subscription-form payment-failed">
            <div className="row with-icon">
                <div className="col-2-3">
                    <h2 className="subtitle">Registreringen mislyktes</h2>
                    <p>Din brukerkonto har blitt opprettet og en aktiviseringslenke er sendt
                        til e-postadressen du har oppgitt. Husk at du må aktivere kontoen ved å klikke på lenken i e-posten du mottar, før du kan logge inn.</p>
                </div>
                <div className="col-1-3">
                    <span className="exclamation-icon">
                        <ExclamationIcon/>
                    </span>
                </div>
            </div>
            <div className="row">
                <div className="response-links">
                    <Link to="/" className="button">gå tilbake</Link>
                </div>
            </div>
        </div>
    )
};

export default PaymentFailed;