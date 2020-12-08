import React,{useState,useEffect} from 'react'
import Layout from './Layout'
import {getCategories, getProducts,getProduct} from './apiCore'
import Card from './Card'
import Search from './Search'

const Product = ({match}) =>{

    const [product,setProduct] = useState({})

    useEffect(()=>{
        getSingleProduct(match.params.productId)
    },[])

    const getSingleProduct = (id) =>{
        getProduct(id).then(data=>{
            setProduct({...data})
        })
    }
    
    
    return(

        <Layout title="Shop page" description="Node React E-commerce App" className="container-fluid">
            
            <Card product={product}></Card>
            
        </Layout>
        )

}

export default Product