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

    return (
        <li className={classesCSS.NavigationItem}>
        <NavLink
        exact
        to={props.link}
        activeClassName={classesCSS.active}>
            <div className={classes.div}>
            <Avatar aria-label="recipe" className={classes.avatar}>
                PP
            </Avatar>
            {props.userName}
            </div>
        </NavLink>
    </li>
    );
};

export default AvatarItem;