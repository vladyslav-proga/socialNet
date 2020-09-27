import React from 'react';

import classes from './NavigationItems.module.css';

import NavigationItem from './NavigationItem/NavigationItem';


const navigationItems = ( props ) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/"> Main </NavigationItem>
        <NavigationItem link="/profile"> Your profile </NavigationItem>
        <NavigationItem link="/auth"> Login </NavigationItem>
    </ul>
);

export default navigationItems;