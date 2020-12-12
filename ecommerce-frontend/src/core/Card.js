import React from 'react'
import {Link} from 'react-router-dom'
import ShowImage from './showImage'
import moment from 'moment'

const Card = ({product, showViewProductButton = true}) =>{


    const showAddToCartButton = () =>{
        return (
            <button className='btn btn-outline-warning mt-2 mb-2'>Add to cart</button>
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