import React from 'react';
import { Link } from 'react-router-dom';
import htmlParser from 'react-html-parser';

import UniversalLink from 'components/UniversalLink';

import OkIcon from 'images/icons/ok-icon.svg';

const PaymentSuccess = ({ product }) => {
    const {
        title,
        text
    } = product;

    return (
        <div className="subscription-form payment-success">
            <div className="row with-icon">
                <div className="col-2-3">
                    <h2 className="subtitle">Takk for du valgte oss!</h2>
                    <p>Du er nå abonnent på TGN Pluss – {title}</p>
                </div>
                <div className="col-1-3">
                    <span className="ok-icon">
                        <OkIcon width="70.03" height="49.969" viewBox="0 0 70.03 49.969"/>
                    </span>
                </div>
            </div>
            <div className="row">
                <div className="col-1-3">
                    <h3>Inkludert i pakken:</h3>
                </div>
                <div className="col-2-3 product-description">
                    {htmlParser(text)}
                </div>
            </div>
            <div className="row">
                <div className="response-links">
                    <Link to="/" className="button">Gå til forsiden</Link>
                    <UniversalLink target="_blank" to="https://selfservice.mediaconnect.no/">ConnectID - Min Side</UniversalLink>
                </div>
            </div>
        </div>
    )
};

export default PaymentSuccess;