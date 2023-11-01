//LIBRERIA FILE SYSTEM


const fs = require('fs')

//CLASS PRODUCT

class ProductsManager{

  constructor(route){

   this.route = route
   
}
//METODO QUE PERMITE LA DEVOLUCION Y VISTA DE LOS PRODUCTOS EN EL ARREGLO 
getProduct(){

    if(fs.existsSync(this.route)){
    
      return JSON.parse(fs.readFileSync(this.route,"utf-8"))

    }
    else{

      return  []
    }

    
}
//METODO QUE INGRESA LOS PRODUCTOS NUEVOS AL ARREGLO Y COMPRUEBA QUE EL CODE NO SE REPITA Y TODOS LOS CAMPOS SE INGRESEN
addProducts(title,descripction,price,thumbnail,code,stock){
  
  let all_products =  this.getProduct()
    
  if(title === ""||descripction === ""|| isNaN(price) || price < 0 ||thumbnail === ""||code === ""||stock === ""){
      return console.log("debe completar todos los campos")
  }

  let exist = all_products.find(X=>X.code === code)

  if(exist){

   console.log("El code ingresado ya esta en uso")
   return
  }

   
   let id = all_products.length + 1

   let productNew = {
      id,
      title,
      descripction,
      price,
      thumbnail,
      code,
      stock    
   }

  if(Object(productNew).length < 6){
    console.log("Su operacion sin exito,no has llenado todos los campos")
   }
  else{
    all_products.push(productNew)

    fs.writeFileSync(this.route, JSON.stringify(all_products,null,5))

   }
 
}
//METODO QUE NOS DEVUELVE EL PRODUCTO MEDIANTE EL INGRESO DE ID POR PARAMETRO 
  getProductById(id){

    let products =  this.getProduct()

   let index = products.findIndex(X=> X.id === id)
  
    if(index === -1){
      
      console.log(`El producto con id ${id} no existe`)
      return
    }
    else{

      return products[index]
    }
   
}
//METODO QUE ELIMINA UN PRODUCTO ATRAVES DE LA INSERCION DE SU ID POR PARAMETRO   
deleteProduct(id){
    
   let all_products1 = this.getProduct()
   
   let indice = all_products1.findIndex((x)=> x.id === id)

   if(indice === -1){
     
     console.log(`El id ${id} no se encuentra en la DB`)
     
   }
   else{

    all_products1.splice(indice,1)
    console.log(`El producto con id ${id} ha sido borrado con exito`)
    fs.writeFileSync(this.route,JSON.stringify(all_products1,null,5))
   }

}
//METODO QUE ACTUALIZA MEDIANTE EL INGRESO DE DOS PARAMETROS(PARAMETRO 1 ES UN ID,PARAMETRO 2 ES UN OBJETO CON LAS CLAVE-VALOR A MODIFICAR)
update(id,obj){
  let all_products1 = this.getProduct()
   
  let indice = all_products1.findIndex((x)=> x.id === id)

  if(indice === -1){
    
    console.log(`El id ${id} no se encuentra en la DB`)

  }
  const checkObj = (obj) => {
    return obj === Object(obj);
  };


  if (!checkObj) {
    console.log("no es un objeto");
    return;
  }

  const keys = Object.keys(obj);
 
  const keys_old= Object.keys(all_products1[0]);

 try {

  keys.forEach((date)=>{

    let dato = keys_old.includes(date)
    
 
    if (!dato) {
  
     
      throw new error ("hubo error")
      
    }
  
 } )}catch (error) {
  
  console.log("Verifique sus campos, no son correctos")
 return
 }
   
 all_products1[indice] = {...all_products1[indice],...obj, id}
 fs.writeFileSync(this.route, JSON.stringify(all_products1,null,5))

        
         }
        }

     
  

 const pm = new ProductsManager("./listProducts.txt")


 pm.addProducts('naranja','Es una fruta',400,'https://www.google.com/imgres?imgurl=https%3A%2F%2Felpoderdelconsumidor.org%2Fwp-content%2Fuploads%2F2022%2F02%2Fnaranja-1.jpg&tbnid=lpQ1PIew9bjQoM&vet=12ahUKEwiL6oa_hvSBAxUHULgEHaLcAacQMygCegQIARBy..i&imgrefurl=https%3A%2F%2Felpoderdelconsumidor.org%2F2022%2F02%2Fel-poder-de-la-naranja%2F&docid=QJHb282tljjB3M&w=600&h=375&q=NARANJA&hl=es-419&ved=2ahUKEwiL6oa_hvSBAxUHULgEHaLcAacQMygCegQIARBy',677788,20)
 pm.addProducts('lechuga','Es una verdura',600,'https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.frutamare.com%2Fwp-content%2Fuploads%2F2022%2F04%2Ftipos-de-lechuga.jpeg.webp&tbnid=E4dUIol4pRtqxM&vet=12ahUKEwij4e2YhvSBAxVymZUCHUGkCQoQMygBegQIARBL..i&imgrefurl=https%3A%2F%2Fwww.frutamare.com%2Ftipos-de-lechuga%2F&docid=kE-z6IaXTXjpSM&w=795&h=602&q=LECHUGA%20LINK%20CORTO&hl=es-419&ved=2ahUKEwij4e2YhvSBAxVymZUCHUGkCQoQMygBegQIARBL',677787,20)
 pm.addProducts('tomate','Es una verdura',800,'https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.frutamare.com%2Fwp-content%2Fuploads%2F2022%2F04%2Ftipos-de-lechuga.jpeg.webp&tbnid=E4dUIol4pRtqxM&vet=12ahUKEwij4e2YhvSBAxVymZUCHUGkCQoQMygBegQIARBL..i&imgrefurl=https%3A%2F%2Fwww.frutamare.com%2Ftipos-de-lechuga%2F&docid=kE-z6IaXTXjpSM&w=795&h=602&q=LECHUGA%20LINK%20CORTO&hl=es-419&ved=2ahUKEwij4e2YhvSBAxVymZUCHUGkCQoQMygBegQIARBL',677786,20)
 pm.addProducts('Cebolla','Es una verdura',900,'https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.frutamare.com%2Fwp-content%2Fuploads%2F2022%2F04%2Ftipos-de-lechuga.jpeg.webp&tbnid=E4dUIol4pRtqxM&vet=12ahUKEwij4e2YhvSBAxVymZUCHUGkCQoQMygBegQIARBL..i&imgrefurl=https%3A%2F%2Fwww.frutamare.com%2Ftipos-de-lechuga%2F&docid=kE-z6IaXTXjpSM&w=795&h=602&q=LECHUGA%20LINK%20CORTO&hl=es-419&ved=2ahUKEwij4e2YhvSBAxVymZUCHUGkCQoQMygBegQIARBL',677785,100)

  //console.log( pm.getProduct())
  //console.log( pm.getProductById(1))
  
  //pm.deleteProduct(1)
  //pm.deleteProduct(2)
  //pm.deleteProduct(3)
  
  //console.log( pm.getProduct())
  //pm.update(2,{title:"Melon",price:400,stock:15,imagen:"jpg"})
  //console.log( pm.getProduct())

module.exports=ProductsManager





    
