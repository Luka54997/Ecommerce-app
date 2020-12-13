import React, { useState } from 'react'
import {Link, Redirect} from 'react-router-dom'
import ShowImage from './showImage'
import moment from 'moment'
import { addItem } from './cartHelpers'

const Card = ({product, showViewProductButton = true}) =>{

    const [redirect,setRedirect] = useState(false)

    const addToCart = () =>{
        addItem(product,()=>{
            setRedirect(true)
        })
    }

    const shouldRedirect = redirect =>{
        if(redirect)
            return <Redirect to='/cart'/>
    }


    const showAddToCartButton = () =>{
        return (
            <button onClick={addToCart} className='btn btn-outline-warning mt-2 mb-2'>Add to cart</button>
        )
    }

    const showStock = quantity =>{
        return quantity > 0 ? (<span className ='badge badge-primary badge-pill'>In stock </span> ) : (
            <span className='badge badge-danger badge-pill'></span>
        )
    }

    return(
            <div className='card'>
                <div className='card-header name'>{product.name}</div>
                <div className='card-body'>
                    {shouldRedirect(redirect)}
                    <ShowImage item={product} url='product'></ShowImage>
                    <p className='lead'>{product.description}</p>
                    <p>${product.price}</p>
                    <p>Category: {product.category && product.category.name}</p>
                    <p>Added on {moment(product.createdAt).fromNow()}</p>
                    {showStock(product.quantity)}  
                    <br></br>
                    {showViewProductButton &&(
                        <Link to={`/product/${product._id}`}>
                        <button className='btn btn-outline-primary mt-2 mb-2 mr-2'>View Product</button>
                        </Link>
                    )}   
                    {showAddToCartButton()}
                </div>                 
            </div>
    )

}

export default Card