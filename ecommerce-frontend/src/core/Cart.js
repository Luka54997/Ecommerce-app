import React,{useState,useEffect} from 'react'
import Layout from './Layout'
import {getCategories,list} from './apiCore'
import Card from './Card'
import { getitemsFromCart } from './cartHelpers'
import { Link } from 'react-router-dom'


const Cart = () =>{

    const [items,setItems] = useState([])

    useEffect(()=>{
        getItems()
    },[])

    const getItems = () =>{
        let items = getitemsFromCart()
        
        setItems(items)
    }    

    const showItems = items =>{
        return(
            <div>
                <h2>Your cart has {items.length} items</h2>
                <hr/>
                {items.map((item,index)=>{
                return(
                    <Card key={index} product={item} showAddToCartButton={false}></Card>
                )
            })}
            </div>
        )
    }

    const noItemsInCart = () =>{
        return(
            <h2>Your cart is empty. <Link to='/shop'>Continue Shopping</Link></h2>
        )
    }

    return(
        <Layout title="Cart page" description="Manage cart items. Add or remove or continue to checkout" className="container-fluid">
           <div className='row'>
               <div className='col-4'>
                    {items.length > 0 ? showItems(items) : noItemsInCart()}
               </div>
           </div>
            
        </Layout>
    )

}

export default Cart