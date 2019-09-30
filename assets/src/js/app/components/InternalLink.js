import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';

class InternalLink extends Component {
    pathName(to) {
        const parser = document.createElement('a');
        parser.href = to;
        return parser.pathname;
    }

    render() {
        const { to, children, nav, ...rest } = this.props;
        const link = to.replace(window.location.origin, '');

        return nav ? <NavLink to={this.pathName(to)} {...rest} >{children}</NavLink> : <Link to={link} {...rest} >{children}</Link>
    }
}

export default InternalLink;