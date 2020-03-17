import React from 'react';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import IconButton from '@material-ui/core/IconButton';
import { storeUserAction } from '../action/userAction';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { MainListItems, SecondaryListItems } from './childcomponents/listItems';
import { useStyles } from './childcomponents/dependency';
import { Divider } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux'


const Leftpane = (props) => {
    const click = useSelector(state => state.userActionReducer)
    const dispatch = useDispatch()
    const classes = useStyles();
    const leftpaneclass = {
        color: 'blue'
    }
    const handleDrawerClose = () => {
        //props.setOpen(false);
        dispatch(storeUserAction(false))
    };

    return (
        <div style={leftpaneclass}>
            <Drawer
                variant="permanent"
                classes={{
                    paper: clsx(classes.drawerPaper, !click.open && classes.drawerPaperClose)
                }}
                open={click.open}
            >
                <div className={classes.toolbarIcon}>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />
                <List><MainListItems /></List>
                <Divider />
                <List><SecondaryListItems /></List>
            </Drawer>

        </div>
    )
}
export default Leftpane;