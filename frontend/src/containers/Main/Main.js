import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import Post from './Post/Post';
import NewPostButton from '../../components/NewPostButton/NewPostButton';
import CreatePostForm from '../../components/CreatePostForm/CreatePostForm';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';

import classes from './Main.module.css';


class Main extends Component {

    state = {
      formOpened: false,
      loading: true,
      modalForSuccessAdd: false,
      posts: {}
    }

    componentDidMount() {
      this.setState({ loading: true });

      if (this.props.location.search === '?success-changed=true') {
        this.setState({ modalForSuccessAdd: true });
      }

      axios.get('http://localhost:5000/post/show-all')
        .then(response => {
          this.setState({
            posts: response.data.content,
            loading: false
          });
        })
        .catch(error => {
          console.log(error);
          this.setState({ loading: true });
        });
    }

    onChangeFormOpenedState = () => {
      this.setState((prevState) => ({
        formIsOpen: !prevState.formIsOpen
      }));
    }

    onEditPost = (id) => {
      this.props.history.push(`/update-post/${id}`)
    }

    onDeletePost = (id) => {
      this.setState({ loading: true });
      axios.post('http://localhost:5000/post/delete', {
        id: id
      })
      .then((res) => {
        window.location.reload();
        this.setState({loading: false})
      })
      .catch((err) => {
        console.log(err);
        this.setState({loading: false})
      });
    }

    render() {
        console.log(this.state.posts);
        return (
          <>
            {this.state.loading ? 
              <Spinner /> :
              (
                <>
              {this.props.isAuthenticated && 
              <NewPostButton 
              fName={this.props.fName}
              lName={this.props.lName}
              onClick={this.onChangeFormOpenedState} />}
              <div className={classes.posts}>
                {this.state.posts.map( (el, index) => {
                  const initials = el.fname[0] + el.lname[0];
                  const author = el.fname + " " + el.lname;
                  const date = el.date;
                  const media = el.media;
                  console.log(el);
                  const postContent = JSON.parse(el.post_content);
                    return <Post
                            key={el.post_id}
                            onEdit={() => this.onEditPost(el.post_id)}
                            onDelete={() => this.onDeletePost(el.post_id)}
                            initials={initials}
                            author={author}
                            date={date}
                            media={media}
                            postContent={postContent}
                            key={index}
                          />
                        })}
              </div>
                <Modal
                show={this.state.modalForSuccessAdd}
                modalClosed={() => {
                  this.setState({ modalForSuccessAdd: false });
                  this.props.history.push('/');
                }}>
                  <p style={{textAlign: 'center'}}>{'You successfully updated post'}</p>
                </Modal>
                <Modal
                  show={this.state.formIsOpen}
                  modalClosed={this.onChangeFormOpenedState}
                  {...this.props}
                  >
                    <CreatePostForm {...this.props}/>
                </Modal>
            </>
              ) }
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