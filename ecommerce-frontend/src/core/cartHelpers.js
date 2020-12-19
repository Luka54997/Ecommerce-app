export const addItem = (item,next) =>{

    let cart = []

    if(window !== 'undefined'){
        if(localStorage.getItem('cart')){
            cart = JSON.parse(localStorage.getItem('cart'))
        }

        cart.push({
            ...item,
            count: 1
        })

        cart = Array.from(new Set(cart.map((p)=>(p._id)))).map(id =>{
            return cart.find(p=>p._id === id)
        })

        localStorage.setItem('cart',JSON.stringify(cart))

        next()

    }

}

export const itemsTotal = () =>{
    if(typeof window !== 'undefined'){
        if(localStorage.getItem('cart')){
            return JSON.parse(localStorage.getItem('cart')).length
        }        
    }
    return 0
}

export const getitemsFromCart = () =>{
    if(typeof window !== 'undefined'){
        if(localStorage.getItem('cart')){
            return JSON.parse(localStorage.getItem('cart'))
        }        
    }
    return []
}

export const updateItem = (productId,count) =>{
    if(typeof window !== 'undefined'){
        if(localStorage.getItem('cart')){
            const cart = JSON.parse(localStorage.getItem('cart'))

            cart.forEach(item => {
                if(item._id === productId){
                    item.count = count
                }
            });

            localStorage.setItem('cart',JSON.stringify(cart))

        }        
    }
    
}

export const removeItem = (productId) =>{
    console.log('eeeeeeeeeee')
    if(typeof window !== 'undefined'){
        if(localStorage.getItem('cart')){
            const cart = JSON.parse(localStorage.getItem('cart'))

            cart.forEach((item,index) => {
                if(item._id === productId){
                    cart.splice(index,1)
                }
            });

            localStorage.setItem('cart',JSON.stringify(cart))

        }        
    }
    
}