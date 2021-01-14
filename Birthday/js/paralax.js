;(function(){
    //<header class="hero" data-paralax data-p-velocity=".5">
    
        window.addEventListener('scroll', positionImg)
        
        const dataParalaxContainer = [...document.querySelectorAll('[data-paralax]')]
    
        function isGettingOut(container){
            return container.getBoundingClientRect().top <= 0
    
        }
    
        function getNewPosition(c){
            const v = parseFloat(c.getAttribute('data-p-velocity')) || .5
            return c.getBoundingClientRect().top * v * -1
        }
    
        function positionImg(){
            dataParalaxContainer.forEach(c => {
                let originalPositionY = getComputedStyle(c).backgroundPositionY
                let originalPositionX = getComputedStyle(c).backgroundPositionX
                 console.log(originalPositionX, originalPositionY)
    
                if(isGettingOut(c)){
                    c.style.backgroundPosition = `${originalPositionX} ${getNewPosition(c)}px`
                }else{
                    c.style.backgroundPosition = `${originalPositionX} 0px`
                }
    
            })
    
        }
    
         positionImg()
    })();