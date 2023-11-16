console.log("desde el websocket")

const socket = io()
socket.on("newProduct", product=>{
    let ul = document.querySelector('ul')
    let newLi = document.createElement('li')
    newLi.innerHTML = product
    ul.append(newLi)
})


socket.on("delete", idD=>{
    
    console.log("El producto eliminado es el de la posicion:",Prod)
    let id=parseInt(idD)
    let removProd = document.querySelectorAll('li')[id]
    removProd.remove(id)
 
})
