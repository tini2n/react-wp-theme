import React, { Component } from 'react';
import { NavLink as Link } from "react-router-dom";
import { isMobile } from 'react-device-detect';


import ArrowIcon from 'icons/arrow-icon.svg';

class PageNavigation extends Component {
    constructor(props) {
        super(props);

        this.navigation = React.createRef();

        this.togglerHandler = this.togglerHandler.bind(this);
    }

    togglerHandler() {
        if (isMobile)
            this.navigation.classList.toggle('is-opened')
    }

    render() {
        const {
            title,
            links
        } = this.props;

        return (
            <div className="page-navigation" ref={navigation => this.navigation = navigation}>
                <h3 className="title" onClick={this.togglerHandler}>{title}</h3>
                <span className="mobile-toggler"><ArrowIcon/></span>
                <nav>
                    {links.map(({ id, link, title }) => {
                        const lnk = link.split(window.location.origin)[1].replace(/\/$/, "");

                        return <Link key={id} to={lnk}>{title}</Link>
                    })}
                </nav>
            </div>
        )
    }
}

export default PageNavigation;