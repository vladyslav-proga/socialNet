import React from 'react';
import { NavLink } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar';
import { red } from '@material-ui/core/colors';

import classesCSS from './AvatarItem.module.css';

const useStyles = makeStyles({
    avatar: {
        backgroundColor: red[500],
        marginRight: '10px'
      },
    div: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }
});

const AvatarItem = ( props ) => {

    const classes = useStyles();

    const initials = [ props.fName[0], props.lName[0] ].join("");
    let userName = props.fName + " " + props.lName;
    if ( userName.length >= 10 ) {
        userName = props.fName + " " + props.lName[0] + ".";
    }

    return (
        <li className={classesCSS.NavigationItem}>
        <NavLink
        exact
        to={props.link}
        activeClassName={classesCSS.active}>
            <div className={classes.div}>
            <Avatar aria-label="recipe" className={classes.avatar}>
                {initials}
            </Avatar>
                {userName}
            </div>
        </NavLink>
    </li>
    );
};

export default AvatarItem;