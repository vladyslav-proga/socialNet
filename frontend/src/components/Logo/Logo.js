import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './Logo.module.css';

const logo = ( props ) => (
    <NavLink exact to="/">
    <div className={classes.Logo}>
        LOGO
    </div>
    </NavLink>
);

export default logo;