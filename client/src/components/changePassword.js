import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Avatar, Typography, TextField, Button, makeStyles } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {changePassword} from '../action/changePassword';
// import { useHistory } from 'react-router-redux';
// import { push } from 'react-router-redux';

const initialState = {
    confirm:'',
    new:''
}
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
export default function ChangePassword(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const location = useSelector(state=>state.routing)
    const [state, setState] = useState(initialState);
    const handleInputChange = (e) =>{
        setState({
            ...state,
            [e.target.name]:e.target.value
        })
    }
    const handleSubmit = (e) =>{
        e.preventDefault();
        if(state.confirm === state.new){
        let token = location.locationBeforeTransitions.query.token;
          dispatch(changePassword(token,state.new))
        }
        else{
            alert("your password did not matched!!!! try again");
        }
        setState(initialState);
    }
    const loginstyle = useSelector(state=>state.loginStyleReducer)
    return (
        <div style={loginstyle}>
            <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Change Password
            </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="confirm"
              label="Confirm Password"
              name="confirm"
              autoFocus
              value={state.confirm}
              onChange={handleInputChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="new"
              label="New Password"
              name="new"
              autoFocus
              value={state.new}
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
          </form>
        </div>
    )
}
