import React, { Component } from 'react';

import { Link } from 'react-scroll'

import ArrowIcon from 'icons/arrow-icon.svg';

class ToContent extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Link className="to-content" to="article-lead" offset={-80} smooth={true} spy={true} duration={500}>
                <ArrowIcon/>
            </Link>
        )
    }
}

export default ToContent;