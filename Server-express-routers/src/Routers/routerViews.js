import  path  from 'path'
import __dirname from '../utils.js'
import { Router} from 'express'
import { ProductsManager } from './managerProducts.js'
export const router = Router()
import { io } from '../app.js'

let pm = new ProductsManager(path.join(__dirname,'./file/listProducts.txt'))
let products = pm.getProduct()


router.get('/',(req,res)=>{

res.status(200).render("home",{titulo:"home page",products})

})


router.get('/realtimeproducts',(req,res)=>{

    res.status(200).render('websocket',{products,titulo:"Web socket"})
    
    })