import React from 'react';

import classes from './Paginator.module.css';

const paginator = ( props ) => {
    return (
        <div className={classes.Paginator}>
            {props.children}
            <div className={classes.PaginatorControls}>
                {props.currentPage > 1 && (
                    <button 
                        className={classes.PaginatorControl}
                        onClick={props.onPrevious}>
                        Previous
                    </button>
                )}
                <div className={classes.CurrentPageDiv}>
                    {props.currentPage}
                </div>
                {props.currentPage < props.lastPage && (
                    <button 
                        className={classes.PaginatorControl}
                        onClick={props.onNext}>
                        Next
                    </button>
                )}
            </div>
        </div>
    );
};

export default paginator;