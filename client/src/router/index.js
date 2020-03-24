import React,{useEffect} from 'react';
// import Bar from "../components/Bar";
// import Foo from "../components/Foo";
import { Router, Route } from 'react-router'
import history from '../helpers/history'
import Dashboard from '../components/dashboard';
import Integration from '../components/Integration';
import Customer from '../components/Customer';
import Report from '../components/Report';
// import Home from '../components/home';
import PageNotfound from '../components/childcomponents/404';
import SignUp from '../components/register';
// import User from '../components/User';
import CurrentMonth from '../components/currentMonth';
import YearSale from '../components/yearSale';
import LastQuarter from '../components/lastQuarter';
import Test from '../components/Test';
import { Registration, Users, Customers,ChangePassword as change, Integrations, Reports,CurrentMonth as current,YearSale as year,LastQuater as last } from '../constants';
import ChangePassword from '../components/registerChangePassword';


const Routers = () => {
    window.addEventListener('beforeunload', function (e) {
        e.preventDefault();
        e.returnValue = '';
      });
      useEffect(() => {
         history.push(`/${Registration}`);
      }, [])
    return (
        <div>
            <Dashboard />
            <Router history={history}>
                <Route path = {`/${Registration}`}  exact component={SignUp} />
                <Route path={`/${Customers}`} exact component={Customer} />
                <Route path={`/${Integrations}`} exact component={Integration} />
                <Route path={`/${change}`} exact component={ChangePassword} />
                <Route path={`/${Reports}`} exact component={Report} />
                <Route path={`/${Users}`} exact component={Test} />
                <Route path={`/${year}`} exact component={YearSale} />
                <Route path={`/${current}`} exact component={CurrentMonth} />
                <Route path={`/${last}`} exact component={LastQuarter} />
                <Route path='*' component={PageNotfound} />
            </Router>
        </div>
    )
}
export default Routers;