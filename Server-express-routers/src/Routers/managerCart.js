
import fs from 'fs'
import { ProductsManager } from './managerProducts.js'

const pm = new ProductsManager('./listProducts.txt')

export class cart {

    constructor(route) {

        this.route = route
    }

    getCart() {

        if (fs.existsSync(this.route)) {

            return JSON.parse(fs.readFileSync(this.route, "utf-8"))

        }
        else {

            return []
        }
    }

    createCart() {

        let carts = this.getCart()

        let id = carts.length + 1
        let productsCart = []


        let cart = {
            id,
            productsCart,

        }

        carts.push(cart)
        fs.writeFileSync(this.route, JSON.stringify(carts, null, 5))
        return cart

    }

    addProductsCart(idC, prodId) {

        let carts = this.getCart()
        let products1 = pm.getProduct()

        let existProduct = products1.find(x => x.id == prodId)
        if (!existProduct) return console.log("El producto ingresado no existe en la BD")


        let existCart = carts.findIndex(x => x.id == idC)
        if (existCart == -1) return console.log("El carrito ingresado no existe")

        let cart = carts[existCart]

        let exist_quantity = cart.productsCart.findIndex(x => x.id == prodId)
        console.log(exist_quantity)
        if (exist_quantity == -1) {

            cart.productsCart.push({ id: parseInt(prodId), quantity: 1 })

        } else {

            cart.productsCart[exist_quantity].quantity++;

        }

        fs.writeFileSync(this.route, JSON.stringify(carts, null, 5))
        return cart
    }

    getProductId(id){

        let carts = this.getCart()
    
        let exist = carts.findIndex(x => x.id == id)
        
        let cart = carts[exist].productsCart
         console.log(cart)
        let products = pm.getProduct()
        
        

        if (exist != -1) {
          

            return cart
  
               }
    
                
    
        else{
    
            return console.log("El carrito no se encontro")
        }

       
    }


}


