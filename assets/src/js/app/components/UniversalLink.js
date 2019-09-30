import React, { Component } from 'react';

import Link from 'components/InternalLink';

class UniversalLink extends Component {
    parseTo(to) {
        let parser = document.createElement('a');
        parser.href = to;
        return parser;
    }
    isInternal(toLocation) {
        return window.location.host === toLocation.host;
    }

    render() {
        const { to, children, ...rest } = this.props;

        const toLocation = this.parseTo(to);
        const isInternal = this.isInternal(toLocation);

        return (isInternal ? <Link to={to} {...rest}>{children}</Link> : <a href={to} {...rest}>{children}</a>)
    }
}

export default UniversalLink