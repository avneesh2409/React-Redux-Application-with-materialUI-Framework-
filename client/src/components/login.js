import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import {useSelector} from 'react-redux';
import { Post } from '../helpers/fetchApi';
import { setStore } from '../helpers/fetchStore';


const useStyles = makeStyles(theme => ({
  avatar: {
    margin: theme.spacing(1),
    marginLeft:'46%',
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

export const  SignInSide = () =>{
  const classes = useStyles();

  const initialState = {
    email: "",
    password: ""
  };
  const [data, setData] = useState(initialState);
  const handleInputChange = event => {
    setData({
      ...data,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async (event) =>{
   event.preventDefault();
   const url = "http://localhost:8012/token"
   const {data1} = await Post(url,data)
   setData(initialState);
   if(data1 && data1.status){
    setStore(data1.token)
    window.location.href='/register'
   }
   else{
      alert("username or password is incorrect, Try Again")
   }
  }
const loginstyle = useSelector(state=>state.loginStyleReducer)
  return (
        <div style={loginstyle}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
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
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={data.password}
              onChange={handleInputChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
                <Link href="/forgetpassword">
                  Forgot password?
                </Link>
                <Link href="/register" style={{marginLeft:'40%'}}>
                  {"Don't have an account? Sign Up"}
                </Link>
            </Grid>
          </form>
        </div>
  );

}

export default SignInSide;