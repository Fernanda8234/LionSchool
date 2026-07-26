'use strict'

import { renderizarPagina } from '../main.js'

export function criarInicio(){
    const secao = document.createElement('section')
    secao.id = 'secao'

    const texto = document.createElement('p')
    texto.innerHTML = 'Escolha um <span class="destaque">curso</span> para gerenciar'
    texto.id = 'texto'

    const dispositivos = document.createElement('img')
    dispositivos.src = './img/devices.png'
    dispositivos.id = 'dispositivos'

    const apresentacao = document.createElement('div')
    apresentacao.id = 'apresentacao'

    const estudante = document.createElement('img')
    estudante.src = './img/studant.png'
    estudante.id = 'estudante'

    const ds = document.createElement('button')
    ds.textContent = 'DS'
    ds.id = 'ds'

    const redes = document.createElement('button')
    redes.textContent = 'REDES'
    redes.id = 'redes'

    const botoes = document.createElement('div')
    botoes.id = 'botoes'
    
    if (window.innerWidth <= 480) {
        ds.textContent = 'DS';
        redes.textContent = 'RDS';
    }

    apresentacao.append(texto, dispositivos)
    botoes.append(ds, redes)
    secao.append(apresentacao, estudante, botoes)

    return secao
}
