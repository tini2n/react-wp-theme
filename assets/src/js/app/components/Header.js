import React, { Component } from 'react'
import PropTypes from 'prop-types';

import Logo from 'components/partials/Logo';
import TopMenu from 'components/header/TopMenu';
import SearchBar from 'components/header/SearchBar';
import LogIn from 'components/header/LogIn';
import PushMenu from 'components/header/PushMenu';

class Header extends Component {
    render() {
        const { menus } = this.props;

        const {
            isPushMenuOpen,
            changePushMenuState
        } = this.props;

        return (
            <header id="header">
                <div className="wrapper-outer">
                    <Logo/>
                    <TopMenu categories={menus.news_menu}
                             links={menus.top_menu}/>
                    <SearchBar/>
                    <LogIn/>
                    <PushMenu menu={menus.push_menu}
                              categories={menus.news_menu}
                              isPushMenuOpen={isPushMenuOpen}
                              changePushMenuState={changePushMenuState} />
                </div>
            </header>
        )
    }
}

Header.propTypes = {
    menus: PropTypes.object,
    categories: PropTypes.object,
    header: PropTypes.object
};

export default Header