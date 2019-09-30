import React, { Fragment } from 'react';

import UniversalLink from 'components/UniversalLink';
import LogIn from 'components/header/LogIn';

import MenuIcon from 'icons/menu-icon.svg';
import CrossIcon from 'icons/cross-icon.svg';

const PushMenu = ({ menu, categories, isPushMenuOpen, changePushMenuState }) => {
  isPushMenuOpen ? document.body.classList.add('no-scroll') : document.body.classList.remove('no-scroll');

  return (
    <div className={`push-menu ${isPushMenuOpen ? 'open' : ''}`}>
      {!!menu.length && (
        <Fragment>
          <button onClick={() => changePushMenuState(true)}>
            meny
            <MenuIcon />
          </button>
          <div className="menu">
            <div className="overlay" onClick={() => changePushMenuState(false)} />
            <div className="heading">
              <LogIn />
              <button className="close" onClick={() => changePushMenuState(false)}>
                lukk
                <CrossIcon />
              </button>
            </div>
            <nav className="links">
              {menu.map((item, i) => (
                <UniversalLink key={i} to={item.url} target={item.target}>
                  {item.title}
                </UniversalLink>
              ))}
            </nav>
            <h5>NYHETER</h5>
            <nav className="categories">
              {!!categories.length &&
                categories.map((category, i) => (
                  <UniversalLink key={i} to={category.url} className="tag-item" target={category.target}>
                    {category.title}
                  </UniversalLink>
                ))}
            </nav>
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default PushMenu;
