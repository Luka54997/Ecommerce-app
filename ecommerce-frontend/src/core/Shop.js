import React,{useState,useEffect} from 'react'
import Layout from './Layout'
import {getCategories} from './apiCore'
import CheckBox from './Checkbox'

 const Shop = () =>{

    const [categories,setCategories] = useState([])
    const [error,setError] = useState(false)

    const init = () =>{
        getCategories().then(data =>{
            if(data.error){
                setError(data.error)
            }else{
                setCategories(data)
            }
            
        })
    }
    
    useEffect(()=>{
        init()
    },[])

    const handleFilters = (filters,filterBy) =>{
        console.log('SHOP',filters,filterBy)
    }

    return(

        <Layout title="Shop page" description="Node React E-commerce App" className="container-fluid">
            <div className='row'>
                <div className='col-4'>
                    <h4>Filter by category</h4>
                    <ul>
                        <CheckBox categories={categories} handleFilters={filters => handleFilters(filters,'category')}/>
                    </ul>                                       
                </div>
                <div className='col-8'>right Side</div>
            </div>
            
        </Layout>
        )
}

export default Shop