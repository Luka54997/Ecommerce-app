import React,{useState,useEffect} from 'react'
import Layout from './Layout'
import {getCategories} from './apiCore'
import CheckBox from './Checkbox'
import RadioButton from './RadioButton'
import {prices} from './fixedPrice'

 const Shop = () =>{

    const [categories,setCategories] = useState([])
    const [error,setError] = useState(false)
    const [myFilters,setMyFilters] = useState({
        filters: {category:[],price:[]}
    })

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
        const newFilters = {...myFilters}
        newFilters.filters[filterBy] = filters

        if(filterBy === 'price'){
            let priceValues = handlePrice(filters)
            newFilters.filters[filterBy] = priceValues
        }

        setMyFilters(newFilters)
        console.log(myFilters)
    }

    const handlePrice = (value) =>{
        const data = prices
        let array = []

        for(let key in data){
            if(data[key]._id === parseInt(value)){
                array = data[key].array
            }
        }
        return array
    }

    return(

        <Layout title="Shop page" description="Node React E-commerce App" className="container-fluid">
            <div className='row'>
                <div className='col-4'>
                    <h4>Filter by category</h4>
                    <ul>
                        <CheckBox categories={categories} handleFilters={filters => handleFilters(filters,'category')}/>
                    </ul>   
                    <h4>Filter by price</h4>
                    <div>
                        <RadioButton prices={prices} handleFilters={filters => handleFilters(filters,'price')}/>
                    </div>                                    
                </div>
                <div className='col-8'>{JSON.stringify(myFilters)}</div>
            </div>
            
        </Layout>
        )
}

export default Shop