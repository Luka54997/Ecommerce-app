import React,{useState,useEffect} from 'react'
import Layout from './Layout'
import {getCategories,list} from './apiCore'
import Card from './Card'
import { getitemsFromCart } from './cartHelpers'
import { Link } from 'react-router-dom'
import Checkout from './Checkout'

const Cart = () =>{

    const [cartItems,setCartItems] = useState([])
    const [run, setRun] = useState(false);

    useEffect(()=>{

        setCartItems(getitemsFromCart())
        
    },[run])

      

    const showItems = items =>{
        return(
            <div>
                <h2>Your cart has {items.length} items</h2>
                <hr/>
                {cartItems.map((item,index)=>{
                return(
                    <Card key={index} product={item} showAddToCartButton={false} update={true} removeItemButton={true} setRun={setRun} run={run}></Card>
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
               <div className='col-6'>
                    {cartItems.length > 0 ? showItems(cartItems) : noItemsInCart()}
               </div>
               <div className='col-6'>
                   <h2 className='mb-4'>Your Cart Summary</h2>
                   <hr/>
                    <Checkout products={cartItems}/>
               </div>
           </div>
            
        </Layout>
    )

}

export default Cart