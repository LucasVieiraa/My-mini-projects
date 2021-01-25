;(function() {
    
    function calculo(){
        const nome = document.getElementById('nome').value
        const altura = document.getElementById('altura').value
        const peso = document.getElementById('peso').value
        const resultado = document.getElementById('resultado')
        
        if(altura === '' || peso === ''){
        
         resultado.textContent = 'Preencha todos os campos'
            
        }else{
            
            let msg = ''
            let total = (peso / (altura ** 2)).toFixed(1)
            
            if (total < 18.5){
                msg = 'abaixo do peso.'
            }else if (total < 25) {
                msg = 'no peso ideal.'
            }else if (total < 30){
                msg = 'levemente acima do peso.'
            }else if (total < 35){
                msg = 'com obesidade grau I.'
            }else if (total < 40){
                msg = 'com obesidade grau II.'
            }else {
                msg = 'com obesidade grau III.'
            }
            resultado.textContent = `${nome} seu IMC é ${total} e você está ${msg}`
        }
    };
    
    const btnCalcular = document.getElementById('calcular')
    btnCalcular.addEventListener('click', calculo)
    
    
})();
