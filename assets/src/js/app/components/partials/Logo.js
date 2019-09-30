import React from 'react'
import { Link } from 'react-router-dom';

import config from 'utils/config';

import colors from 'constants/colors'
import LogoIcon from 'icons/logo-icon.svg';

const Logo = () => (
    <div className="logo">
        <Link to={config.routes.home}>
            <LogoIcon fill={colors.white}/>
        </Link>
    </div>
);

export default Logo;