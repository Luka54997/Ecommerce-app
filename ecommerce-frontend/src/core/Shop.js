import React,{useState,useEffect} from 'react'
import Layout from './Layout'
import {getCategories} from './apiCore'
import CheckBox from './Checkbox'
import RadioButton from './RadioButton'
import {prices} from './fixedPrice'
import {getFilteredProducts} from '../core/apiCore'
import Card from './Card'


 const Shop = () =>{

    const [categories,setCategories] = useState([])
    const [error,setError] = useState(false)
    const [myFilters,setMyFilters] = useState({
        filters: {category:[],price:[]}
    })

    const [limit,setLimit] = useState(6)
    const [skip,setSkip] = useState(0)
    const [filteredResults,setFilteredResults] = useState([])

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
        loadFilteredResults(skip,limit,myFilters.filters)
    },[])

    const handleFilters = (filters,filterBy) =>{
        const newFilters = {...myFilters}
        newFilters.filters[filterBy] = filters

        if(filterBy === 'price'){
            let priceValues = handlePrice(filters)
            newFilters.filters[filterBy] = priceValues
        }
        loadFilteredResults(myFilters.filters)
        setMyFilters(newFilters)        
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

    const loadFilteredResults = (newFilters) =>{

      // console.log(newFilters)
        getFilteredProducts(skip,limit,newFilters).then(data=>{
            if(data.error){
                setError(data.error)
            }else{
                setFilteredResults(data.data)
            }
            
        })

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
                
                    <div className='row col-8'>{filteredResults.map((result,index)=>{
                        return(
                            <Card key={index} product={result}></Card>
                        )
                    })}
                    </div>
            </div>
            
        </Layout>
        )
}

export default Shop