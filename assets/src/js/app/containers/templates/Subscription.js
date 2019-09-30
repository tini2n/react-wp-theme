import React, { Component } from 'react';

import config from 'utils/config'

import Breadcrumbs from 'components/partials/Breadcrumbs';
import PageTitle from 'components/partials/PageTitle';
import SubscriptionForm from 'components/SubscriptionForm';
import Link from 'components/InternalLink';

class Subscription extends Component {
    render() {
        const { unique_slug } = this.props;
        const { products } = config;

        const product = products.find(el => el.unique_slug === unique_slug);

        const breadcrumbsProps = {
            parentId: 1,
            parentPage: { title: 'TGN Pluss', link: config.routes.subscription },
            currentPage: { title: product.title }
        };

        return (
            <section className="subscription">
                <div className="wrapper-thin">
                    <div className="page-heading">
                        <Breadcrumbs {...breadcrumbsProps}/>
                        <PageTitle title={'Abonnement'}/>
                    </div>
                    <h2 className="subtitle">
                        {product.title}
                        <Link to={config.routes.subscription}>skift pakke</Link>
                    </h2>
                    <SubscriptionForm {...product} uniqSlug={unique_slug}/>
                </div>
            </section>
        )
    }
}

export default Subscription