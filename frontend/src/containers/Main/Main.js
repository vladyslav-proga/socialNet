import React, { Component } from 'react';
import { connect } from 'react-redux';

import Post from './Post/Post';
import NewPostButton from '../../components/NewPostButton/NewPostButton';
import classes from './Main.module.css';


class Main extends Component {

    render() {
        return (
            <>
              {this.props.isAuthenticated && 
              <NewPostButton 
              fName={this.props.fName}
              lName={this.props.lName} />}
              <div className={classes.posts}>
                <Post 
                initials="PP"
                author="Саша Петрук"
                date="October 16, 2020"/> 
                <Post 
                initials="PP"
                author="Petruk Petro"
                date="October 16, 2020"/> 
              </div>
            </>
        );
    }
};

const mapStateToProps = state => {
  return {
    fName: state.auth.fName,
    lName: state.auth.lName,
    isAuthenticated: state.auth.token !== null,
  }
}

export default connect(mapStateToProps)(Main);