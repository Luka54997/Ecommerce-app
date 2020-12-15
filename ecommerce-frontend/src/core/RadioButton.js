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
                    <div key ={index}>
                         <div class="form-check pl-0 mb-3 ml-4">
                            <input type="radio" onChange={handleChange} className="form-check-input" value={price._id} name="materialExampleRadios"/>
                            <label className="form-check-label small text-uppercase card-link-secondary" >{price.name}</label>
                        </div>                    
                    </div>          
                   
                
            )
        
        })
    )
        
}

export default RadioButton