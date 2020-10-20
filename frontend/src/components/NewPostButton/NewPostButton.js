import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

import classesCSS from './NewPostButton.module.css';
import Avatar from '../../assets/avatars/default.png';

const useStyles = makeStyles({
    newButton: {
        marginLeft: '15px',
        minWidth: "200px",
        width: "35%",
        height: "35px",
        backgroundColor: '#3c0062',
        '&:hover': {
            backgroundColor: '#3c0062' 
        }
    }
});

const NewPostButton = (props) => {

    const classes = useStyles();

    return (
        <div className={classesCSS.NewPostBlock}>
            <img src={Avatar} className={classesCSS.Avatar} alt='Avatar'/>
            <Button variant="contained" color="primary" className={classes.newButton}>
                Share you news...
            </Button>
        </div>
    );
};

export default NewPostButton;