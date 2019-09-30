import React, { Component } from 'react'

import Link from 'components/InternalLink';

import ArrowIcon from 'icons/arrow-icon.svg';

class Dropdown extends Component {
    constructor(props) {
        super(props);

        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);

        this.state = {
            isOpen: false
        }
    }

    setWrapperRef(node) {
        this.wrapperRef = node;
    }

    handleClickOutside(e) {
        if (this.wrapperRef && !this.wrapperRef.contains(e.target)) {
            this.setState({ isOpen: false });
        }
    }

    componentDidMount() {
        document.addEventListener('click', this.handleClickOutside)
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClickOutside)
    }

    render() {
        const { title, items } = this.props;
        const { isOpen } = this.state;

        return (
            <div className={`menu-item dropdown ${isOpen ? 'open' : ''}`}
                 onClick={() => this.setState({ isOpen: !isOpen })}
                 ref={this.setWrapperRef}>
                    <span>
                        {title}
                        <ArrowIcon/>
                    </span>
                <ul>
                    <ArrowIcon/>
                    {items.map((item, i) =>
                        <li key={i}><Link to={item.url}>{item.title}</Link></li>)}
                </ul>
            </div>
        )
    }
}

export default Dropdown;