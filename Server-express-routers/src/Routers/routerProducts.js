import __dirname from '../utils.js'
import path from 'path'
import { Router } from 'express'
export const router = Router()
import { ProductsManager } from './managerProducts.js'
import { io } from '../app.js'




const pm = new ProductsManager(path.join(__dirname,'./file/listProducts.txt'))
const products = pm.getProduct()


router.get('/', (req, res) => {
    if (req.query.limit === "") return res.status(200).send({ products })
    else {
        let limitation = products.slice(0, req.query.limit)
        res.status(200).send(limitation)
    }


})

router.get('/:id', (req, res) => {

    let id = parseInt(req.params.id)

    if (isNaN(id) || id == "") return res.status(400).json(`El id ${id} es invalido`)
    let exist = products.findIndex(x => x.id == id)

    if (exist == -1) return res.status(400).json("El id ingresado no se en encuentra en la BD")
    else {
        res.status(200).json(products[exist])
    }

})

router.post('/', (req, res) => {

    let all_products = pm.getProduct()
    let body = req.body
    let exist = all_products.find(x=> x.code === body.code)
    if(exist) res.status(400).json("El code esta en uso")

    const date = ['title', 'description', 'price', 'code', 'stock', 'category']

    let filter = date.filter(x => !(x in body));

    if (filter.length > 0) {

        return res.status(400).json("No has ingresado todos los campos");

    }

    const typeDate = {

        title: 'string',
        description: 'string',
        code: 'string',
        price: 'number',
        status: 'boolean',
        stock: 'number',
        category: 'string'

    }

    let incorrectDate = Object.entries(typeDate).reduce((acc, [date, type]) => {
        if (body[date] !== undefined) {
            if (typeof body[date] !== type) acc.push(date)
        } return acc
    }, [])

    if (incorrectDate.length > 0) return res.status(400).json("Los datos ingresados en un tipo de dato invalido")
   
    body.thumbnail = body.thumbnail || []

    body.status = body.status || true
    if (!Array.isArray(body.thumbnail)) return res.status(400).json("El campo thumbnail es  inválido ")

    let product = body


    let respuesta = pm.addProducts(product);
    if (!respuesta) return res.status(400).json("No se ha podido agregar el producto")
    else { res.status(200).json("Producto ingresado correctamente:") 
           io.emit("newProduct",respuesta)}
    
})

router.put('/:id', (req, res) => {
    let modify = req.body
    let id = parseInt(req.params.id)

    let respuesta = pm.update(id, modify)

    if (!respuesta) res.status(400).json("No se ha podido actualizar el producto")
    else {
        res.status(200).json("Actualizado con exito")

    }

})

router.delete("/:id", (req, res) => {
    let id = parseInt(req.params.id)
    let respuesta = pm.deleteProduct(id)

    if (!respuesta) return res.status(400).json("Error al eliminar, vuelva intentar")
    else { res.status(200).json(`El producto con id ${id} ha sido eliminado`) 
     io.emit("delete",id)}
     console.log(id)
})