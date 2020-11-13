import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Spinner from '../../../components/UI/Spinner/Spinner';

import { checkValidaty } from '../../../util/checkValidaty';
import CSSclasses from '../Auth.module.css';
import * as actions from '../../../store/actions/index';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="/">
        Social Network
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class SignIn extends Component {

  state = {
    controls: {
      email: {
        value: '',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      }
    },
    formIsValid: false,
    error: '',
    redirected: false
  }

  onInputChangedHandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        touched: true,
        valid: checkValidaty(event.target.value, this.state.controls[controlName].validation)
      }
    }
    let formIsValid = true;
    for (let elem in updatedControls) {
      if (!updatedControls[elem].valid) {
        formIsValid = false;
      }
    }
    this.setState({ controls: updatedControls, formIsValid: formIsValid });
  }

  onSubmitHandler = (event) => {
    const userData = {
      email: this.state.controls.email.value,
      password: this.state.controls.password.value
    };
    this.props.onLogIn(userData);
    
    // event.preventDefault();
    // axios.post('http://localhost:5000/auth/signin', {
    //         email: this.state.controls.email.value,
    //         password: this.state.controls.password.value
    // })
    // .then(res => {
    //   this.setState({redirected: true});
    // })
    // .catch(err => {
    //   this.setState({error: err.response.data.message});
    // });
  }

  render() {

    const { classes } = this.props;

    return (
      <>
      {this.props.successLogedIn && <Redirect to="/" />}
      {this.props.loading ? <Spinner />
      : <Container component="main" maxWidth="xs">
      {this.state.redirected && <Redirect to="/" />}
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>

        {this.props.successLogedUp && !this.props.error && 
        <p className={CSSclasses.Success}>Successfully loged up!</p>}

        {this.props.error && <p className={CSSclasses.Error}>{this.props.error}</p>}
        <form className={classes.form} noValidate>

          <TextField
            onChange={(event) => this.onInputChangedHandler(event, 'email')}
            value={this.state.controls.email.value}
            error={!this.state.controls.email.valid && this.state.controls.email.touched}
            helperText={!this.state.controls.email.valid && this.state.controls.email.touched ? 'enter correct email' : null}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email Address"
            autoComplete="email"
          />
          <TextField
            onChange={(event) => this.onInputChangedHandler(event, 'password')}
            value={this.state.controls.password.value}
            error={!this.state.controls.password.valid && this.state.controls.password.touched}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            autoComplete="current-password"
          />
          <Button
            disabled={!this.state.formIsValid}
            onClick={this.onSubmitHandler}
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <p style={{ color: '#3f51b5', cursor: 'pointer', textAlign: 'center' }} onClick={this.props.switchModeToSignIn}>
                Don't have an account? Sign Up
              </p>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>}
      </>
    );
  }
};

const mapStateToProps = state => {
  return {
    successLogedUp: state.auth.successLogedUp,
    error: state.auth.error,
    loading: state.auth.loading,
    successLogedIn: state.auth.successLogIn
  }
}

const mapDispatchToProps = dispatch => {
  return {
    switchModeToSignIn: () => dispatch(actions.changeModToSignUp()),
    onLogIn: (userData) => dispatch(actions.logIn(userData))
  }
}

export default withStyles(useStyles)(connect(mapStateToProps, mapDispatchToProps)(SignIn));