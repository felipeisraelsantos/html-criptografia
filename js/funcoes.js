function tiraAcento(texto) {
    return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
}

function encriptCesar(texto, posicao) {
    var cifra = ""
    for (var i = 0; i < texto.length; i++) {
        if (texto.charCodeAt(i) == 32) {
            cifra += String.fromCharCode(32)
            continue
        }
        var codigo = (((texto.charCodeAt(i) - 65) + posicao) % 26) + 65
        cifra += String.fromCharCode(codigo)
    }

    return cifra

}

function decriptCesar(texto, posicao) {
    var cifra = ""
    for (var i = 0; i < texto.length; i++) {
        if (texto.charCodeAt(i) == 32) {
            cifra += String.fromCharCode(32)
            continue
        }

        var codigo = (((texto.charCodeAt(i) - 90) - posicao) % 26) + 90

        cifra += String.fromCharCode(codigo)
    }

    return cifra

}

function encriptVigenere(texto, chave) {
    var cifra = ""
    var j = 0

    for (i = 0; i < texto.length; i++) {
        if (texto.charCodeAt(i) == 32) {
            cifra += String.fromCharCode(32)
            continue
        }
        var codigo = (texto.charCodeAt(i) + chave.charCodeAt(j) - 2 * 65) % 26 + 65
        j = (j + 1) % chave.length

        cifra += String.fromCharCode(codigo)
    }

    return cifra;
}

function descriptVigenere(texto, chave) {
    var cifra = ""
    var j = 0

    for (i = 0; i < texto.length; i++) {
        if (texto.charCodeAt(i) == 32) {
            cifra += String.fromCharCode(32)
            continue
        }
        var codigo = (texto.charCodeAt(i) - chave.charCodeAt(j) + 26) % 26 + 65
        j = (j + 1) % chave.length

        cifra += String.fromCharCode(codigo)
    }

    return cifra;
}

function indice_maior(alfabeto, indice_2 = null){
    var maior = 0
    var novoindice

    for (var i = 0; i < 26; i++) {
        if (indice_2 == null) {
            if (i == 0) {
                novoindice = 0
                maior = alfabeto[i]
            }else if (alfabeto[i] > maior) {
                novoindice = i
                maior = alfabeto[i]
            }
        }else {
            if (indice_2 != i) {
                if (alfabeto[i] < alfabeto[indice_2] && alfabeto[i] > maior) {
                    novoindice = i
                    maior = alfabeto[i]
                }
            }
        }	
    }
    return novoindice
}

$(document).ready(function () {
    $('#texto-descript').keyup(function(e){
        e.preventDefault()
        var texto = tiraAcento($('#texto-descript').val().toUpperCase())

        $('#texto-cript').val(encriptCesar(texto, 7))
    })

    $('#texto-cript').keyup(function(e){
        e.preventDefault()
        var texto = tiraAcento($('#texto-cript').val().toUpperCase())

        $('#texto-descript').val(decriptCesar(texto, 7))
    })

    $('#texto-descript2').keyup(function(e){
        e.preventDefault()
        var texto = tiraAcento($('#texto-descript2').val().toUpperCase())
        var posicao = $('#num-posicoes').val()

        $('#texto-cript2').val(encriptCesar(texto, parseInt(posicao)))
    })

    $('#texto-cript2').keyup(function(e){
        e.preventDefault()
        var texto = tiraAcento($('#texto-cript2').val().toUpperCase())
        var posicao = $('#num-posicoes').val()

        $('#texto-descript2').val(decriptCesar(texto, parseInt(posicao)))
    })

    $('#texto-chave').keyup(function(e){
        e.preventDefault()

        var texto = tiraAcento($('#texto-descript3').val().toUpperCase())
        var chave = tiraAcento($('#texto-chave').val().toUpperCase())

        $('#result-cript').html(encriptVigenere(texto, chave))
    })

    $('#texto-chave2').keyup(function(e){
        e.preventDefault()

        var texto = tiraAcento($('#texto-cript3').val().toUpperCase())
        var chave = tiraAcento($('#texto-chave2').val().toUpperCase())

        $('#result-descript').html(descriptVigenere(texto, chave))
    })

    var alfabeto = []
    var indice

    $('#form-decifrar').submit(function(e){
        e.preventDefault()
        var texto = $('#texto-cript4').val().toUpperCase()
        

        for (var j = 0; j < 26; j++) {
            alfabeto [j] = 0
        }

        for (var i = 0; i < texto.length; i++){
            for (var j = 0; j < 26; j++) {
                if(texto.charCodeAt(i) == (j + 65))
                    alfabeto [j] += 1
            }
        }
        
        indice = indice_maior(alfabeto)

        console.log(indice)


        $('#result-descript2').html(decriptCesar(texto, indice))
        $('#botoes').removeClass('invisible')

    })

    $('#botoes').click(function(e){
        e.preventDefault()
        var texto = $('#texto-cript4').val().toUpperCase()
        console.log(texto)

        novoindice = indice_maior(alfabeto, indice)
        indice = novoindice
        console.log(indice)


        $('#result-descript2').html(decriptCesar(texto, indice))

    })
})