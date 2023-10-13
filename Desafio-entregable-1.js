
//CLASS PRODUCT

class ProductsManager{

  constructor(){

   this.products= []
   
 }
  //METODO QUE INGRESA LOS PRODUCTOS NUEVOS AL ARREGLO Y COMPRUEVA QUE EL CODE NOSE REPITA Y TODOS LOS CAMPOS SE INGRESEN

 addProducts(title,descripction,price,thumbnail,code,stock){
  
   if(title === ""||descripction === ""||price === ""||thumbnail === ""||code === ""||stock === ""){
  return console.log("debe completar todos los campos")
  }

  let exist = this.products.find(X=>X.code === code)

  if(exist){

   console.log("El code ingresado ya esta en uso")
   return
  }

   
   let id =  this.products.length + 1

   let productNew = {
      id,
      title,
      descripction,
      price,
      thumbnail,
      code,
      stock
      
   }
   this.products.push(productNew)
 }
 //METODO QUE PERMITE LA DEVOLUCION Y VISTA DE LOS PRODUCTOS EN EL ARREGLO 
  getProduct(){
     return this.products
  }
 //METODO QUE NOS DEVUELVE EL PRODUCTO MEDIANTE EL INGRESO DE ID POR PARAMETRO 
  getProductById(id){

   let index = this.products.findIndex(X=> X.id === id)
  
    if(index === -1){
      
      console.log(`El producto con id ${id} no existe`)
      return
    }
   
     return this.products[index]
    
    }
    }


//const product = new ProductsManager()
//product.addProducts('naranja','Es una fruta',400,'https://www.google.com/imgres?imgurl=https%3A%2F%2Felpoderdelconsumidor.org%2Fwp-content%2Fuploads%2F2022%2F02%2Fnaranja-1.jpg&tbnid=lpQ1PIew9bjQoM&vet=12ahUKEwiL6oa_hvSBAxUHULgEHaLcAacQMygCegQIARBy..i&imgrefurl=https%3A%2F%2Felpoderdelconsumidor.org%2F2022%2F02%2Fel-poder-de-la-naranja%2F&docid=QJHb282tljjB3M&w=600&h=375&q=NARANJA&hl=es-419&ved=2ahUKEwiL6oa_hvSBAxUHULgEHaLcAacQMygCegQIARBy',677788,20)


//product.addProducts('lechuga','Es una verdura',300,'https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.frutamare.com%2Fwp-content%2Fuploads%2F2022%2F04%2Ftipos-de-lechuga.jpeg.webp&tbnid=E4dUIol4pRtqxM&vet=12ahUKEwij4e2YhvSBAxVymZUCHUGkCQoQMygBegQIARBL..i&imgrefurl=https%3A%2F%2Fwww.frutamare.com%2Ftipos-de-lechuga%2F&docid=kE-z6IaXTXjpSM&w=795&h=602&q=LECHUGA%20LINK%20CORTO&hl=es-419&ved=2ahUKEwij4e2YhvSBAxVymZUCHUGkCQoQMygBegQIARBL',677787,20)

//console.log (product.getProductById(1))
//console.log(product.getproductM())