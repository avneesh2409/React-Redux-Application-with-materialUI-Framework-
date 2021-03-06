import React,{useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector,useDispatch } from 'react-redux';
import { FormControl, InputLabel, Select, MenuItem, Link } from '@material-ui/core';
import { postImage } from '../action/postImage';
import { postUsers } from '../action/postUsers';
import { push } from 'react-router-redux';



const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(2),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
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
    address:'',
    role:'',
    contact:''
}
let uploadImage = 'Upload Image';
export default function SignUp(props) {
  const dispatch = useDispatch()
  const image = useSelector(state=>state.PostImageReducer);
const [state, setState] = useState(initialState)
const classes = useStyles();

const submitHandler = async (e) =>{
e.preventDefault();
const cred = {
  roleId: state.role,
  Name: state.first+' '+state.last,
  Address: state.address,
  Contact: state.contact,
  email: state.email,
  password: state.password,
  gender:state.gender,
  country:state.country,
  image:image.data,
}
dispatch(postUsers(cred))
setState(initialState)
uploadImage = 'Upload Image'
}

const onChangeHandler = async (e) =>{
  if(e.target.name === 'image')
  {
  let type = {'image/jpeg':'image/jpeg','image/jpg':'image/jpg','image/png':'image/png'};
  if(e.target.files[0]){
    if(e.target.files[0].type in type){
      dispatch(postImage({image:e.target.files[0]}))
      uploadImage = e.target.files[0].name
    }
else{
  alert("select only image file of jpg or png format")
}
  }
  }
setState({
    ...state,
    [e.target.name]:e.target.value
})
}

  // const class1 = useSelector(state => state.userActionReducer)
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
        <form className={classes.form} onSubmit={submitHandler}>
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
            <Grid item xs={12} sm={12}>
              <TextField
                value= {state.address}
                variant="outlined"
                required
                fullWidth
                id="address"
                label="Address"
                name="address"
                onChange = {onChangeHandler}
              />
            </Grid>
          <Grid item sm={12}>
            <div style={{position:'relative',right:'0px',border:'1px solid #b3b3b3',padding:'8px',borderRadius:'5px'}}>
              <span>Gender </span>
              <span style={{marginLeft:'25%'}}> Male <Radio
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
          <Grid item xs={12} sm={12}>
              <TextField
                variant="outlined"
                value= {state.contact}
                required
                fullWidth
                id="contact"
                label="Contact"
                name="contact"
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
          <Grid>
          <FormControl variant='outlined' className={classes.formControl}>
                <InputLabel id="select-filled-label">Role</InputLabel>
                    <Select
                        labelId="select-filled-label"
                        id="select-filled"
                        value={state.role}
                        name="role"
                        onChange={onChangeHandler}
                        className={classes.selectEmpty}
        >
          <MenuItem value="3">Advertiser</MenuItem>
          <MenuItem value="4">Publisher</MenuItem>
        </Select>
      </FormControl>
          </Grid>
          <Grid>
          <FormControl variant='outlined' className={classes.formControl}>
          <Button
              variant="contained"
              component="label"
          >
            {uploadImage}
          <input
            type="file"
            onChange = {onChangeHandler}
            name="image"
            style={{ display: "none" }}
          />
          </Button>
          </FormControl>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
        <Grid container justify="flex-end">
        <Grid item>
              <Link onClick={()=>dispatch(push('/login'))} variant="body2" style={{cursor:'pointer'}}>
               Already have an account? Sign in
              </Link>
        </Grid>
        </Grid>
        </form>
      </div>
      </div>
  )
}




