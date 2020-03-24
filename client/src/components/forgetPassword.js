import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import {useSelector, useDispatch} from 'react-redux';
import { forgotPassword } from '../action/forgotPassword';


const useStyles = makeStyles(theme => ({
  avatar: {
    marginLeft:'46%',
    marginTop: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export const  ForgetPassword = () =>{
  const classes = useStyles();
const dispatch = useDispatch();
  const initialState = {
    email: ""
  };
  const [data, setData] = useState(initialState);
  const handleInputChange = event => {
    setData({
      ...data,
      [event.target.name]: event.target.value
    });
  };

  function handleSubmit(event) {
   event.preventDefault();
   dispatch(forgotPassword(data))
   setData(initialState);
  }
const loginstyle = useSelector(state=>state.loginStyleReducer)
  return (
        <div style={loginstyle}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Forgot Password
            </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={data.email}
              onChange={handleInputChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Submit
            </Button>
            <Grid container>
                <Link href="/login" style={{marginLeft:'40%'}}>
                  {"Remember Password? Sign In"}
                </Link>
            </Grid>
          </form>
        </div>
  );

}

export default ForgetPassword;