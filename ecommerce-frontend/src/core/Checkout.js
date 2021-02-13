import React,{useState,useEffect} from 'react'
import Layout from './Layout'
import {getBraintreeToken,processPayment} from './apiCore'
import Card from './Card'
import Search from './Search'
import {isAuthenticated} from '../auth/auth'
import { Link } from 'react-router-dom'
import DropIn from 'braintree-web-drop-in-react'

const Checkout = ({products}) =>{

    const [data,setData] = useState({
        success:false,
        clientToken:null,
        error:'',
        instance:{},
        address:''
    })

    const userId = isAuthenticated()&& isAuthenticated().user._id
    const token = isAuthenticated()&& isAuthenticated().token

    const getToken = (userId,token)=>{
        getBraintreeToken(userId,token).then(data=>{
            if(data.error){
                setData({...data,error:data.error})

            }else{
                setData({...data,clientToken:data.clientToken})
            }
        })
    }

    useEffect(()=>{
        console.log(products)
        getToken(userId,token)
    },[])

    const getTotal= () =>{
        return products.reduce((acc,product)=>{
            return acc + product.count * product.price
        },0)
    }

    const buy = () =>{
        let nonce;
        let getNonce = data.instance.requestPaymentMethod().then(data=>{
            nonce = data.nonce

            const paymentData = {
                paymentMethodNonce:nonce,
                amount:getTotal(products) 
            }

            processPayment(userId,token,paymentData)
                .then(response=>{
                    console.log(response)
                })

        })
        .catch(error=>{
            console.log(error)
            setData({...data,error:error.message})
        })
    }

    const showDropIn = () =>{
        return(
            <div>
               {data.clientToken !== null && products.length > 0 ? (
                   <div>
                       <DropIn options={{
                           authorization:data.clientToken
                       }} onInstance={instance=>(data.instance = instance)}/>
                       <button onClick={buy} className='btn btn-success col-2'>Pay</button>
                   </div>
               ):null} 
            </div>
        )
    }

    return(
        <div>
            <h2>Total: ${getTotal()}</h2>
            {isAuthenticated()?(
                <div >{showDropIn()}</div>
            ):(
                <Link to='/signin'>
                    <button className='btn btn-info'>Sign In to checkout</button>
                </Link>
            )}
        </div>
    )



}

export default Checkout