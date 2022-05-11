/*
 *  para medir a distancia do scroll od topo, mas o melhor a ser usado é o offsetTop
 * ((window.innerHeight * 3) / 4) mão importa a altura da tela do usuario vai animar no ponto correto (vai ler o movimanto nos 3/4 da tela)
 * https://lodash.com/
 * https://debounce.com/
 */

const debounce = function(func, wait, immediate){
    let timeout;
    return function(...args){
        const context = this
        const later = function(){
            timeout = null
            if(!immediate) func.apply(context, args)
        }
        const callNow = immediate && !timeout
        clearTimeout(timeout)
        timeout= setTimeout(later, wait)
        if(callNow) func.apply(context, args)
    }
}

/*
*   A function debounce pode ser encontrada pronta no https://lodash.com
*   Serve para que o scroll não ative muitas vezes a função animeScroll que pode tornar o site mais lento
*/





const target = document.querySelectorAll("[data-anime]")
const animationClass = "animate"

function animeScroll() {
    const windowtop = window.pageYOffset + ((window.innerHeight * 3) / 4)
    target.forEach((element) => {
        if(windowtop > element.offsetTop ){
            element.classList.add(animationClass)
        }else{
            element.classList.remove(animationClass)
        }
    })
}

animeScroll()//grantindo que a função seja executada pelo menos 1 vez

window.addEventListener('scroll', debounce(function(){  
    animeScroll();
    console.log("ativada = ")
 }, 100))