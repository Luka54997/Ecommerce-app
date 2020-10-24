import React from 'react'
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import Signup from './user/Signup'
import Signin from './user/Signin'
import Home from './core/Home'
import PrivateRoute from './auth/PrivateRoute'
import Dashboard from './user/Dashboard'

const Routes = () => {

    return(
    <BrowserRouter>
    
        <Switch>
            <Route path ='/signin' exact component ={Signin}/>
            <Route path ='/signup' exact component ={Signup}/>
            <Route path ='/' exact component ={Home}/>
            <PrivateRoute path ='/dashboard' exact component = {Dashboard}></PrivateRoute>
        </Switch>
    </BrowserRouter>)

}


export default Routes
