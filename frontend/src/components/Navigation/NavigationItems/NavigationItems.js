import React from 'react';

import classes from './NavigationItems.module.css';
import { connect } from 'react-redux';

import NavigationItem from './NavigationItem/NavigationItem';
import AvatarItem from './AvatarItem/AvatarItem';


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
        <AvatarItem 
            link="/profile" 
            fName={props.fName}
            lName={props.lName}></AvatarItem>
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
        isAuthenticated: state.auth.token !== null,
        fName: state.auth.fName,
        lName: state.auth.lName
    }
}
export default connect(mapStateToProps)(navigationItems);