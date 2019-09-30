import React from 'react';

import { products } from 'utils/config';

import Breadcrumbs from 'components/partials/Breadcrumbs';
import PageTitle from 'components/partials/PageTitle';
import PaymentSuccess from 'components/partials/PaymentSuccess';
import PaymentFailed from 'components/partials/PaymentFailed';

const PaymentResponse = ({ main }) => {
    const {
        fulfillment_status,
        unique_slug
    } = main;


    const breadcrumbsProps = {
        parentId: 0,
        currentPage: { title: 'TGN pluss' }
    };

    const product = products.find(product => product.unique_slug === unique_slug);
    const renderResponse = fulfillment_status === 'success' ? <PaymentSuccess product={product} /> : <PaymentFailed />;

    return (
        <section className="payment-response">
            <div className="wrapper-thin">
                <div className="page-heading">
                    <Breadcrumbs {...breadcrumbsProps}/>
                    <PageTitle title={'Abonnement'}/>
                </div>
                {renderResponse}
            </div>
        </section>
    )
};

export default PaymentResponse