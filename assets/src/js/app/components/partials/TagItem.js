import React, { Component } from 'react'

import Link from 'components/InternalLink';

export default class TagItem extends Component {
    constructor(props) {
        super(props);

        this.tagElement = React.createRef();
    }

    componentDidMount() {
        this.props.getTagSize(this.tagElement)
    }

    render() {
        const { tag } = this.props;

        return (
            <span className={`tag-item ${this.props.isToHide ? 'hidden' : ''}`} ref={tag => this.tagElement = tag}>
                <Link to={tag.url}>{tag.title}</Link>
            </span>
        )
    }
}