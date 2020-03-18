import React  from 'react'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
// import {useDispatch} from 'react-redux';
// import { push } from 'react-router-redux';
// import history from '../helpers/history'

const useStyles = makeStyles(theme => ({
    image: {
      backgroundImage: 'url(https://source.unsplash.com/random)',
      backgroundRepeat: 'no-repeat',
      backgroundColor:
        theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height:'800px',
      width:'800px'
    }
  }));

export default function LoginDependency() {

  // const dispatch = useDispatch();
  // useEffect(() => {
  //   // dispatch(push('/login'));
  //   history.push('/login');
  // }, [])
    const classes = useStyles();
    return (
            <div>
                <Grid item xs={false} sm={4} md={7} className={classes.image} />
            </div>
    )
}
