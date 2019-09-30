import React from 'react'
import htmlParser from 'react-html-parser';
import config, { profile } from 'utils/config';

import { Link } from 'react-router-dom';
import UniversalLink from 'components/UniversalLink';


const PaywallItem = ({
    title,
    excerpt,
    text,
    month_price,
    prom_label,
    remark,
    unique_slug
}) => {
    const registrationLink = profile.connectIdRegistration.replace('%23%23', unique_slug);
    const subscriptionLink  = !profile.isLogged ? <UniversalLink to={registrationLink}>Bestill abonnement</UniversalLink> : <Link to={`${config.routes.subscription}/?subscription=${unique_slug}`}>Bestill abonnement</Link>;

    return (
        <div className="item">
            <h3>{title}</h3>
            <small>{excerpt}</small>
            <label className="prom-label">
                {prom_label && <span>{prom_label}</span>}
            </label>
            <div className="price">
                <sup>Månedlig pris</sup>
                <span>{month_price}</span>
                <sub>&nbsp; kr</sub>
            </div>
            <div className="text">
                {htmlParser(text)}
            </div>
            {subscriptionLink}
            <span className="remark">{remark}</span>
        </div>
    )
};

export default PaywallItem