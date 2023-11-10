
import express from 'express';
import { router as router_products } from './Routers/routerProducts.js';
import { router as router_cart } from './Routers/routerCart.js'
const app = express()
const PORT = 8080

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/products', router_products)
app.use('/api/carts', router_cart)
app.get("/", (req, res) => {
    res.status(200).json("Server online")
})

const server = app.listen(PORT, () => {

    console.log("Server in service")
})   