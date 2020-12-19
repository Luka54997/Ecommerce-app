import React,{useState,useEffect} from 'react'

const Checkbox = ({categories,handleFilters}) =>{

    const [checked,setChecked] = useState([])

    const handleToggle = c =>()=>{

        const currentChecked = checked.indexOf(c)

        const newChecked = [...checked]
        if(currentChecked === -1){
            newChecked.push(c)
        }
        else{
            newChecked.splice(currentChecked,1)
        }        
        setChecked(newChecked)
        handleFilters(newChecked)
    }

    return(
        categories.map((c,i)=>{
            return(   
                <div key={i} className="form-check pl-0 mb-3 ml-4">
                    <input onChange={handleToggle(c._id)} value={checked.indexOf(c._id === -1)} type="checkbox" className="form-check-input filled-in"/>
                    <label className="form-check-label small text-uppercase card-link-secondary" >{c.name}</label>
                </div>
            )
            
        })
    )
    
}

export default Checkbox