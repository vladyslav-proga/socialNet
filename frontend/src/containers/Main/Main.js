import React, { Component } from 'react';
import { connect } from 'react-redux';

import Post from './Post/Post';
import NewPostButton from '../../components/NewPostButton/NewPostButton';
import CreatePostForm from '../../components/CreatePostForm/CreatePostForm';
import Modal from '../../components/UI/Modal/Modal';

import classes from './Main.module.css';


class Main extends Component {

    state = {
      formOpened: false,
    }

    onChangeFormOpenedState = () => {
      this.setState((prevState) => ({
        formIsOpen: !prevState.formIsOpen
      }));
    }

    render() {
        return (
            <>
              {this.props.isAuthenticated && 
              <NewPostButton 
              fName={this.props.fName}
              lName={this.props.lName}
              onClick={this.onChangeFormOpenedState} />}
              <div className={classes.posts}>
                <Post 
                initials="PP"
                author="Саша Петрук"
                date="October 16, 2020"
                media="https://images2.alphacoders.com/902/902946.png"
                postContent={['hkvxkjknfbnjjckvb', 'ajkjvnkbxnkvnjkxnknvbbheibxvbkjxkj', 'bjbvjbjkbkjabvjkbkdbvkjv', 'khbjhbdfhjvbdbfvbbjfvbj', 'nvbfjvknjkfvbxbf']}/> 
              </div>

                <Modal
                  show={this.state.formIsOpen}
                  modalClosed={this.onChangeFormOpenedState}
                  >
                    <CreatePostForm />
                </Modal>
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