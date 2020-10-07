import React from 'react';

import classes from './NavigationItems.module.css';
import { connect } from 'react-redux';

import NavigationItem from './NavigationItem/NavigationItem';


const navigationItems = ( props ) => {

    let content = (
        <>
        <NavigationItem link="/"> Main </NavigationItem>
        <NavigationItem link="/auth"> Login </NavigationItem>
        </>
    );
    if (props.isAuthenticated) {
        content = (
        <>
        <NavigationItem link="/"> Main </NavigationItem>
        <NavigationItem link="/profile"> Your profile </NavigationItem>
        <NavigationItem link="/logout"> Logout </NavigationItem>
        </>
        );
    }
    return (
    <ul className={classes.NavigationItems}>
        {content}
    </ul>
    );
};

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}
export default connect(mapStateToProps)(navigationItems);