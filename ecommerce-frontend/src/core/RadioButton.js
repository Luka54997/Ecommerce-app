import React,{useState,useEffect,Fragment} from 'react'

const RadioButton = ({prices,handleFilters}) =>{

    const [value,setValue] = useState(0)

    const handleChange = (event) =>{
        handleFilters(event.target.value)
        setValue(event.target.value)
    }


    return (
        prices.map((price,index)=>{
            return(
                <div key={index}>
                    <input onChange={handleChange} type ='radio' className='ml-2 mr-4' value={`${price._id}`} name={price}></input>
                    <label className='form-check-label'>{price.name}</label>
                </div>
            )
        
        })
    )
        
}

export default RadioButton