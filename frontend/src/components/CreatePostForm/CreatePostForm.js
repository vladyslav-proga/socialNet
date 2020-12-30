import React from 'react';
import { connect } from 'react-redux';

import { Button, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import GetAppIcon from '@material-ui/icons/GetApp';
import DoneIcon from '@material-ui/icons/Done';
import CircularProgress from '@material-ui/core/CircularProgress';

import Post from '../../containers/Main/Post/Post';

import classes from './CreatePostForm.module.css';
import axios from 'axios';

const useStyles = (theme) => ({
    newButton: {
        backgroundColor: '#3c0062',
        '&:hover': {
            backgroundColor: '#3c0062' 
        },
        marginTop: '15px',
        marginBottom: '15px'
    },
    paper: {
        padding: '15px'
    }
});

class CreatePostForm extends React.Component {

    state = {
        file: null,
        imagePreviewUrl: null,
        postContent: '',
        limitTextPercent: 0,
        postExampleHidden: true,
        splittedPostContent: []
    }

    onSelectImageHandler = ( event ) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            })
        };

        const file = event.target.files[0];
        reader.readAsDataURL(file);
    }

    onChangeTextAreaHandler = (event) => {

        const newLimitTextPercent = (event.target.value.length / 2000 ) * 100;
        const updatedSplittedPostContent = event.target.value.split('\n');
        if (newLimitTextPercent <= 100) {
            this.setState({
                postContent: event.target.value,
                limitTextPercent: newLimitTextPercent,
                splittedPostContent: updatedSplittedPostContent
             });
        }
    }

    onPostExampleButtonHandler = (event) => {
        event.preventDefault();
        this.setState({
            postExampleHidden: !this.state.postExampleHidden
        });
    }

    onSubmitFormHandler = (event) => {
        event.preventDefault();
        let formData = new FormData();
            formData.append('postContent', JSON.stringify(this.state.splittedPostContent));
            formData.append('file', this.state.file);
            formData.append('userId', this.props.userId);
            try {
                axios.post('http://localhost:5000/post/create-new', formData);
            } finally {
                window.location.reload();
            }
    }

    deleteImageHandler = () => {
        this.setState({
            file: null,
            imagePreviewUrl: null
        });
    }

    render() {

        const materialClasses = this.props.classes;

        return (
            <form>
                <Paper elevation={2} className={materialClasses.paper}>
                <div className={classes.wrapper}>
                    <div className={classes.upload_container}>
                        <div className={classes.upload_container__upload_area}>
                            <div className={classes.border_container}>
                                <GetAppIcon  style={{ 
                                    fontSize: '50px',
                                    }}/>
                                <input id="file-input" type="file" name="file" multiple onChange={(event) => this.onSelectImageHandler(event)}/>
                                <label htmlFor="file-input" className={classes.label}>Выберите файл</label>
                                <span>или перетащите его сюда</span>
                            </div>
                            {this.state.file && 
                            <p style={{marginTop: '-10px', fontSize: '10px'}}>
                                {this.state.file.name}
                                <DoneIcon style={{paddingTop: '15px'}}/>
                            </p>}
                        </div>
                    </div>
                    <div className={classes.post_data_area}>
                        <p>Write something</p>
                        <textarea
                        id="textarea" 
                        className={classes.text_area} 
                        value={this.state.postContent}
                        onChange={(e) => this.onChangeTextAreaHandler(e)}/>
                            <div 
                                className={classes.progressBar}
                                style={{ opacity: this.state.postContent ? '1' : '0' }}>
                                <CircularProgress 
                                    variant='static' 
                                    value={100} 
                                    size={25}
                                    thickness={5}
                                    style={{marginRight: '-25px', color: '#eee'}}/>
                                <CircularProgress 
                                    variant='static'
                                    value={this.state.limitTextPercent} 
                                    size={25}
                                    thickness={5}
                                    style={{ color: (this.state.limitTextPercent === 100) ? 'red' : 'blue'}}/>
                                <p>{2000 - this.state.postContent.length}</p>
                            </div>
                    </div>
                </div>
                </Paper>
                <div className={classes.formButtons}>
                    <Button 
                        variant="contained" 
                        color="primary"
                        style={{ 
                            display: this.state.file ? 'block' : 'none',
                            marginTop: '25px' }}
                        onClick={this.deleteImageHandler}
                        className={materialClasses.newButton}>
                            Delete Picture
                    </Button>
                    <Post 
                    example 
                    media={this.state.imagePreviewUrl}
                    style={{ marginTop: '20px' }}
                    postContent={this.state.splittedPostContent}/>
                    <Button 
                    variant="contained" 
                    color="primary"
                    disabled={ !this.state.imagePreviewUrl && !this.state.postContent }
                    className={materialClasses.newButton}
                    onClick={(e) => this.onSubmitFormHandler(e)}>
                        Create Post
                    </Button>
                </div>
                <p>
                </p>
            </form>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        userId: state.auth.userId
    };
}

export default connect(mapStateToProps)(withStyles(useStyles)(CreatePostForm));