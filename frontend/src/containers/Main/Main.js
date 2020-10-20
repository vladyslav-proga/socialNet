import React, { Component } from 'react';

import Post from './Post/Post';
import NewPostButton from '../../components/NewPostButton/NewPostButton';
import classes from './Main.module.css';


class Main extends Component {

    render() {
        return (
            <>
              <NewPostButton />
              <div className={classes.posts}>
                <Post 
                initials="PP"
                author="Petruk Petro"
                date="October 16, 2020"/> 
              </div>
            </>
        );
    }
};

export default Main;