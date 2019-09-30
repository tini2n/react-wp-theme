import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import SearchIcon from 'icons/search-icon.svg';

class SearchBar extends Component {
    constructor(props) {
        super(props);

        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSearch = this.handleSearch.bind(this);

        this.search = React.createRef();

        this.state = {
            isOpen: false,
            search: ''
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

    handleChange(e) {
        this.setState({ search: e.target.value })
    }

    handleSubmit(e) {
        e.preventDefault();

        this.handleSearch(e.target[0]);
    }

    handleSearch(target) {
        const { history } = this.props;

        history.push(`/?s=${encodeURIComponent(target.value)}`, 'Søk');
    }

    componentDidMount() {
        document.addEventListener('click', this.handleClickOutside)
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClickOutside)
    }

    render() {
        const {
            isOpen,
            search
        } = this.state;

        return (
            <div className={`search-bar ${isOpen ? 'open' : ''}`} ref={this.setWrapperRef}>
                <div className="icon" onClick={() => {
                    this.setState({ isOpen: !isOpen });
                    this.search.current.value = '';
                    this.search.current.focus();
                }}>
                    <SearchIcon />
                </div>
                <form onSubmit={this.handleSubmit}>
                    <input type="search" placeholder="Hva ser du etter?" ref={this.search} value={search} onChange={this.handleChange}/>
                </form>
            </div>
        )
    }
}

export default withRouter(SearchBar);