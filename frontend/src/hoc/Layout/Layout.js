import React from 'react';

import classes from './Layout.module.css';

import NavigationItems from '../../components/Navigation/NavigationItems/NavigationItems';
import Logo from '../../components/Logo/Logo';

const layout = ( props ) => {
    return (
        <>
            <header className={classes.Layout}>
                <Logo />
                <nav style={{marginLeft: "auto"}}>
                   <NavigationItems /> 
                </nav>
            </header>
            <main className={classes.Content}>
                {props.children}
            </main>
        </>
    );
};

export default layout;