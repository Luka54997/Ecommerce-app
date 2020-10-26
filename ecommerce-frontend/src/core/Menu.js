import React,{Fragment} from 'react'
import {Link,withRouter} from 'react-router-dom'
import {signOut,isAuthenticated} from '../auth/auth'


const isActive = (history,path) =>{
    if(history.location.pathname === path){
        return{color:'#ff9900'}
    }else{
        return {color:'#ffffff'}
    }
}

const Menu = ({history}) =>{

    return(
    <div>
      <ul className ="nav nav-tabs bg-primary">

        <li className = "nav-item">
            <Link className="nav-link" style={isActive(history,"/")} to="/">Home</Link>
        </li>
        <li className = "nav-item">
            <Link className="nav-link" style={isActive(history,"/dashboard")} to="/dashboard">Dashboard</Link>
        </li>
       
       {!isAuthenticated() && (

           <Fragment>
                <li className = "nav-item">
            <Link className="nav-link" style={isActive(history,"/signin")} to="/signin">SignIn</Link>
        </li>
        <li className = "nav-item">
            <Link className="nav-link" style={isActive(history,"/signup")} to="/signup">SignUp</Link>
        </li>
           </Fragment>
       )}

        {isAuthenticated() && (
            <li className = "nav-item">
            <span className="nav-link" style={{cursor:'pointer',color:'#ffffff'}} to="/signup" onClick={()=>signOut(()=>{history.push('/')})}>SignOut</span>
        </li>
        )}

      </ul>
    </div>
    )
    
}

export default withRouter(Menu)