import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';

const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  }));
export const Notify = (props) =>{
    const classes = useStyles();
    const {type,title,content} = props
    return (
        <div className={classes.root}>
            <Alert severity={type}>
                <AlertTitle>{title}</AlertTitle>
                {content}
            </Alert>
        </div>
    )
}
