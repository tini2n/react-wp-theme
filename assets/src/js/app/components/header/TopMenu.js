import React from 'react';

import UniversalLink from 'components/UniversalLink';
import Dropdown from 'components/partials/Dropdown';

const TopMenu = ({ links, categories }) => (
  <nav className="top-menu">
    {categories.length > 0 ? <Dropdown title="Nyheter" items={categories} /> : ''}
    {!!links.length &&
      links.map((link, i) => (
        <UniversalLink key={i} to={link.url} target={link.target} className="menu-item">
          {link.title}
        </UniversalLink>
      ))}
  </nav>
);

export default TopMenu;
