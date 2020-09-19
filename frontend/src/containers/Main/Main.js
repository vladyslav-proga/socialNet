import React, { Component } from 'react';

import Paginator from '../../components/Paginator/Paginator';
import Post from './Post/Post';

class Main extends Component {
    render() {
        return (
            <div>
                <Post />
            </div>
        );
    }
};

export default Main;