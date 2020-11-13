import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

import classes from './NewPostButton.module.css';

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

    const materialClasses = useStyles();

    const initials = [ props.fName[0], props.lName[0] ].join("");

    return (
        <div className={classes.NewPostBlock}>
            <div className={classes.Avatar}>
                {initials}
            </div>
            <Button 
            variant="contained" 
            color="primary" 
            className={materialClasses.newButton}
            onClick={props.onClick} >
                Share you news...
            </Button>
        </div>
    );
};

export default NewPostButton;