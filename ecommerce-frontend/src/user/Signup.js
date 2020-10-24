import React, { useState } from 'react'
import Layout from '../core/Layout'
import {Link} from 'react-router-dom'
import {signUp} from '../auth/auth'

const Signup = () => {


    const[values,setValues] = useState({
        name: '',
        email: '',
        password: '',
        error : '',
        success : false

            
    })

    const { name, email, password, success, error } = values;

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value })
    }

    const submit = event =>{
        
        event.preventDefault()
        signUp({name,email,password}).then(data =>{
            if(data.error){

                setValues({...values,error:data.error,success:false})
            }
            else{
                setValues({
                    name: '',
                    email: '',
                    password: '',
                    error : '',
                    success : true

                })
            }
        })
        

       

    }


    const showError = ()=>{
        return(
        <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>{error}</div>
        )
    }

    const showSuccess = ()=>{
        return(
        <div className="alert alert-info" style={{display: success ? '' : 'none'}}>
            Account created successfully. Please <Link to="/signin">SignIn</Link>
        </div>
        )
    }


     

    const SignUpForm = () =>{

        return(
        <form>

        <div className="form-group">
            <label className = "text-muted">Name</label>
            <input onChange ={handleChange('name')} type="text" className="form-control" value={name}/>

        </div>

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

        <Layout title="SignUp page" description="SignUp to Node React E-commerce App" className="container col-md-6 offset-md-2" >
            {showError()}
            {showSuccess()}
            {SignUpForm()}
            
        </Layout>
    )

    
    }

export default Signup