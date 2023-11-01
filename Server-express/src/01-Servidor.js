// SERVIDOR EXPRESS

const express = require('express')
const ProductsManager = require('./02-managerProducts.js')

const PORT = 3000
const app = express()
const server = app.listen(PORT, ()=>{console.log("Server online")})

const pm = new ProductsManager('./listProducts.txt')
const products = pm.getProduct()

//PAGINA PRINCIPAL
app.get("/",(req,res)=>{
  res.status(200).send("Servidor Express!!")
})

//MUESTRA LOS PRODUCTOS Y LIMITA POR PARAMETRO
app.get("/products",(req,res)=>{

  if(req.query.limit ==="")return res.status(200).send(products)
  else{
   let limitation =products.slice(0,req.query.limit)
   res.status(200).send(limitation)
  }
})

//DEVUELVE SOLO EL ELEMENTO CON EL ID PASADO
app.get("/products/:id",(req,res)=>{
  
 let id = req.params.id
 
 if(id == NaN || id == "")return res.status(400).send("El id ingresado no es numerico")
 
 else {
      
    let search = products.find((p)=> p.id == id)
    
      if(!search)return res.status(400).send("El id ingresado no existe")
    
      return res.status(200).send(search)}


 
 
})