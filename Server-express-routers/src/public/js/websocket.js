console.log("desde el websocket")

const socket = io()
socket.on("newProduct", product=>{
    let ul = document.querySelector('ul')
    let newLi = document.createElement('li')
    let hr = DOCUMENT.createElement('hr')
    newLi.innerHTML = product
    ul.append(newLi,hr)
    

})

socket.on("delete", idOn=>{
    
    let pDelete = document.getElementById(`${idOn}`)
    pDelete.remove()
    console.log("El producto eliminado es el de la posicion:",idOn)
})
