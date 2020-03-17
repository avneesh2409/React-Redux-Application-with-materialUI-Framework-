import React from 'react';
import Bar from "../components/Bar";
import Foo from "../components/Foo";
import { Router, Route } from 'react-router'
import history from '../helpers/history'
import Dashboard from '../components/dashboard';
import Integration from '../components/Integration';
import Customer from '../components/Customer';
import Report from '../components/Report';
// import Home from '../components/home';
import PageNotfound from '../components/childcomponents/404';
import SignUp from '../components/register';
import User from '../components/User';
import CurrentMonth from '../components/currentMonth';
import YearSale from '../components/yearSale';
import LastQuarter from '../components/lastQuarter';


const Routers = () => {
    window.addEventListener('beforeunload', function (e) {
        e.preventDefault();
        e.returnValue = '';
      });
    return (
        <div>
            <Dashboard />
            <Router history={history}>
                <Route path='/register'  exact component={SignUp} />
                <Route path='/customer' exact component={Customer} />
                <Route path='/integration' exact component={Integration} />
                <Route path='/report' exact component={Report} />
                <Route path='/user' exact component={User} />
                <Route path='/yearsale' exact component={YearSale} />
                <Route path='/currentmonth' exact component={CurrentMonth} />
                <Route path='/lastquarter' exact component={LastQuarter} />
                <Route  path='/foo' exact component={() =>  <Foo />} />
                <Route  path='/bar' exact component={() => <Bar  />} />
                <Route path='*' component={PageNotfound} />
            </Router>
        </div>
    )
}
export default Routers;