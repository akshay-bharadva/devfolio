import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from '@material-ui/core';
import { GoogleLogin } from 'react-google-login';
import { LockOutlined } from '@material-ui/icons';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Icon from './Icon';
import Input from './Input';
import useStyles from './styles';
import { signin, signup } from '../../actions/auth';

const initialFormState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

function Auth() {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState(initialFormState);
  const dispatch = useDispatch();
  const history = useHistory();

  const switchModeHandler = () => {
    setIsSignup((prevIssignup) => !prevIssignup);
    setShowPassword(false);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (isSignup) {
      dispatch(signup(formData, history));
    }

    if (!isSignup) {
      dispatch(signin(formData, history));
    }
  };

  const inputChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const showPasswordHandler = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const googleSuccessHandler = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({ type: 'AUTH', data: { result, token } });
      history.push('/');
    } catch (err) {
      console.log(err, 'error from googleSuccessHandler');
    }
  };

  const googleFailureHandler = (error) => {
    console.log(error, 'Google login Failure');
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlined />
        </Avatar>
        <Typography variant="h5">
          {isSignup && <p>Sign up</p>}
          {!isSignup && <p>Sign In</p>}
        </Typography>
        <form className={classes.form} onSubmit={submitHandler}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={inputChangeHandler}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={inputChangeHandler}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email"
              type="email"
              handleChange={inputChangeHandler}
            />
            <Input
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              handleChange={inputChangeHandler}
              handleShowPassword={showPasswordHandler}
            />
            {isSignup && (
              <Input
                type="password"
                name="confirmPassword"
                label="Confirm Password"
                handleChange={inputChangeHandler}
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignup ? 'Sign Up' : 'Sign In'}
          </Button>
          {/* <GoogleLogin
                    clientId="TODO-ADD-API-KEY.apps.googleusercontent.com"
                    render={(renderProps) => (
                        <Button
                            className={classes.googleButton}
                            color="primary"
                            variant="contained"
                            fullWidth
                            onClick={renderProps.onClick}
                            disabled={renderProps.disabled}
                            startIcon={<Icon />}
                        >
                            Google Sign In
                        </Button>
                    )}
                    onSuccess={googleSuccessHandler}
                    onFailure={googleFailureHandler}
                    cookiePolicy="single_host_origin"
                /> */}
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchModeHandler}>
                {isSignup
                  ? 'Already have an account? Sign In'
                  : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}

export default Auth;
