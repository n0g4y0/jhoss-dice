class Pieza{
    constructor(nombre){
        this.nombre = nombre;
    }
    get name(){
        return this.name;
    }
    get value(){
        return  this.nombre[0].toUpperCase();
    }
}

let valores = [new Pieza('blue'),new Pieza('yellow'),new Pieza('red'),new Pieza('green')];

const DURACION_SECUENCIA = 1000;
let listaSecuenciaJuego = []
let listaSecuenciaUsuario = []
let puntaje = 0;
let nivel = 1;
let continua = true;
deshabilitarBotones(true);

function obtenerValorAleatorio(valores){

    let valorAleatorio =  Math.floor(Math.random() * (((valores.length) - 0) + 0));
    return valores[valorAleatorio];
}

function agregarValorALista(lista,listaOpciones){

    lista.push(obtenerValorAleatorio(listaOpciones));
}

function secuenciasSonIguales(listaSecuenciaJuego, listaSEcuenciaUsuario){

    if(listaSecuenciaJuego.length !== listaSEcuenciaUsuario.length){
        return false;
    }else{
        return !listaSecuenciaJuego.some((item,i) => item.value !== listaSEcuenciaUsuario[i].value)
    }
}

function resaltarPieza(name){
    
    let $elemento = document.querySelector(`#${name}`);
    $elemento.classList.add(`resaltar-${name}`);

    setTimeout( function(){
        mostrarPorTiempo(name);
    },DURACION_SECUENCIA,name);

}


function mostrarPorTiempo(name){

    let $elemento = document.querySelector(`#${name}`);
    $elemento.classList.remove(`resaltar-${name}`);

}

function mostrarSecuencia(delay, arr){
    let times = arr.length;
    let count = 0;

    const intervalId = setInterval(() => {

    if(count < arr.length){
        let $elemento = document.querySelector(`#${arr[count].nombre}`);
        $elemento.classList.add(`resaltar-${arr[count].nombre}`);
    }
    
      if (count >= times) {
        deshabilitarBotones(false);
        clearInterval(intervalId);
        return;
      }
      setTimeout(() => {
        
        let $elemento = document.querySelector(`#${arr[count-1].nombre}`);
        $elemento.classList.remove(`resaltar-${arr[count-1].nombre}`);
        
      }, delay);
      count++;
    }, delay * 2, arr);

}

function capturarSecuenciasUsuario(cantidad){

    if(cantidad === listaSecuenciaUsuario.length){

        return listaSecuenciaUsuario;
    }
}

function inicioJuego(){
    const DURACION_MOSTRAR_SECUENCIA = 1000;
    
    resetear();

    agregarValorALista(listaSecuenciaJuego,valores);

    mostrarSecuencia(DURACION_MOSTRAR_SECUENCIA,listaSecuenciaJuego)

    habilitarBotonIniciarJuego(false);
    
}
function continuarJuego(){

    agregarValorALista(listaSecuenciaJuego,valores);

    mostrarSecuencia(DURACION_SECUENCIA,listaSecuenciaJuego)
}

function repetirSecuencia(cantidad){
    for(let i=1; i <= cantidad; i++ ){
        agregarValorALista(listaSecuenciaJuego,valores);
    }
}

function resetear(){

    listaSecuenciaJuego = []
    listaSecuenciaUsuario = []
    puntaje = 0;
    nivel = 1;
    continua = true;
    deshabilitarBotones(true);
}

function deshabilitarBotones(value){
    let botones = document.querySelectorAll(".pieza");
    

      for (var i = 0; i < botones.length; i++) {
        if(value){
            botones[i].disabled = true;
        }else{
            botones[i].disabled = false;
        }    
    }
}
function habilitarBotonIniciarJuego(value){
    let iniciarBtn = document.querySelector("#iniciar-juego");
    value? iniciarBtn.disabled = false: iniciarBtn.disabled = true; 
}

function cambiarPuntaje(){
    document.querySelector("h2").innerText = `Puntaje: ${puntaje}`;
}
function usuarioIntrodujoSecuencia(){
    if(listaSecuenciaUsuario.length === listaSecuenciaJuego.length){
        iniciarComparacion();
    }
}
function iniciarComparacion(){
    
    let res = secuenciasSonIguales(listaSecuenciaJuego,listaSecuenciaUsuario);
    if(res){
        alert(`Bien Hecho!, vamos a la ronda ${nivel + 1}`);
        nivel++;
        puntaje++;
        cambiarPuntaje();
        continuarJuego();

    }else{
        alert("Perdiste");
        habilitarBotonIniciarJuego(true);
        continua = false;
        resetear()
        cambiarPuntaje();
        
    }
    listaSecuenciaUsuario = [];
}


// EVENTOS

document.querySelector("#blue").onclick = function(event){
    listaSecuenciaUsuario.push(new Pieza(event.target.value));
    resaltarPieza(event.target.value);
    usuarioIntrodujoSecuencia();
}

document.querySelector("#red").onclick = function(event){
    listaSecuenciaUsuario.push(new Pieza(event.target.value));
    resaltarPieza(event.target.value);
    usuarioIntrodujoSecuencia();
}

document.querySelector("#yellow").onclick = function(event){
    listaSecuenciaUsuario.push(new Pieza(event.target.value));
    resaltarPieza(event.target.value);
    usuarioIntrodujoSecuencia();
}

document.querySelector("#green").onclick = function(event){
    listaSecuenciaUsuario.push(new Pieza(event.target.value));
    resaltarPieza(event.target.value);
    usuarioIntrodujoSecuencia();
}

document.querySelector("#iniciar-juego").onclick = function(event){
    inicioJuego();
    
}


