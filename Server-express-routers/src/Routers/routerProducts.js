
import { Router } from 'express'
export const router = Router()
import { ProductsManager } from './managerProducts.js'




const pm = new ProductsManager('./listProducts.txt')
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

    let { title, description, code, price, status, stock, category,thumbnail } = req.body

    if (typeof title !== "string" || typeof description !== "string" ||typeof code !== "string" ||typeof category !== "string")return res.status(400).json("datos ingresados incorrectos en campos string")
    if(typeof status !== "boolean") return req.status(400).json("El status no es un boolean")
    if (isNaN(price) || isNaN(stock)) return res.status(400).send("Datos de price y stock incorrecto,ingrese datos numericos")
    if (!Array.isArray(thumbnail)) {
        return res.status(400).json({ error: 'Formato inválido para el campo thumbnails' })}

    let respuesta = pm.addProducts(title, description, code, price, status, stock, category,thumbnail)
    if (!respuesta) res.status(400).json("No se pudo ingresar el producto")
    else { res.status(200).json({ respuesta }) }

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
    else { res.status(200).json(`El producto con id ${id} ha sido eliminado`) }
})