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

        const style = this.props.style;

        const materialClasses = this.props.classes;

        // устанавливаем цсс для иконок
        let extendClasses = [materialClasses.expand];
        if (this.state.extended) {
          extendClasses = [materialClasses.expandOpen, materialClasses.expand];
        }

        let showMoreButtonClasses = [classes.accordion, classes.close];
        if (this.state.showMore) {
            showMoreButtonClasses = [classes.accordion, classes.open]
        }

        const postContent = this.props.postContent;
        let postContextTextLength = 0;
        if ( postContent ) {
            for (let i = 0; i < postContent.length; i++ ) {
                postContextTextLength += postContent[i].length;
            }
        }

        return (
            <>
            
            {!this.props.hidden && 
            (<div className={classes.post} style={style}>

                <div className={classes.post__header}>
                    <div>
                        <div className={classes.post__avatar}>
                            {this.props.initials}
                        </div>
                    </div>
                    <div className={classes.post__title}>
                        <p 
                        key={'p-1'}
                        className={classes.post__author}>
                            {this.props.author}
                        </p>
                        <p
                        key={'p-2'}
                        className={classes.post__date}>
                            {this.props.date}
                        </p>
                    </div>
                    <div className={classes["post__three-dots"]}>
                        <IconButton 
                        aria-label="settings"
                        onClick={this.props.example ? null : this.onClickShowMoreButton}>
                            <MoreVertIcon/>
                        </IconButton>
                        <div className={showMoreButtonClasses.join(" ")}>
                            <ul>
                                <li 
                                key={'li-1'}
                                onClick={this.props.onEdit}
                                className={classes.green}>
                                    edit
                                </li>
                                <li 
                                ley={'li-2'}
                                onClick={this.props.onDelete}
                                className={classes.danger}>
                                    delete
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className={classes.post__content}>
                        {this.props.media && 
                        (
                            <img src={this.props.media} alt='postImage' className={classes.post__media}/>
                        )
                        }
                        <div className={classes.post__subtitle}>
                            {postContent && postContent.map((el, index) => {
                                if ( index < 4 ) {
                                    return <p className={classes.paragraph}>{el}</p>
                                }
                                return null;
                            })}
                        </div>
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
                {postContent && (postContent.length > 4 || postContextTextLength > 224) && 
                (
                    <IconButton 
                        style={{marginRight: '10px'}} 
                        onClick={this.onClickExtendButton}
                        className={extendClasses.join(" ")}
                    >
                        <ExpandMoreIcon />
                    </IconButton>
                )}
                </div>
                <Collapse in={this.state.extended} timeout="auto" unmountOnExit>
                    <div className={classes['post__extended-text']}>
                        {postContent && postContent.map(el => <p className={classes.paragraph}>{el}</p>)}
                    </div>
                </Collapse>
            </div>)}
            </>
        );
    }
};

export default withStyles(useStyles)(Post);