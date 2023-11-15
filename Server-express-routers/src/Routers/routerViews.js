import  path  from 'path'
import __dirname from '../utils.js'
import { Router} from 'express'
import { ProductsManager } from './managerProducts.js'
export const router = Router()

let pm = new ProductsManager(path.join(__dirname,'./file/listProducts.txt'))
let products = pm.getProduct()
console.log(products)

router.get('/',(req,res)=>{

res.status(200).render('home',{products,titulo: "Productos"})

})


router.get('/socket',(req,res)=>{

    res.status(200).render('socket',{titulo:"socket"})
    
    })