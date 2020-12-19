import React, { useState } from 'react'
import {Link, Redirect} from 'react-router-dom'
import ShowImage from './showImage'
import moment from 'moment'
import { addItem, updateItem,removeItem } from './cartHelpers'

const Card = ({product, showViewProductButton = true, showAddToCartButton = true, update = false, removeItemButton = false, setRun = f=>f,run=undefined }) =>{

    const [redirect,setRedirect] = useState(false)

    const [count,setCount] = useState(product.count)

    const addToCart = () =>{
        addItem(product,()=>{
            setRedirect(true)
        })
    }

    const removeFromCart = () =>{
        removeItem(product._id)
        setRun(!run)
    }

    const shouldRedirect = redirect =>{
        if(redirect)
            return <Redirect to='/cart'/>
    }


    const AddToCartButton = () =>{
        return (
            <button onClick={addToCart} className='btn btn-outline-warning mt-2 mb-2'>Add to cart</button>
        )
    }

    const showRemoveItemButton = () =>{        
        return(
            <button onClick={removeFromCart} className='btn btn-outline-danger mt-2 mb-2'>Remove item</button>
        )
    }

    const showStock = quantity =>{
        return quantity > 0 ? (<span className ='badge badge-primary badge-pill'>In stock </span> ) : (
            <span className='badge badge-danger badge-pill'>Out of stock</span>
        )
    }

    const handleChange = productId => event =>{
        setRun(!run)
        setCount(event.target.value < 1 ? 1 : event.target.value)
        if(event.target.value >= 1){
            updateItem(productId,event.target.value)
        }

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
                     {removeItemButton &&(
                        showRemoveItemButton()
                    )} 
                    {showAddToCartButton &&(
                        AddToCartButton()
                    )}
                    {update && (
                        <div>
                            <div className='input-group mb-3'>
                                <div className='input-group prepend'>
                                    <span className='input-group-text'>Change quantity</span>
                                </div>
                                <input type='number' className='form-control' value={count} onChange={handleChange(product._id)}></input>
                            </div>
                        </div>
                    )}
                   
                </div>                 
            </div>
    )

}

export default Card