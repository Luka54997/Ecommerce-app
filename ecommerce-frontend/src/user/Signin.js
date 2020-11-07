import React, { useState } from 'react'
import Layout from '../core/Layout'
import {Redirect} from 'react-router-dom'
import {signIn,authenticate, isAuthenticated} from '../auth/auth'


const SignIn = () => {

    const {user} = isAuthenticated()

    const[values,setValues] = useState({        
        email: 'lukamilanovic689@gmail.com',
        password: 'luka1234',
        error : '',
        loading : false,
        redirectTo:false

            
    });

    const {email, password, loading, error,redirectTo } = values;

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value })
    }

    const submit = event =>{
        
        event.preventDefault()
        setValues({ ...values, error: false,loading:true})
        signIn({email,password}).then(data =>{
            if(data.error){

                setValues({...values,error:data.error,loading:false})
            }
            else{
                authenticate(data,()=>{
                    setValues({  
                        loading : false,
                        redirectTo: true
    
                    })
                })
            }
        })
        

       

    }


    const showError = ()=>{
        return(
        <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>{error}</div>
        )
    }

    const showLoading = ()=>
        
        loading &&(
            <div className="alert alert-info">
                <h2>Loading...</h2>

             </div>)
    

    const redirectUser = () =>{
        if(redirectTo){
            if(user && user.role === 1){
                return <Redirect to='/admin/dashboard'></Redirect>
            }
            else {
                return <Redirect to='/user/dashboard'></Redirect>
            }
            
        }
        if(isAuthenticated()){
            return <Redirect to='/'></Redirect>
        }

    }


     

    const SignInForm = () =>{
        return(
        <form>

        
        <div className="form-group">
            <label className = "text-muted">Email</label>
            <input onChange ={handleChange('email')} type="text" className="form-control"value={email}/>

        </div>

        <div className="form-group">
            <label className = "text-muted">Password</label>
            <input onChange ={handleChange('password')} type="password" className="form-control"value={password}/>

        </div>

        <button onClick={submit} className="btn btn-primary">Submit</button>


        </form>
        )
    }

    return(

        <Layout title="SignIn page" description="SignIn to Node React E-commerce App" className="container col-md-6 offset-md-2" >
            {showLoading()}
            {showError()}
            {SignInForm()}
            {redirectUser()}
            
        </Layout>
    )

    
    }

export default SignIn