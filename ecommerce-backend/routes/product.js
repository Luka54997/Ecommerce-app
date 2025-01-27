const express = require('express')
const router = express.Router()
const {userSignUpValidator} = require('../validator')
const { requireSignin } = require('../controllers/auth')
const {isAuth,isAdmin} = require('../controllers/auth')
const { userById } = require('../controllers/user')
const { productById,read,create,remove,update,list,listRelated,listCategories,listBySearch,photo,listSearch } = require('../controllers/product')

router.get('/products/search',listSearch)
router.get('/product/:productId',read)
router.post('/product/create/:userId',requireSignin,isAuth,isAdmin,create)
router.delete('/product/:productId/:userId',requireSignin,isAuth,isAdmin,remove)
router.put('/product/:productId/:userId',requireSignin,isAuth,isAdmin,update)
router.get('/products',list)
router.get('/products/related/:productId',listRelated)
router.get('/products/categories',listCategories)
router.post('/products/by/search', listBySearch)
router.get('/product/photo/:productId',photo)


router.param('userId',userById)
router.param('productId',productById)




module.exports = router