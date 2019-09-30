import React, { Component } from 'react'

import { gdpr } from 'utils/config';

import Link from 'components/UniversalLink';

export default class GdprRibbon extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isClosed: localStorage.getItem('isGdprConfirmed')
        };

        this.handleCloseClick = this.handleCloseClick.bind(this);
        this.handleOpenClick = this.handleOpenClick.bind(this);
    }

    handleCloseClick() {
        this.setState({ isClosed: true });
        localStorage.setItem('isGdprConfirmed', true);
    }

    handleOpenClick() {
        this.setState({ isClosed: false })
    }

    render() {
        const {
            isClosed
        } = this.state;

        const {
            gdpr_button_text,
            // gdpr_hidden_bar_text,
            gdpr_link,
            gdpr_link_text,
            gdpr_text
        } = gdpr;

        return (
            <div className={`gdpr-ribbon ${isClosed ? 'closed' : ''}`}>
                <div className="full-bar">
                    <div className="wrapper">
                        {gdpr_text && <p>{gdpr_text}</p>}
                        {gdpr_button_text && <button onClick={this.handleCloseClick}>{gdpr_button_text}</button>}
                        {gdpr_link && <Link target="_blank" to={gdpr_link}>{gdpr_link_text}</Link>}
                    </div>
                </div>
                {/* button hidden. Nina/client requirement */}
                {/*<button className="open-button" onClick={this.handleOpenClick}>{gdpr_hidden_bar_text}</button>*/}
            </div>
        )
    }
}