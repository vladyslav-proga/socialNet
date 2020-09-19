import React from 'react';
import { Link } from 'react-router-dom';

import classes from './Button.module.css';

const button = ( props ) => {

    let content;
    const className = [ classes.Button ];

    className
        .push(
            classes[`${props.mode}`],
            classes[`${props.design}`]);

            
    if ( props.link ) {
        content = (
            <Link 
                to={props.link} 
                className={className.join(' ')}>
                    {props.children}
        </Link>
        );
    } else {
        content = (
            <button 
                className={className.join(' ')}
                onClick={props.onClick}
                disabled={props.disabled || props.loading}>
                    { props.loading ? 'Loading...' : props.children }
            </button>
        );
    }
    
    return content;
};

export default button;