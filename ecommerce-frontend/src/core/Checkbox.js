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
                <li key={i} className='list-unstyled'>
                <input onChange={handleToggle(c._id)} value={checked.indexOf(c._id === -1)} type='checkbox' className='form-check-input'></input>
                <label className='form-check-label'>{c.name}</label>
            </li>
            )
            
        })
    )
    
}

export default Checkbox