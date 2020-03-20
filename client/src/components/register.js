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
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { postImage } from '../action/postImage';
import { postUsers } from '../action/postUsers';



const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(2),
    marginLeft:'48%',
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    marginTop: theme.spacing(2),
    maxHeight:'300px',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    width:'50%',
    marginTop: theme.spacing(2),
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
const url =  "http://localhost:8012/api/register";
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
dispatch(postUsers(url,cred))
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
const role = useSelector(state=>state.FetchRoleReducer)
const class1 = useSelector(state => state.userActionReducer)
const country = useSelector(state => state.FetchCountryReducer)
const toggle = useSelector(state=>state.ToggleButtonReducer);
  return (
    <div style={class1}>
      <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
      </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={submitHandler}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
            <FormControl variant='outlined' className={classes.formControl}>
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
              <TextField
              style={{marginTop:'30px'}}
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
              </FormControl>
            </Grid>
            <Grid item xs={12}>
            <FormControl variant='outlined' className={classes.formControl}>
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
              </FormControl>
            </Grid>
            <Grid item xs={12}>
            <FormControl variant='outlined' className={classes.formControl}>
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
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12}>
            <FormControl variant='outlined' className={classes.formControl}>
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
              </FormControl>
            </Grid>
          <Grid item sm={12}>
          <FormControl variant='outlined' className={classes.formControl}>
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
              </FormControl>
          </Grid>
          <Grid item xs={12} sm={12}>
          <FormControl variant='outlined' className={classes.formControl}>
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
              </FormControl>
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
           {(!country.loading && country.data)?
          country.data.map((e,i)=>{
            return (
            <MenuItem value={e.name} key={i}><img src={e.flag} alt='N' height='10px' width='20px' style={{marginRight:'20px'}}/>{e.name}</MenuItem>
            )
          })
            :null
          }
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
          {(role.data && role.data.status)?
          role.data.result.map((e,i)=>{
            return (
            <MenuItem value={e.role_id} key={i}>{e.role_name}</MenuItem>
            )
          })
            :null
          }
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
          <FormControl variant='outlined' className={classes.formControl}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
           { (toggle.status)?toggle.value:"Sign Up"}
          </Button>
        </FormControl>
        </form>
      </div>
  )
}
