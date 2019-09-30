import React, { Component } from 'react';

import config, { profile } from 'utils/config'

import PaywallItem from 'components/partials/PaywallItem';
import PlusLabel from 'components/partials/PlusLabel';
import Link from 'components/UniversalLink';
import UniversalLink from 'components/UniversalLink';

class Paywall extends Component {
    render() {
        const { withTitle } = this.props;
        const authLink = profile.connectIdAuth.replace('%23%23', encodeURIComponent(location.href));

        return (
            <section className="paywall">
                {withTitle &&
                    <div className="title-container">
                        <PlusLabel withLogo/>
                        <h2>Les mer? Bestill abonnement her!</h2>
                        <div className="links">
                            {profile.isLogged ?
                                <a href={authLink}>Logg ut</a> :
                                <UniversalLink to={authLink}>Logg inn</UniversalLink>
                            }
                            <Link to={config.routes.subscription} className='external' target='_blank'>Full oversikt</Link>
                        </div>
                    </div>
                }
                <div className="items-container">
                    {config.products.map((product, i) =>
                        <PaywallItem key={i} {...product}/>)}
                </div>
            </section>
        )
    }
}

export default Paywall;