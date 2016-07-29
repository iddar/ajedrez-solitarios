const casillasArray = document.querySelectorAll('.casilla')

const status = {
  fichaSeleccionada: '',
  target: null
}

// Lista con las direcciones de las imagenes
iconos = {
  alfil: '36239fb2-d47d-0c4a-93b1-8f33e3394bff',
  caballo: '8e5b59c8-f2dc-744a-a949-ae2a961429c2',
  peon: '5fd43608-867b-1b40-909d-4630bc6d3ed7',
  torre: '14d939c1-cc0a-ad47-a2a0-f7943021df86'
}

// Lista con la posicion de cada ficha
const esenario = {
  alfil: 5,
  torre: 8,
  caballo: 15,
  peon: 9
}

// Lista con movimistos validos permitidos
const movimientosValidos = {
  alfil: [8],
  torre: [9, 5],
  caballo: [9],
  peon: []
}

const moverFicha = ({target}) => {
  const posicion = esenario[target.dataset.ficha]
  const fichas = [...document.querySelectorAll('.activo')]
  const movimiento = movimientosValidos[status.fichaSeleccionada]
  console.warn(movimiento && movimiento.indexOf(posicion))
  
  const validacion = !!movimiento ? movimiento.indexOf(posicion) : -1
  if (validacion !== -1)  {
    let nuevaPosicion = target.parentNode
    movimiento.splice(validacion, 1);
    target.parentNode.removeChild(target)
    if (status.target) {
      status.target.parentNode.removeChild(status.target)
      nuevaPosicion.appendChild(status.target)
      esenario[status.fichaSeleccionada] = posicion
    }
    
    if (document.querySelectorAll('img').length === 1 ) {
      alert('Ganaste :)')
      location.reload()
    }
  }
  
  fichas.map(ficha => ficha.classList.remove('activo'))
  target.classList.add('activo')
  status.fichaSeleccionada = target.dataset.ficha
  status.target = target
}

const creaImagen = nombre => {
  const imagen = document.createElement('img')
  const direccion = `blob:https://mozillathimblelivepreview.net/${iconos[nombre]}`
  imagen.setAttribute('src', direccion)
  imagen.addEventListener("click", moverFicha , false)
  imagen.dataset.ficha = nombre
  return imagen
}

const agregarFicha = (ficha, posicion) => {
  casillasArray[posicion].appendChild(creaImagen(ficha))
}

Object.keys(esenario).map(ficha => agregarFicha(ficha, esenario[ficha]))




//casillasArray.map((casilla, key) => {
//  casilla.innerHTML = `Key: ${key} [${Math.floor(key / 4)}, ${key % 4} ]`
//})