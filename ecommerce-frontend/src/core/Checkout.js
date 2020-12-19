import React,{useState,useEffect} from 'react'
import Layout from './Layout'
import {getCategories, getProducts} from './apiCore'
import Card from './Card'
import Search from './Search'
import {isAuthenticated} from '../auth/auth'
import { Link } from 'react-router-dom'

const Checkout = ({products}) =>{

    const getTotal= () =>{
        return products.reduce((acc,product)=>{
            return acc + product.count * product.price
        },0)
    }

    return(
        <div>
            <h2>Total: ${getTotal()}</h2>
            {isAuthenticated()?(
                <button className='btn btn-success'>Checkout</button>
            ):(
                <Link to='/signin'>
                    <button className='btn btn-info'>Sign In to checkout</button>
                </Link>
            )}
        </div>
    )



}

export default Checkout