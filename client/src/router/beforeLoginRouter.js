import React from 'react'
import { Router, Route} from 'react-router'
import history from '../helpers/history'
import SignInSide from '../components/login'
import ForgetPassword from '../components/forgetPassword'
import LoginRegister from '../components/loginRegister'
import LoginDependency from '../components/logindependency'
// import {Redirect} from 'react-router-dom'

export default function LoginRouter() {
    return (
        <div>
        <LoginDependency />
        <Router history={history}>
            <Route path='/' exact component={SignInSide} />
            <Route path='/forgetpassword' exact component={()=><ForgetPassword />} />
            <Route path='/register' exact component={()=><LoginRegister />} />
            <Route path='/login' exact component={()=><SignInSide />} />
            <Route path='*' render={()=><h1>Page Not Found</h1>} />
        </Router>
    </div>
    )
}
