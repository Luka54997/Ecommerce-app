import React from 'react'
import {API} from '../config'

const ShowImage = ({item,url}) =>{
    return(
    <div className='product-img'>
        <img src= {`${API}/${url}/photo/${item._id}`} alt={item.name} className='mb-3' style={{height:'350px',width:'263px'}}></img>
    </div>
    )
    

}

export default ShowImage