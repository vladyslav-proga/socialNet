import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';

import classes from './Post.module.css';
import Avatar from '../../../assets/avatars/default.png';

class Post extends Component {
    state = {
        author: 'Lebron James',
        date: '19.09.2020 22:24',
        image: '',
        title: 'New Post'
    }

    render() {
        return (
            <div className={classes.Post}>
                <header>
                {/* {TO DO} */}
                {/* {Сделать каждому свои аватары на выбор в профиле} */}
                <img src={Avatar} alt="avatar" />
                <h3>
                    {this.state.author} <span> posted on {this.state.date} </span>
                </h3>
                </header>
                <h1>{this.state.title}</h1>
                <div className={classes.PostControls}>
                    {/* {TO DO} */}
                    {/* {Вы можете всегда просматривать пост} */}
                    <Button link="/" mode="flat"> view </Button>
                    {/* {Если это ваш пост или вы админ, вы можете его изменять} */}
                    <Button onClick={() => {}} mode="flat"> edit </Button>
                    {/* {Если это ваш пост или вы админ, вы можете его удалять} */}
                    <Button onClick={() => {}} mode="flat" design="danger"> delete </Button>
                </div>
            </div>
        );
    }
};

export default Post;