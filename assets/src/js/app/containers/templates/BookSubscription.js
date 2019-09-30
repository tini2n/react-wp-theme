import React, { Component, lazy } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import queryString from "query-string";

import { isInApp } from 'utils/config';

const Subscription = lazy(() => import('containers/templates/Subscription'));

import NotFound from 'components/NotFound';
import PaymentResponse from 'components/PaymentResponse';
import Breadcrumbs from 'components/partials/Breadcrumbs';
import PageTitle from 'components/partials/PageTitle';
import Paywall from "components/Paywall";
import PlusLabel from 'components/partials/PlusLabel';

class BookSubscription extends Component {
    render() {
        const {
            location,
            main
        } = this.props;

        const breadcrumbsProps = {
            parentId: 0,
            currentPage: { title: 'TGN pluss' }
        };

        if (isInApp) {
            return <NotFound/>
        }

        if (queryString.parse(location.search).subscription) {
            return <Subscription unique_slug={queryString.parse(location.search).subscription} />
        }

        if (main.fulfillment_status) {
            return <PaymentResponse main={main}/>
        }

        return (
            <section className="book-subscription">
                <div className="wrapper-thin">
                    <div className="page-heading">
                        <Breadcrumbs {...breadcrumbsProps}/>
                        <PageTitle title={'Bestill abonnement'}/>
                    </div>
                    <p className="description">Med TGN Pluss får du blant annet eksklusive artikler, tips og råd fra våre eksperter.</p>
                    <PlusLabel withLogo/>
                    <Paywall />
                </div>
            </section>
        )
    }
}

const mapStateToProps = ({ main }) => ({ main });

export default withRouter(connect(mapStateToProps)(BookSubscription))