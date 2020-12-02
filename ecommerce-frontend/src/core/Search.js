import React,{useState,useEffect} from 'react'
import Layout from './Layout'
import {getCategories} from './apiCore'
import Card from './Card'

const Search = () =>{

    const [data,setData] = useState({
        categories: [],
        category: '',
        results: [],
        searched: false
    })
    const [error, setError] = useState(false);
    const {categories,category,results,searched} = data
    

    const loadCategories = () =>{
        getCategories().then(data =>{
            if(data.error){
                setError(data.error)
            }
            else{
                setData({...data,categories:data})
            }
        })
    }

    useEffect(()=>{
        loadCategories()
    },[])

    return (
        <div>
            <h2>Search bar</h2>
            {JSON.stringify(data)}
        </div>
    )
}

export default Search