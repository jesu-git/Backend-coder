
import express from 'express';
import { router as router_products } from './Routers/routerProducts.js';
import { router as router_cart } from './Routers/routerCart.js'
import { router as router_views } from './Routers/routerViews.js'
import { engine } from 'express-handlebars'

import __dirname from './utils.js'
import path from 'path' 

const app = express()
const PORT = 8080

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars',engine());
app.set('view engine','handlebars')
app.set('views', path.join(__dirname,'./views'))

app.use(express.static("./src/public"))

app.get("/", (req, res) => {

    res.status(200).render('home')

})
app.use('/api/products', router_products)
app.use('/api/carts', router_cart)
app.use('/views', router_views)


const server = app.listen(PORT, () => {

    console.log("Server in service")
})
