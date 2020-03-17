import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Logout from './logout';
import { useStyles } from './childcomponents/dependency';
import { storeUserAction } from '../action/userAction';


const Header = () => {
    const click = useSelector(state => state.userActionReducer)
    const dispatch = useDispatch()
    const classes = useStyles();
    const handleDrawerOpen = () => {
        dispatch(storeUserAction(true))
    }
const adjust ={
    width:`calc(100% - 240px)`,
    marginLeft: '240px'
}
    return (
        <div className={classes.root} >
            <CssBaseline />
            <AppBar position="absolute" className={clsx(classes.appBar)} style={(click.open)?adjust:null}>
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        className={clsx(classes.menuButton)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                        Header
                    </Typography>
                    Avneesh Here
                    <IconButton color="inherit">
                        <Badge badgeContent={4} color="secondary">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton><Logout />
                </Toolbar>
            </AppBar>
        </div>

    );

}

export default Header;