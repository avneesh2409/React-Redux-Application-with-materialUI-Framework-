import React,{useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector,useDispatch } from 'react-redux';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { Post } from '../helpers/fetchApi';
import { push } from 'react-router-redux';

const useStyles = makeStyles(theme => ({
  paper: {
     display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    width:'100%',
    marginTop: theme.spacing(3),
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));
const initialState = {
    first:'',
    last:'',
    email:'',
    password:'',
    gender:'',
    country:'',
    contact:'',
    address:''
}
export default function SignUp(props) {
const [state, setState] = useState(initialState)
const classes = useStyles();
const dispatch = useDispatch();
const submitHandler = async (e) =>{
e.preventDefault();
// console.log("I got the data  :-",state);
const url =  "http://localhost:8012/register";
const cred = {
  roleId: "4",
  Name: state.first+' '+state.last,
  Address: state.address,
  Contact: state.contact,
  email: state.email,
  password: state.password,
  gender:state.gender,
  country:state.country
}
const {data1} = await Post(url,cred);
if(data1.status)
{
  alert("successfully registered",data1.message);
  setState(initialState)
  dispatch(push('/login'))
}
else{
  alert("error -->",data1.message);
}
}
const onChangeHandler = (e) =>{
setState({
    ...state,
    [e.target.name]:e.target.value
})
}

const loginstyle = useSelector(state=>state.loginStyleReducer)
  return (
    <div style={loginstyle}>
      <div className={classes.paper} style={{marginTop:'0px'}}>
      <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
      </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="first"
                variant="outlined"
                value= {state.first}
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange = {onChangeHandler}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                value= {state.last}
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="last"
                autoComplete="lname"
                onChange = {onChangeHandler}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                value= {state.email}
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange = {onChangeHandler}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                value= {state.password}
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange = {onChangeHandler}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                value= {state.contact}
                name="contact"
                label="Contact"
                type="text"
                id="contact"
                onChange = {onChangeHandler}
              />
            </Grid>
          <Grid item sm={12}>
            <div style={{position:'relative',right:'0px',border:'1px solid #b3b3b3',padding:'8px',borderRadius:'5px'}}>
              <span>Gender </span>
              <span style={{marginLeft:'25%'}}>Male <Radio
                checked={state.gender === 'male'}
                onChange={onChangeHandler}
                value="male"
                name="gender"
              />
              Female <Radio
                checked={state.gender === 'female'}
                onChange={onChangeHandler}
                value="female"
                name="gender"
              />
              </span>
              </div>
          </Grid>
          <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                value= {state.address}
                name="address"
                label="Address"
                type="text"
                id="address"
                onChange = {onChangeHandler}
              />
            </Grid>
          </Grid>
          <Grid item xs={12}>
          <FormControl variant='outlined' className={classes.formControl}>
                <InputLabel id="demo-simple-select-filled-label">Country</InputLabel>
                    <Select
                        labelId="demo-simple-select-filled-label"
                        id="demo-simple-select-filled"
                        value={state.country}
                        name="country"
                        onChange={onChangeHandler}
                        className={classes.selectEmpty}
        >
          <MenuItem value="India">India</MenuItem>
          <MenuItem value="America">America</MenuItem>
          <MenuItem value="Argentina">Argentina</MenuItem>
          <MenuItem value="Israel">Israel</MenuItem>
        </Select>
      </FormControl>
          </Grid>
          <Button
            // type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={submitHandler}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      </div>
  )
}

