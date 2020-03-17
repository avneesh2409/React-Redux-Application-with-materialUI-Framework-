import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { Registration, Users, Customers, Integrations, Reports,CurrentMonth,YearSale,LastQuater } from '../../constants';
import { useDispatch} from 'react-redux';
import { push } from 'react-router-redux';
import { storeTab } from '../../action/userAction'

export const MainListItems = () => {
const dispatch =  useDispatch();

const clickHandler = (data) =>{
  switch(data)
  {
    case Registration:
      dispatch(storeTab(Registration))
      dispatch(push('/register'))
      break;
    case Users:
      dispatch(storeTab(Users))
      dispatch(push('/user'))
      break;
    case Customers:
      dispatch(storeTab(Customers))
      dispatch(push('/customer'))
      break;
    case Integrations:
      dispatch(storeTab(Integrations))
      dispatch(push('/integration'))
      break;
    case Reports:
      dispatch(storeTab(Reports))
      dispatch(push('/report'))
      break;
    default :
  }
}
  return (
    <div>
      <ListItem button onClick={()=>clickHandler(Registration)}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary={Registration} />
      </ListItem>
      <ListItem button onClick={()=>clickHandler(Users)}>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary={Users} />
      </ListItem>
      <ListItem button onClick={()=>clickHandler(Customers)}>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary={Customers} />
      </ListItem>
      <ListItem button onClick={()=>clickHandler(Reports)}>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary={Reports} />
      </ListItem>
      <ListItem button onClick={()=>clickHandler(Integrations)}>
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary={Integrations} />
      </ListItem>
    </div>
  )
}

export const SecondaryListItems = () => {
  const dispatch =  useDispatch();
const clickHandler = (data) =>{
  switch(data)
  {
    case LastQuater:
      dispatch(storeTab(LastQuater))
      dispatch(push('/lastquarter'))
      break;
    case YearSale:
      dispatch(storeTab(YearSale))
      dispatch(push('/yearsale'))
      break;
    case CurrentMonth:
      dispatch(storeTab(CurrentMonth))
      dispatch(push('/currentmonth'))
      break;
    default:
  }
}
  return (
    <div>
      <ListSubheader inset>Saved reports</ListSubheader>
      <ListItem button onClick={()=>clickHandler(CurrentMonth)}>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Current month" />
      </ListItem>
      <ListItem button onClick={()=>clickHandler(LastQuater)}>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Last quarter" />
      </ListItem>
      <ListItem button onClick={()=>clickHandler(YearSale)}>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Year-end sale" />
      </ListItem>
    </div>
  )
}