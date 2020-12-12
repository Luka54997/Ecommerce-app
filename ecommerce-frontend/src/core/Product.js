import React,{useState,useEffect} from 'react'
import Layout from './Layout'
import {getProduct,list,listRelated} from './apiCore'
import Card from './Card'


const Product = ({match}) =>{

    const [product,setProduct] = useState({})
    const [error,setError] = useState([])
    const [relatedProducts,setRelatedProducts] = useState([])
    useEffect(()=>{
        getSingleProduct(match.params.productId)
    },[match])

    const getSingleProduct = (id) =>{
        getProduct(id).then(data=>{
            if(data.error){
                setError(data.error)
            }else{
                setProduct(data)

                listRelated(data._id).then(data=>{
                    if(data.error){
                        setError(data.error)
                    }else{
                        setRelatedProducts(data)
                    }
                })

            }
        })
    }
    
    
    return(

        <Layout title="Shop page" description="Node React E-commerce App" className="container-fluid">
            
            <div className='row'>
                <div className='col-4 ' >
                    <Card product={product} showViewProductButton={false}></Card>
                </div>
                <div className='col-8' > 
                    <h4>Related products</h4>               
                    <div className='row ' > 
                                          
                        {relatedProducts.map((product,index)=>{
                            return(  
                                <div className='col-5 mr-2'>                          
                                    <Card key={index} product={product} showViewProductButton={true}></Card>
                                </div>
                            )
                        })}
                    </div>
                </div> 
            </div>
            
            
            
        </Layout>
        )

}

export default Product