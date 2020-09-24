import axios from 'axios';
import React, { Component } from 'react';

import Paginator from '../../components/Paginator/Paginator';
import Post from './Post/Post';

class Main extends Component {

    componentDidMount() {
        axios.get('http://localhost:5000/auth')
            .then((res) => {
                console.log(res);
            })
            .catch();
    }

    render() {
        return (
            <div>
                <Post />
            </div>
        );
    }
};

export default Main;