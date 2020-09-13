import React from 'react';

import classes from './Layout.module.css';
import { NavLink } from 'react-router-dom';

const layout = ( props ) => {
    return (
        <>
            <header className={classes.Layout}>
                <nav>
                    <NavLink to="/auth">
                        auth
                    </NavLink>
                    <NavLink to="/main-page">
                        Main Page
                    </NavLink>
                    <NavLink to="/something">
                        something
                    </NavLink>
                </nav>
            </header>
            <main className={classes.Content}>
                {props.children}
            </main>
        </>
    );
};

export default layout;