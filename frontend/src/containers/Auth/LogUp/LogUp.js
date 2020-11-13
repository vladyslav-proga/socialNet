import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'

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

import CSSclasses from '../Auth.module.css';
import { checkValidaty } from '../../../util/checkValidaty';
import * as actions from '../../../store/actions/index';

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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

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
};

class SignUp extends Component {

  state = {
    controls: {
      firstName: {
        value: '',
        validation: {
          required: true,
          minLength: 2,
          maxLength: 15
        },
        valid: false,
        touched: false
      },
      lastName: {
        value: '',
        validation: {
          required: true,
          minLength: 2,
          maxLength: 15
        },
        valid: false,
        touched: false
      },
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
          required: true,
          minLength: 6,
          maxLength: 20
        },
        valid: false,
        touched: false
      },
    },
    formIsValid: false,
  };

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
      fname: this.state.controls.firstName.value,
      lname: this.state.controls.lastName.value,
      email: this.state.controls.email.value,
      password: this.state.controls.password.value
    }

    this.props.onLogUp(userData);
    // axios.post('http://localhost:5000/auth/signup', {
    //   fname: this.state.controls.firstName.value,
    //   lname: this.state.controls.lastName.value,
    //   email: this.state.controls.email.value,
    //   password: this.state.controls.password.value
    // })
    // .then(res => {
    //   this.setState({loading: false});
    //   this.props.onChangeMod();
    // })
    // .catch(err => {
    //   this.setState({error: err.response.data.message, loading: false});
    // });
  }

  render() {
    const { classes } = this.props;
    return (
      <>
      {this.props.loading ? <Spinner /> 
      :  
      <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
      </Typography>
        {this.props.error && <p className={CSSclasses.Error}>{this.props.error}</p>}
        <form className={classes.form}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={(event) => this.onInputChangedHandler(event, 'firstName')}
                value={this.state.controls.firstName.value}
                error={!this.state.controls.firstName.valid && this.state.controls.firstName.touched}
                helperText={!this.state.controls.firstName.valid && this.state.controls.firstName.touched ? 'Should be from 2 to 15 symbols' : null}
                autoComplete="fname"
                variant="outlined"
                required
                fullWidth
                label="First Name"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={(event) => this.onInputChangedHandler(event, 'lastName')}
                value={this.state.controls.lastName.value}
                error={!this.state.controls.lastName.valid && this.state.controls.lastName.touched}
                helperText={!this.state.controls.lastName.valid && this.state.controls.lastName.touched ? 'Should be from 2 to 15 symbols' : null}
                variant="outlined"
                required
                fullWidth
                label="Last Name"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={(event) => this.onInputChangedHandler(event, 'email')}
                value={this.state.controls.email.value}
                error={!this.state.controls.email.valid && this.state.controls.email.touched}
                helperText={!this.state.controls.email.valid && this.state.controls.email.touched ? 'enter correct email' : null}
                variant="outlined"
                required
                fullWidth
                label="Email Address"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={(event) => this.onInputChangedHandler(event, 'password')}
                value={this.state.controls.password.value}
                error={!this.state.controls.password.valid && this.state.controls.password.touched}
                helperText={!this.state.controls.password.valid && this.state.controls.password.touched ? 'password must be from 6 to 20 symbols' : null}
                variant="outlined"
                required
                fullWidth
                label="Password"
                type="password"
                autoComplete="current-password"
              />
            </Grid>
          </Grid>
          <Button
            disabled={!this.state.formIsValid}
            onClick={this.onSubmitHandler}
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
        </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <p style={{ color: '#3f51b5', cursor: 'pointer', textAlign: 'center' }} onClick={this.props.switchModeToSignIn}>
                Already have an account? Sign in
            </p>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>}
      </>
    );
  }
};

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    successLogedUp: state.auth.successLogedUp,
    error: state.auth.error
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onLogUp: (userData) => dispatch(actions.logUp(userData)),
    switchModeToSignIn: () => dispatch(actions.changeModToSignIn())
  }
}

export default withStyles(useStyles)(connect(mapStateToProps, mapDispatchToProps)(SignUp));