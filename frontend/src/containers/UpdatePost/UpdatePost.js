import React from 'react';
import axios from 'axios';
import { withStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import Spinner from '../../components/UI/Spinner/Spinner';

const styles = theme => ({
    button: {
        marginTop: '20px'
    }
});

class UpdatePost extends React.Component {

    state = {
        loading: true,
        error: null,
        post: null,
        postId: null,
        postContent: null,
        splittedPostContent: null
    }

    componentDidMount() {
        console.log(this.props);
        const postId = this.props.match.params.id;
        this.setState({ postId: postId });

        axios.get(`http://localhost:5000/post/${postId}`)
            .then(res => {
                this.setState({ postContent: JSON.parse(res.data.post.post_content) });
            })
            .catch(console.log)
            .finally(() => this.setState({ loading: false }));
    }

    onChangeTextAreaHandler = (e) => {

        const updatedSplittedPostContent = e.target.value.split('\n');

        this.setState({ 
            postContent: e.target.value,
            splittedPostContent: updatedSplittedPostContent
        });
    }

    onButtonPressed = () => {

        this.setState({ loading: true });

        axios.post('http://localhost:5000/post/edit', {
            id: this.state.postId,
            postContent: JSON.stringify(this.state.splittedPostContent)
        })
        .then(res => {
            this.props.history.push('/?success-changed=true');
        })
        .catch(console.log)
        .finally(() => this.setState({ loading: false }));
    }

    render() {

        const { classes } = this.props;

        return (
            <>
                {this.state.loading ?
                <Spinner />
                :
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column'
                }}
                >
                    <h1>{'Update current post'}</h1>
                    <textarea
                        id="textarea"
                        style={{
                            resize: 'vertical',
                            width: '300px',
                            borderRadius: '5px',
                            minHeight: '100px',
                            marginTop: '40px'
                        }} 
                        value={this.state.postContent}
                        onChange={(e) => this.onChangeTextAreaHandler(e)}
                    />
                    <Button
                    onClick={this.onButtonPressed}
                    className={classes.button}
                    color="primary"
                    variant="contained">
                        {'Update'}
                    </Button>
                </div>
                }
            </>
        );
    }
}

export default withStyles(styles)(UpdatePost);