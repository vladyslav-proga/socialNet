import React, { Component } from 'react';

import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CommentIcon from '@material-ui/icons/Comment';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import { withStyles } from '@material-ui/core/styles'

import classes from './Post.module.css';
import { green } from '@material-ui/core/colors';

const useStyles = (theme) => ({
    expand: {
        transform: 'rotate(0deg)',
        transition: theme.transitions.create('transform', {
          duration: theme.transitions.duration.shortest,
        }),
      },
      expandOpen: {
        transform: 'rotate(180deg)',
      },
      green: {
          color: green
      }
});

class Post extends Component {

    state = {
        showMore: false,
        extended: false,
    }

    onClickShowMoreButton = () => {
        this.setState((prevState) => ({
            showMore: !prevState.showMore
        }));
    }

    onClickExtendButton = () => {
        this.setState((prevState) => ({
            extended: !prevState.extended
        }));
    }

    render() {

        const materialClasses = this.props.classes;

        let extendClasses = [materialClasses.expand];
        if (this.state.extended) {
          extendClasses = [materialClasses.expandOpen, materialClasses.expand];
        }

        let showMoreButtonClasses = [classes.accordion, classes.close];
        if (this.state.showMore) {
            showMoreButtonClasses = [classes.accordion, classes.open]
        }


        return (
            <div className={classes.post}>

                <div className={classes.post__header}>
                    <div>
                        <div className={classes.post__avatar}>
                            {this.props.initials}
                        </div>
                    </div>
                    <div className={classes.post__title}>
                        <p className={classes.post__author}>
                            {this.props.author}
                        </p>
                        <p className={classes.post__date}>
                            {this.props.date}
                        </p>
                    </div>
                    <div className={classes["post__three-dots"]}>
                        <IconButton 
                        aria-label="settings"
                        onClick={this.onClickShowMoreButton}>
                            <MoreVertIcon/>
                        </IconButton>
                        <div className={showMoreButtonClasses.join(" ")}>
                            <ul>
                                <li className={classes.green}>edit</li>
                                <li className={classes.danger}>delete</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className={classes.post__content}>
                        <img src="https://i.pinimg.com/originals/11/f0/92/11f0921a299f3efa622ccf06609986e0.jpg" alt='postImage' className={classes.post__media}/>
                        <p className={classes.post__subtitle}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </div>

                <div className={classes.post__footer}>
                <IconButton aria-label="add to favorites" style={{marginLeft: '15px'}}>
                    <FavoriteIcon />
                </IconButton>
                <div style={{flex: '1 1 auto'}}>
                <IconButton aria-label="share">
                    <CommentIcon />
                </IconButton>
                </div>
                <IconButton 
                style={{marginRight: '10px'}} 
                onClick={this.onClickExtendButton}
                className={extendClasses.join(" ")}
                >
                    <ExpandMoreIcon />
                </IconButton>
                </div>
                <Collapse in={this.state.extended} timeout="auto" unmountOnExit>
                    <p className={classes['post__extended-text']}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </Collapse>
            </div>
        );
    }
};

export default withStyles(useStyles)(Post);